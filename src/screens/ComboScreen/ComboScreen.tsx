import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {Text, Image, View} from 'react-native';

import {COLORS, TEXTS} from 'src/constants';

import {PackageServices} from 'src/services/apiclient';
import stylesAnalysis from './styles/stylesAnalysis';
import stylesChat from './styles/stylesChat';
import {ScrollView} from 'react-native-gesture-handler';

const ComboScreen = () => {
  return (
    <ScrollView>
      <View style={stylesAnalysis.container}>
        <View style={stylesAnalysis.analysis}>
          <View style={{bottom: 10}}>
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/Information.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imageInformation}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/red-gradient.png')}
              resizeMode="stretch"
              style={stylesAnalysis.redGradient}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/Character.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imageCharacter}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/linechart.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imageLineChart}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/piechart.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imagePieChart}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/barchart.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imageBarChart}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/back.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imageBack}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/front.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imageFront}
            />
          </View>
          <View style={stylesAnalysis.bottomField}>
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/background-bottom.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imageBottom}
            />
            <Text style={stylesAnalysis.title}>Analysis Finance</Text>
            <Text style={stylesAnalysis.detail}>
              Track finances, analyze spending, plan budgets and visualize money
              flow with loved ones.
            </Text>
          </View>
          <Image
            source={require('../../assets/images/combo-package/Analysis_Finance/wave-bottom.png')}
            resizeMode="stretch"
            style={stylesAnalysis.imageBottomWave}
          />
          <Image
            source={require('../../assets/images/combo-package/Analysis_Finance/background-top.png')}
            resizeMode="stretch"
            style={stylesAnalysis.imageTop}
          />
        </View>
        <View style={{}}></View>
      </View>
    </ScrollView>
  );
};

export default ComboScreen;
