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
  TextInput,
} from 'react-native';
import ChatServices from 'src/services/apiclient/ChatServices';
import Icon from 'react-native-vector-icons/Ionicons';
import {User} from 'src/interface/chat/chat';
import {ChatScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {setUserMessage} from 'src/redux/slices/MessageUser';
import {get} from 'lodash';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const PeopleScreen = ({navigation}: ChatScreenProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUser();
  }, [searchQuery]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await ChatServices.GetAllUser({search: searchQuery});
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
      <TouchableOpacity onPress={() => pressChat(item)} style={styles.userItem}>
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
            </>
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={[styles.avatarText, {color: color.text}]}>
                {`${item.firstname.charAt(0)}${item.lastname.charAt(0)}`}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.username, {color: color.text}]}>
            {`${item.firstname} ${item.lastname}`}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.userItemBorderShort} />
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <View style={[styles.header, {backgroundColor: color.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={color.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: color.text}]}>
          {translate('Contacts')}
        </Text>
      </View>
      <View style={[styles.header, {backgroundColor: color.chatBackground}]}>
        <View
          style={[styles.searchContainer, {backgroundColor: color.searchChat}]}>
          <TextInput
            style={[
              styles.searchInput,
              {backgroundColor: color.searchChat, color: color.text},
            ]}
            placeholder={translate('SEARCH')}
            placeholderTextColor={color.text}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="search" size={20} style={styles.searchIcon} />
        </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    padding: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    color: '#999',
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
