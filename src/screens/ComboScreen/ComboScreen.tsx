import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {Text, Image, View, ScrollView} from 'react-native';

import {COLORS, TEXTS} from 'src/constants';

import {PackageServices} from 'src/services/apiclient';
import stylesAnalysis from './styles/stylesAnalysis';
import stylesChat from './styles/stylesChat';
import stylesCalendar from './styles/stylesCalendar';

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
            <Image
              source={require('../../assets/images/combo-package/Chat/header.png')}
              resizeMode="stretch"
              style={stylesChat.header}
            />
            <Image
              source={require('../../assets/images/combo-package/Chat/oval.png')}
              resizeMode="stretch"
              style={stylesChat.imageOval1}
            />
            <Image
              source={require('../../assets/images/combo-package/Analysis_Finance/red-gradient.png')}
              resizeMode="stretch"
              style={stylesChat.redGradient}
            />
          </View>

          {/* Bat dau Calendar */}
          <Image
            source={require('../../assets/images/combo-package/Calendar/background.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageBackground}
          />
          <Image
            source={require('../../assets/images/combo-package/Calendar/tablet.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageTablet}
          />
          <Image
            source={require('../../assets/images/combo-package/Calendar/right-side.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageRightSide}
          />
          <Image
            source={require('../../assets/images/combo-package/Calendar/character.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageCharacter}
          />
          <Image
            source={require('../../assets/images/combo-package/Calendar/bottom-back.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageBottomBack}
          />
          <Image
            source={require('../../assets/images/combo-package/Calendar/bottom-front.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageFrontBack}
          />
          <View style={stylesCalendar.bottomField}></View>
          <Image
            source={require('../../assets/images/combo-package/Calendar/blue-circle.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageBlueGradient}
          />
          <View style={{bottom: 2040}}>
            <Text style={stylesCalendar.title}>Canlendar & Schedule</Text>
            <Text style={stylesCalendar.detail}>
              The shared calendar syncs schedules and activities, ensuring you
              never miss a birthday or special event.
            </Text>
          </View>
          <Image
            source={require('../../assets/images/combo-package/Calendar/left-side.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageLeftSide}
          />
          <Image
            source={require('../../assets/images/combo-package/Calendar/wave.png')}
            resizeMode="stretch"
            style={stylesCalendar.imageBottomWave}
          />
          <View></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ComboScreen;
