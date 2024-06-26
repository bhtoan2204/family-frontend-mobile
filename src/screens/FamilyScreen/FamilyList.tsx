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
import Icon from 'react-native-vector-icons/Ionicons';
import {Family} from 'src/interface/family/family';
import {Member} from 'src/interface/member/member';
import {FamilyServices} from 'src/services/apiclient';

const FamilyListModal = ({
  visible,
  onClose,
  families,
  membersMap,
  selectedFamily,
}) => {
  const [familySelect, setFamilySelect] = useState<any>(selectedFamily);

  useEffect(() => {
    setFamilySelect(selectedFamily);
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
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleBackdropPress}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={modalStyles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={modalStyles.modalContent}>
              {/* <View style={modalStyles.header}>
                <Text style={modalStyles.headerText}>Select a Family</Text>
              </View> */}
              <ScrollView>
                {families.map((family: Family) => (
                  <TouchableOpacity
                    key={family.id_family}
                    onPress={() => handleSelectFamily(family)}
                    style={modalStyles.familyItem}>
                    <View style={modalStyles.familyItemContainer}>
                      <View style={modalStyles.familyInfo}>
                        <Image
                          source={{uri: family.avatar}}
                          style={modalStyles.avatarFamily}
                        />
                        <Text style={modalStyles.familyItemText}>
                          {family.name}
                        </Text>
                      </View>
                      {familySelect?.id_family === family.id_family && (
                        <Icon
                          name="checkmark-circle-outline"
                          size={30}
                          color="green"
                          style={modalStyles.checkIcon}
                        />
                      )}
                    </View>
                    <View style={modalStyles.membersList}>
                      {membersMap[family.id_family]?.map((member: Member) => (
                        <View
                          key={member.id_user}
                          style={modalStyles.memberItemContainer}>
                          <Image
                            source={{uri: member.avatar}}
                            style={modalStyles.avatar}
                          />
                        </View>
                      ))}
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
    maxHeight: '80%',
  },
  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  familyItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  familyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  familyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  familyItemText: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 10,
  },
  checkIcon: {
    marginLeft: 10,
  },
  membersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  memberItemContainer: {
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  avatarFamily: {
    width: 60,
    height: 50,
    borderRadius: 40,
  },
});

export default FamilyListModal;
