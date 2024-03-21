import {Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {COLORS} from 'src/constants';
import {ProfileServices} from 'src/services/apiclient';
import * as Yup from 'yup';

const initialProfile = {
  avatar: '',
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
};

interface FormValues {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  submit: null;
}

const ProfileDetail = () => {
  const [profile, setProfile] = useState(initialProfile);

  const handleEditProfile = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      console.log('values', values);
      const response = await ProfileServices.updateProfile({
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
      });

      setProfile({
        avatar: response.data.avatar,
        email: response.data.email,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        phone: response.data.phone,
      });

      actions.setStatus({success: true});
    } catch (error: any) {
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await ProfileServices.profile();

        setProfile({
          avatar: response.data.avatar,
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          phone: response.data.phone,
        });
      } catch (error) {
        console.log('error', error);
      }
    };

    loadData();
  }, [profile]);

  if (!profile.firstname) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <View>
          <View className="flex-1">
            <Image
              src={profile.avatar}
              className="h-[100px] w-[100px] rounded-full self-center mt-5"
            />
          </View>
          <View className="flex-1 mx-5 mt-5">
            <Formik
              initialValues={{
                email: profile.email,
                firstname: profile.firstname,
                lastname: profile.lastname,
                phone: profile.phone,
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required('Email is required'),
                firstname: Yup.string().required('First name is required'),
                lastname: Yup.string().required('Last name is required'),
                phone: Yup.string().required('Phone is required'),
              })}
              onSubmit={handleEditProfile}>
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
                    label="First Name"
                    mode="outlined"
                    value={values.firstname}
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                  />
                  {errors.firstname && touched.firstname && (
                    <Text
                      className="
                        text-xs text-red-500 mt-[5px] ml-[5px]
                        ">
                      {errors.firstname}
                    </Text>
                  )}
                  <TextInput
                    className="mt-5"
                    label="Last Name"
                    mode="outlined"
                    value={values.lastname}
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                  />
                  {errors.lastname && touched.lastname && (
                    <Text
                      className="
                        text-xs text-red-500 mt-[5px] ml-[5px]
                      ">
                      {errors.lastname}
                    </Text>
                  )}
                  <TextInput
                    className="mt-5"
                    label="Email"
                    mode="outlined"
                    value={profile.email || values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {errors.email && touched.email && (
                    <Text
                      className="
                        text-xs text-red-500 mt-[5px] ml-[5px]
                        ">
                      {errors.email}
                    </Text>
                  )}
                  <TextInput
                    className="mt-5"
                    label="Phone Number"
                    mode="outlined"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                  {errors.phone && touched.phone && (
                    <Text
                      className="
                          text-xs text-red-500 mt-[5px] ml-[5px]
                          ">
                      {errors.phone}
                    </Text>
                  )}
                  <Button
                    className="mt-8 rounded-xl mx-5"
                    mode="contained"
                    onPress={() => handleSubmit}
                    textColor={COLORS.white}
                    buttonColor={COLORS.primary}>
                    Save
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileDetail;
