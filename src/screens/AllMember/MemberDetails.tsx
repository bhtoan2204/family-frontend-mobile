import {MaterialCommunityIcons} from '@expo/vector-icons';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Modal,
  FlatList,
  Button,
  Dimensions,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import {Avatar, Header, Icon} from 'react-native-elements';
import {Toast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from 'src/constants';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Role} from 'src/interface/member/member';
import {MemberDetailsScreenProps} from 'src/navigation/NavigationTypes';
import {
  removeMember,
  selectSelectedFamily,
  selectSelectedMember,
} from 'src/redux/slices/FamilySlice';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {setUserMessage} from 'src/redux/slices/MessageUser';
import {RootState} from 'src/redux/store';
import {FamilyServices} from 'src/services/apiclient';
import RoleService from 'src/services/apiclient/RoleServices';
import IconL from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height;

const MemberDetailsScreen = ({route, navigation}: MemberDetailsScreenProps) => {
  const member = useSelector((state: RootState) => state.family.selectedMember);
  const local = useSelector(selectLocale);
  const family = useSelector(selectSelectedFamily);

  const [newRole, setNewRole] = useState(
    local === 'vi'
      ? member.familyRoles.role_name_vn
      : member.familyRoles.role_name_en,
  );
  const [role, setRole] = useState<Role[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  useEffect(() => {
    console.log(member);
  }, []);
  const handlePhonePress = () => {
    Linking.openURL(`tel:${member?.user.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${member?.user.email}`);
  };
  const handleChangeRole = async () => {
    setIsLoading(true);
    try {
      const data = await RoleService.getAllRole();
      setRole(data);
      setModalVisible(true);
    } catch (error) {
      console.log('Error fetching roles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = async (roleName: Role) => {
    try {
      setIsLoading(true);
      await RoleService.assignRole(
        member?.id_user,
        member.id_family,
        roleName.id_family_role,
      );
      setNewRole(
        local === 'vi' ? roleName.role_name_vn : roleName.role_name_en,
      );
      setModalVisible(false);
      Toast.show(translate('roleAssignSuccess'), {
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      Toast.show(translate('roleAssignFail'), {
        type: 'danger',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleItem = ({item}: {item: Role}) => (
    <TouchableOpacity
      style={[styles.roleItemContainer, {backgroundColor: color.white}]}
      onPress={() => handleRoleSelect(item)}>
      <Text style={[styles.roleItemText, {color: color.text}]}>
        {local == 'vi' ? item.role_name_vn : item.role_name_en}
      </Text>
      {item.id_family_role === member.familyRoles.id_family_role && (
        <MaterialCommunityIcons
          name="check"
          color={COLORS.DenimBlue}
          size={20}
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );

  const handlePressMessage = async () => {
    await dispatch(setUserMessage(member?.user));
    navigation.navigate('ChatStack', {
      screen: 'ChatUser',
      params: {receiverId: member?.id_user},
    });
  };
  const handleRemoveMember = async () => {
    Alert.alert(
      translate('confirmRemovalTitle'),
      translate('confirmRemovalMessage'),
      [
        {
          text: translate('cancel'),
          onPress: () => console.log('Removal cancelled'),
          style: 'cancel',
        },
        {
          text: translate('ok'),
          onPress: async () => {
            setIsLoading(true);
            try {
              await FamilyServices.kickMember(
                member.id_user,
                member?.id_family,
              );
              Toast.show(translate('memberRemovedSuccess'), {
                type: 'success',
                duration: 3000,
              });
              await dispatch(removeMember(member?.id_family, member?.id_user));
              navigation.navigate('AllMember', {
                id_family: family?.id_family,
                forceUpdate: new Date().getTime(),
              });
            } catch (error) {
              console.log(error);
              Toast.show(translate('memberRemovedFail'), {
                type: 'danger',
                duration: 3000,
              });
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ImageBackground
      source={
        member?.user.avatar
          ? {uri: member?.user.avatar}
          : require('../../assets/images/default_ava.png')
      }
      style={styles.container}>
      <View
        style={{
          width: 415,
          height: 900,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignSelf: 'center',
          bottom: 10,
          paddingHorizontal: 20,
        }}>
        <Header
          leftComponent={{
            icon: 'arrow-back',
            color: 'white',
            size: 30,
            onPress: () => navigation.goBack(),
          }}
          centerComponent={{}}
          containerStyle={{
            backgroundColor: 'transparent',
            justifyContent: 'space-around',
            borderBottomWidth: 0,
          }}
        />

        <View style={styles.avatarContainer}>
          <View>
            <Avatar
              rounded
              source={
                member?.user.avatar
                  ? {uri: member?.user.avatar}
                  : require('../../assets/images/default_ava.png')
              }
              size={120}
              containerStyle={styles.avatar}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.name, {color: 'white'}]}>
              {member.user.firstname} {member.user.lastname}
            </Text>
            <TouchableOpacity
              style={styles.roleContainer}
              onPress={handleChangeRole}>
              <Text style={styles.role}>{newRole}</Text>
              <Icon
                name="edit"
                type="feather"
                color={COLORS.DenimBlue}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: COLORS.DenimBlue,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={handlePressMessage}>
            <Text style={styles.buttonText}>{translate('chatTab')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#E44545',
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={handleRemoveMember}>
            <Text style={styles.buttonText}>{translate('Remove')}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.infoContainer, {backgroundColor: color.white}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 15,
              borderBottomColor: color.border,
              borderBottomWidth: 1,
              marginBottom: 15,
            }}>
            <MaterialCommunityIcons
              name="information"
              color="#66C0F4"
              size={28}
              style={{marginRight: 10}}
            />
            <Text style={[styles.contactTitle, {color: color.text}]}>
              {translate('Information')}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={[
                styles.infoText,
                {
                  textAlign: 'left',
                  color: color.textSubdued,
                  fontWeight: 'bold',
                },
              ]}>
              {translate('Gender')}:
            </Text>
            <Text
              style={[styles.infoText, {textAlign: 'left', color: color.text}]}>
              {translate(member.user.genre)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={[
                styles.infoText,
                {
                  textAlign: 'left',
                  color: color.textSubdued,
                  fontWeight: 'bold',
                },
              ]}>
              {translate('Date of Birth')}:
            </Text>
            <Text
              style={[styles.infoText, {textAlign: 'left', color: color.text}]}>
              {member.user.birthdate}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={[
                styles.infoText,
                {
                  textAlign: 'left',
                  color: color.textSubdued,
                  fontWeight: 'bold',
                },
              ]}>
              {translate('Joined')}:
            </Text>
            <Text
              style={[styles.infoText, {textAlign: 'left', color: color.text}]}>
              {moment(new Date(member?.user.created_at)).format(
                'yyyy-MM-DD hh:MM',
              )}
            </Text>
          </View>
        </View>

        <View style={[styles.contactContainer, {backgroundColor: color.white}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 15,
              borderBottomColor: color.border,
              borderBottomWidth: 1,
              marginBottom: 15,
            }}>
            <MaterialCommunityIcons
              name="card-account-phone"
              color="#66C0F4"
              size={25}
              style={{marginRight: 10}}
            />
            <Text style={[styles.contactTitle, {color: color.text}]}>
              {translate('Contact')}
            </Text>
          </View>
          <TouchableOpacity onPress={handlePhonePress}>
            <View style={styles.row}>
              <Text
                style={{
                  color: color.textSubdued,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {translate('PhoneNumber')}
              </Text>
              <Text style={[styles.contactText, {color: '#007bff'}]}>
                {member.user.phone}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmailPress}>
            <View style={styles.row}>
              <Text
                style={{
                  color: color.textSubdued,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Email:
              </Text>
              <Text style={[styles.contactText, {color: '#007bff'}]}>
                {member.user.email}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            style={styles.centeredView}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}>
            <View style={[styles.modalView, {backgroundColor: color.white}]}>
              <Text style={[styles.modalTitle, {color: color.text}]}>
                {translate('Select Role')}
              </Text>
              {isLoading ? (
                <ActivityIndicator size="large" color="#ccc" />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={role}
                  renderItem={renderRoleItem}
                  keyExtractor={item => item.id_family_role.toString()}
                  style={{marginBottom: 20, width: '100%'}}
                />
              )}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  avatarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  nameContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'medium',
  },
  roleContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 15,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 18,
    color: COLORS.DenimBlue,
    marginRight: 10,
    fontWeight: 'semibold',
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  contactContainer: {
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 16,
    paddingBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  modalView: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '70%',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  roleItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: '#555',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  roleItemText: {
    fontSize: 18,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 10,
  },
});

export default MemberDetailsScreen;
