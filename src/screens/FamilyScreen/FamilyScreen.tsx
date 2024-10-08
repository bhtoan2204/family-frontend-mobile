import React, {useState, useEffect, useRef, useMemo} from 'react';
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
import {MaterialIcons} from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectSelectedFamily,
  selectFamilies,
  selectFamilyMembers,
  setSelectedFamily,
  setFamilies,
  setFamilyMembers,
  updateFamily,
} from 'src/redux/slices/FamilySlice';
import {AppDispatch} from 'src/redux/store';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from './BottomSheet';
import FamilyListModal from './FamilyList';
import OptionsModal from './OptionModal';
import {FamilyServices, PackageServices} from 'src/services/apiclient';
import {ViewFamilyScreenProps} from 'src/navigation/NavigationTypes';
import {COLORS} from 'src/constants';
import styles from './styles';
import {Family} from 'src/interface/family/family';
import {Member} from 'src/interface/member/member';
import * as ImagePicker from 'expo-image-picker';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {Service} from 'src/interface/package/mainPackage';
import {Toast} from 'react-native-toast-notifications';
import {setExtraPackages} from 'src/redux/slices/FunctionSlice';

const cards = [
  {
    id: 1,
    title: 'Members',
    detail: 'Manage family members',
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
    detail: 'Organize events and activities',
    icon: require('../../assets/icons/calendar-scheduling.png'),
  },
  {
    id: 5,
    title: 'Guideline',
    detail: 'Provides for family activities',
    icon: require('../../assets/icons/guideline-items.png'),
  },
  {
    id: 6,
    title: 'Household',
    detail: 'Optimize household devices',
    icon: require('../../assets/icons/household-appliances.png'),
  },
  {
    id: 7,
    title: 'Check List',
    detail: 'Manage family task lists',
    icon: require('../../assets/icons/checklist.png'),
  },
  {
    id: 8,
    title: 'Shopping',
    detail: 'Organize and track groceries',
    icon: require('../../assets/icons/shopping-list.png'),
  },
];

const ViewFamilyScreen = ({navigation, route}: ViewFamilyScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bottomSheetRef = useRef<RBSheet>(null);
  const allMemberRef = useRef<RBSheet>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const families = useSelector(selectFamilies);
  const selectedFamily = useSelector(selectSelectedFamily);
  const membersMap = useSelector(selectFamilyMembers);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const screenHeight = Dimensions.get('screen').height;
  const secondBottomSheetRef = useRef<RBSheet>(null);
  const color = useThemeColors();
  const translate = useSelector(getTranslate);
  const source =
    selectedFamily?.avatar && selectedFamily.avatar !== '[NULL]'
      ? {uri: selectedFamily.avatar}
      : require('../../assets/images/big-family_4441180.png');
  const [functions, setFunctions] = useState<Service[]>([]);

  useEffect(() => {
    console.log(selectedFamily);
  }, []);

  useEffect(() => {
    if (secondBottomSheetRef.current) {
      secondBottomSheetRef.current.open();
    }
  }, []);

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

  const fetchFunction = async () => {
    try {
      const data = await PackageServices.getAvailableFunction(
        selectedFamily?.id_family,
      );
      setFunctions(data);
      dispatch(setExtraPackages(data));
    } catch (error) {
      console.log(error);
    }
  };

  const memoizedFetchFunction = useMemo(
    () => fetchFunction,
    [selectedFamily?.id_family],
  );

  useEffect(() => {
    memoizedFetchFunction();
  }, [memoizedFetchFunction]);
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
          console.log(fileUrl);
          if (fileUrl) {
            dispatch(updateFamily({...selectedFamily!, avatar: fileUrl}));
            Toast.show(translate('Family avatar changed successfully'), {
              type: 'success',
              duration: 3000,
            });
          }
        } catch (error) {
          //console.error('Error updating avatar:', error);
          Toast.show(translate('Failed to change family avatar.'), {
            type: 'danger',
            duration: 3000,
          });
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
          params: {id_family: selectedFamily!.id_family},
        });
        break;
      case 2:
        navigation.navigate('ChatStack', {
          screen: 'ChatFamily',
          params: {id_family: selectedFamily!.id_family},
        });
        break;
      case 3:
        navigation.navigate('EducationStack', {
          screen: 'EducationScreen',
          params: {id_family: selectedFamily!.id_family},
        });
        break;
      case 4:
        navigation.navigate('CalendarStack', {
          screen: 'CalendarScreen',
          params: {id_family: selectedFamily!.id_family},
        });
        break;
      case 5:
        navigation.navigate('GuidelineStack', {
          screen: 'GuildLine',
          params: {id_family: selectedFamily!.id_family},
        });
        break;
      case 6:
        navigation.navigate('HouseHoldStack', {
          screen: 'HouseHoldScreen',
          params: {id_family: selectedFamily!.id_family},
        });
        break;
      case 7:
        console.log(selectedFamily!.id_family);
        navigation.navigate('TodoListStack', {
          screen: 'TodoList',
          params: {id_family: selectedFamily!.id_family},
        });
        break;
      case 8:
        navigation.navigate('ShoppingListStack', {
          screen: 'ShoppingList',
          params: {id_family: selectedFamily!.id_family},
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
      <View
        style={[styles.loadingContainer, {backgroundColor: color.background}]}>
        <ActivityIndicator size="large" color={COLORS.Rhino} />
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
      navigation.navigate('HomeTab', {screen: 'HomeScreen'});
      Toast.show(translate('Leave family successfully'), {
        type: 'success',
        duration: 3000,
      });
    } catch (error: any) {
      //console.error('Leave family failed:', error);
      Toast.show(translate('Fail to leave family'), {
        type: 'danger',
        duration: 3000,
      });
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
      {cancelable: true},
    );
  };

  return (
    <View style={{position: 'relative', backgroundColor: '#fdfdfd'}}>
      <View
        style={{
          width: screenHeight,
          height: 300,
          alignSelf: 'center',
          top: 0,
          position: 'relative',
        }}>
        <Image
          source={source}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />
      </View>
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
      </View>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: color.background,
          bottom: 20,
        }}>
        <Text
          style={{
            color: color.text,
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
            paddingVertical: 20,
          }}>
          {selectedFamily.description}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View style={styles.container}>
            {cards.map(card => {
              const availableFunctions = functions || [];

              const isFunctionAvailable = availableFunctions.some(
                func => func.name === card.title,
              );

              const hasShoppingAndChecklist = availableFunctions.some(
                func => func.name === 'Calendar' && card.title === 'Check List',
              );

              if (
                card.title === 'Members' ||
                isFunctionAvailable ||
                hasShoppingAndChecklist
              ) {
                return (
                  <TouchableOpacity
                    key={card.id}
                    onPress={() => handlePress(card.id)}
                    style={[styles.card, {backgroundColor: color.card}]}>
                    <Text style={[styles.title, {color: color.text}]}>
                      {translate(card.title)}
                    </Text>
                    <Text style={[styles.detail, {color: color.textSubdued}]}>
                      {translate(card.detail)}
                    </Text>
                    <Image source={card.icon} style={styles.icon} />
                  </TouchableOpacity>
                );
              }

              return null;
            })}
          </View>
          <View style={{height: 600}}></View>
        </ScrollView>
      </View>
      <OptionsModal
        visible={isOptionsModalVisible}
        onClose={closeOptionsModal}
        onEditFamily={handleEditFamily}
        onLeaveFamily={handleLeaveFamily}
        onChangeAvatar={handleChangeAvatar}
      />
      <RBSheet
        ref={secondBottomSheetRef}
        closeOnDragDown={false}
        height={screenHeight * 0.7}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: screenHeight,
            backgroundColor: 'transparent',
          },
        }}>
        {/* <TouchableOpacity
          style={styles.cancel}
          onPress={() => secondBottomSheetRef.current.close()}>
          <Image
            source={require('../../assets/images/Cancel.png')}
            resizeMode="stretch"
            style={styles.cancelImage}
          />
        </TouchableOpacity> */}
        <Image
          source={require('../../assets/images/poster.png')}
          resizeMode="stretch"
          style={styles.fullScreenImage}
        />
        <TouchableOpacity
          style={styles.explore}
          onPress={() => secondBottomSheetRef.current?.close()}>
          <Image
            source={require('../../assets/images/explore.png')}
            resizeMode="stretch"
            style={styles.exploreImage}
          />
        </TouchableOpacity>
      </RBSheet>
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
