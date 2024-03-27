import {Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {Button, Card, PaperProvider, Text, TextInput} from 'react-native-paper';
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
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdateProfile = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const response = await ProfileServices.updateProfile({
        firstname: values.firstname,
        lastname: values.lastname,
        // email: values.email,
        // phone: values.phone,
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
    <PaperProvider>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
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
                onSubmit={handleUpdateProfile}>
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                    {errors.submit && (
                      <Text
                        className="
                    text-xs text-red-500 mt-[5px] ml-[5px]
                        ">
                        {errors.submit}
                      </Text>
                    )}
                    {isEdit ? (
                      <Card
                        onPress={() => handleSubmit()}
                        className="mt-10 mb-1 z-[1]">
                        <Card.Actions className="flex-col mx-2">
                          <Button
                            className="w-full rounded-xl z-[2]"
                            mode="text"
                            onPress={() => handleSubmit()}
                            textColor={COLORS.primary}>
                            Save
                          </Button>
                        </Card.Actions>
                      </Card>
                    ) : (
                      <Card
                        onPress={handleEdit}
                        className="mt-10 mx-5 mb-1 z-[1]">
                        <Card.Actions className="flex-col mx-2">
                          <Button
                            className="w-full rounded-xl z-[2]"
                            mode="text"
                            onPress={handleEdit}
                            textColor={COLORS.primary}>
                            Edit
                          </Button>
                        </Card.Actions>
                      </Card>
                    )}
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default ProfileDetail;
