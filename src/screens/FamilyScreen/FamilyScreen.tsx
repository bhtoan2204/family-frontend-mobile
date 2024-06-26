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
  ActivityIndicator,
  TouchableOpacityBase,
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
import {useDispatch, useSelector} from 'react-redux';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {selectfamily} from 'src/redux/slices/FamilySlice';
import {AppDispatch} from 'src/redux/store';
import * as ImagePicker from 'expo-image-picker';
import {updateFamily} from 'src/redux/slices/FamilySlice';
import FamilyListModal from './FamilyList';
import {Member} from 'src/interface/member/member';
import {MaterialIcons} from '@expo/vector-icons';

const ViewFamilyScreen = ({navigation, route}: ViewFamilyScreenProps) => {
  const [family, setFamily] = useState<Family>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bottomSheetRef = useRef<RBSheet>(null);
  const allMemberRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;
  let profile = useSelector(selectProfile);
  const [isUploadingImage, setIsUploadingImage] =
    React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [families, setFamilies] = useState<Family[]>([]);
  const [membersMap, setMembersMap] = useState<{[key: number]: Member[]}>({});
  const source =
    family?.avatar && family.avatar !== '[NULL]'
      ? {uri: family.avatar}
      : require('../../assets/images/default_ava.png');

  useEffect(() => {
    const fetchFamiliesAndMembers = async () => {
      try {
        const allFamilies = await FamilyServices.getAllFamily();
        setFamily(allFamilies[0]);

        const membersObject: {[key: number]: Member[]} = {};

        for (const family of allFamilies) {
          const members = await FamilyServices.getAllMembers({
            id_family: family.id_family,
          });
          membersObject[family.id_family] = members;
        }
        setFamilies(allFamilies);
        setMembersMap(membersObject);
      } catch (error) {
        console.error('Error fetching families or members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFamiliesAndMembers();
  }, []);

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
      params: {id_family: family!.id_family},
    });
  };

  const handleEducationPress = () => {
    navigation.navigate('Education', {id_family: family!.id_family});
  };

  const handleCalendarPress = () => {
    navigation.navigate('CalendarStack', {
      screen: 'CalendarScreen',
      params: {id_family: family!.id_family},
    });
  };

  const handleOpenAllMemberModal = (id_family: number) => {
    navigation.navigate('AllMember', {id_family: id_family});
  };

  const handleNavigateGuildLine = () => {
    navigation.navigate('GuildLine', {id_family: family!.id_family});
  };

  const handleNavigateHouseHold = () => {
    navigation.navigate('HouseHold', {id_family: family!.id_family});
  };

  const handleNavigateChecklist = () => {
    navigation.navigate('CheckList', {id_family: family!.id_family});
  };

  const handleSelectFamily = (id_family: number) => {
    //navigation.navigate('ViewFamilyScreen', { id_family });
  };

  const handleChangeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const a = result.assets[0]!;
      const uri = a.uri;
      setIsUploadingImage(true);
      const fileUrl = await FamilyServices.changeAvatar(family!.id_family, uri);
      console.log(fileUrl);
      //dispatch(updateFamily({ ...family!, avatar: fileUrl }))
      setIsUploadingImage(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCloseModal = (family: Family) => {
    setFamily(family);
    setIsDropdownVisible(false);
  };

  if (isLoading || family === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return (
    // <ImageBackground
    //   source={require('../../assets/images/FamilyBG.png')}
    //   style={{ flex: 1 }}
    //   resizeMode="stretch">
    //   <SafeAreaView style={{ flex: 1 }}>
    // <View style={styles.headerContainer}>
    //   <TouchableOpacity onPress={() => navigation.goBack()}>
    //     <Icon name="arrow-back" size={28} style={styles.backButton} />
    //   </TouchableOpacity>
    //   {family != null && (
    //     <TouchableOpacity onPress={toggleDropdown}>
    //       <Text style={styles.headerText}>{family.name}</Text>
    //     </TouchableOpacity>
    //   )}
    //   <View style={styles.headerIcon}>
    //     <TouchableOpacity onPress={handleOpenBottomSheet}>
    //       <Material name="pencil" size={24} color="white" />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    // <FamilyListModal visible={isDropdownVisible} onClose={handleCloseModal}  families={families} membersMap={membersMap} selectedFamily={family}/>

    //     <View className="flex-col justify-center items-center pt-4 ">
    //       <TouchableOpacity style={styles.avatarButton} onPress={handleChangeAvatar}>
    //         <Image
    //           source={source}
    //           resizeMode="stretch"
    //           style={styles.imageContainer}
    //         />
    //         <View style={styles.editContainer}>
    //           <Icon name="add" size={30}  style={styles.editIcon} />
    //         </View>
    //       </TouchableOpacity>

    //     </View>
    //     {family != null && (
    //       <ScrollView style={styles.scrollView}>
    //         <View className="">
    //           <View className="mt-2">
    //             <TouchableOpacity
    //               onPress={() => handleOpenAllMemberModal(family.id_family)}
    //               style={styles.touchableOpacity}>
    //               <ImageBackground
    //                 source={require('../../assets/images/family-item-bg-3.png')}
    //                 resizeMode="stretch"
    //                 style={styles.imageBackground}>
    //                 <View style={{ flex: 2 }}>
    //                   <Image
    //                     source={MemberImage}
    //                     style={styles.imageBackgroundIcon}
    //                     resizeMode="contain"
    //                   />
    //                 </View>
    //                 <View style={styles.imageBackgroundTextContainer}>
    //                   <Text style={styles.imageBackgroundText}>
    //                     Members
    //                   </Text>
    //                   <Text style={styles.imageBackgroundDescription}>
    //                     View and manage family members
    //                   </Text>
    //                 </View>
    //               </ImageBackground>
    //             </TouchableOpacity>
    //           </View>

    //           <TouchableOpacity
    //             onPress={handleChatPress}
    //             style={styles.touchableOpacity}>
    //             <ImageBackground
    //               source={require('../../assets/images/family-item-bg-2.png')}
    //               resizeMode="stretch"
    //               style={styles.imageBackground}>
    //               <View style={{ flex: 2 }}>
    //                 <Image
    //                   source={ChatImage}
    //                   style={styles.imageBackgroundIcon}
    //                   resizeMode="contain"
    //                 />
    //               </View>
    //               <View style={styles.imageBackgroundTextContainer}>
    //                 <Text style={styles.imageBackgroundText}>
    //                   Chat with members
    //                 </Text>
    //                 <Text style={styles.imageBackgroundDescription}>
    //                   Communicate easily with family members
    //                 </Text>
    //               </View>
    //             </ImageBackground>
    //           </TouchableOpacity>

    //           <TouchableOpacity
    //             onPress={handleEducationPress}
    //             style={styles.touchableOpacity}>
    //             <ImageBackground
    //               source={require('../../assets/images/family-item-bg-1.png')}
    //               resizeMode="stretch"
    //               style={styles.imageBackground}>
    //               <View style={{ flex: 2 }}>
    //                 <Image
    //                   source={EducationImage}
    //                   style={styles.imageBackgroundIcon}
    //                   resizeMode="contain"
    //                 />
    //               </View>
    //               <View style={styles.imageBackgroundTextContainer}>
    //                 <Text style={styles.imageBackgroundText}>
    //                   Manage education
    //                 </Text>
    //                 <Text style={styles.imageBackgroundDescription}>
    //                   Monitor educational progress and activities
    //                 </Text>
    //               </View>
    //             </ImageBackground>
    //           </TouchableOpacity>

    //           <TouchableOpacity
    //             onPress={handleCalendarPress}
    //             style={styles.touchableOpacity}>
    //             <ImageBackground
    //               source={require('../../assets/images/family-item-bg-3.png')}
    //               resizeMode="stretch"
    //               style={styles.imageBackground}>
    //               <View style={{ flex: 2 }}>
    //                 <Image
    //                   source={CalenderImage}
    //                   style={styles.imageBackgroundIcon}
    //                   resizeMode="contain"
    //                 />
    //               </View>
    //               <View style={styles.imageBackgroundTextContainer}>
    //                 <Text style={styles.imageBackgroundText}>
    //                   Calendar scheduling
    //                 </Text>
    //                 <Text style={styles.imageBackgroundDescription}>
    //                   Organize family events and activities
    //                 </Text>
    //               </View>
    //             </ImageBackground>
    //           </TouchableOpacity>

    //           <TouchableOpacity
    //             onPress={handleNavigateGuildLine}
    //             style={styles.touchableOpacity}>
    //             <ImageBackground
    //               source={require('../../assets/images/family-item-bg-2.png')}
    //               resizeMode="stretch"
    //               style={styles.imageBackground}>
    //               <View style={{ flex: 2 }}>
    //                 <Image
    //                   source={GuildLineImage}
    //                   style={styles.imageBackgroundIcon}
    //                   resizeMode="contain"
    //                 />
    //               </View>
    //               <View style={styles.imageBackgroundTextContainer}>
    //                 <Text style={styles.imageBackgroundText}>GuildLine</Text>
    //                 <Text style={styles.imageBackgroundDescription}>
    //                   Provide guidelines for family activities
    //                 </Text>
    //               </View>

    //             </ImageBackground>
    //           </TouchableOpacity>

    //           <TouchableOpacity
    //             onPress={handleNavigateHouseHold}
    //             style={styles.touchableOpacity}>
    //             <ImageBackground
    //               source={require('../../assets/images/family-item-bg-1.png')}
    //               resizeMode="stretch"
    //               style={styles.imageBackground}>
    //               <View style={{ flex: 2 }}>
    //                 <Image
    //                   source={HouseHoldImage}
    //                   style={styles.imageBackgroundIcon}
    //                   resizeMode="contain"
    //                 />
    //               </View>
    //               <View style={styles.imageBackgroundTextContainer}>
    //                 <Text style={styles.imageBackgroundText}>
    //                   Household appliances
    //                 </Text>
    //                 <Text style={styles.imageBackgroundDescription}>
    //                   Manage and optimize household devices
    //                 </Text>
    //               </View>
    //             </ImageBackground>
    //           </TouchableOpacity>

    //           <TouchableOpacity
    //             onPress={handleNavigateChecklist}
    //             style={styles.touchableOpacity}>
    //             <ImageBackground
    //               source={require('../../assets/images/family-item-bg-4.png')}
    //               resizeMode="stretch"
    //               style={styles.imageBackground}>

    //               <View style={{ flex: 2 }}>
    //                 <Image
    //                   source={CheckListImage}
    //                   style={styles.imageBackgroundIcon}
    //                   resizeMode="contain"
    //                 />
    //               </View>
    //               <View style={styles.imageBackgroundTextContainer}>
    //                 <Text style={styles.imageBackgroundText}>Checklist</Text>

    //                 <Text style={styles.imageBackgroundDescription}>
    //                   Create and manage family task lists
    //                 </Text>
    //               </View>

    //             </ImageBackground>
    //           </TouchableOpacity>

    //         </View>
    //       </ScrollView>
    //     )}
    //   </SafeAreaView>
    //   <RBSheet
    //       ref={bottomSheetRef}
    //       closeOnDragDown={true}
    //       height={screenHeight * 0.5}
    //       customStyles={{
    //         container: {
    //           borderTopLeftRadius: 20,
    //           borderTopRightRadius: 20,
    //         },
    //       }}>
    //         <BottomSheet
    //         id_family={family!.id_family}
    //         name={family?.name}
    //         description={family?.description}
    //         />

    //   </RBSheet>

    // </ImageBackground>

    <View style={{position: 'relative'}}>
      <Image
        source={require('../../assets/images/header-family.png')}
        resizeMode="stretch"
        style={{width: '100%', height: 220, alignSelf: 'center'}}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 220, // Match the height of the Image or adjust as needed
          paddingTop: 60,
          padding: 10,
        }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="chevron-left"
              size={40}
              style={styles.backButton}
            />
          </TouchableOpacity>
          {family != null && (
            <TouchableOpacity
              onPress={toggleDropdown}
              style={{
                flexDirection: 'row',
                marginLeft: 15,
                alignItems: 'center',
              }}>
              <Text style={styles.headerText}>{family.name}</Text>
              <MaterialIcons
                name="arrow-drop-down"
                size={30}
                style={styles.backButton}
              />
            </TouchableOpacity>
          )}
          <View style={styles.headerIcon}>
            <TouchableOpacity onPress={handleOpenBottomSheet}>
              <Material name="pencil" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <FamilyListModal
          visible={isDropdownVisible}
          onClose={handleCloseModal}
          families={families}
          membersMap={membersMap}
          selectedFamily={family}
        />
        <View>
          <Image
            source={require('../../assets/images/family-avatar.jpg')}
            resizeMode="cover"
            style={{
              width: 219,
              height: 145,
              alignSelf: 'center',
              borderRadius: 20,
              borderWidth: 3,
              borderColor: 'white',
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 120,
              right: 80,
              backgroundColor: '#2a475ee8',
              padding: 5,
              borderRadius: 20,
            }}
            onPress={handleChangeAvatar}>
            <MaterialIcons name="camera-alt" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewFamilyScreen;
