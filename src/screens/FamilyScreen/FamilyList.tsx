import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {COLORS} from 'src/constants';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Family} from 'src/interface/family/family';
import {Member} from 'src/interface/member/member';
import {selectAllFamilyMembers} from 'src/redux/slices/FamilySlice';
import {getTranslate} from 'src/redux/slices/languageSlice';

const FamilyListModal = ({visible, onClose, families, selectedFamily}) => {
  const [familySelect, setFamilySelect] = useState<any>(selectedFamily);
  const members = useSelector(selectAllFamilyMembers);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  useEffect(() => {
    setFamilySelect(selectedFamily);
  }, [selectedFamily]);

  const handleSelectFamily = (family: Family) => {
    onClose(family);
    setFamilySelect(family);
  };

  const handleBackdropPress = () => {
    onClose(familySelect);
  };

  const handleConfirmSelection = () => {
    onClose(familySelect);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleBackdropPress}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={modalStyles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                modalStyles.modalContent,
                {backgroundColor: color.background},
              ]}>
              <View style={modalStyles.header}>
                <Text style={[modalStyles.headerText, {color: color.text}]}>
                  {translate('Select Family')}
                </Text>
                <TouchableOpacity
                  onPress={handleBackdropPress}
                  style={modalStyles.closeButton}>
                  <Icon name="close" size={24} color={color.text} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {families.map((family: Family, index: number) => (
                  <TouchableOpacity
                    key={family.id_family}
                    onPress={() => handleSelectFamily(family)}
                    style={[
                      modalStyles.familyItem,
                      {backgroundColor: color.white},
                      familySelect?.id_family === family.id_family
                        ? [
                            modalStyles.selectedFamilyItem,
                            index === 0 ? modalStyles.firstItemSelected : {},
                          ]
                        : {},
                    ]}>
                    <View
                      style={[
                        modalStyles.familyItemContainer,
                        {backgroundColor: color.background},
                      ]}>
                      <View style={modalStyles.familyInfo}>
                        <Image
                          source={
                            family.avatar
                              ? {uri: family.avatar}
                              : require('../../assets/images/big-family_4441180.png')
                          }
                          style={modalStyles.avatarFamily}
                        />
                        <Text
                          style={[
                            modalStyles.familyItemText,
                            {color: color.text},
                          ]}>
                          {family.name}
                        </Text>
                      </View>
                      <View style={modalStyles.membersList}>
                        {members[family.id_family] ? (
                          <>
                            <View style={modalStyles.membersList}>
                              {members[family.id_family]
                                .slice(0, 3)
                                .map((member: any) => (
                                  <View
                                    key={member.id_user}
                                    style={modalStyles.memberItemContainer}>
                                    <Image
                                      source={{uri: member.user.avatar}}
                                      style={modalStyles.avatar}
                                    />
                                  </View>
                                ))}
                            </View>
                            {members[family.id_family].length > 3 && (
                              <View style={modalStyles.extraMembers}>
                                <Text style={modalStyles.extraMembersText}>
                                  +{members[family.id_family].length - 3}
                                </Text>
                              </View>
                            )}
                          </>
                        ) : (
                          <Text>{translate('No members found')}</Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '100%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ccc',
  },
  closeButton: {
    padding: 5,
  },
  familyItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#8d94a5',
  },
  familyItemContainer: {
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  familyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  familyItemText: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
  },
  membersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  memberItemContainer: {
    alignItems: 'center',
    marginRight: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  avatarFamily: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedFamilyItem: {
    backgroundColor: '#E0F7FA',
  },
  firstItemSelected: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.Primary,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  extraMembers: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.BlueLight,
    marginLeft: 5,
  },
  extraMembersText: {
    color: COLORS.Rhino,
    fontWeight: 'bold',
  },
});

export default FamilyListModal;
