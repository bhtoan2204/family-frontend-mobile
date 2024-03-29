import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { Table, Row } from 'react-native-table-component';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS, TEXTS } from 'src/constants';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CustomButton from 'src/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { HomeScreenProps, ViewAllMemberScreenProps } from 'src/navigation/NavigationTypes';
import ConfirmButton from 'src/components/Button/ButtonConfirm';
interface FormValues {
  id_family: number;
  submit: null;
}

type Member = {
  id_user: number;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
};

const ViewAllMemberScreen = ({ navigation }: ViewAllMemberScreenProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const tableHead = ['User ID', 'Last Name', 'First Name', 'Email', 'Phone'];
  const handleViewAllMember = async (
    values: FormValues = { id_family: 0, submit: null },
    actions?: FormikHelpers<FormValues>,
  ) => {
    try {
      const result = await FamilyServices.getAllMembers({
        id_family: values.id_family,
      });
      console.log('FamilyServices.getAllMembers result:', result);
      setMembers(result); // Update the members state
    } catch (error: any) {
      console.log('FamilyServices.getAllMembers error:', error);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View>
            <Formik
              initialValues={{
                id_family: 0,
                submit: null,
              }}
              onSubmit={handleViewAllMember}
              validationSchema={Yup.object().shape({
                id_family: Yup.number().required(TEXTS.FAMILY_ID_REQUIRED),
              })}
              validateOnMount>
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                setFieldValue,
              }) => (
                <View style={styles.container}>
                  <View style={styles.header}>
                    <View style={styles.headerAction}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('HomeScreen' as never);
                        }}>
                        <FeatherIcon name="chevron-left" size={24} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.headerSearch}>
                      <View style={styles.headerSearchIcon}>
                        <FeatherIcon color="#778599" name="search" size={17} />
                      </View>

                      <TextInput
                        autoCapitalize="words"
                        autoComplete="name"
                        placeholder="Search..."
                        placeholderTextColor="#778599"
                        onChangeText={handleChange('id_family')}
                        onBlur={handleBlur('id_family')}
                        value={values.id_family.toString()}
                        style={styles.headerSearchInput}
                      />
                    </View>

                    <View
                      style={[styles.headerAction, { alignItems: 'flex-end' }]}>
                      <TouchableOpacity
                        onPress={() => {
                          // handle onPress
                        }}>
                        <FeatherIcon name="more-vertical" size={24} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* <TextInput
                    placeholder={TEXTS.FAMILY_ID_PLACEHOLDER}
                    onChangeText={handleChange('id_family')}
                    onBlur={handleBlur('id_family')}
                    value={values.id_family.toString()}
                  /> */}
                  {errors.id_family && touched.id_family && (
                    <Text style={styles.errorText}>{errors.id_family}</Text>
                  )}

                  <ConfirmButton
                    title={TEXTS.CONFIRM}
                    style={styles.transparentButton}
                    onPress={handleSubmit}
                  />
                  {errors.submit && (
                    <Text style={styles.errorText}>{errors.submit}</Text>
                  )}
                </View>
              )}
            </Formik>
            <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <SwipeListView
              data={members}
              renderItem={({ item: member }) => (
                <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
                  <Row
                    data={[
                      member.id_user,
                      member.lastname,
                      member.firstname,
                      member.email,
                      member.phone,
                    ]}
                    style={styles.rowFront}
                    textStyle={styles.text}
                  />
                </Table>
              )}
            // renderHiddenItem={({item: family}) => (
            //   // <View
            //   //   style={[
            //   //     styles.rowBack,
            //   //     {justifyContent: 'flex-end', flexDirection: 'row'},
            //   //   ]}>
            //   //   <TouchableOpacity
            //   //     style={[styles.button, {backgroundColor: '#006AFF'}]}
            //   //     onPress={() => refRBSheet.current?.open()}>
            //   //     <Text style={styles.buttonText}>Edit</Text>
            //   //   </TouchableOpacity>
            //   //   <TouchableOpacity
            //   //     style={[styles.button, {backgroundColor: '#FE3A2F'}]}
            //   //     onPress={() => {
            //   //       console.log('Deleting family with id:', family.id_family);
            //   //       handleDeleteFamily(family.id_family);
            //   //     }}>
            //   //     <Text style={styles.buttonText}>Delete</Text>
            //   //   </TouchableOpacity>
            //   // </View>
            // )}
            // rightOpenValue={-150.5}
            // leftOpenValue={0}
            // keyExtractor={family => family.id_family.toString()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ViewAllMemberScreen;
