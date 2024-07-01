import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  Modal,
  ImageBackground,
} from 'react-native';
import {FamilyServices} from 'src/services/apiclient';
import {COLORS, TEXTS} from 'src/constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {AllMemberScreenProps} from 'src/navigation/NavigationTypes';
import styles from './styles';

import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import { Member } from 'src/interface/member/member';


const ViewAllMemberScreen = ({navigation, route}: AllMemberScreenProps) => {
  const {id_family} = route.params || {};
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddMemberModalVisible, setAddMemberModalVisible] =
    useState<boolean>(false); 
  const screenHeight = Dimensions.get('screen').height;
  const bottomSheetRef = useRef<RBSheet>(null);

  const handleViewAllMember = async () => {
    try {
      const result = await FamilyServices.getAllMembers({id_family});
      console.log('FamilyServices.getAllMembers result:', result);
      setMembers(result);
    } catch (error) {
      console.log('FamilyServices.getAllMembers error:', error);
    }
  };

  const handleAddMember = () => {
    const phone = undefined;
    navigation.navigate('AddEditFamilyMember', {id_family, phone});
  };
  const handleSettingIconPress = (member: Member) => {
    console.log('Settings icon pressed for member:', member);
  };
  const filteredMembers = members.filter(
    member =>
      member.user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.phone.includes(searchQuery),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleViewAllMember();
    });
    return unsubscribe;
  }, [navigation]);

  const handlePressMember = (member: Member)=>{
      navigation.navigate('MemberDetails', { member: member});
  }

  return (
    <ImageBackground
      source={require('../../assets/images//view-all-member.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              top: 250,
              backgroundColor: '#f0f0f0',
              padding: 20,
              borderTopLeftRadius: 60,
              borderTopRightRadius: 60,
              width: '100%',
              alignSelf: 'center',
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 1,
                alignItems: 'center',
                marginBottom: -10,
              }}>
              <View
                style={[
                  styles.headerSearch,
                  {
                    bottom: 40,
                    backgroundColor: '#8E8C8A',
                    width: '60%',
                    alignSelf: 'center',
                    borderRadius: 12,
                    padding: 3,
                    height: 40,
                    marginLeft: 40,
                  },
                ]}>
                <FeatherIcon
                  color="white"
                  name="search"
                  size={17}
                  style={{padding: 10}}
                />
                <TextInput
                  autoCapitalize="none"
                  autoComplete="off"
                  placeholder="Search..."
                  placeholderTextColor="white"
                  style={styles.headerSearchInput}
                  onChangeText={text => setSearchQuery(text)}
                  value={searchQuery}
                />
              </View>
              <View
                style={{
                  bottom: 40,
                  backgroundColor: '#8E8C8A',
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  padding: 3,
                  marginRight: 40,
                }}>
                <TouchableOpacity onPress={handleAddMember}>
                  <FeatherIcon
                    name="plus"
                    size={24}
                    style={{
                      color: 'white',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{backgroundColor: '#f0f0f0'}}>
              <FlatList
                data={filteredMembers}
                renderItem={({item: member}) => (
                  <View style={{padding: 11, paddingHorizontal: 0}}>
                    <TouchableOpacity onPress={()=> handlePressMember(member)} style={styles.card}>
                      <View style={styles.iconContainer}>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            padding: 10,
                            marginHorizontal: 5,
                          }}>
                          <Image
                            source={{uri: member.user.avatar}}
                            style={styles.avatar}
                          />
                        </View>
                        <View style={styles.InforContainer}>
                          <Text style={styles.RoleText}>{member.role}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignContent: 'center',
                              width: '70%',
                            }}>
                            <MaterialIcons
                              name="person"
                              style={{
                                fontSize: 20,
                                color: 'black',
                                marginRight: 5,
                              }}
                            />
                            <Text style={styles.nameText}>
                              {member.user.firstname} {member.user.lastname}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignContent: 'center',
                              width: '70%',
                            }}>
                            <MaterialCommunityIcons
                              name="email-outline"
                              style={{
                                fontSize: 16,
                                color: 'black',
                                marginRight: 5,
                              }}
                            />
                            <Text
                              style={styles.cardText}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {member.user.email}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignContent: 'center',
                              width: '70%',
                            }}>
                            <MaterialCommunityIcons
                              name="phone-outline"
                              style={{
                                fontSize: 16,
                                color: 'black',
                                marginRight: 5,
                              }}
                            />
                            <Text
                              style={styles.cardText}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {member.user.phone}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<View style={{height: 250}} />}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>

        {/* <RBSheet
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
        <BottomSh id_user={id_user} id_family={id_family} />
      </RBSheet> */}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ViewAllMemberScreen;
