import {useEffect, useState} from 'react';
import {Animated, Image, ScrollView, View} from 'react-native';
import {Button, Card, PaperProvider, Text} from 'react-native-paper';
import { useSelector } from 'react-redux';
import {COLORS, TEXTS} from 'src/constants';
import { UserProfile } from 'src/interface/user/userProfile';
import {
  ChangePasswordScreenProps,
  LoginScreenProps,
  ProfileDetailScreenProps,
} from 'src/navigation/NavigationTypes';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import {AuthServices, ProfileServices} from 'src/services/apiclient';



const MainProfile = ({
  navigation,
}: ProfileDetailScreenProps & ChangePasswordScreenProps & LoginScreenProps) => {

  const [profile, setProfile] = useState<UserProfile>();
  const scrollY = new Animated.Value(0);

  let user = useSelector(selectProfile);

  useEffect( ()=> {
     setProfile(user);
  },[])

  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [-200, 0],
    extrapolate: 'clamp',
  });



 
  const handleSignOut = async () => {
    try {
      await AuthServices.Logout();
      navigation.navigate('Login');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <PaperProvider>
      <View>
        <Animated.View
          className="bg-white justify-center items-center absolute top-0 left-0 right-0 z-[1] h-[80px]"
          style={{
            transform: [
              {
                translateY: translateY,
              },
            ],
          }}>
          <View>
            <Image
                src={profile?.avatar!== "[NULL]" ? { uri: profile?.avatar } : require('../../../assets/images/avatar_default.jpg')}
                className="h-[30px] w-[30px] rounded-full self-center"
            />
            <Text className={`text-xl text-center text-[${COLORS.primary}]`}>
              {profile?.firstname} {profile?.lastname}
            </Text>
          </View>
        </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={e => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}>
          <View className="flex-1">
          <Image
              source={profile?.avatar !== "[NULL]" ? { uri: profile?.avatar } : require('../../../assets/images/avatar_default.jpg')}
              resizeMode="contain"
            />
            <Text
              variant="headlineSmall"
              className={`text-center text-[${COLORS.primary}] mt-3`}>
              {profile?.firstname} {profile?.lastname}
              </Text>
            <Card
              className="mt-10 mx-5 mb-1 z-[1]"
              onPress={() => navigation.navigate('ProfileDetail')}>
              <Card.Actions className="flex-col mx-2">
                <Button
                  className="w-full rounded-xl z-[2]"
                  contentStyle={{
                    justifyContent: 'flex-start',
                  }}
                  mode="text"
                  icon="account"
                  textColor={COLORS.primary}
                  onPress={() => navigation.navigate('ProfileDetail')}>
                  {TEXTS.PROFILE_DETAILS}
                </Button>
              </Card.Actions>
            </Card>
            <Card
              className="mx-5 mb-1 z-[1]"
              onPress={() => navigation.navigate('ChangePassword')}>
              <Card.Actions className="flex-col mx-2">
                <Button
                  className="w-full rounded-xl z-[2]"
                  contentStyle={{
                    justifyContent: 'flex-start',
                  }}
                  mode="text"
                  icon="lock"
                  onPress={() => navigation.navigate('ChangePassword')}
                  textColor={COLORS.primary}>
                  {TEXTS.CHANGE_PASSWORD}
                </Button>
              </Card.Actions>
            </Card>
            <Button
              className="mt-20 rounded-xl mx-5"
              style={{
                borderColor: COLORS.red,
              }}
              contentStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
              }}
              labelStyle={{
                color: COLORS.red,
                textAlign: 'center',
                fontSize: 16,
              }}
              mode="outlined"
              onPress={() => handleSignOut}>
              {TEXTS.LOGOUT}
            </Button>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default MainProfile;
