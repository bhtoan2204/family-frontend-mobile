import {Formik, FormikHelpers} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {Button, Card, PaperProvider, Text, TextInput} from 'react-native-paper';
import {COLORS, TEXTS} from '../../../constants';
import {MainProfileScreenProps} from '../../../navigation/NavigationTypes';
import {ProfileServices} from '../../../services/apiclient';
import * as Yup from 'yup';

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  submit: null;
}

const ChangePassword = ({navigation}: MainProfileScreenProps) => {
  const handleChangepassword = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    console.log('values', values);
    try {
      if (values.oldPassword === values.newPassword) {
        actions.setErrors({
          submit: 'Old Password and New Password cannot be the same',
        });
        return;
      }
      if (values.newPassword !== values.confirmPassword) {
        actions.setErrors({submit: 'Password does not match'});
        return;
      }
      await ProfileServices.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      actions.setStatus({success: true});
      navigation.navigate('MainProfile');
    } catch (error: any) {
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };
  return (
    <PaperProvider>
      <View className="flex-1 mx-5 mt-20">
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            oldPassword: Yup.string().required('Old Password is required'),
            newPassword: Yup.string().required('New Password is required'),
            confirmPassword: Yup.string().required(
              'Confirm Password is required',
            ),
          })}
          onSubmit={handleChangepassword}>
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <View>
              <TextInput
                label="Old Password"
                mode="outlined"
                value={values.oldPassword}
                onChangeText={handleChange('oldPassword')}
                onBlur={handleBlur('oldPassword')}
              />
              {errors.oldPassword && touched.oldPassword && (
                <Text
                  className="
              text-xs text-red-500 mt-[5px] ml-[5px]
              ">
                  {errors.oldPassword}
                </Text>
              )}
              <TextInput
                className="mt-5"
                label="New Password"
                mode="outlined"
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
              />
              {errors.newPassword && touched.newPassword && (
                <Text
                  className="
                text-xs text-red-500 mt-[5px] ml-[5px]
                ">
                  {errors.newPassword}
                </Text>
              )}
              <TextInput
                className="mt-5"
                label="Confirm Password"
                mode="outlined"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text
                  className="
                text-xs text-red-500 mt-[5px] ml-[5px]
                ">
                  {errors.confirmPassword}
                </Text>
              )}
              {errors.submit && (
                <Text
                  className="
                text-xs text-red-500 mt-[5px] ml-[5px]
                ">
                  {errors.submit}
                </Text>
              )}
              <Card className="mt-10 mb-1 z-[1]" onPress={() => handleSubmit()}>
                <Card.Actions className="flex-col mx-2">
                  <Button
                    className="w-full rounded-xl z-[2]"
                    mode="text"
                    onPress={() => handleSubmit}
                    textColor={COLORS.primary}>
                    {TEXTS.SAVE}
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          )}
        </Formik>
      </View>
    </PaperProvider>
  );
};

export default ChangePassword;
