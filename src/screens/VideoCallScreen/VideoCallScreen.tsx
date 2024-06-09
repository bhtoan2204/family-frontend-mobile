// import React, { useEffect } from 'react';
// import { View, Button, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
// import ZegoExpressEngine from 'zego-express-engine-reactnative';
// import { useSelector } from 'react-redux';
// import { CallVideoProps } from 'src/navigation/NavigationTypes';
// import { selectProfile } from 'src/redux/slices/ProfileSclice';

// const appID = 1535179805;
// const appSign = '440c3d6130518e70d18fb95ae0b2401fa41f5bbad87914636a393b332726056a';
// const roomID = 'room1';

// const VideoCallScreen = ({ navigation, route }: CallVideoProps) => {
//   const { receiverId } = route.params || {};
//   const user = useSelector(selectProfile);
//   const userID = user.id_user;
//   const userName = user.lastname;

//   useEffect(() => {
//     const initPermissions = async () => {
//       if (Platform.OS === 'android') {
//         await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         ]);
//       }
//     };
  
//     initPermissions();
  
//     ZegoExpressEngine.createEngine(appID, appSign);
  
//     ZegoExpressEngine.instance().loginRoom(roomID, { userID, userName });
  
//     ZegoExpressEngine.instance().startPreview({ view: null });
  
//     return () => {
//       ZegoExpressEngine.instance().stopPreview();
//       ZegoExpressEngine.instance().logoutRoom(roomID);
//       ZegoExpressEngine.destroyEngine();
//     };
//   }, []);
  

//   const startCall = () => {
//     // Bắt đầu xuất bản video
//     ZegoExpressEngine.instance().startPublishingStream(userID);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.localVideo} />
//       <Button title="Start Call" onPress={startCall} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   localVideo: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'black',
//   },
// });

// export default VideoCallScreen;
