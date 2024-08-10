import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {Camera} from 'expo-camera';
import {Audio} from 'expo-av';
import {WebView} from 'react-native-webview';
import {ChatServices} from 'src/services/apiclient';
import LocalStorage from 'src/store/localstorage';

const VideoCallScreen = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [roomUrl, setRoomUrl] = useState('');
  const [cameraVisible, setCameraVisible] = useState(true); // State to control camera visibility

  const requestPermissions = async () => {
    const {status: cameraStatus} = await Camera.requestCameraPermissionsAsync();
    const {status: audioStatus} = await Audio.requestPermissionsAsync();

    setCameraPermission(cameraStatus === 'granted');
    setAudioPermission(audioStatus === 'granted');

    if (!cameraStatus === 'granted' || !audioStatus === 'granted') {
      Alert.alert(
        'Permission required',
        'Camera and microphone permissions are required.',
      );
    }
  };

  const startCall = async () => {
    if (!cameraPermission || !audioPermission) {
      Alert.alert(
        'Permissions error',
        'Please grant camera and microphone permissions to make a call.',
      );
      return;
    }

    try {
      const room = await ChatServices.createRoom();
      if (room) {
        setRoomUrl(room);
        setCameraVisible(false); // Hide camera preview before showing WebView
        setShowWebView(true);
      } else {
        Alert.alert('Error', 'Failed to create or join the room.');
      }
    } catch (error) {
      //console.error('Error starting call:', error);
      Alert.alert('Error', 'An error occurred while starting the call.');
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Video Call</title>
  <script src="https://sdk.stringee.com/web-sdk/1.0.22/stringee.js"></script>
  <style>
    #video-container {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="video-container"></div>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const token = "${LocalStorage.GetAccessToken()}"; // Chèn token vào đây
      const room = "${roomUrl}"; // Chèn room ID vào đây

      const stringeeClient = new StringeeClient();
      stringeeClient.connect(token);

      stringeeClient.on('connect', function (status) {
        if (status) {
          stringeeClient.joinRoom(room);
        }
      });

      stringeeClient.on('createRoom', function (room) {
        const videoContainer = document.getElementById('video-container');
        room.remoteStreams.forEach(stream => {
          stream.play('video-container');
        });
      });

      stringeeClient.on('onAddRemoteStream', function(stream) {
        stream.play('video-container');
      });
    });
  </script>
</body>
</html>
`;

  return (
    <WebView
      originWhitelist={['*']}
      source={{html: htmlContent}}
      style={styles.webview}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    width: '100%',
    height: '50%', // Adjust height as needed
    position: 'absolute',
    top: 0,
  },
  webview: {
    width: '100%',
    height: '100%',
  },
});

export default VideoCallScreen;
