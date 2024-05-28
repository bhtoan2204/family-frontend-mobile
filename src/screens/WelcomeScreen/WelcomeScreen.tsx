import React from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {HomeTabProps, SignupScreenProps} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons'; // Đảm bảo đã cài đặt thư viện này

type CombinedScreenProps = SignupScreenProps & HomeTabProps;

const WelcomeScreen = ({navigation}: CombinedScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../../assets/images/picture-famfund-1-removebg.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/text-fam-fund-removebg.png')}
          resizeMode="center"
          style={styles.textLogo}
        />
        <Text style={styles.welcomeText}>
          More than just an app, it's a journey
        </Text>
        <View style={{marginTop: 90}}>
          <TouchableOpacity style={styles.buttonLogin}>
            <Text style={styles.btnLogin}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSignUp}>
            <Text style={styles.btnSignUp}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
