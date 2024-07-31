import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getTranslate,
  selectLocale,
  setLocale,
} from 'src/redux/slices/languageSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {useThemeColors} from 'src/hooks/useThemeColor';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const locale = useSelector(selectLocale);

  const data = [
    {
      key: '2',
      label: translate('Vietnamese'),
      locale: 'vi',
    },
    {
      key: '3',
      label: translate('English'),
      locale: 'en',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <View style={[styles.header, {backgroundColor: color.background}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Icon name="close" size={30} color={color.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: color.text}]}>
          {translate('Language')}
        </Text>
        <View style={styles.headerButton} />
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => dispatch(setLocale(item.locale))}
            style={[styles.listItem, {backgroundColor: color.white}]}>
            <Text style={[styles.itemText, {color: color.text}]}>
              {item.label}
            </Text>
            {locale === item.locale && (
              <Icon
                name="checkmark"
                size={30}
                color="green"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  headerButton: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  checkIcon: {
    marginLeft: 10,
  },
});

export default HomeScreen;
