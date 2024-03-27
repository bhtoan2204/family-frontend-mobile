import React, { useEffect, useRef, useState } from 'react';
import {
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
import { PurchasedScreenProps } from 'src/navigation/NavigationTypes';

interface FormValues {
  description: string;
  name: string;
}

const CreateFamilyScreen = ({ navigation, route }: PurchasedScreenProps) => {
  const { id_user, id_package } = route.params;
  const profile_colors = Object.values(profile_color);
  const [value, setValue] = useState(profile_colors[0]);
  const sheet = useRef<RBSheet>(null);

  const handleCreateFamily = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      await FamilyServices.createFamily({
        description: values.description,
        name: values.name,
        id_order: 0, // Chú ý: id_order nên được cung cấp từ đâu đó
      });
      actions.resetForm(); // Đặt lại form sau khi tạo thành công
      // Thực hiện bất kỳ hành động khác sau khi tạo gia đình thành công
    } catch (error: any) {
      console.error('FamilyServices.createFamily error:', error);
      // Xử lý lỗi khi tạo gia đình
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.title}>{TEXTS.CREATE_FAMILY_TITLE}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.saveButton}>{TEXTS.SAVE}</Text>
          </TouchableOpacity>
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
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange('name')}
                placeholder={TEXTS.CREATE_FAMILY_NAME_PLACEHOLDER}
                placeholderTextColor={COLORS.darkgray}
                style={styles.inputControl}
                value={values.name}
              />

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange('description')}
                placeholder={TEXTS.CREATE_FAMILY_DESCRIPTION_PLACEHOLDER}
                placeholderTextColor={COLORS.darkgray}
                style={styles.inputControl}
                value={values.description}
              />

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
