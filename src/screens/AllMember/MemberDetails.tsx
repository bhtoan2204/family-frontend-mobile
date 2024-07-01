import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Avatar, Header, Icon } from 'react-native-elements';
import { COLORS } from 'src/constants';
import { Member } from 'src/interface/member/member';
import { MemberDetailsScreenProps } from 'src/navigation/NavigationTypes';

const MemberDetailsScreen = ({ route, navigation }: MemberDetailsScreenProps) => {
  const { member } = route.params; 

  const handlePhonePress = () => {
    Linking.openURL(`tel:${member.user.phone}`); 
  };

  const formattedCreatedAt = new Date(member.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${member.user.email}`); 
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
            source={member.user.avatar ? { uri: member.user.avatar } : require('../../assets/images/avatar.png')}
            size={120}
            containerStyle={styles.avatar}
            />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{member.user.firstname} {member.user.lastname}</Text>
          <TouchableOpacity>
            <Text style={styles.role}>{member.familyRoles.role_name_en}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button,{ backgroundColor: COLORS.DenimBlue, }]}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6347' }]}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact</Text>
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
      <Text style={styles.contactTitle}>Information</Text>

        <Text style={[styles.infoText, { textAlign: 'left' }]}>Gender: {member.user.genre}</Text>
        <Text style={[styles.infoText, { textAlign: 'left' }]}>Date of Birth: {member.user.birthdate}</Text>
        <Text style={[styles.infoText, { textAlign: 'left' }]}>Joined: {formattedCreatedAt}</Text>

      </View>

    
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
  name: {
    fontSize: 24,
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
    color: '#666',
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
});

export default MemberDetailsScreen;
