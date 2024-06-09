import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FamilyServices} from 'src/services/apiclient';
import {ViewFamilyScreenProps} from 'src/navigation/NavigationTypes';
import {COLORS, TEXTS} from 'src/constants';
import styles from './styles';
import BottomSheet from './BottomSheet';
import {Family} from 'src/interface/family/family';
import GuildLineImage from 'src/assets/icons/guideline-items.png';
import CalenderImage from 'src/assets/icons/calendar-scheduling.png';
import EducationImage from 'src/assets/icons/manage-eduction.png';
import ChatImage from 'src/assets/icons/chat-with-members.png';
import MemberImage from 'src/assets/icons/family-member.png';
import DeleteImage from 'src/assets/images/remove.png';
import HouseHoldImage from 'src/assets/icons/household-appliances.png';
import CheckListImage from 'src/assets/icons/checklist.png';
import NewsImage from 'src/assets/images/news.png';
const ViewFamilyScreen = ({navigation, route}: ViewFamilyScreenProps) => {
  const {id_user, id_family} = route.params || {};
  const [family, setFamily] = useState<Family>();
  const bottomSheetRef = useRef<RBSheet>(null);
  const allMemberRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;

  const handleGetFamily = async () => {
    try {
      const familyInfo = await FamilyServices.getFamily({id_family});
      console.log('familyInfo', familyInfo);
      setFamily(familyInfo[0]);
    } catch (error: any) {
      console.log('FamilyServices.getFamily error:', error);
    }
  };

  const handleDeleteFamily = async (id_family: number) => {
    try {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this family?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const result = await FamilyServices.deleteFamily({id_family});
              Alert.alert('Success', 'Successfully deleted family');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error: any) {
      Alert.alert('Fail', 'Failed deleted family');
      console.log('Error deleting family:', error);
    }
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.open();
  };
  const handleChatPress = () => {
    navigation.navigate('ChatStack', {
      screen: 'ChatFamily',
      params: {id_user: id_user, id_family: id_family},
    });
  };
  const handleEducationPress = () => {
    navigation.navigate('Education', {id_family: id_family});
  };
  const handleCalendarPress = () => {
    navigation.navigate('CalendarStack', {
      screen: 'CalendarScreen',
      params: {id_family: id_family},
    });
  };
  const handleOpenAllMemberModal = (
    id_user: string | undefined,
    id_family: number,
  ) => {
    navigation.navigate('AllMember', {id_user, id_family});
  };
  const handleNavigateGuildLine = () => {
    navigation.navigate('GuildLine', {id_family: id_family});
  };
  const handleNavigateHouseHold = () => {
    navigation.navigate('HouseHold', {id_family: id_family});
  };
  const handleNavigateChecklist = () => {
    navigation.navigate('CheckList', {id_family: id_family});
  };
  const handleNavigateNews = () => {
    navigation.navigate('News', {id_family: id_family});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetFamily();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/FamilyBG.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1}}>
        <View
          className="w-full flex-row justify-between items-center"
          style={{padding: 10, marginTop: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} style={styles.backButton} />
          </TouchableOpacity>
          {family != null && (
            <Text
              style={{
                color: 'white',
                fontSize: 28,
                fontWeight: 'bold',
              }}>
              {family.name}
            </Text>
          )}
          <View className="mr-2">
            <TouchableOpacity
              onPress={handleOpenBottomSheet}
              style={styles.settingItem}>
              <Material name="pencil" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-col justify-center items-center pt-4 ">
          <Image
            source={require('../../assets/images/family-1.jpg')}
            resizeMode="stretch"
            style={{
              borderRadius: 30,
              height: 200,
              width: 350,
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          />
        </View>
        {family != null && (
          <ScrollView className="h-full w-full" style={{marginTop: 20}}>
            <View className="">
              <View className="mt-2">
                <TouchableOpacity
                  onPress={() =>
                    handleOpenAllMemberModal(id_user, family!.id_family)
                  }
                  style={{
                    borderWidth: 2,
                    marginVertical: 2,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    borderColor: '#FBE6DD',
                    height: 100,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-1.png')}
                    resizeMode="stretch"
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          marginRight: 36,
                          fontSize: 18,
                          marginBottom: 30,
                        }}>
                        Family Member
                      </Text>
                      <Text style={{fontWeight: '600'}}>View detail</Text>
                    </View>
                    <Image
                      style={{height: 74, width: 74}}
                      source={MemberImage}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleChatPress}
                  style={{
                    borderWidth: 2,
                    marginVertical: 2,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    borderColor: '#E1F2FD',
                    height: 100,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-2.png')}
                    resizeMode="stretch"
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          marginRight: 36,
                          fontSize: 18,
                          marginBottom: 30,
                        }}>
                        Chat with members
                      </Text>
                      <Text style={{fontWeight: '600'}}>View detail</Text>
                    </View>
                    <Image
                      style={{height: 74, width: 74}}
                      source={ChatImage}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNavigateChecklist()}
                  style={{
                    borderWidth: 2,
                    marginVertical: 2,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    borderColor: '#E3F4E8',
                    height: 100,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-3.png')}
                    resizeMode="stretch"
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          marginRight: 36,
                          fontSize: 18,
                          marginBottom: 30,
                        }}>
                        Checklist
                      </Text>
                      <Text style={{fontWeight: '600'}}>View detail</Text>
                    </View>
                    <Image
                      style={{height: 74, width: 74}}
                      source={CheckListImage}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleEducationPress}
                  style={{
                    borderWidth: 2,
                    marginVertical: 2,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    borderColor: '#F0F2F4',
                    height: 100,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-4.png')}
                    resizeMode="stretch"
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          marginRight: 36,
                          fontSize: 18,
                          marginBottom: 30,
                        }}>
                        Manage Education
                      </Text>
                      <Text style={{fontWeight: '600'}}>View detail</Text>
                    </View>
                    <Image
                      style={{height: 74, width: 74}}
                      source={EducationImage}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCalendarPress}
                  style={{
                    borderWidth: 2,
                    marginVertical: 2,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    borderColor: '#EBE5D1',
                    height: 100,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-5.png')}
                    resizeMode="stretch"
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          marginRight: 36,
                          fontSize: 18,
                          marginBottom: 30,
                        }}>
                        Calendar & Scheduling
                      </Text>
                      <Text style={{fontWeight: '600'}}>View detail</Text>
                    </View>
                    <Image
                      style={{height: 74, width: 74}}
                      source={CalenderImage}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNavigateGuildLine()}
                  style={{
                    borderWidth: 2,
                    marginVertical: 2,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    borderColor: '#FBE6DD',
                    height: 100,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-1.png')}
                    resizeMode="stretch"
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          marginRight: 36,
                          fontSize: 18,
                          marginBottom: 30,
                        }}>
                        Guideline Items
                      </Text>
                      <Text style={{fontWeight: '600'}}>View detail</Text>
                    </View>
                    <Image
                      style={{height: 74, width: 74}}
                      source={GuildLineImage}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNavigateHouseHold()}
                  style={{
                    borderWidth: 2,
                    marginVertical: 2,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    borderColor: '#E1F2FD',
                    height: 100,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-2.png')}
                    resizeMode="stretch"
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          marginRight: 36,
                          fontSize: 18,
                          marginBottom: 30,
                        }}>
                        HouseHold Appliances
                      </Text>
                      <Text style={{fontWeight: '600'}}>View detail</Text>
                    </View>
                    <Image
                      style={{height: 74, width: 74}}
                      source={HouseHoldImage}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNavigateNews()}
                  style={{
                    borderWidth: 2,
                    marginVertical: 2,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    borderColor: '#E3F4E8',
                    height: 100,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-3.png')}
                    resizeMode="stretch"
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          marginRight: 36,
                          fontSize: 18,
                          marginBottom: 30,
                        }}>
                        Newspaper
                      </Text>
                      <Text style={{fontWeight: '600'}}>View detail</Text>
                    </View>
                    <Image
                      style={{height: 74, width: 74}}
                      source={NewsImage}
                      resizeMode="stretch"
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteFamily(family!.id_family)}>
                  <View className="flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white">
                    <Image
                      className="h-12 w-12"
                      source={DeleteImage}
                      resizeMode="contain"
                    />
                    <Text className="ml-4 text-lg text-red-600">Delete</Text>
                  </View>
                </TouchableOpacity>
                <View className="h-5"></View>
              </View>
            </View>
          </ScrollView>
        )}

        <RBSheet
          ref={bottomSheetRef}
          closeOnDragDown={true}
          height={screenHeight * 0.3}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}>
          <BottomSheet
            id_user={id_user}
            id_family={id_family}
            name={family?.name}
            description={family?.description}
          />
        </RBSheet>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ViewFamilyScreen;
