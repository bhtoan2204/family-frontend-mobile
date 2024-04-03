import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native';
import { ContactScreenProps } from 'src/navigation/NavigationTypes';

interface Contact {
    id?: string;
    name: string;
    phoneNumbers?: Contacts.PhoneNumber[] | undefined;
}
const ContactListScreen: React.FC<ContactScreenProps> = ({ navigation, route }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const { id_family } = route.params;

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                    });
                    setContacts(data.filter(contact => contact.id !== undefined));
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
                const phoneNumber = firstPhoneNumber.number.toString();
                navigation.navigate('AddEditFamilyMember', { id_family, phone: phoneNumber });
            }
        }
    };
    

    const renderContactItem = ({ item }: { item: Contact }) => {
        return (
            <TouchableOpacity onPress={() => handleContactPress(item.phoneNumbers)}>
                <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Text>Name: {item.name}</Text>
                    {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                        <Text>Phone: {item.phoneNumbers[0].number}</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, paddingTop: 20 }}>
            <FlatList
                data={contacts}
                renderItem={renderContactItem}
                keyExtractor={(item) => item.id || ''}
                ListEmptyComponent={() => <Text>No contacts found</Text>}
            />
        </View>
    );
};

export default ContactListScreen;