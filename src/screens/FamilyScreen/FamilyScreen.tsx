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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FamilyServices} from 'src/services/apiclient';
import {ViewFamilyScreenProps} from 'src/navigation/NavigationTypes';
import {COLORS, TEXTS} from 'src/constants';
import styles from './styles';
import BottomSheet from './BottomSheet';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

type Family = {
  id_family: number;
  quantity: number;
  description: string;
  name: string;
};

const ViewFamilyScreen = ({navigation, route}: ViewFamilyScreenProps) => {
  const {id_user, id_family} = route.params || {};
  const [family, setFamily] = useState<Family[]>([]);
  const bottomSheetRef = useRef<RBSheet>(null);
  const allMemberRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const buttons = ['Members', 'Calendar', 'Education'];

  const handleGetFamily = async () => {
    try {
      const familyInfo = await FamilyServices.getFamily({id_family});
      setFamily(familyInfo);
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
  const handleEducationPress = () => {};
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetFamily();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerfile}>
        <TouchableOpacity style={styles.circle}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            //color="#56409e"
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circle}>
          <Material
            name="bell-badge-outline"
            size={30}
            //color="#56409e"
            color="#fff"
          />
        </TouchableOpacity>
        {/* <View style={styles.headerfile}>
          <TouchableOpacity
            onPress={handleOpenBottomSheet}
            style={styles.settingItem}>
            <Material name="pencil" size={24} color="black" />
            <Text style={styles.settingText}>Edit Family</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.container}>
        {family.map((item: Family) => (
          <View key={item.id_family} style={styles.cardContainer}>
            <Image
              source={{
                uri: 'https://pethouse.com.vn/wp-content/uploads/2023/06/meo-anh-long-ngan-833x800.jpg',
              }}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>Family: {item.name}</Text>
              <Text style={styles.text}>Quantity: {item.quantity}</Text>
              <Text style={styles.text}>Description: {item.description}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.functionContainer}>
        <View
          // style={{
          //   flexDirection: 'row',
          //   justifyContent: 'space-around',
          //   marginTop: 0,
          // }}
          style={styles.menuContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedButton(index)}
              style={{
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                paddingRight: 30,
                paddingLeft: 10,
              }}>
              {selectedButton === index ? (
                <LinearGradient
                  colors={['#724DC9', '#5E4ABE', '#4748B2']}
                  style={{
                    padding: 10,
                    alignItems: 'center',
                    borderRadius: 20,
                    width: 100,
                  }}>
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      fontSize: 15,
                      color: 'white',
                    }}>
                    {button}
                  </Text>
                </LinearGradient>
              ) : (
                <View
                  style={{padding: 10, alignItems: 'center', borderRadius: 10}}>
                  <Text style={{fontSize: 15, color: '#fff'}}>{button}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() =>
              handleOpenAllMemberModal(id_user, family[0].id_family)
            }
            style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <Material
                name="account"
                size={50}
                color="black"
                style={[styles.icon]}
              />
              <Text style={styles.fucntionText}>Members</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChatPress}
            style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <Material
                name="chat"
                size={50}
                color="lightblue"
                style={[styles.icon]}
              />
              <Text style={styles.fucntionText}>Chat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEducationPress}
            style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <Material
                name="book"
                size={50}
                color="brown"
                style={[styles.icon]}
              />
              <Text style={styles.fucntionText}>Education</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCalendarPress}
            style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <Material
                name="calendar"
                size={50}
                color="gray"
                style={[styles.icon]}
              />
              <Text style={styles.fucntionText}>Calendar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => handleDeleteFamily(family[0].id_family)}
            style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <Material
                name="delete"
                size={50}
                color="gray"
                style={[styles.icon]}
              />
              <Text style={styles.fucntionText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.chat} onPress={handleChatPress}>
        <MaterialCommunityIcons
          name="chat"
          size={40}
          color="white"
          style={[styles.icon]}
        />
      </TouchableOpacity>

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
          name={family[0]?.name}
          description={family[0]?.description}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

export default ViewFamilyScreen;
