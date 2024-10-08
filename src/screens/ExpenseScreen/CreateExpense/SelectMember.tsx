import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Member} from 'src/interface/member/member';
import {getTranslate} from 'src/redux/slices/languageSlice';

const SelectMember = ({members, memberSelected, setMemberSelected}) => {
  const translate = useSelector(getTranslate);
  useEffect(() => {
    console.log(members);
    if (members.length > 0 && !memberSelected) {
      console.log(members[0]);
      setMemberSelected(members[0]);
    }
  }, []);
  const color = useThemeColors();

  const handleMemberPress = (member: Member) => {
    setMemberSelected(member);
  };

  return (
    <View style={[styles.container, {backgroundColor: color.background}]}>
      <Text style={[styles.title, {color: color.text}]}>
        {translate('Create by')}
      </Text>
      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.memberItem,
              {backgroundColor: color.background},
              memberSelected?.id === item.id
                ? [styles.selectedMemberItem, {backgroundColor: color.white}]
                : null,
            ]}
            onPress={() => handleMemberPress(item)}>
            <Image source={{uri: item.user.avatar}} style={styles.avatar} />
            <Text
              style={[
                styles.memberText,
                {color: color.text},
                memberSelected?.id === item.id
                  ? [styles.selectedMemberText, {backgroundColor: color.white}]
                  : null,
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
    marginBottom: 15,
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
