import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {Text, Image, View} from 'react-native';

import {COLORS, TEXTS} from 'src/constants';

import {PackageServices} from 'src/services/apiclient';
import styles from './styles';

const ComboScreen = () => {
  return (
    <View>
      <Text style={styles.title}>ComboScreen</Text>
    </View>
  );
};

export default ComboScreen;
