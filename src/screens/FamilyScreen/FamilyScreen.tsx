import React, { useState, useEffect, useRef } from 'react';
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
import { FamilyServices } from 'src/services/apiclient';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes';
import { COLORS, TEXTS } from 'src/constants';
import styles from './styles';
import BottomSheet from './BottomSheet';
import { Family } from 'src/interface/family/family';
import GuildLineImage from 'src/assets/icons/guideline-items.png';
import CalenderImage from 'src/assets/icons/calendar-scheduling.png';
import EducationImage from 'src/assets/icons/manage-eduction.png';
import ChatImage from 'src/assets/icons/chat-with-members.png';
import MemberImage from 'src/assets/icons/family-member.png';
import DeleteImage from 'src/assets/images/remove.png';
import HouseHoldImage from 'src/assets/icons/household-appliances.png';
import CheckListImage from 'src/assets/icons/checklist.png';
import NewsImage from 'src/assets/images/news.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { selectfamily } from 'src/redux/slices/FamilySlice';
import { AppDispatch } from 'src/redux/store';
import * as ImagePicker from 'expo-image-picker';
import { updateFamily } from 'src/redux/slices/FamilySlice';

const ViewFamilyScreen = ({ navigation, route }: ViewFamilyScreenProps) => {
  const { id_family } = route.params || {};
  const [family, setFamily] = useState<Family>();
  const bottomSheetRef = useRef<RBSheet>(null);
  const allMemberRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;
  let profile = useSelector(selectProfile);
  const [isUploadingImage, setIsUploadingImage] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()

  const handleGetFamily = async () => {
    try {
      const familyInfo = await FamilyServices.getFamily({ id_family });
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
              const result = await FamilyServices.deleteFamily({ id_family });
              Alert.alert('Success', 'Successfully deleted family');
            },
          },
        ],
        { cancelable: false },
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
      params: { id_family: id_family },
    });
  };

  const handleEducationPress = () => {
    navigation.navigate('Education', { id_family: id_family });
  };

  const handleCalendarPress = () => {
    navigation.navigate('CalendarStack', {
      screen: 'CalendarScreen',
      params: { id_family: id_family },
    });
  };


  const handleOpenAllMemberModal = (id_family: number) => {
    navigation.navigate('AllMember', { id_family: id_family });
  };

  const handleNavigateGuildLine = () => {
    navigation.navigate('GuildLine', { id_family: id_family });
  };

  const handleNavigateHouseHold = () => {
    navigation.navigate('HouseHold', { id_family: id_family });
  };

  const handleNavigateHouseHoldStack = () => {
    navigation.navigate('HouseHoldStack', {
      screen: 'HouseHoldScreen',
      params: { id_family: id_family },
    });
  }

  const handleNavigateChecklist = () => {
    // navigation.navigate('CheckList', { id_family: id_family });
    navigation.navigate('ShoppingListStack', {
      screen: 'ShoppingList',
      params: { id_family: id_family },
    });
  };

  const handleNavigateNews = () => {
    navigation.navigate('News');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetFamily();
    });
    return unsubscribe;
  }, [navigation]);

  const handleChangeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    console.log('image')
    console.log(result);

    if (!result.canceled) {
      const a = result.assets[0]!
      const uri = a.uri
      setIsUploadingImage(true)
      const fileUrl = await FamilyServices.changeAvatar(id_family, uri)
      dispatch(updateFamily({ ...family, avatar: fileUrl }))
      setIsUploadingImage(false)
      console.log("fileUrl", fileUrl)
      // setImage(result.assets[0].uri);
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/FamilyBG.png')}
      style={{ flex: 1 }}
      resizeMode="stretch">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} style={styles.backButton} />
          </TouchableOpacity>
          {family != null && (
            <Text style={styles.headerText}>{family.name}</Text>
          )}
          <View style={styles.headerIcon}>
            <TouchableOpacity onPress={handleOpenBottomSheet}>
              <Material name="pencil" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-col justify-center items-center pt-4 ">
          <TouchableOpacity style={styles.avatarButton} onPress={handleChangeAvatar}>

            <Image
              source={require('../../assets/images/family-1.jpg')}
              resizeMode="stretch"
              style={styles.imageContainer}
            />
            <View style={styles.editContainer}>
              <Icon name="add" size={30} style={styles.editIcon} />
            </View>
          </TouchableOpacity>

        </View>
        {family != null && (
          <ScrollView style={styles.scrollView}>
            <View className="">
              <View className="mt-2">
                <TouchableOpacity
                  onPress={() => handleOpenAllMemberModal(family!.id_family)}
                  style={styles.touchableOpacity}>
                  <ImageBackground
                    source={require('../../assets/images/family-item-bg-3.png')}
                    resizeMode="stretch"
                    style={styles.imageBackground}>
                    <View style={{ flex: 2 }}>
                      <Image
                        source={MemberImage}
                        style={styles.imageBackgroundIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.imageBackgroundTextContainer}>
                      <Text style={styles.imageBackgroundText}>
                        Members
                      </Text>
                      <Text style={styles.imageBackgroundDescription}>
                        View and manage family members
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleChatPress}
                style={styles.touchableOpacity}>
                <ImageBackground
                  source={require('../../assets/images/family-item-bg-2.png')}
                  resizeMode="stretch"
                  style={styles.imageBackground}>
                  <View style={{ flex: 2 }}>
                    <Image
                      source={ChatImage}
                      style={styles.imageBackgroundIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.imageBackgroundTextContainer}>
                    <Text style={styles.imageBackgroundText}>
                      Chat with members
                    </Text>
                    <Text style={styles.imageBackgroundDescription}>
                      Communicate easily with family members
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleEducationPress}
                style={styles.touchableOpacity}>
                <ImageBackground
                  source={require('../../assets/images/family-item-bg-1.png')}
                  resizeMode="stretch"
                  style={styles.imageBackground}>
                  <View style={{ flex: 2 }}>
                    <Image
                      source={EducationImage}
                      style={styles.imageBackgroundIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.imageBackgroundTextContainer}>
                    <Text style={styles.imageBackgroundText}>
                      Manage education
                    </Text>
                    <Text style={styles.imageBackgroundDescription}>
                      Monitor educational progress and activities
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCalendarPress}
                style={styles.touchableOpacity}>
                <ImageBackground
                  source={require('../../assets/images/family-item-bg-3.png')}
                  resizeMode="stretch"
                  style={styles.imageBackground}>
                  <View style={{ flex: 2 }}>
                    <Image
                      source={CalenderImage}
                      style={styles.imageBackgroundIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.imageBackgroundTextContainer}>
                    <Text style={styles.imageBackgroundText}>
                      Calendar scheduling
                    </Text>
                    <Text style={styles.imageBackgroundDescription}>
                      Organize family events and activities
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNavigateGuildLine}
                style={styles.touchableOpacity}>
                <ImageBackground
                  source={require('../../assets/images/family-item-bg-2.png')}
                  resizeMode="stretch"
                  style={styles.imageBackground}>
                  <View style={{ flex: 2 }}>
                    <Image
                      source={GuildLineImage}
                      style={styles.imageBackgroundIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.imageBackgroundTextContainer}>
                    <Text style={styles.imageBackgroundText}>GuildLine</Text>
                    <Text style={styles.imageBackgroundDescription}>
                      Provide guidelines for family activities
                    </Text>
                  </View>

                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNavigateHouseHoldStack}
                style={styles.touchableOpacity}>
                <ImageBackground
                  source={require('../../assets/images/family-item-bg-1.png')}
                  resizeMode="stretch"
                  style={styles.imageBackground}>
                  <View style={{ flex: 2 }}>
                    <Image
                      source={HouseHoldImage}
                      style={styles.imageBackgroundIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.imageBackgroundTextContainer}>
                    <Text style={styles.imageBackgroundText}>
                      Household appliances
                    </Text>
                    <Text style={styles.imageBackgroundDescription}>
                      Manage and optimize household devices
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNavigateChecklist}
                style={styles.touchableOpacity}>
                <ImageBackground
                  source={require('../../assets/images/family-item-bg-4.png')}
                  resizeMode="stretch"
                  style={styles.imageBackground}>


                  <View style={{ flex: 2 }}>
                    <Image
                      source={CheckListImage}
                      style={styles.imageBackgroundIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.imageBackgroundTextContainer}>
                    <Text style={styles.imageBackgroundText}>Checklist</Text>

                    <Text style={styles.imageBackgroundDescription}>
                      Create and manage family task lists
                    </Text>
                  </View>


                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNavigateNews}
                style={styles.touchableOpacity}>
                <ImageBackground
                  source={require('../../assets/images/family-item-bg-2.png')}
                  resizeMode="stretch"
                  style={styles.imageBackground}>
                  <View style={{ flex: 2 }}>
                    <Image
                      source={NewsImage}
                      style={styles.imageBackgroundIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.imageBackgroundTextContainer}>
                    <Text style={styles.imageBackgroundText}>News</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={screenHeight * 0.5}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <BottomSheet
          id_family={id_family}
          name={family?.name}
          description={family?.description}
        />

      </RBSheet>

    </ImageBackground>
  );
};

export default ViewFamilyScreen;


