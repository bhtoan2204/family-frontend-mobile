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
  Animated,
  Easing,
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
import {selectfamily, setForFamily} from 'src/redux/slices/FamilySlice';
import {AppDispatch} from 'src/redux/store';
import * as ImagePicker from 'expo-image-picker';
import {updateFamily} from 'src/redux/slices/FamilySlice';
import FamilyListModal from './FamilyList';
import {Member} from 'src/interface/member/member';
import {MaterialIcons} from '@expo/vector-icons';

const cards = [
  {
    id: 1,
    title: 'Members',
    detail: 'Manage family members.',
    icon: require('../../assets/icons/family-member.png'),
  },
  {
    id: 2,
    title: 'Chats',
    detail: 'Communicate with family members.',
    icon: require('../../assets/icons/chat-with-members.png'),
  },
  {
    id: 3,
    title: 'Education',
    detail: 'Monitor educational progress',
    icon: require('../../assets/icons/manage-eduction.png'),
  },
  {
    id: 4,
    title: 'Calendar',
    detail: 'Organize events and activities.',
    icon: require('../../assets/icons/calendar-scheduling.png'),
  },
  {
    id: 5,
    title: 'Guideline',
    detail: 'Provides for family activities.',
    icon: require('../../assets/icons/guideline-items.png'),
  },
  {
    id: 6,
    title: 'Household',
    detail: 'Optimize household devices.',
    icon: require('../../assets/icons/household-appliances.png'),
  },
  {
    id: 7,
    title: 'Check List',
    detail: 'Manage family task lists.',
    icon: require('../../assets/icons/checklist.png'),
  },
];

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
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const shakeAnimationX = new Animated.Value(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const source =
    family?.avatar && family.avatar !== '[NULL]'
      ? {uri: family.avatar}
      : require('../../assets/images/default_ava.png');

  const fetchFamiliesAndMembers = async () => {
    try {
      const allFamilies = await FamilyServices.getAllFamily();
      setFamily(allFamilies[0]);
      setFamilies(allFamilies);

      dispatch(setForFamily(allFamilies[0]));

      const membersObject: {[key: number]: Member[]} = {};

      for (const family of allFamilies) {
        const members = await FamilyServices.getAllMembers({
          id_family: family.id_family,
        });
        membersObject[family.id_family] = members;
        setMembersMap(membersObject);
      }
    
      
    } catch (error) {
      console.error('Error fetching families or members:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    
    fetchFamiliesAndMembers();
  },[]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: -5,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 15,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(shakeAnimationX, {
          toValue: 10,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationX, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationX, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      },
    );

    animation.start();
    return () => animation.stop();
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
    navigation.navigate('FamilyStack', {screen: 'Education',params: {id_family: family!.id_family}});
  };

  const handleCalendarPress = () => {
    navigation.navigate('CalendarStack', {
      screen: 'CalendarScreen',
      params: {id_family: family!.id_family},
    });
  };

  const handleOpenAllMemberModal = (id_family: number) => {
    navigation.navigate('FamilyStack', {screen: 'AllMember',params: {id_family: family!.id_family}});
  };

  const handleNavigateGuildLine = () => {
    navigation.navigate('FamilyStack', {screen: 'GuildLine',params: {id_family: family!.id_family}});
  };

  const handleNavigateHouseHold = () => {
    navigation.navigate('FamilyStack', {screen: 'HouseHold', params: {id_family: family!.id_family}});
  };

  const handleNavigateChecklist = () => {
    navigation.navigate('FamilyStack', {screen: 'CheckList',params: {id_family: family!.id_family}});
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
    setIsDropdownOpen(!isDropdownOpen);
    Animated.timing(rotateAnimation, {
      toValue: isDropdownOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = (family: Family) => {
    setFamily(family);
    setIsDropdownVisible(false);
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePress = (cardId: number) => {
    switch (cardId) {
      case 1:
        handleOpenAllMemberModal(family.id_family);
        break;
      case 2:
        handleChatPress();
        break;
      case 3:
        handleEducationPress();
        break;
      case 4:
        handleCalendarPress();
        break;
      case 5:
        handleNavigateGuildLine();
        break;
      case 6:
        handleNavigateHouseHold();
        break;
      case 7:
        handleNavigateChecklist();
        break;
    }
  };

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  if (isLoading || family === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return (
    <View style={{position: 'relative', backgroundColor: '#fdfdfd'}}>
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
              <Animated.View style={{transform: [{rotate}]}}>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={30}
                  style={styles.backButton}
                />
              </Animated.View>
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
            //source={require('../../assets/images/family-avatar.jpg')}
            source={source}
            resizeMode="cover"
            style={{
              width: 219 + 30,
              height: 145 + 30,
              alignSelf: 'center',
              borderRadius: 20,
              borderWidth: 3,
              borderColor: 'white',
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 120 + 30,
              right: 60,
              backgroundColor: '#2a475ee8',
              padding: 5,
              borderRadius: 20,
            }}
            onPress={handleChangeAvatar}>
            <MaterialIcons name="camera-alt" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          color: COLORS.Rhino,
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center',
          top: 90,
          paddingVertical: 20,
        }}>
        A group of sailors on the Red Sea
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{top: 120}}>
        {/* <Image
          source={require('../../assets/images/family-today-event.png')}
          resizeMode="cover"
          style={{
            width: 324,
            height: 217,
            alignSelf: 'center',
          }}
        />
        <Animated.Image
          source={require('../../assets/images/clock.png')}
          resizeMode="cover"
          style={{
            width: 62.16,
            height: 69.88,
            alignSelf: 'center',
            marginTop: 80,
            bottom: 200,
            left: 15,
            transform: [
              {translateY: shakeAnimation},
              {translateX: shakeAnimationX},
            ],
          }}
        /> */}
        <View style={styles.container}>
          {cards.map(card => (
            <TouchableOpacity
              key={card.id}
              onPress={() => handlePress(card.id)}
              style={styles.card}>
              <Text style={styles.title}>{card.title}</Text>
              <Text style={styles.detail}>{card.detail}</Text>
              <Image source={card.icon} style={styles.icon} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{height: 480}}></View>
      </ScrollView>
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
          id_family={family!.id_family}
          name={family?.name}
          description={family?.description}
        />
      </RBSheet>
    </View>
  );
};

export default ViewFamilyScreen;
