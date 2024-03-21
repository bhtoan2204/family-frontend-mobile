import {Formik, FormikHelpers} from 'formik';
import {useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from 'src/components/Button';
import {COLORS, TEXTS} from 'src/constants';
import {LoginScreenProps} from 'src/navigation/NavigationTypes';
import {AuthServices} from 'src/services/apiclient';
import * as Yup from 'yup';
import styles from './styles';

interface FormValues {
  email: string;
  submit: null;
}

const ForgotPassword = ({navigation}: LoginScreenProps) => {
  const [isSent, setIsSent] = useState(false);

  const handleSendSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      if (!isSent) {
        const response = AuthServices.forgotPassword({
          email: values.email,
        });
        setIsSent(true);
      } else {
        setIsSent(false);
        values.email = '';
      }
      actions.setStatus({success: true});
    } catch (error: any) {
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
      <SafeAreaView style={styles.safeAreaStyle}>
        <View style={styles.marginHorizontal}>
          <View style={styles.marginVertical}>
            <Text style={styles.forgotPasswordTitle}>
              {TEXTS.FORGOT_PASSWORD_TITLE}
            </Text>
            <Text style={styles.accountTitle}>
              {TEXTS.FORGOT_PASSWORD_DESCRIPTION}
            </Text>
          </View>
          <Formik
            initialValues={{email: '', submit: null}}
            onSubmit={handleSendSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email(TEXTS.INVALID_EMAIL)
                .required(TEXTS.EMAIL_REQUIRED),
            })}>
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
                <View style={styles.marginBottom}>
                  <Text style={styles.title}>{TEXTS.EMAIL}</Text>
                  <View
                    style={{
                      ...styles.placeholder,
                      borderColor: errors.email ? COLORS.red : COLORS.black,
                    }}>
                    <TextInput
                      style={styles.textInput}
                      placeholder={TEXTS.EMAIL_PLACEHOLDER}
                      placeholderTextColor={
                        errors.email ? COLORS.red : COLORS.gray
                      }
                      keyboardType="email-address"
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                      value={values.email}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <View>
                      <Text style={styles.errorText}>{errors.email}</Text>
                    </View>
                  )}
                </View>
                {errors.submit && (
                  <View>
                    <Text style={styles.errorText}>{errors.submit}</Text>
                  </View>
                )}
                <CustomButton
                  title={isSent ? TEXTS.TRY_AGAIN : TEXTS.SEND}
                  filled
                  style={styles.button}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
          <View style={styles.marginVerticalCenterSmall}>
            <Pressable
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.backText}>{TEXTS.BACK_TO_LOGIN}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
