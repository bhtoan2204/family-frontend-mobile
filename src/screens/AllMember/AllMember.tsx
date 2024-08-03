import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {AllMemberScreenProps} from 'src/navigation/NavigationTypes';
import {
  selectFamilyMembers,
  setFamilyMembers,
  setSelectedFamilyById,
  setSelectedMemberById,
} from 'src/redux/slices/FamilySlice';
import styles from './styles';
import {Member} from 'src/interface/member/member';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {FamilyServices} from 'src/services/apiclient';
import {useRoute} from '@react-navigation/native';

const ViewAllMemberScreen = ({navigation, route}: AllMemberScreenProps) => {
  const {id_family} = route.params || {};
  const members = useSelector(selectFamilyMembers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const local = useSelector(selectLocale);
  const color = useThemeColors();

  useEffect(() => {
    fetchData();
  }, [searchQuery, route.params?.forceUpdate]);

  const fetchData = async () => {
    try {
      const data = await FamilyServices.getAllMembers(searchQuery, id_family);
      dispatch(setFamilyMembers(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMember = () => {
    const phone = undefined;
    navigation.navigate('AddEditFamilyMember', {id_family, phone});
  };

  const handlePressMember = async (member: Member) => {
    await dispatch(setSelectedMemberById(member.id_user));
    navigation.navigate('MemberDetails');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/view-all-member.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              top: 250,
              backgroundColor: color.background,
              padding: 20,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              width: '100%',
              height: '100%',
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
                    backgroundColor: color.card,
                    width: '60%',
                    alignSelf: 'center',
                    borderRadius: 12,
                    padding: 3,
                    height: 40,
                    marginLeft: 40,
                  },
                ]}>
                <FeatherIcon
                  color={color.textSubdued}
                  name="search"
                  size={17}
                  style={{padding: 10}}
                />
                <TextInput
                  autoCapitalize="none"
                  autoComplete="off"
                  placeholder={translate('SEARCH')}
                  placeholderTextColor="gray"
                  style={[styles.headerSearchInput, {color: color.text}]}
                  onChangeText={text => setSearchQuery(text)}
                  value={searchQuery}
                />
              </View>
              <View
                style={{
                  bottom: 40,
                  backgroundColor: color.card,
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
                    style={{color: color.icon}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{backgroundColor: color.background}}>
              <FlatList
                data={members}
                renderItem={({item: member}) => (
                  <View style={{padding: 11, paddingHorizontal: 0}}>
                    <TouchableOpacity
                      onPress={() => handlePressMember(member)}
                      style={[styles.card, {backgroundColor: color.white}]}>
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
                          <Text style={styles.RoleText}>
                            {local == 'vi'
                              ? member.familyRoles.role_name_vn
                              : member.familyRoles.role_name_en}
                          </Text>
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
                                color: color.text,
                                marginRight: 5,
                              }}
                            />
                            <Text
                              style={[styles.nameText, {color: color.text}]}>
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
                                color: color.text,
                                marginRight: 5,
                              }}
                            />
                            <Text
                              style={[
                                styles.cardText,
                                {color: color.textSubdued},
                              ]}
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
                                color: color.text,
                                marginRight: 5,
                              }}
                            />
                            <Text
                              style={[
                                styles.cardText,
                                {color: color.textSubdued},
                              ]}
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
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ViewAllMemberScreen;
