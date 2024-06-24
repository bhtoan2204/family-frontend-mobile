import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Family } from 'src/interface/family/family';
import { Member } from 'src/interface/member/member';
import { FamilyServices } from 'src/services/apiclient';

const FamilyListModal = ({ visible, onClose, families, membersMap, selectedFamily }) => {
  const [familySelect, setFamilySelect] = useState<any>(selectedFamily);
  useEffect(() => {
    const updateFamilySelect = async () => {
      setFamilySelect(selectedFamily);
    };

    updateFamilySelect();
  }, [selectedFamily]);
 
  const handleSelectFamily = (family: Family) => {
    setFamilySelect(family);
    onClose(family);
  };

  const handleBackdropPress = () => {
    onClose(familySelect);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleBackdropPress}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={modalStyles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={modalStyles.modalContent}>
              {families.map((family: Family) => (
                <TouchableOpacity key={family.id_family} onPress={() => handleSelectFamily(family)}>
                  <View style={modalStyles.familyItemContainer}>
                    <Text style={modalStyles.familyItemText}>{family.name}</Text>
                    {familySelect?.id_family === family.id_family && (
                      <Icon name="checkmark-circle-outline" size={20} color="green" style={modalStyles.checkIcon} />
                    )}
                  </View>
                  <View style={modalStyles.membersList}>
                    {membersMap[family.id_family]?.map((member: { id_user: React.Key | null | undefined; avatar: any; }) => (
                      <View key={member.id_user} style={modalStyles.memberItemContainer}>
                        <Image source={{ uri: member.avatar }} style={modalStyles.avatar} />
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
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
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxHeight: '50%',
  },
  familyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  familyItemText: {
    fontSize: 18,
    color: 'black',
  },
  checkIcon: {
    marginLeft: 10,
  },
  membersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingLeft: 10,
  },
  memberItemContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default FamilyListModal;
