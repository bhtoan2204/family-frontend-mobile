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
import { useDispatch } from 'react-redux';
import {COLORS} from 'src/constants';
import {Family} from 'src/interface/family/family';
import {Member} from 'src/interface/member/member';


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
                    ]}>
                    <View style={modalStyles.familyItemContainer}>
                      <View style={modalStyles.familyInfo}>
                        <Image
                          source={
                            family.avatar
                              ? {uri: family.avatar}
                              : require('../../assets/images/big-family_4441180.png')
                          }
                          style={modalStyles.avatarFamily}
                        />
                        <Text style={modalStyles.familyItemText}>
                          {family.name}
                        </Text>
                      </View>
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
    color: COLORS.Rhino,
    marginLeft: 10,
    fontWeight: 'bold',
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
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  selectedFamilyItem: {
    backgroundColor: '#E0F7FA',
  },
  firstItemSelected: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default FamilyListModal;
