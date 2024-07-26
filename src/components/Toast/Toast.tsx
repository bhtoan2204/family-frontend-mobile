import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from 'src/hooks/useThemeColor';

interface CustomToastProps {
    message?: string;
    type?: string;
  }

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
  let icon;
  let iconColor;
  const color = useThemeColors();
  switch (type) {
    case 'success':
      icon = 'checkmark-circle';
      iconColor = 'green';
      break;
    case 'danger':
      icon = 'alert-circle';
      iconColor = 'red';
      break;
    default:
      icon = 'information-circle';
      iconColor = 'blue';
  }

  return (
    <View style={[styles.container, {backgroundColor: color.white}]}>
      <Ionicons name={icon} size={24} color={iconColor} />
      <Text style={[styles.message, {color: color.text}]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    
  },
  message: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CustomToast;
