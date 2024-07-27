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
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {Avatar, Header, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from 'src/constants';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Role} from 'src/interface/member/member';
import {MemberDetailsScreenProps} from 'src/navigation/NavigationTypes';
import {selectSelectedMember} from 'src/redux/slices/FamilySlice';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {setUserMessage} from 'src/redux/slices/MessageUser';
import {RootState} from 'src/redux/store';
const screenHeight = Dimensions.get('screen').height;

const ProfileDetailsScreen = ({
  route,
  navigation,
}: MemberDetailsScreenProps) => {
  const member = useSelector((state: RootState) => state.profile.profile);
  const local = useSelector(selectLocale);

  const [role, setRole] = useState<Role[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  useEffect(() => {
    console.log(member);
  }, []);

  const handlePhonePress = () => {
    Linking.openURL(`tel:${member?.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${member?.phone}`);
  };

  return (
    <ImageBackground
      source={
        member?.avatar
          ? {uri: member?.avatar}
          : require('../../../assets/images/default_ava.png')
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
                member?.avatar
                  ? {uri: member?.avatar}
                  : require('../../../assets/images/default_ava.png')
              }
              size={120}
              containerStyle={styles.avatar}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.name, {color: 'white'}]}>
              {member.firstname} {member.lastname}
            </Text>
          </View>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
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
              {translate(member.genre)}
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
              {member.birthdate}
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
                {member.phone}
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
                {member.email}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{translate('ChangeRole')}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    marginRight: 20,
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  role: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
  },
  contactContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactText: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  roleItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ProfileDetailsScreen;
