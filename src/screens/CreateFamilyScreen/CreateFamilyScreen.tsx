import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, TEXTS} from 'src/constants';
import profile_color from 'src/constants/profile_colors';
import ColorPickerStyles from './ColorPickerStyle';
import styles from './styles';
import {Formik, FormikHelpers} from 'formik';
import {FamilyServices} from 'src/services/apiclient';
import * as Yup from 'yup';
import CustomButton from 'src/components/Button';

interface FormValues {
  description: string;
  name: string;
  submit: null;
  color: string;
  id_order: number;
}

const CreateFamilyScreen = () => {
  const navigation = useNavigation();
  const profile_colors = Object.values(profile_color);
  const [value, setValue] = useState(profile_colors[0]);
  const sheet = useRef();
  const handleCreateFamily = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      console.log('Hello World');
      await FamilyServices.createFamily({
        description: values.description,
        name: values.name,
        id_order: values.id_order,
      });
      actions.setStatus({success: true});
    } catch (error: any) {
      console.error('FamilyServices.createFamily error:', error);
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerfile}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} style={styles.backButton} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.saveButton}>{TEXTS.SAVE}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>{TEXTS.CREATE_FAMILY_TITLE}</Text>
        </View>

        <Formik
          initialValues={{
            description: '',
            name: '',
            color: '',
            id_order: 0,
            submit: null,
          }}
          onSubmit={handleCreateFamily}
          validationSchema={Yup.object().shape({
            description: Yup.string().required(TEXTS.DESCRIPTION_REQUIRED),
            name: Yup.string().required(TEXTS.NAME_REQUIRED),
          })}
          //validateOnMount
        >
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
                  {TEXTS.CREATE_FAMILY_NAME_LABEL}
                </Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="name-phone-pad"
                  onChangeText={handleChange('name')}
                  placeholder={TEXTS.CREATE_FAMILY_NAME_PLACEHOLDER}
                  placeholderTextColor={COLORS.darkgray}
                  style={styles.inputControl}
                  value={values.name}></TextInput>
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>
                  {TEXTS.CREATE_FAMILY_DESCRIPTION_LABEL}
                </Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="name-phone-pad"
                  onChangeText={handleChange('description')}
                  placeholder={TEXTS.CREATE_FAMILY_DESCRIPTION_PLACEHOLDER}
                  placeholderTextColor={COLORS.darkgray}
                  style={styles.inputControl}
                  value={values.description}></TextInput>
              </View>

              <View style={styles.colorfile}>
                <TouchableOpacity>
                  <Text style={styles.saveButton}>{TEXTS.CHOOSE_COLOR}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={[styles.profile, {backgroundColor: value}]}></View>
                </TouchableOpacity>
              </View>

              <RBSheet
                customStyles={{container: ColorPickerStyles.sheet}}
                height={440}
                openDuration={250}
                ref={sheet}>
                <View style={ColorPickerStyles.sheetHeader}>
                  <Text style={ColorPickerStyles.sheetHeaderTitle}>
                    {TEXTS.SELECT_FAMILY_COLOR_TITLE}
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
                  <TouchableOpacity
                    style={ColorPickerStyles.btn}
                    onPress={() => {
                      // handle onPress
                      //heet.current?.close();
                    }}>
                    <Text style={ColorPickerStyles.btnText}>
                      {TEXTS.CONFIRM}
                    </Text>
                  </TouchableOpacity>
                </View>
              </RBSheet>
              {/* <TouchableOpacity
                style={styles.btn}
                // onPress={() => {
                //   handleSubmit();
                // }}
                onPress={handleSubmit}>
                <Text style={styles.btnText}>{TEXTS.CREATE}</Text>
              </TouchableOpacity> */}
              <CustomButton
                title={TEXTS.CREATE}
                filled
                style={styles.btn}
                //onPress={handleSubmit}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CreateFamilyScreen;
