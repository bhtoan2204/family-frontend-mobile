import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Member } from 'src/interface/member/member';

const SelectMember = ({ members, memberSelected, setMemberSelected }) => {

  useEffect(() => {
    if (members.length > 0 && !memberSelected) {
        console.log(members[0])
      setMemberSelected(members[0]);
    }
  }, []);

  const handleMemberPress = (member: Member) => {
    setMemberSelected(member);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Member</Text>
      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()} 
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.memberItem,
              memberSelected?.id === item.id ? styles.selectedMemberItem : null
            ]}
            onPress={() => handleMemberPress(item)}
          >
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <Text style={[
              styles.memberText,
              memberSelected?.id === item.id ? styles.selectedMemberText : null
            ]}>
              {item.user.firstname} {item.user.lastname}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  memberItem: {
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  selectedMemberItem: {
    backgroundColor: '#d1ecf1',
    borderColor: '#17a2b8',
    borderWidth: 2,
  },
  memberText: {
    color: '#333',
    marginTop: 5,
  },
  selectedMemberText: {
    color: '#17a2b8',
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
});

export default SelectMember;
