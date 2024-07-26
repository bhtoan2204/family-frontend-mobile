import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate, setLocale } from 'src/redux/slices/languageSlice';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useThemeColors } from 'src/hooks/useThemeColor';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  
  const data = [
    { key: '1', label: translate('welcome'), icon: 'checkmark' },
    { key: '2', label: 'Switch to Vietnamese', icon: 'globe', action: () => dispatch(setLocale('vi')) },
    { key: '3', label: 'Switch to English', icon: 'globe', action: () => dispatch(setLocale('en')) },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: color.background}]}>
      <View style={[styles.header, {backgroundColor: color.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={color.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: color.text}]}>{translate('Language')}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.action} style={[styles.listItem, {backgroundColor: color.white}]}>
            <Icon name={item.icon} size={24} color={color.text} style={styles.icon} />
            <Text style={[styles.itemText, {color: color.text}]}>{item.label}</Text>
            <Icon name="checkmark" size={24} color={color.text} style={styles.checkIcon} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});

export default HomeScreen;
