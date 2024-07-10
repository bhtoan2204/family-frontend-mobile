import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import * as Contacts from 'expo-contacts';
import {ContactScreenProps} from 'src/navigation/NavigationTypes';
import styles from './styles';
import { User } from 'src/interface/member/member';
import { ProfileServices } from 'src/services/apiclient';
import { COLORS } from 'src/constants';

interface Contact {
  id?: string;
  name: string;
  phoneNumbers?: Contacts.PhoneNumber[] | undefined;
  user?: User; 
}

const ContactListScreen: React.FC<ContactScreenProps> = ({
  navigation,
  route,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const {id_family} = route.params;

  const convertPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.startsWith('0')) {
      return '+84' + phoneNumber.slice(1);
    }
    return phoneNumber;
  };

  useEffect(() => {
    (async () => {
      try {
        const {status} = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const {data} = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          });

          const filteredContacts = data.filter(contact => contact.id !== undefined);
          setContacts(filteredContacts);

          for (const contact of filteredContacts) {
            if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
              const rawPhoneNumber = contact.phoneNumbers[0].number;
              const phoneNumber = convertPhoneNumber(rawPhoneNumber);
              try {
                const user = await ProfileServices.getUserInfoByPhone(phoneNumber);
                if (user) {
                  setContacts(prevContacts => {
                    return prevContacts.map(prevContact =>
                      prevContact.id === contact.id
                        ? {...prevContact, user}
                        : prevContact
                    );
                  });
                }
              } catch (error) {
                console.error('Error fetching user info:', error);
              }
            }
          }
        } else {
          console.log('Permission to access contacts denied');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    })();
  }, []);

  const handleContactPress = (phoneNumbers?: Contacts.PhoneNumber[]) => {
    if (phoneNumbers && phoneNumbers.length > 0) {
      const firstPhoneNumber = phoneNumbers[0];
      if (firstPhoneNumber && firstPhoneNumber.number) {
        const rawPhoneNumber = firstPhoneNumber.number.toString();
        const phoneNumber = convertPhoneNumber(rawPhoneNumber);
        navigation.navigate('AddEditFamilyMember', {
          id_family,
          phone: phoneNumber,
        });
      }
    }
  };
  const UserContact: React.FC<{ item: Contact }> = ({ item }) => (
    <View
    style={[
      {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
      },
      styles.userContact,
    ]}>
    <View style={styles.imgCon}>
      <View style={styles.placeholder}>
        <Text style={styles.txt}>{item.name[0]}</Text>
        </View>
    </View>
    <View style={styles.contactDat}>
      <Text style={styles.name}>{`${item.name}`}</Text>
      <Text style={styles.phoneNumber}>
        {item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : ''}
      </Text>
      <View style={styles.appIndicatorContainer}>
        <Text style={styles.appIndicator}>Already on FamFund as</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{color: COLORS.DenimBlue}}> {item.user[0].firstname} {item.user[0].lastname} </Text>
          <Image source={{ uri: item.user[0].avatar }} style={styles.avatar} />
        </View>
      </View>


  </View>
  </View>

  );

  const NormalContact: React.FC<{item: Contact}> = ({item}) => (
    <View
      style={[
        {
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
        },
        styles.normalContact,
      ]}>
      <View style={styles.imgCon}>
        <View style={styles.placeholder}>
        <Text style={styles.txt}>{item.name[0]}</Text>
        </View>
      </View>
        <View style={styles.contactDat}>
      <Text style={styles.txt}>{item.name}</Text>
        <Text style={styles.phoneNumber}>
          {item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : ''}
        </Text>
      </View>
    </View>
  );

  const renderContactItem = ({item}: {item: Contact}) => {
    return (
      <TouchableOpacity onPress={() => handleContactPress(item.phoneNumbers)}>
        {item.user ? <UserContact item={item} /> : <NormalContact item={item} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id || ''}
        ListEmptyComponent={() => <Text>No contacts found</Text>}
      />
    </View>
  );
};

export default ContactListScreen;
