import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Animated,
  Easing,
  Alert,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedFamily,
  selectFamilies,
  selectFamilyMembers,
  setSelectedFamily,
  setFamilies,
  setFamilyMembers,
  updateFamily,
  
} from 'src/redux/slices/FamilySlice';
import { AppDispatch } from 'src/redux/store';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from './BottomSheet';
import FamilyListModal from './FamilyList';
import OptionsModal from './OptionModal';
import { FamilyServices, PackageServices } from 'src/services/apiclient';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes';
import { COLORS } from 'src/constants';
import styles from './styles';
import { Family } from 'src/interface/family/family';
import { Member } from 'src/interface/member/member';
import * as ImagePicker from 'expo-image-picker';
import { Service } from 'src/interface/package/mainPackage';

const cards = [
  {
    id: 1,
    title: 'Members',
    detail: 'Manage family members.',
    icon: require('../../assets/icons/family-member.png'),
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
  {
    id: 8,
    title: 'Shopping',
    detail: 'Organize and track groceries.',
    icon: require('../../assets/icons/shopping-list.png'),
  },
];

const ViewFamilyScreen = ({ navigation, route }: ViewFamilyScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bottomSheetRef = useRef<RBSheet>(null);
  const allMemberRef = useRef<RBSheet>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const families = useSelector(selectFamilies);
  const selectedFamily = useSelector(selectSelectedFamily);
  const [membersMap, setMembersMap] = useState<{ [key: number]: Member[] }>({});
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const screenHeight = Dimensions.get('screen').height;
  const [functions, setFunctions] = useState<Service[]>([]);
  const source =
    selectedFamily?.avatar && selectedFamily.avatar !== '[NULL]'
      ? { uri: selectedFamily.avatar }
      : require('../../assets/images/default_ava.png');


      const fetchFunction = async () => {
        try {
          const data = await PackageServices.getAvailableFunction(selectedFamily?.id_family);
          setFunctions(data);
        } catch (error) {
          console.log(error);
        }
      };
      
      const memoizedFetchFunction = useMemo(() => fetchFunction, [selectedFamily?.id_family]);
      
      useEffect(() => {
        memoizedFetchFunction();
      }, [memoizedFetchFunction]);
      

  useEffect(() => {
    fetchFamiliesAndMembers();
  }, []);
  const fetchFamiliesAndMembers = async () => {
    setIsLoading(true);
    try {
      const allFamilies = await FamilyServices.getAllFamily();

      dispatch(setFamilies(allFamilies));

      if (allFamilies.length > 0) {
        const initialFamily = allFamilies[0];
        dispatch(setSelectedFamily(initialFamily));
      }

      const membersObject = {};

      for (let i = 0; i < allFamilies.length; i++) {
        const family = allFamilies[i];
        const members = await FamilyServices.getAllMembers({
          id_family: family.id_family,
        });
        membersObject[family.id_family] = members;
        setMembersMap(membersObject);
      }

      dispatch(setFamilyMembers(membersObject));
    } catch (error) {
      console.error('Error fetching families or members:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 400,
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

  const handleChangeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (uri) {
        try {
          setIsLoading(true);
          const fileUrl = await FamilyServices.changeAvatar(
            selectedFamily!.id_family,
            uri,
          );
          dispatch(updateFamily({ ...selectedFamily!, avatar: fileUrl }));
        } catch (error) {
          console.error('Error updating avatar:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    Animated.timing(rotateAnimation, {
      toValue: isDropdownVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = (family: Family) => {
    dispatch(setSelectedFamily(family));
    setIsDropdownVisible(false);
    Animated.timing(rotateAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (cardId: number) => {
    switch (cardId) {
      case 1:
        navigation.navigate('FamilyStack', {
          screen: 'AllMember',
          params: { id_family: selectedFamily!.id_family },
        });
        break;
      case 2:
        navigation.navigate('ChatStack', {
          screen: 'ChatFamily',
          params: { id_family: selectedFamily!.id_family },
        });
        break;
      case 3:
        navigation.navigate('EducationStack', {
          screen: 'EducationScreen',
          params: { id_family: selectedFamily!.id_family },
        });
        break;
      case 4:
        navigation.navigate('CalendarStack', {
          screen: 'CalendarScreen',
          params: { id_family: selectedFamily!.id_family },
        });
        break;
      case 5:
        navigation.navigate('FamilyStack', {
          screen: 'GuildLine',
          params: { id_family: selectedFamily!.id_family },
        });
        break;
      case 6:
        navigation.navigate('HouseHoldStack', {
          screen: 'HouseHoldScreen',
          params: { id_family: selectedFamily!.id_family },
        });
        break;
      case 7:
        navigation.navigate('TodoListStack', {
          screen: 'TodoList',
          params: { id_family: selectedFamily!.id_family },
        });
        break;
      case 8:
        console.log(selectedFamily!.id_family)
        navigation.navigate('ShoppingListStack', {
          screen: 'ShoppingList',
          params: { id_family: selectedFamily!.id_family },
        });
        break;
    }
  };

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  if (isLoading || !selectedFamily) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const closeOptionsModal = () => {
    setIsOptionsModalVisible(false);
  };

  const handleEditFamily = () => {
    setIsOptionsModalVisible(false);
    bottomSheetRef.current?.open();
  };

  const leaveFamily = async () => {
    try {
      await FamilyServices.leaveFamily(selectedFamily!.id_family);
      navigation.navigate('HomeTab', { screen: 'HomeScreen' });
    } catch (error: any) {
      console.error('Leave family failed:', error);
    }
  };

  const handleLeaveFamily = () => {
    setIsOptionsModalVisible(false);
    Alert.alert(
      'Leave Family',
      'Are you sure you want to leave this family?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          onPress: leaveFamily,
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={{ position: 'relative', backgroundColor: '#fdfdfd' }}>
      <Image
        source={require('../../assets/images/header-family.png')}
        resizeMode="stretch"
        style={{ width: '100%', height: 220, alignSelf: 'center' }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 220,
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
          {selectedFamily != null && (
            <TouchableOpacity
              onPress={toggleDropdown}
              style={{
                flexDirection: 'row',
                marginLeft: 15,
                alignItems: 'center',
              }}>
              <Text style={styles.headerText}>{selectedFamily.name}</Text>
              <Animated.View style={{ transform: [{ rotate }] }}>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={30}
                  style={styles.backButton}
                />
              </Animated.View>
            </TouchableOpacity>
          )}
          <View style={styles.headerIcon}>
            <TouchableOpacity onPress={() => setIsOptionsModalVisible(true)}>
              <Feather name="more-vertical" color={COLORS.white} size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <FamilyListModal
          visible={isDropdownVisible}
          onClose={handleCloseModal}
          families={families}
          membersMap={membersMap}
          selectedFamily={selectedFamily}
        />
        <View>
          <Image
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
        {selectedFamily.description}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{ top: 120 }}>
   
        <View style={styles.container}>
        {cards.map(card => {
              const isFunctionAvailable = functions.some(func => func.name === card.title);
              const hasShoppingAndChecklist = functions.some(
                func => func.name === 'Calendar' && card.title === 'Check List'
              );

              if (isFunctionAvailable || card.title === 'Members' || hasShoppingAndChecklist) {
                return (
                  <TouchableOpacity
                    key={card.id}
                    onPress={() => handlePress(card.id)}
                    style={styles.card}>
                    <Text style={styles.title}>{card.title}</Text>
                    <Text style={styles.detail}>{card.detail}</Text>
                    <Image source={card.icon} style={styles.icon} />
                  </TouchableOpacity>
                );
              }

              return null;
            })}


        </View>
        <View style={{ height: 480 }}></View>
      </ScrollView>
      <OptionsModal
        visible={isOptionsModalVisible}
        onClose={closeOptionsModal}
        onEditFamily={handleEditFamily}
        onLeaveFamily={handleLeaveFamily}
      />
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
          id_family={selectedFamily!.id_family}
          name={selectedFamily?.name}
          description={selectedFamily?.description}
        />
      </RBSheet>
    </View>
  );
};

export default ViewFamilyScreen;
