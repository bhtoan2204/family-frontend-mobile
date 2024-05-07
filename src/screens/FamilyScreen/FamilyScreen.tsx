import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert, SafeAreaView, Dimensions, FlatList, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FamilyServices } from 'src/services/apiclient';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes';
import { COLORS, TEXTS } from 'src/constants';
import styles from './styles';
import BottomSheet from './BottomSheet';
import { Family } from 'src/interface/family/family';
import GuildLineImage from 'src/assets/images/guildline.png';
import CalenderImage from 'src/assets/images/calendar.png';
import EducationImage from 'src/assets/images/education.png';
import ChatImage from 'src/assets/images/speak.png';
import MemberImage from 'src/assets/images/diversity.png';
import DeleteImage from 'src/assets/images/remove.png';
import HouseHoldImage from 'src/assets/images/household.png';
import CheckListImage from 'src/assets/images/checklist.png';

const ViewFamilyScreen = ({ navigation, route }: ViewFamilyScreenProps) => {
  const { id_user, id_family } = route.params || {};
  const [family, setFamily] = useState<Family>();
  const bottomSheetRef = useRef<RBSheet>(null);
  const allMemberRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;

  const handleGetFamily = async () => {
    try {
      const familyInfo = await FamilyServices.getFamily({ id_family });
      console.log("familyInfo", familyInfo)
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
              const result = await FamilyServices.deleteFamily({ id_family });
              Alert.alert(
                'Success',
                'Successfully deleted family'
              );
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error: any) {
      Alert.alert(
        'Fail',
        'Failed deleted family'
      );
      console.log('Error deleting family:', error);
    }
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.open();
  };
  const handleChatPress = () => {
    navigation.navigate('ChatStack', { screen: 'ChatFamily', params: { id_user: id_user, id_family: id_family } });
  };
  const handleEducationPress = () => {
    navigation.navigate('Education', { id_family: id_family })
  };
  const handleCalendarPress = () => {
    navigation.navigate('CalendarStack', { screen: 'CalendarScreen', params: { id_family: id_family } });
  }
  const handleOpenAllMemberModal = (id_user: string | undefined, id_family: number) => {
    navigation.navigate('AllMember', { id_user, id_family });
  };
  const handleNavigateGuildLine = () => {
    navigation.navigate('GuildLine', { id_family: id_family })
  }
  const handleNavigateHouseHold = () => {
    navigation.navigate('HouseHold', { id_family: id_family })
  }
  const handleNavigateChecklist = () => {
    navigation.navigate('CheckList', { id_family: id_family })
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetFamily();
    });
    return unsubscribe;
  }, [navigation]);



  return (
    <SafeAreaView className='bg-[#F7F7F7] flex-1'>
      <View className='w-full  flex-row justify-between items-center bg-white '>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <View className='mr-2'>
          <TouchableOpacity onPress={handleOpenBottomSheet} style={styles.settingItem}>
            <Material name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {
        family != null && <ScrollView className='h-full w-full'>
          <View className='flex-col justify-center items-center pt-4 ' >
            <Image source={{ uri: 'https://pethouse.com.vn/wp-content/uploads/2023/06/meo-anh-long-ngan-833x800.jpg' }} width={300} height={200} className='rounded-lg' />
            <Text className='text-xl font-semibold mt-3' style={{ color: COLORS.primary }}>{family.name}</Text>

            <Text className='text-base font-semibold mt-1' style={{ color: COLORS.primary }}>Edit Photo</Text>
          </View>
          <View className=''>
            <View className='mt-2'>

              <TouchableOpacity onPress={() => handleOpenAllMemberModal(id_user, family!.id_family)} >
                <View className='flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white'>
                  <Image
                    className="h-12 w-12"
                    source={MemberImage}
                    resizeMode="contain"
                  />
                  <Text className='ml-4 text-lg'>Family Member</Text>

                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChatPress} >
                <View className='flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white'>
                  <Image
                    className="h-12 w-12"
                    source={ChatImage}
                    resizeMode="contain"
                  />
                  <Text className='ml-4 text-lg'>Chat with members</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigateChecklist()} >
                <View className='flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white'>

                  <Image
                    className="h-12 w-12"
                    source={CheckListImage}
                    resizeMode="contain"
                  />
                  <Text className='ml-4 text-lg' >Checklist</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEducationPress} >
                <View className='flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white'>
                  <Image
                    className="h-12 w-12"
                    source={EducationImage}
                    resizeMode="contain"
                  />
                  <Text className='ml-4 text-lg'>Manage Education</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCalendarPress} >
                <View className='flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white'>
                  <Image
                    className="h-12 w-12"
                    source={CalenderImage}
                    resizeMode="contain"
                  />
                  <Text className='ml-4 text-lg'>Calendar & Scheduling</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigateGuildLine()} >
                <View className='flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white'>

                  <Image
                    className="h-12 w-12"
                    source={GuildLineImage}
                    resizeMode="contain"
                  />
                  <Text className='ml-4 text-lg' >Guideline Items </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigateHouseHold()} >
                <View className='flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white'>

                  <Image
                    className="h-12 w-12"
                    source={HouseHoldImage}
                    resizeMode="contain"
                  />
                  <Text className='ml-4 text-lg' >HouseHold Appliances </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDeleteFamily(family!.id_family)} >
                <View className='flex-row  items-center py-4 px-4 border-[0.5px] my-2 mx-5 rounded-lg border-[#C4C7C5] bg-white'>
                  <Image
                    className="h-12 w-12"
                    source={DeleteImage}
                    resizeMode="contain"
                  />
                  <Text className='ml-4 text-lg text-red-600' >Delete</Text>
                </View>
              </TouchableOpacity>
              <View className='h-5'>

              </View>
            </View>


          </View>

        </ScrollView>

      }







      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={screenHeight * 0.3}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <BottomSheet id_user={id_user} id_family={id_family} name={family?.name} description={family?.description} />
      </RBSheet>


    </SafeAreaView >
  );
};

export default ViewFamilyScreen;
