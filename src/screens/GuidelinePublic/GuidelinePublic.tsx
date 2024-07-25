import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import navigation from 'src/navigation';
import { GuidelinePublicScreenProps } from 'src/navigation/NavigationTypes';

const GuidelineScreen = ({ navigation }: GuidelinePublicScreenProps) => {
  const guidelineData = [
    {
      id: '1',
      title: 'Cách sử dụng ứng dụng',
      content: 'Hướng dẫn cách sử dụng các tính năng chính của ứng dụng.',
      image: require('../../assets/images/default_ava.png'),
    },
    {
      id: '2',
      title: 'Quy trình đăng ký tài khoản',
      content: 'Các bước cần thiết để đăng ký tài khoản mới trên ứng dụng.',
      image: require('../../assets/images/default_ava.png'),
    },
    {
      id: '3',
      title: 'Bảo mật thông tin cá nhân',
      content: 'Hướng dẫn cách bảo vệ thông tin cá nhân và an toàn khi sử dụng ứng dụng.',
      image: require('../../assets/images/default_ava.png'),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
        <Icon
          name="chevron-forward-outline"
          size={22}
          color="#1b2838"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTab', { screen: 'HomeScreen' })}>
          <Icon name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Guidelines</Text>
      </View>

      <FlatList
        data={guidelineData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  backButton: {
    color: '#333333',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  content: {
    fontSize: 16,
    color: 'gray',
  },
  icon: {
    marginLeft: 'auto', 
  },
});

export default GuidelineScreen;
