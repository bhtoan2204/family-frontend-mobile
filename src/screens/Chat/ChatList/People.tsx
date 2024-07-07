import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import ChatServices from 'src/services/apiclient/ChatServices';
import Icon from 'react-native-vector-icons/Ionicons';
import { User } from 'src/interface/chat/chat';
import { ChatScreenProps } from 'src/navigation/NavigationTypes';
import { useDispatch } from 'react-redux';
import { setUserMessage } from 'src/redux/slices/MessageUser';

const PeopleScreen = ( {navigation}: ChatScreenProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await ChatServices.GetAllUser({search});
      setUsers(response);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };
  const pressChat = (user: User) => {
    dispatch(setUserMessage(user));
    navigation.navigate('ChatStack', {
      screen: 'ChatUser',
      params: {receiverId: user.id_user},
    });
  };

  const renderUserItem = ({item}: {item: User}) => (
    <View>
      <TouchableOpacity onPress={()=> pressChat(item)} style={styles.userItem}>
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
              <View style={[styles.activeDot, {bottom: 15}]} />
            </>
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {`${item.firstname.charAt(0)}${item.lastname.charAt(0)}`}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {`${item.firstname} ${item.lastname}`}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.userItemBorderShort} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back')}>
          <Icon name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contacts</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id_user}
          renderItem={renderUserItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 115,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userItemBorderShort: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    width: '80%',
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: -10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeDot: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
    bottom: 20,
    left: 37,
  },
});

export default PeopleScreen;
