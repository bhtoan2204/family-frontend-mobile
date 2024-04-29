import {useEffect, useState} from 'react';
import {Animated, Image, ScrollView, View} from 'react-native';
import {Button, Card, PaperProvider, Text} from 'react-native-paper';
import {COLORS, TEXTS} from '../../../constants';
import {
  ChangePasswordScreenProps,
  ProfileDetailScreenProps,
} from '../../../navigation/NavigationTypes';
import {ProfileServices} from '../../../services/apiclient';

const initialProfile = {
  avatar: '',
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
};

const MainProfile = ({
  navigation,
}: ProfileDetailScreenProps & ChangePasswordScreenProps) => {
  const [profile, setProfile] = useState(initialProfile);
  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [-200, 0],
    extrapolate: 'clamp',
  });

  const loadData = async () => {
    try {
      const response = await ProfileServices.profile();

      setProfile({
        avatar: response.data.avatar,
        email: response.data.email,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        phone: response.data.phone,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
              src={profile.avatar}
              className="h-[30px] w-[30px] rounded-full self-center"
            />
            <Text className={`text-xl text-center text-[${COLORS.primary}]`}>
              {profile.firstname} {profile.lastname}
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
              src={profile.avatar}
              className="h-[100px] w-[100px] rounded-full self-center mt-10"
            />
            <Text
              variant="headlineSmall"
              className={`text-center text-[${COLORS.primary}] mt-3`}>
              {profile.firstname} {profile.lastname}
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
              onPress={() => console.log('Logout')}>
              {TEXTS.LOGOUT}
            </Button>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default MainProfile;
