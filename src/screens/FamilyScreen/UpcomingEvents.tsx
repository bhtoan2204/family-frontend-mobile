import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'src/constants';
import {Family} from 'src/interface/family/family';
import {Member} from 'src/interface/member/member';
import {UpcomingEventsScreenProps} from 'src/navigation/NavigationTypes';
import {FamilyServices} from 'src/services/apiclient';

const UpcomingEvents = ({navigation}: UpcomingEventsScreenProps) => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const shakeAnimationX = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: -5,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 15,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(shakeAnimationX, {
          toValue: 10,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationX, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationX, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1, // Lặp lại vô hạn
      },
    );

    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Image
          source={require('../../assets/images/family-today-event.png')}
          resizeMode="cover"
          style={{
            width: 324,
            height: 217,
            alignSelf: 'center',
          }}
        />
        <Animated.Image
          source={require('../../assets/images/clock.png')}
          resizeMode="cover"
          style={{
            width: 62.16,
            height: 69.88,
            alignSelf: 'center',
            marginTop: 80,
            bottom: 200,
            left: 15,
            transform: [
              {translateY: shakeAnimation},
              {translateX: shakeAnimationX},
            ],
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  familyItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  familyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  familyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  familyItemText: {
    fontSize: 18,
    color: COLORS.Rhino,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  checkIcon: {
    marginLeft: 10,
  },
  membersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  memberItemContainer: {
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  avatarFamily: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  selectedFamilyItem: {
    backgroundColor: '#E0F7FA',
  },
  firstItemSelected: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default UpcomingEvents;
