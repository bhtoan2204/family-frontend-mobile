import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const DeleteButton = ({onPress}) => {
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button]} onPress={onPress}>
        {/* <Ionicons
          name="trash-outline"
          size={28}
          color={'white'}
          style={styles.icon}
        /> */}
        <Text style={[styles.deleteText, {color: 'red'}]}>
          {translate('Delete')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 100,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  deleteText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  icon: {},
});

export default DeleteButton;
