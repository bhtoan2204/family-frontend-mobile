import React from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {HomeTabProps, SignupScreenProps} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons'; // Đảm bảo đã cài đặt thư viện này

type CombinedScreenProps = SignupScreenProps & HomeTabProps;

const LandingPage = ({navigation}: CombinedScreenProps) => {
  const handleGoButtonPress = () => {
    navigation.navigate('HomeTab', {screen: 'HomeScreen'});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{uri: 'https://assets.withfra.me/Landing.3.png'}}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>
            Plan your day{'\n'}with{' '}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>Fam Fund</Text>
            </View>
          </Text>
          <Text style={styles.text}>
            Fostering Strong Family Connections: Connect, Organize, Share, and
            Treasure Every Moment Together.
          </Text>
        </View>

        <TouchableOpacity onPress={handleGoButtonPress}>
          <View style={[styles.button, {flexDirection: 'row'}]}>
            <Text style={[styles.buttonText, {left: 15}]}>Let's go</Text>
            <Icon
              name="arrow-forward"
              size={24}
              color="#fff"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
