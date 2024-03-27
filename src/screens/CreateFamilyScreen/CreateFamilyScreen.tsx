import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, TEXTS } from 'src/constants';
import profile_color from 'src/constants/profile_colors';
import ColorPickerStyles from './ColorPickerStyle';
import styles from './styles';
import { Formik, FormikHelpers } from 'formik';
import { FamilyServices } from 'src/services/apiclient';
import * as Yup from 'yup';
import CustomButton from 'src/components/Button';
import { CreateFamilyScreenProps } from 'src/navigation/NavigationTypes';

interface FormValues {
  description: string;
  name: string;
}

const CreateFamilyScreen = ({ navigation, route }: CreateFamilyScreenProps) => {
  const { id_user, id_order } = route.params;
  const profile_colors = Object.values(profile_color);
  const [value, setValue] = useState(profile_colors[0]);
  const sheet = useRef<RBSheet>(null);

  const handleCreateFamily = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const response = await FamilyServices.createFamily({
        description: values.description,
        name: values.name,
        id_order: id_order, 
      });
      actions.resetForm();
      const message = 'Successfully created family: ' + values.name; 
      Alert.alert(
        'Success',
        message,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('HomeScreen');
            },
          },
        ],
        { cancelable: false }
      );    
    } catch (error: any) {
      Alert.alert(
        'Fail',
        'Faild to create family'
        )
      //console.error('FamilyServices.createFamily error:', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerfile}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} style={styles.backButton} />
          </TouchableOpacity>
        </View>
          
        <View style={styles.header}> 
          <Text style={styles.title}>{TEXTS.CREATE_FAMILY_TITLE}</Text>
          
        </View>

        <Formik
          initialValues={{
            description: '',
            name: '',
          }}
          onSubmit={handleCreateFamily}
          validationSchema={Yup.object().shape({
            description: Yup.string().required(TEXTS.DESCRIPTION_REQUIRED),
            name: Yup.string().required(TEXTS.NAME_REQUIRED),
          })}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <Text style={styles.exampleText}>Name: </Text>
              <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange('name')}
              placeholder={TEXTS.CREATE_FAMILY_NAME_PLACEHOLDER}
              placeholderTextColor={COLORS.darkgray}
              style={styles.inputControl}
              value={values.name}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.exampleText}>Description: </Text>
              <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange('description')}
              placeholder={TEXTS.CREATE_FAMILY_DESCRIPTION_PLACEHOLDER}
              placeholderTextColor={COLORS.darkgray}
              style={styles.inputControl}
              value={values.description}
              />
            </View>

              <TouchableOpacity onPress={() => sheet.current?.open()}>
                <Text style={styles.saveButton}>{TEXTS.CHOOSE_COLOR}</Text>
              </TouchableOpacity>

              <View style={[styles.profile, { backgroundColor: value }]} />

              <CustomButton
                title={TEXTS.CREATE}
                filled
                style={styles.btn}
                onPress={handleSubmit}
              />

              <RBSheet
                customStyles={{ container: ColorPickerStyles.sheet }}
                height={440}
                openDuration={250}
                ref={sheet}
              >
                {/* Nội dung của ColorPicker */}
              </RBSheet>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateFamilyScreen;
