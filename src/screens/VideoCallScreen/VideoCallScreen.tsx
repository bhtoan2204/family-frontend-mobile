// import React, {useState, useEffect, useRef} from 'react';
// import {View, Button} from 'react-native';
// import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';
// import {CallVideoProps} from 'src/navigation/NavigationTypes';
// import {getSocket} from 'src/services/apiclient/Socket';

// const VideoCallScreen = ({navigation, route}: CallVideoProps) => {
//   const [localStream, setlocalStream] = useState(null);
//   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
//   const {receiverId} = route.params;
//   const socket = getSocket();
//   let isFront = false;

//   useEffect(() => {
//     initializeSocket();
//     initializeMediaDevices();
//   }, []);

//   const initializeSocket = () => {
//     if (socket) {
//       socket.on('send_connection_offer', async ({offer}) => {
//         await peerConnectionRef.current?.setRemoteDescription(
//           new RTCSessionDescription(offer),
//         );
//       });

//       socket.on('send_connection_answer', async ({answer}) => {
//         await peerConnectionRef.current?.setRemoteDescription(
//           new RTCSessionDescription(answer),
//         );
//       });

//       socket.on('too_many_people', message => {
//         console.log(message);
//       });
//     }
//   };

//   const initializeMediaDevices = async () => {
//     mediaDevices.enumerateDevices().then(sourceInfos => {
//       let videoSourceId;
//       for (let i = 0; i < sourceInfos.length; i++) {
//         const sourceInfo = sourceInfos[i];
//         if (
//           sourceInfo.kind == 'videoinput' &&
//           sourceInfo.facing == (isFront ? 'user' : 'environment')
//         ) {
//           videoSourceId = sourceInfo.deviceId;
//         }
//       }

//       mediaDevices
//         .getUserMedia({
//           audio: true,
//           video: {
//             mandatory: {
//               minWidth: 500,
//               minHeight: 300,
//               minFrameRate: 30,
//             },
//             facingMode: isFront ? 'user' : 'environment',
//             optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
//           },
//         })
//         .then(stream => {
//           setlocalStream(stream);

//           peerConnectionRef.current.addStream(stream);
//         });
//     });
//   };

//   const startCall = async () => {
//     const configuration = {
//       iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
//     };
//     const peerConnection = new RTCPeerConnection(configuration);
//     peerConnectionRef.current = peerConnection;

//     localStream?.getTracks().forEach(track => {
//       peerConnection.addTrack(track, localStream!);
//     });

//     peerConnection.current.onaddstream = event => {
//       setRemoteStream(event.stream);
//     };

//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);

//     if (socket) {
//       socket.emit('send_connection_offer', {offer, roomName: 'room'});
//     }
//   };

//   return (
//     <View>
//       <RTCView
//         style={{width: 200, height: 200}}
//         streamURL={localStream?.toURL()}
//       />
//       <RTCView
//         style={{width: 200, height: 200}}
//         streamURL={remoteStream?.toURL()}
//       />

//       <Button title="Start Call" onPress={startCall} />
//     </View>
//   );
// };

// export default VideoCallScreen;
