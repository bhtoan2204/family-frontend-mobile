import {Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Touchable,
  View,
} from 'react-native';
import {Button, Card, PaperProvider, Text, TextInput} from 'react-native-paper';
import {FamilyServices} from 'src/services/apiclient';
import {UpdateFamilyScreenProps} from 'src/navigation/NavigationTypes';
import * as Yup from 'yup';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from 'src/components/Button';

interface FormValues {
  id_family: number;
  name: string;
  description: string;
  submit: null;
}

const UpdateFamilyScreen: React.FC<UpdateFamilyScreenProps> = ({
  route,
  navigation,
}) => {
  const {id_family, name, description} = route.params;
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdateFamily = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const response = await FamilyServices.updateFamily({
        id_family: values.id_family,
        name: values.name,
        description: values.description,
      });
      Alert.alert('Success', 'Successfully updated family', [
        {
          text: 'OK',
          onPress: () => {
            actions.setStatus({success: true});
            navigation.goBack();
            //navigation.navigate('ViewFamily', { id_user: id_user, id_family: id_family });
          },
        },
      ]);
    } catch (error: any) {
      actions.setStatus({success: false});
      actions.setErrors({submit: error.message});
    }
  };

  useEffect(() => {}, []);

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 5,
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <Formik
            initialValues={{
              id_family,
              name,
              description,
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              description: Yup.string().required('Description is required'),
            })}
            onSubmit={handleUpdateFamily}>
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <View style={{padding: 20}}>
                <TextInput
                  label="Name"
                  mode="outlined"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {errors.name && touched.name && (
                  <Text style={styles.textError}>{errors.name}</Text>
                )}
                <TextInput
                  style={{marginTop: 20, borderRadius: 20}}
                  label="Description"
                  mode="outlined"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
                {errors.description && touched.description && (
                  <Text style={styles.textError}>{errors.description}</Text>
                )}
                {errors.submit && (
                  <Text style={styles.textError}>{errors.submit}</Text>
                )}
                {
                  <CustomButton
                    style={styles.button}
                    title="Save"
                    filled
                    onPress={() => handleSubmit()}
                    backgroundImage={require('src/assets/images/button.png')}
                  />
                }
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default UpdateFamilyScreen;
