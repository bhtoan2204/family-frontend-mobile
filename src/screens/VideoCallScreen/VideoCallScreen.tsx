import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import StringeeClient from 'stringee-react-native'; // Đảm bảo tên và đường dẫn đúng
import StringeeVideoView from 'stringee-react-native'; // Đảm bảo tên và đường dẫn đúng
import LocalStorage from 'src/store/localstorage';
import { ChatServices } from 'src/services/apiclient';

const VideoCallScreen = () => {
  const [callStarted, setCallStarted] = useState(false);
  const [roomUrl, setRoomUrl] = useState('');
  const [token, setToken] = useState('');
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [call, setCall] = useState(null); // State để lưu thông tin cuộc gọi

  const stringeeClient = new StringeeClient();

  const requestPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: audioStatus } = await Audio.requestPermissionsAsync();
    
    setCameraPermission(cameraStatus === 'granted');
    setAudioPermission(audioStatus === 'granted');

    if (!cameraStatus === 'granted' || !audioStatus === 'granted') {
      Alert.alert('Permission required', 'Camera and microphone permissions are required.');
    }
  };

  const fetchToken = async () => {
    try {
      const accessToken = await LocalStorage.GetAccessToken();
      if (accessToken) {
        setToken(accessToken);
      } else {
        Alert.alert('Error', 'Failed to retrieve access token.');
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      Alert.alert('Error', 'Failed to fetch token.');
    }
  };

  useEffect(() => {
    requestPermissions();
    fetchToken();

    if (token) {
      // Khởi tạo StringeeClient
      stringeeClient.connect(token);

      // Đăng ký các sự kiện cuộc gọi
      stringeeClient.on('onCallIncoming', (incomingCall) => {
        console.log('Incoming call:', incomingCall);
        setCall(incomingCall);
        // Xử lý cuộc gọi đến, bạn có thể chấp nhận hoặc từ chối cuộc gọi
      });

      stringeeClient.on('onCallEnd', () => {
        console.log('Call ended');
        setCall(null);
        setRoomUrl('');
        setCallStarted(false);
      });

      return () => {
        stringeeClient.disconnect();
      };
    }
  }, [token]);

  const startCall = async () => {
    if (!cameraPermission || !audioPermission) {
      Alert.alert('Permissions error', 'Please grant camera and microphone permissions to make a call.');
      return;
    }

    try {
      const room = await ChatServices.createRoom();
      if (room) {
        setRoomUrl(room);
        setCallStarted(true);

        // Bắt đầu cuộc gọi
        const call = stringeeClient.call(room);
        setCall(call);
      } else {
        Alert.alert('Error', 'Failed to create or join the room.');
      }
    } catch (error) {
      console.error('Error starting call:', error);
      Alert.alert('Error', 'An error occurred while starting the call.');
    }
  };

  const endCall = () => {
    if (call) {
      call.hangup(); // Kết thúc cuộc gọi
      setCall(null);
      setRoomUrl('');
      setCallStarted(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Call</Text>
      <Button title="Start Call" onPress={startCall} disabled={callStarted} />
      {callStarted && (
        <>
          <StringeeVideoView
            style={styles.videoView}
            streamId={roomUrl} // ID của stream từ cuộc gọi
            onError={(e) => {
              console.error('Video view error:', e.nativeEvent);
              Alert.alert('Error', 'Unable to display video.');
            }}
          />
          <Button title="End Call" onPress={endCall} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  videoView: {
    width: '100%',
    height: '100%',
  },
});

export default VideoCallScreen;
