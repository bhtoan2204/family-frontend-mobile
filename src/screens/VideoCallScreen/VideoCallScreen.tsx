import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoCallScreen = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [token] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS3h4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4LTE0NTA0NzExNDciLCJpc3MiOiJTS3h4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4Iiwic3ViIjoiQUN4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eCIsIm5iZiI6MTQ1MDQ3MTE0NywiZXhwIjoxNDUwNDc0NzQ3LCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaXBfbWVzc2FnaW5nIjp7InNlcnZpY2Vfc2lkIjoiSVN4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eCIsImVuZHBvaW50X2lkIjoiSGlwRmxvd1NsYWNrRG9ja1JDOnVzZXJAZXhhbXBsZS5jb206c29tZWlvc2RldmljZSJ9fX0.IHx8KeH1acIfwnd8EIin3QBGPbfnF-yVnSFp5NpQJi0');

  return (
    <View style={styles.container}>
      <Button title="Start Video Call" onPress={() => setShowWebView(true)} />
      {showWebView && token && (
        <WebView
          source={{ html: `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Twilio Video</title>
              <script src="https://sdk.twilio.com/js/video/releases/2.28.1/twilio-video.min.js"></script>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  overflow: hidden;
                  backgroundColor: 'black';
                }
                #local-media, #remote-media {
                  width: 100%;
                  height: 50%;
                }
              </style>
            </head>
            <body>
              <div id="local-media"></div>
              <div id="remote-media"></div>
              <script>
                const token = '${token}';
                Twilio.Video.connect(token, { name: 'my-room' }).then(room => {
                  room.on('participantConnected', participant => {
                    const remoteMediaDiv = document.getElementById('remote-media');
                    participant.tracks.forEach(track => {
                      remoteMediaDiv.appendChild(track.attach());
                    });
                  });
                  room.localParticipant.tracks.forEach(track => {
                    document.getElementById('local-media').appendChild(track.attach());
                  });
                }).catch(error => {
                  console.error('Unable to connect to Room: ', error.message);
                });
              </script>
            </body>
            </html>` }}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled={true}
          originWhitelist={['*']}
        />
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
  webview: {
    width: '100%',
    height: '80%',
  },
});

export default VideoCallScreen;