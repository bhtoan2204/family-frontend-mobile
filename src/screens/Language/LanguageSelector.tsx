import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate, setLocale } from 'src/redux/slices/languageSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{translate('welcome')}</Text>
      <Button title="Switch to Vietnamese" onPress={() => dispatch(setLocale('vi'))} />
      <Button title="Switch to English" onPress={() => dispatch(setLocale('en'))} />
    </View>
  );
};

export default HomeScreen;
