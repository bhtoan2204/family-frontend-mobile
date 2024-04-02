import { Formik, FormikHelpers } from 'formik';
import React, { useEffect } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Button, Card, PaperProvider, Text, TextInput } from 'react-native-paper';
import { UpdateEventScreenProps } from 'src/navigation/NavigationTypes';
import * as Yup from 'yup';
import styles from './styles';
import CalendarServices from 'src/services/apiclient/CalendarService';

interface FormValues {
  id_calendar: number | undefined;
  title: string;
  description: string;
  datetime: string;
}

const UpdateEventScreen: React.FC<UpdateEventScreenProps> = ({ navigation, route }) => {
  const { id_calendar: initialId, title: initialTitle, description: initialDescription, datetime: initialDatetime } = route.params || {};

  const handleUpdateEvent = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      const response = await CalendarServices.UpdateEvent(
        values.id_calendar || 0,
        values.title || '',
        values.description || '',
        values.datetime || ''
      );
      Alert.alert(
        'Success',
        'Successfully updated family',
        [
          {
            text: 'OK',
            onPress: () => {
              actions.setStatus({ success: true });
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error: any) {
      actions.setStatus({ success: false });
      actions.setErrors({ submit: error.message } as any );
    }
  };

  useEffect(() => {
  }, []);

  return (
    <PaperProvider>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
              <Formik
                initialValues={{
                  id_calendar: initialId || undefined,
                  title: initialTitle || '',
                  description: initialDescription || '',
                  datetime: initialDatetime || '',
                }}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required('Title is required'),
                  description: Yup.string().required('Description is required'),
                  datetime: Yup.string().required('Datetime is required'),
                })}
                onSubmit={(values, actions) => handleUpdateEvent(values, actions)}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values,
                }) => (
                  <View>
                    <TextInput
                      label="Title"
                      mode="outlined"
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                    />
                    {errors.title && touched.title && (
                      <Text style={styles.textError}>{errors.title}</Text>
                    )}
                    <TextInput
                      style={{ marginTop: 5 }}
                      label="Description"
                      mode="outlined"
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                    />
                    {errors.description && touched.description && (
                      <Text style={styles.textError}>{errors.description}</Text>
                    )}
                    <TextInput
                      style={{ marginTop: 5 }}
                      label="Datetime"
                      mode="outlined"
                      value={values.datetime}
                      onChangeText={handleChange('datetime')}
                      onBlur={handleBlur('datetime')}
                    />
                    {errors.datetime && touched.datetime && (
                      <Text style={styles.textError}>{errors.datetime}</Text>
                    )}
                    <Card onPress={() => handleSubmit()} style={{ marginTop: 10, marginBottom: 1 }}>
                      <Card.Actions style={{ flexDirection: 'column', marginHorizontal: 2 }}>
                        <Button
                          style={styles.button}
                          mode="contained"
                          onPress={() => handleSubmit()}
                        >
                          Save
                        </Button>
                      </Card.Actions>
                    </Card>

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

export default UpdateEventScreen;
