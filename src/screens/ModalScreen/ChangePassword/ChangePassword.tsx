import {Formik, FormikHelpers} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {COLORS, TEXTS} from 'src/constants';
import {ProfileServices} from 'src/services/apiclient';
import * as Yup from 'yup';

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  submit: null;
}

const ChangePassword = () => {
  const handleChangepassword = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      console.log('values', values);
      const response = await ProfileServices.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      actions.setStatus({success: true});
    } catch (error: any) {
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };
  return (
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
            {errors.submit && (
              <Text
                className="
                        text-xs text-red-500 mt-[5px] ml-[5px]
                        ">
                {errors.submit}
              </Text>
            )}
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
            <Button
              className="mt-8 rounded-xl mx-5"
              mode="contained"
              onPress={() => handleSubmit}
              textColor={COLORS.white}
              buttonColor={COLORS.primary}>
              {TEXTS.SAVE}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword;
