import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import navigation from 'src/navigation';
import { GuidelinePublicScreenProps } from 'src/navigation/NavigationTypes';

const GuidelineScreen = ({navigation} : GuidelinePublicScreenProps) => {
  const guidelineData = [
    {
      id: '1',
      title: 'Cách sử dụng ứng dụng',
      content: 'Hướng dẫn cách sử dụng các tính năng chính của ứng dụng.',
      image: require('../../assets/images/avatar.png'),
    },
    {
      id: '2',
      title: 'Quy trình đăng ký tài khoản',
      content: 'Các bước cần thiết để đăng ký tài khoản mới trên ứng dụng.',
      image: require('../../assets/images/avatar.png'),
    },
    {
      id: '3',
      title: 'Bảo mật thông tin cá nhân',
      content: 'Hướng dẫn cách bảo vệ thông tin cá nhân và an toàn khi sử dụng ứng dụng.',
      image: require('../../assets/images/avatar.png'),
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
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>  navigation.navigate('HomeTab', {screen: 'HomeScreen'})}>
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
    backgroundColor: '#ffffff',
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
    borderBottomColor: '#cccccc',
  },
  textContainer: {
    flex: 1,
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
    marginLeft: 10,
  },
  backButton: {
    color: '#333333',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#333333',
  },
});

export default GuidelineScreen;
