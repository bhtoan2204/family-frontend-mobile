import React from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  LandingPageScreenProps,
  LandingPage3ScreenProps,
  HomeTabProps,
} from 'src/navigation/NavigationTypes';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';

type CombinedScreenProps = LandingPageScreenProps &
  LandingPage3ScreenProps &
  HomeTabProps;

const LandingPage2 = ({navigation}: CombinedScreenProps) => {
  const color = useThemeColors();
  const t = useSelector(getTranslate);

  const handleGoButtonPress = () => {
    navigation.navigate('HomeTab', {screen: 'HomeScreen'});
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
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
            {t('plan_your_day')}{' '}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>{t('app_name')}</Text>
            </View>
          </Text>
          <Text style={styles.text}>{t('description')}</Text>
        </View>

        <TouchableOpacity onPress={handleGoButtonPress}>
          <View style={[styles.button, {flexDirection: 'row'}]}>
            <Text style={[styles.buttonText, {left: 15}]}>{t('lets_go')}</Text>
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

export default LandingPage2;
