import React, { useEffect, useState } from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from 'src/constants';
import { Family } from 'src/interface/family/family';
import { Member } from 'src/interface/member/member';

const FamilyListModal = ({
  visible,
  onClose,
  families,
  membersMap,
  selectedFamily,
}) => {
  const [familySelect, setFamilySelect] = useState<any>(selectedFamily);

  useEffect(() => {
    console.log(membersMap[0])
    setFamilySelect(selectedFamily);
  }, [selectedFamily]);

  const handleSelectFamily = (family: Family) => {
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
      onRequestClose={handleBackdropPress}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={modalStyles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={modalStyles.modalContent}>
              <View style={modalStyles.header}>
                <Text style={modalStyles.headerText}>Select Family</Text>
                <TouchableOpacity onPress={handleBackdropPress} style={modalStyles.closeButton}>
                  <Icon name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {families.map((family: Family, index: number) => (
                  <TouchableOpacity
                    key={family.id_family}
                    onPress={() => handleSelectFamily(family)}
                    style={[
                      modalStyles.familyItem,
                      familySelect?.id_family === family.id_family
                        ? [
                            modalStyles.selectedFamilyItem,
                            index === 0 ? modalStyles.firstItemSelected : {},
                          ]
                        : {},
                    ]}
                  >
                    <View style={modalStyles.familyItemContainer}>
                      <View style={modalStyles.familyInfo}>
                        <Image
                          source={
                            family.avatar
                              ? { uri: family.avatar }
                              : require('../../assets/images/big-family_4441180.png')
                          }
                          style={modalStyles.avatarFamily}
                        />
                        <Text style={modalStyles.familyItemText}>
                          {family.name}
                        </Text>
                      </View>
                      <View style={modalStyles.membersList}>
                        {membersMap[family.id_family]?.slice(0, 3).map((member: Member) => (
                          <View
                            key={member.id_user}
                            style={modalStyles.memberItemContainer}
                          >
                            <Image
                              source={{ uri: member.user.avatar }}
                              style={modalStyles.avatar}
                            />
                          </View>
                        ))}
                        {membersMap[family.id_family]?.length > 3 && (
                          <View style={modalStyles.extraMembers}>
                            <Text style={modalStyles.extraMembersText}>
                              +{membersMap[family.id_family].length - 3}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={modalStyles.confirmButton}
                onPress={handleConfirmSelection}
              >
                <Text style={modalStyles.confirmButtonText}>Select Family</Text>
              </TouchableOpacity>
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
    maxHeight: '80%',
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
    borderBottomColor: '#ddd',
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
