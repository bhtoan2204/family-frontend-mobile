import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {Text, Image, View} from 'react-native';

import {COLORS, TEXTS} from 'src/constants';

import {PackageServices} from 'src/services/apiclient';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const ComboScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.analysis}>
          <View style={{bottom: 10}}>
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/Information.png')}
              resizeMode="stretch"
              style={styles.imageInformation}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/red-gradient.png')}
              resizeMode="stretch"
              style={styles.redGradient}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/Character.png')}
              resizeMode="stretch"
              style={styles.imageCharacter}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/linechart.png')}
              resizeMode="stretch"
              style={styles.imageLineChart}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/piechart.png')}
              resizeMode="stretch"
              style={styles.imagePieChart}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/barchart.png')}
              resizeMode="stretch"
              style={styles.imageBarChart}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/back.png')}
              resizeMode="stretch"
              style={styles.imageBack}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/front.png')}
              resizeMode="stretch"
              style={styles.imageFront}
            />
          </View>
          <View style={styles.bottomField}>
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/background-bottom.png')}
              resizeMode="stretch"
              style={styles.imageBottom}
            />
            <Text style={styles.title}>Analysis Finance</Text>
            <Text style={styles.detail}>
              Track finances, analyze spending, plan budgets and visualize money
              flow with loved ones.
            </Text>
          </View>
          <Image
            source={require('../../assets/images/combo-package/Analysis_Finance/wave-bottom.png')}
            resizeMode="stretch"
            style={styles.imageBottomWave}
          />
          <Image
            source={require('../../assets/images/combo-package/Analysis_Finance/background-top.png')}
            resizeMode="stretch"
            style={styles.imageTop}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ComboScreen;
