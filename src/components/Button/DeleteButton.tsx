import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { COLORS } from 'src/constants';


const DeleteButton = ({ onPress }) => {
    const translate = useSelector(getTranslate);

  return (
    <TouchableOpacity
      style={[styles.deleteButton, { backgroundColor: COLORS.red}]}
      onPress={onPress}
    >
      <Text style={styles.deleteText}>{translate('Delete')}</Text>
      <Ionicons name="trash-outline" size={24} color="white" style={styles.editIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: '#00adf5',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  editIcon: {
    marginLeft: 10, 
  },
});

export default DeleteButton;
