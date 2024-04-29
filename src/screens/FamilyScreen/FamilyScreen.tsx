import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert, SafeAreaView, Dimensions, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FamilyServices } from '../../services/apiclient';
import { ViewFamilyScreenProps } from '../../navigation/NavigationTypes';
import styles from './styles';
import BottomSheet from './BottomSheet'; 

type Family = {
  id_family: number;
  quantity: number;
  description: string;
  name: string;
};

const ViewFamilyScreen= ({navigation, route}: ViewFamilyScreenProps) => {
  const { id_user, id_family } = route.params || {};
  const [family, setFamily] = useState<Family[]>([]);
  const bottomSheetRef = useRef<RBSheet>(null); 
  const allMemberRef = useRef<RBSheet>(null); 
  const screenHeight = Dimensions.get('screen').height;

  const handleGetFamily = async () => {
    try {
      const familyInfo = await FamilyServices.getFamily({ id_family });
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
              const result = await FamilyServices.deleteFamily({ id_family});
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
  const handleChatPress =()=> {
    navigation.navigate('ChatStack', {screen: 'ChatFamily', params: {id_user: id_user, id_family: id_family}});
  };
  const handleEducationPress =()=> {

  };
  const handleCalendarPress=() => {
     navigation.navigate('CalendarStack', {screen:  'CalendarScreen', params: {id_family: id_family}});
  }
  const handleOpenAllMemberModal = (id_user: string | undefined, id_family: number) => {
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.headerfile}>
        <TouchableOpacity onPress={handleOpenBottomSheet} style={styles.settingItem}>
          <Material name="pencil" size={24} color="black" />
          {/* <Text style={styles.settingText}>Edit Family</Text> */}
      </TouchableOpacity>


      </View>


      </View>

      <View style={styles.container}>
          {family.map((item: Family) => (
            <View key={item.id_family} style={styles.cardContainer}>
              <Image source={{ uri: 'https://pethouse.com.vn/wp-content/uploads/2023/06/meo-anh-long-ngan-833x800.jpg' }} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>Family: {item.name}</Text>
                <Text style={styles.text}>Quantity: {item.quantity}</Text>
                <Text style={styles.text}>Description: {item.description}</Text>
              </View>
            </View>
          ))}

        </View>
        <View style={styles.functionContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => handleOpenAllMemberModal(id_user, family[0].id_family)} style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Material name="account" size={50} color="black" style={[styles.icon]} />
                <Text style={styles.fucntionText}>Members</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChatPress} style={styles.settingItem}>
              <View style={styles.iconContainer}>
              <Material name="chat" size={50} color="lightblue" style={[styles.icon]} /> 
                <Text style={styles.fucntionText}>Chat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEducationPress} style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Material name="book" size={50} color="brown" style={[styles.icon]}/>
                <Text style={styles.fucntionText}>Education</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCalendarPress} style={styles.settingItem}>
              <View style={styles.iconContainer}>
              <Material name="calendar" size={50} color="gray" style={[styles.icon]} /> 
                <Text style={styles.fucntionText}>Calendar</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => handleDeleteFamily(family[0].id_family)} style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Material name="delete" size={50} color="gray" style={[styles.icon]}/>
                <Text style={styles.fucntionText}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        




      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={screenHeight*0.3} 
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <BottomSheet id_user={id_user} id_family={id_family} name={family[0]?.name} description={family[0]?.description} />
      </RBSheet>

      
    </SafeAreaView>
  );
};

export default ViewFamilyScreen;
