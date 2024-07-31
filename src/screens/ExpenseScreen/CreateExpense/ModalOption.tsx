import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const PickerModal = ({
  isPickerOpen,
  setIsPickerOpen,
  selectedMenu,
  handleOptionPress,
}) => {
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isPickerOpen}
      onRequestClose={() => {
        setIsPickerOpen(!isPickerOpen);
      }}>
      <View style={[styles.modalContainer]}>
        <TouchableOpacity
          style={[styles.modalBackground]}
          activeOpacity={1}
          onPress={() => setIsPickerOpen(!isPickerOpen)}>
          <View
            style={[
              styles.dropdownMenu,
              {
                backgroundColor: color.background,
                borderColor: color.background,
              },
            ]}>
            <TouchableOpacity onPress={() => handleOptionPress('Expense')}>
              <View style={[styles.menuItem, {borderBottomColor: color.text}]}>
                <Image
                  source={require('src/assets/icons/expense.png')}
                  resizeMode="stretch"
                  style={styles.avatar}
                />
                <Text style={[styles.text, {color: color.text}]}>
                  {translate('Expense')}
                </Text>
                <View style={styles.checkIcon}>
                  {selectedMenu === 'Expense' && (
                    <Icon name="checkmark-sharp" size={30} color="green" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionPress('Income')}>
              <View style={[styles.menuItem, {borderBottomColor: color.text}]}>
                <Image
                  source={require('src/assets/icons/income.png')}
                  resizeMode="stretch"
                  style={styles.avatar}
                />
                <Text style={[styles.text, {color: color.text}]}>
                  {translate('Income')}
                </Text>
                <View style={styles.checkIcon}>
                  {selectedMenu === 'Income' && (
                    <Icon name="checkmark-sharp" size={30} color="green" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionPress('Utilities')}>
              <View style={[styles.menuItem, {borderBottomColor: color.text}]}>
                <Image
                  source={require('src/assets/icons/invoice.png')}
                  resizeMode="stretch"
                  style={styles.avatar}
                />
                <Text style={[styles.text, {color: color.text}]}>
                  {translate('Utilities')}
                </Text>
                <View style={styles.checkIcon}>
                  {selectedMenu === 'Utilities' && (
                    <Icon name="checkmark-sharp" size={30} color="green" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PickerModal;
