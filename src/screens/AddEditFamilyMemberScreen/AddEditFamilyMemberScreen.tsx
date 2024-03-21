import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomButton from 'src/components/Button';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, TEXTS} from 'src/constants';
import profile_color from 'src/constants/profile_colors';
import ColorPickerStyles from './ColorPickerStyle';
import styles from './styles';
import {FamilyServices} from 'src/services/apiclient';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';

interface FormValues {
  id_family: number;
  gmail: string;
  phone: string;
  role: string;
  color: string;
  submit: null;
}

const AddFamilyMemberScreen = () => {
  const sheet = useRef();
  const profile_colors = Object.values(profile_color);
  const [value, setValue] = useState(profile_colors[0]);
  const handleAddMember = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      console.log('Hello World');
      const result = await FamilyServices.addMember({
        id_family: values.id_family,
        gmail: values.gmail,
        phone: values.phone,
        role: values.role,
      });
      console.log('FamilyServices.addMember result:', result);

      actions.setStatus({success: true});
    } catch (error: any) {
      console.log('FamilyServices.addMember error:', error);
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.headerfile}>
              <TouchableOpacity>
                <Icon name="arrow-back" size={24} style={styles.backButton} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.saveButton}>{TEXTS.SAVE}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.header}>
              <Text style={styles.title}>{TEXTS.ADD_FAMILY_MEMBER_TITLE}</Text>
            </View>
            <Formik
              initialValues={{
                id_family: 0,
                gmail: '',
                phone: '',
                role: '',
                color: '',
                submit: null,
              }}
              onSubmit={handleAddMember}
              validationSchema={Yup.object().shape({
                id_family: Yup.number().required(TEXTS.FAMILY_ID_REQUIRED),
                gmail: Yup.string()
                  .email(TEXTS.INVALID_EMAIL)
                  .required(TEXTS.EMAIL_REQUIRED),
                phone: Yup.string()
                  .min(10, TEXTS.INVALID_PHONE_NUMBER)
                  .required(TEXTS.PHONE_NUMBER_REQUIRED),
                role: Yup.string().required(TEXTS.RELATION_REQUIRED),
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
                <View style={styles.form}>
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>
                      {TEXTS.FAMILY_ID_LABEL}l
                    </Text>
                    <View
                      style={{
                        borderColor: errors.id_family
                          ? COLORS.red
                          : COLORS.black,
                      }}>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        onChangeText={handleChange('id_family')}
                        onBlur={handleBlur('id_family')}
                        placeholder={TEXTS.FAMILY_ID_PLACEHOLDER}
                        placeholderTextColor={COLORS.darkgray}
                        style={styles.inputControl}
                        value={values.id_family.toString()}
                      />
                    </View>
                    {errors.id_family && touched.id_family && (
                      <View>
                        <Text style={styles.errorText}>{errors.id_family}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>{TEXTS.PHONE}</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="phone-pad"
                      onBlur={handleBlur('phoneNumber')}
                      onChangeText={handleChange('phone')}
                      placeholder={TEXTS.PHONE_PLACEHOLDER}
                      placeholderTextColor={COLORS.darkgray}
                      style={styles.inputControl}
                      value={values.phone}></TextInput>
                  </View>

                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>
                      {TEXTS.FAMILY_MEMBER_EMAIL_LABEL}l
                    </Text>
                    <View
                      style={{
                        borderColor: errors.gmail ? COLORS.red : COLORS.black,
                      }}>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        onChangeText={handleChange('gmail')}
                        onBlur={handleBlur('gmail')}
                        placeholder={TEXTS.FAMILY_MEMBER_EMAIL_PLACEHOLDER}
                        placeholderTextColor={COLORS.darkgray}
                        style={styles.inputControl}
                        value={values.gmail}
                      />
                    </View>
                    {errors.gmail && touched.gmail && (
                      <View>
                        <Text style={styles.errorText}>{errors.gmail}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>
                      {TEXTS.FAMILY_MEMBERS_RELATION_LABEL}
                    </Text>

                    <View
                      style={{
                        borderColor: errors.role ? COLORS.red : COLORS.black,
                      }}>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        onChangeText={handleChange('role')}
                        placeholder={TEXTS.FAMILY_MEMBERS_RELATION_PLACEHOLDER}
                        placeholderTextColor={COLORS.darkgray}
                        style={styles.inputControl}
                        value={values.role}
                      />
                    </View>
                    {errors.role && touched.role && (
                      <View>
                        <Text style={styles.errorText}>{errors.role}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.colorfile}>
                    <TouchableOpacity>
                      <Text style={styles.saveButton}>
                        {TEXTS.CHOOSE_COLOR}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View
                        style={[
                          styles.profile,
                          {backgroundColor: value},
                        ]}></View>
                    </TouchableOpacity>
                  </View>

                  <RBSheet
                    customStyles={{container: ColorPickerStyles.sheet}}
                    height={440}
                    openDuration={250}
                    ref={sheet}>
                    <View style={ColorPickerStyles.sheetHeader}>
                      <Text style={ColorPickerStyles.sheetHeaderTitle}>
                        {TEXTS.SELECT_PROFILE_COLOR_TITLE}
                      </Text>
                    </View>
                    <View style={ColorPickerStyles.sheetBody}>
                      <View
                        style={[
                          ColorPickerStyles.profile,
                          {backgroundColor: value},
                        ]}>
                        <Text style={ColorPickerStyles.profileText}>
                          {TEXTS.PROFILE_NAME}
                        </Text>
                      </View>
                      <View style={ColorPickerStyles.group}>
                        {profile_colors.map((color, index) => {
                          const isActive = value === color;
                          return (
                            <View key={color}>
                              <TouchableWithoutFeedback
                                onPress={() => {
                                  setValue(color);
                                }}>
                                <View
                                  style={[
                                    ColorPickerStyles.circle,
                                    isActive && {borderColor: color},
                                  ]}>
                                  <View
                                    style={[
                                      ColorPickerStyles.circleInside,
                                      {backgroundColor: color},
                                    ]}
                                  />
                                </View>
                              </TouchableWithoutFeedback>
                            </View>
                          );
                        })}
                      </View>
                      <TouchableOpacity style={ColorPickerStyles.btn}>
                        <Text style={ColorPickerStyles.btnText}>
                          {TEXTS.CONFIRM}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </RBSheet>
                  <CustomButton
                    title={TEXTS.ADD}
                    filled
                    style={styles.btnText}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddFamilyMemberScreen;
