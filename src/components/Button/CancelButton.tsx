import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { COLORS } from 'src/constants';
import { useThemeColors } from 'src/hooks/useThemeColor';


const CancelButton = ({ onPress }) => {
    const translate = useSelector(getTranslate);
    const color = useThemeColors();

  return (
    <TouchableOpacity
      style={[styles.deleteButton, { backgroundColor: COLORS.Rhino, borderColor: color.background}]}
      onPress={onPress}
    >
      <Text style={styles.deleteText}>{translate('Cancel')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    flex: 1, 
    backgroundColor: '#00adf5',
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
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default CancelButton;
