import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const OptionsModal = ({
  visible,
  onClose,
  onEditFamily,
  onLeaveFamily,
  onChangeAvatar,
}) => {
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={onEditFamily}>
              <Feather
                name="edit"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.optionText}>{translate('Edit Family')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={onChangeAvatar}>
              <Feather
                name="image"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.optionText}>{translate('Change image')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={onLeaveFamily}>
              <Feather
                name="log-out"
                size={24}
                color="black"
                style={[styles.icon, {color: 'red'}]}
              />
              <Text style={[styles.optionText, {color: 'red'}]}>
                {translate('Leave Family')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingLeft: 140,
    paddingTop: 100,
    justifyContent: 'flex-start',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  optionButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cancelText: {
    fontSize: 18,
    color: '#007AFF',
  },
  icon: {
    marginRight: 15,
  },
});

export default OptionsModal;
