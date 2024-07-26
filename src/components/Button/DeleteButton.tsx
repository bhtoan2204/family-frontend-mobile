import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { COLORS } from 'src/constants';
import { useThemeColors } from 'src/hooks/useThemeColor';


const DeleteButton = ({ onPress }) => {
    const translate = useSelector(getTranslate);
    const color = useThemeColors();
  return (
    <TouchableOpacity
      style={[styles.deleteButton, { backgroundColor: color.background, borderColor: 'red'}]}
      onPress={onPress}
    >
      <Ionicons name="trash-outline" size={24} color='red' style={styles.editIcon} />
      <Text style={[styles.deleteText, {color: color.text}]}>{translate('Delete')}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editIcon: {
  },
});

export default DeleteButton;
