import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, FlatList, Button, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Avatar, Header, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from 'src/constants';
import { Role } from 'src/interface/member/member';
import { MemberDetailsScreenProps } from 'src/navigation/NavigationTypes';
import { selectSelectedMember } from 'src/redux/slices/FamilySlice';
import { getTranslate, selectLocale } from 'src/redux/slices/languageSlice';
import { setUserMessage } from 'src/redux/slices/MessageUser';
import { RootState } from 'src/redux/store';
import { FamilyServices } from 'src/services/apiclient';
import RoleService from 'src/services/apiclient/RoleServices';
const screenHeight = Dimensions.get('screen').height;

const MemberDetailsScreen = ({ route, navigation }: MemberDetailsScreenProps) => {
  
  const  member =  useSelector((state: RootState) => state.family.selectedMember);
  const local = useSelector(selectLocale);

  const [newRole, setNewRole] = useState(local=='vi' ? member.familyRoles.role_name_vn:  member.familyRoles.role_name_en);
  const [role, setRole] = useState<Role[]>([]);
  const [modalVisible, setModalVisible] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);

  useEffect(()=>{
    console.log(member);
  },[])
  const handlePhonePress = () => {
    Linking.openURL(`tel:${member?.user.phone}`); 
  };

  const formattedCreatedAt = new Date(member?.user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${member?.user.phone}`); 
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
        await RoleService.assignRole(member?.id_user, member.id_family, roleName.id_family_role)
        setNewRole(local=='vi' ?  roleName.role_name_vn: roleName.role_name_en); 
        setModalVisible(false);
    }catch (error){
        console.log(error);
    } finally {
        setIsLoading(false);
    }
  };
  const renderRoleItem = ({ item }: { item: Role }) => (
    <TouchableOpacity style={styles.roleItem} onPress={() => handleRoleSelect(item)}>
      <Text style={styles.roleItem}>{ local=='vi' ? item.role_name_vn: item.role_name_en}</Text>
    </TouchableOpacity>
  );
  const handlePressMessage = async () => {
    await dispatch(setUserMessage(member?.user));
    navigation.navigate('ChatStack', {screen: 'ChatUser', params: { receiverId: member?.id_user}});
  }
  const handleRemoveMember = async() => {
    setIsLoading(true);
    try{
       await FamilyServices.kickMember(member.id_user, member?.id_family);
       Alert.alert('Success', 'Member removed successfully');
        
    } catch(error){
        console.log(error)
        Alert.alert('Inform', 'Only owner can remove member');
        
    } finally {
        setIsLoading(false);
      }
    };

  return (
    <View style={styles.container}>
    <Header
        leftComponent={{
          icon: 'arrow-back',
          color: 'black',
          size: 30,
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{ }}
        containerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          borderBottomWidth: 0,
        }}
      />

      <View style={styles.avatarContainer}>
        <View >
            <Avatar
            rounded
            source={member?.user.avatar ? { uri: member?.user.avatar } : require('../../assets/images/avatar.png')}
            size={120}
            containerStyle={styles.avatar}
            />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{member.user.firstname} {member.user.lastname}</Text>
          <TouchableOpacity style={styles.roleContainer} onPress={handleChangeRole}>
            <Text style={styles.role}>{newRole}</Text>
            <Icon name="edit" type="feather" color={COLORS.DenimBlue} size={20} />

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button,{ backgroundColor: COLORS.DenimBlue, }]} onPress={handlePressMessage}>
          <Text style={styles.buttonText}>{translate('chatTab')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6347' }]} onPress={handleRemoveMember}>
          <Text style={styles.buttonText}>{translate('Remove')}</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>{translate('Contact')}</Text>
        <TouchableOpacity onPress={handlePhonePress}>
          <View style={styles.row}>
            <Icon name="phone" type="font-awesome" color="gray" size={20} />
            <Text style={[styles.contactText, { color: '#007bff' }]}>{member.user.phone}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEmailPress}>
          <View style={styles.row}>
            <Icon name="mail" type="feather" color="gray" size={20} />
            <Text style={[styles.contactText, { color: '#007bff' }]}>{member.user.email}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
      <Text style={styles.contactTitle}>{translate('Information')}</Text>

        <Text style={[styles.infoText, { textAlign: 'left' }]}>{translate('Gender')}: {translate(member.user.genre)} </Text>
        <Text style={[styles.infoText, { textAlign: 'left' }]}>{translate('Date of Birth')}: {member.user.birthdate}</Text>
        <Text style={[styles.infoText, { textAlign: 'left' }]}>{translate('Joined')}: {formattedCreatedAt}</Text>

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <TouchableOpacity
            style={styles.centeredView}
            activeOpacity={1} 
            onPressOut={() => setModalVisible(false)} 
        >
   
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{translate('Select Role')}</Text>
                {isLoading ? (
                <ActivityIndicator size="large" color='#ccc' />
                ) : (
                <FlatList
                    data={role}
                    renderItem={renderRoleItem}
                    keyExtractor={(item) => item.id_family_role.toString()}
                    style={{ marginBottom: 20}}
                />
                )}
  
            </View>
        </TouchableOpacity>
        </Modal>


    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    marginRight: 20,
  },
  nameContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 50,
  },
  button: {
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  roleContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', 
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ccc',
  },
  role: {
    fontSize: 18,
    color: COLORS.DenimBlue,
    marginRight: 7,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#fff', 
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555', 
    paddingBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#555', 
    marginLeft : 10,
  },
  modalView: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '70%', 
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
    borderBottomColor: '#ccc',
    color: '#555',
  },

});

export default MemberDetailsScreen;
