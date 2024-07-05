import React, {useEffect, useState} from 'react';
//import {VietQR} from 'vietqr';
import {Text, Image, View} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';

import {COLORS, TEXTS} from 'src/constants';

import {PackageServices} from 'src/services/apiclient';
import styles from './styles';
import {Button, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BankInfoScreenProps} from 'src/navigation/NavigationTypes';

type Bank = {id: number; logo: string; shortName: string; name: string};

const ZaloPayScreen = () => {
  return (
    <View>
      <Text style={styles.title}>ZaloPayScreen</Text>
    </View>
  );
};

export default ZaloPayScreen;
