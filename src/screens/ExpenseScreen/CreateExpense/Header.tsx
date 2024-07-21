import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from './styles'; 
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  selectedMenu: string;
  onPress: () => void;
  onRightButtonPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedMenu, onPress, onRightButtonPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconMoney}>
        <Icon name="list" color="#2a475e" size={25} />
      </TouchableOpacity>

      <LinearGradient
        colors={['#09203F', '#537895']}
        style={styles.circle}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.itemContainer}>
            <Text style={[styles.headerText, { marginRight: 10 }]}>
              {selectedMenu}
            </Text>
            <Octicons name="triangle-down" size={35} color="#fff" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity
        style={styles.chevronContainer}
        onPress={onRightButtonPress}>
        <Icon name="checkmark-done-sharp" color="#2a475e" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
