import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Dimensions } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { Table, Row } from 'react-native-table-component';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS, TEXTS } from 'src/constants';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ConfirmButton from 'src/components/Button/ButtonConfirm';
import { AllMemberScreenProps } from 'src/navigation/NavigationTypes';

interface FormValues {
  id_family: number;
  submit: null;
}

type Member = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

const ViewAllMemberScreen = ({ navigation, route }: AllMemberScreenProps) => {
  const { id_family } = route.params;
  const [members, setMembers] = useState<Member[]>([]);
  const tableHead = ['Last Name', 'First Name', 'Email', 'Phone'];

  useEffect(() => {
    handleViewAllMember();
  }, []);

  const handleViewAllMember = async () => {
    try {
      const result = await FamilyServices.getAllMembers({ id_family: id_family });
      console.log('FamilyServices.getAllMembers result:', result);
      setMembers(result);
    } catch (error: any) {
      console.log('FamilyServices.getAllMembers error:', error);
    }
  };

    



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen'); }}>
            <FeatherIcon name="chevron-left" size={24} />
          </TouchableOpacity>

          <View style={styles.headerSearch}>
            <FeatherIcon color="#778599" name="search" size={17} />
            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Search..."
              placeholderTextColor="#778599"
              style={styles.headerSearchInput}
            />
          </View>

          <TouchableOpacity onPress={() => { }}>
            <FeatherIcon name="more-vertical" size={24} />
          </TouchableOpacity>
        </View>

        {/* <ConfirmButton
          title={TEXTS.CONFIRM}
          style={styles.transparentButton}
          onPress={handleSubmit}
        /> */}

        <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        </Table>

        <SwipeListView
          data={members}
          renderItem={({ item: member }) => (
            <Row
              data={[member.lastname, member.firstname, member.email, member.phone]}
              style={styles.rowFront}
              textStyle={styles.text}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllMemberScreen;
