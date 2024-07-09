import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {Text, Image, View, ScrollView} from 'react-native';

import {COLORS, TEXTS} from 'src/constants';

import {PackageServices} from 'src/services/apiclient';
import stylesAnalysis from './styles/stylesAnalysis';
import stylesChat from './styles/stylesChat';
import stylesCalendar from './styles/stylesCalendar';
import stylesList from './styles/stylesList';
import stylesEducation from './styles/stylesEducation';
import stylesHousehold from './styles/stylesHousehold';

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
            style={{
              backgroundColor: 'white',
              height: 2000,
              zIndex: -1,
            }}></View>

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
            <Text style={stylesCalendar.title}>Calendar & Schedule</Text>
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

          {/* Bat dau check list */}
          <View
            style={{
              backgroundColor: '#32546F',
              height: 640,
              bottom: 2150,
            }}></View>
          <Image
            source={require('../../assets/images/combo-package/Lists/background.png')}
            resizeMode="stretch"
            style={stylesList.background}
          />
          <Image
            source={require('../../assets/images/combo-package/Analysis_Finance/red-gradient.png')}
            resizeMode="stretch"
            style={stylesList.redGradient}
          />
          <Image
            source={require('../../assets/images/combo-package/Lists/list.png')}
            resizeMode="stretch"
            style={stylesList.checkList}
          />
          <Image
            source={require('../../assets/images/combo-package/Lists/speech-bubble.png')}
            resizeMode="stretch"
            style={stylesList.speechBubble}
          />
          <Image
            source={require('../../assets/images/combo-package/Lists/character.png')}
            resizeMode="stretch"
            style={stylesList.character}
          />
          <Image
            source={require('../../assets/images/combo-package/Lists/light-bulb.png')}
            resizeMode="stretch"
            style={stylesList.bulb}
          />
          <Image
            source={require('../../assets/images/combo-package/Lists/bottom-back.png')}
            resizeMode="stretch"
            style={stylesList.bottomBack}
          />
          <Image
            source={require('../../assets/images/combo-package/Lists/bottom-front.png')}
            resizeMode="stretch"
            style={stylesList.bottomFront}
          />
          <View style={{bottom: 2450}}>
            <Text style={stylesList.title}>Check list & Shopping list</Text>
            <Text style={stylesList.detail}>
              Keep all your lists in one place. Create and update custom lists
              automatically to track task.
            </Text>
          </View>

          {/* Bat dau cua education */}
          <Image
            source={require('../../assets/images/combo-package/Education/Background.png')}
            resizeMode="stretch"
            style={stylesEducation.background}
          />
          <Image
            source={require('../../assets/images/combo-package/Education/Elements.png')}
            resizeMode="stretch"
            style={stylesEducation.elements}
          />
          <Image
            source={require('../../assets/images/combo-package/Education/bottom-back.png')}
            resizeMode="stretch"
            style={stylesEducation.bottomBack}
          />
          <Image
            source={require('../../assets/images/combo-package/Education/bottom-front.png')}
            resizeMode="stretch"
            style={stylesEducation.bottomFront}
          />
          <Image
            source={require('../../assets/images/combo-package/Education/Character.png')}
            resizeMode="stretch"
            style={stylesEducation.character}
          />
          <Image
            source={require('../../assets/images/combo-package/Education/Rectangle 38.png')}
            resizeMode="stretch"
            style={stylesEducation.rec}
          />
          <Image
            source={require('../../assets/images/combo-package/Analysis_Finance/background-bottom.png')}
            resizeMode="stretch"
            style={stylesEducation.backgroundBottom}
          />
          <View style={{bottom: 1600}}>
            <Text style={stylesEducation.title}>Learning Hub</Text>
            <Text style={stylesEducation.detail}>
              The education feature organizes schedules, assignments and
              deadlines for academic success.
            </Text>
          </View>
          <Image
            source={require('../../assets/images/combo-package/Chat/connect.png')}
            resizeMode="stretch"
            style={stylesEducation.imageConnect}
          />
          <Image
            source={require('../../assets/images/combo-package/Education/Rectangle 39.png')}
            resizeMode="stretch"
            style={stylesEducation.rec39}
          />
          <Image
            source={require('../../assets/images/combo-package/Household/background.png')}
            resizeMode="stretch"
            style={stylesHousehold.background}
          />
          <Image
            source={require('../../assets/images/combo-package/Household/Character.png')}
            resizeMode="stretch"
            style={stylesHousehold.character}
          />
          <View style={{bottom: 720}}>
            <Text style={stylesEducation.title}>Household</Text>
            <Text style={stylesEducation.detail}>
              Simplifies and streamlines household task management for
              efficiency and convenience.
            </Text>
          </View>
          <Image
            source={require('../../assets/images/combo-package/Chat/left-side.png')}
            resizeMode="stretch"
            style={stylesHousehold.imageLeftSide}
          />
          <Image
            source={require('../../assets/images/combo-package/Household/bottom-back.png')}
            resizeMode="stretch"
            style={stylesHousehold.bottomBack}
          />
          <Image
            source={require('../../assets/images/combo-package/Household/bottom-front.png')}
            resizeMode="stretch"
            style={stylesHousehold.bottomFront}
          />
          <Image
            source={require('../../assets/images/combo-package/Household/oval.png')}
            resizeMode="stretch"
            style={stylesHousehold.oval}
          />
          <Image
            source={require('../../assets/images/combo-package/Household/Rectangle 38.png')}
            resizeMode="stretch"
            style={stylesHousehold.rec38}
          />
          <Image
            source={require('../../assets/images/combo-package/Household/upsidedown.png')}
            resizeMode="stretch"
            style={stylesHousehold.upSideDown}
          />
        </View>
        <View style={{backgroundColor: '#fff', height: 180}}></View>
      </View>
    </ScrollView>
  );
};

export default ComboScreen;
