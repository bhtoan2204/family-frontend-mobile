import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeSwitcherProps } from 'src/navigation/NavigationTypes';
import { selectDarkMode, toggleDarkMode } from 'src/redux/slices/ThemeSlice';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import thư viện icon

const ThemeSwitcher = ({ navigation }: ThemeSwitcherProps) => {
  const isDarkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#181818' : '#ffffff' }]}>
      <Text style={[styles.text, { color: isDarkMode ? '#ffffff' : '#333333' }]}>
        Dark Mode: {isDarkMode ? 'On' : 'Off'}
      </Text>
      <TouchableOpacity onPress={handleToggle} style={[styles.button, { backgroundColor: isDarkMode ? '#3b5998' : '#DDDDDD' }]}>
        <Text style={{ color: '#ffffff' }}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Text>
        <Icon name={isDarkMode ? 'moon-o' : 'sun-o'} size={18} color={isDarkMode ? '#ffffff' : '#333333'} style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ThemeSwitcher;
