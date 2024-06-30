import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {Text, Image, View, ScrollView} from 'react-native';

import {COLORS, TEXTS} from 'src/constants';

import {PackageServices} from 'src/services/apiclient';
import stylesAnalysis from './styles/stylesAnalysis';
import stylesChat from './styles/stylesChat';

const ComboScreen = () => {
  return (
    <ScrollView>
      <View style={stylesAnalysis.container}>
        <View style={stylesAnalysis.analysis}>
          <View style={{bottom: 10}}>
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/background-top.png')}
              resizeMode="stretch"
              style={stylesAnalysis.imageTop}
            />
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
            source={require('../../assets/images/combo-package/Chat/connect.png')}
            resizeMode="stretch"
            style={stylesChat.imageConnect}
          />
          <View
            style={{backgroundColor: 'white', height: 2000, zIndex: -1}}></View>

          <View style={stylesChat.chat}>
            <Image
              source={require('../../assets/images/combo-package/Chat/image-big.png')}
              resizeMode="stretch"
              style={stylesChat.imageBig}
            />
            <Image
              source={require('../../assets/images/combo-package/Chat/like.png')}
              resizeMode="stretch"
              style={stylesChat.imageLike}
            />
            <Image
              source={require('../../assets/images/combo-package/Chat/thumb-up.png')}
              resizeMode="stretch"
              style={stylesChat.imageThumbUp}
            />
            <Image
              source={require('../../assets/images/combo-package/Chat/left-side.png')}
              resizeMode="stretch"
              style={stylesChat.imageLeftSide}
            />
            <Image
              source={require('../../assets/images/combo-package/Chat/oval.png')}
              resizeMode="stretch"
              style={stylesChat.imageOval}
            />

            <Text style={stylesChat.title}>Communication Hub</Text>
            <Text style={stylesChat.detail}>
              Stay connected with instant messaging. Send texts, photo, emojis
              and videos privately and securely.
            </Text>

            <Image
              source={require('../../assets/images/combo-package/Chat/bottom-back.png')}
              resizeMode="stretch"
              style={stylesChat.imageBottomBack}
            />
            <Image
              source={require('../../assets/images/combo-package/Chat/bottom-front.png')}
              resizeMode="stretch"
              style={stylesChat.imageBottomFront}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ComboScreen;
