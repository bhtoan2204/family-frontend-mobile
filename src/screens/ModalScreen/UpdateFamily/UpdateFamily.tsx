import { Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Button, Card, PaperProvider, Text, TextInput } from 'react-native-paper';
import { FamilyServices } from 'src/services/apiclient';
import { UpdateFamilyScreenProps } from 'src/navigation/NavigationTypes';
import { COLORS } from 'src/constants';
import * as Yup from 'yup';

interface FamilyData {
  id_user: string;
  id_family: number;
  name: string;
  description: string;
}

interface FormValues {
  id_user: string;
  id_family: number;
  name: string;
  description: string;
  submit: null;
}

const UpdateFamilyScreen: React.FC<UpdateFamilyScreenProps> = ({ route }) => {
  const { id_user, id_family, name, description } = route.params;
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdateFamily = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      const response = await FamilyServices.updateFamily({
        id_family: values.id_family,
        name: values.name,
        description: values.description,
      });

      actions.setStatus({ success: true });
    } catch (error: any) {
      actions.setStatus({ success: false });
      actions.setErrors({ submit: error.message });
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
              {/* Your image component */}
            </View>
            <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
              <Formik
                initialValues={{
                  id_user,
                  id_family,
                  name,
                  description,
                  submit: null,
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('Name is required'),
                  description: Yup.string().required('Description is required'),
                })}
                onSubmit={handleUpdateFamily}
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
                      disabled={!isEdit}
                      label="Name"
                      mode="outlined"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                    />
                    {errors.name && touched.name && (
                      <Text style={{ color: 'red' }}>{errors.name}</Text>
                    )}
                    <TextInput
                      disabled={!isEdit}
                      style={{ marginTop: 5 }}
                      label="Description"
                      mode="outlined"
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                    />
                    {errors.description && touched.description && (
                      <Text style={{ color: 'red' }}>{errors.description}</Text>
                    )}
                    {errors.submit && (
                      <Text style={{ color: 'red' }}>{errors.submit}</Text>
                    )}
                    {isEdit ? (
                        <Card onPress={() => handleSubmit()} style={{ marginTop: 10, marginBottom: 1 }}>
                            <Card.Actions style={{ flexDirection: 'column', marginHorizontal: 2 }}>
                            <Button
                                style={{ width: '100%', borderRadius: 20 }}
                                mode="contained"
                                onPress={() => handleSubmit()} // Gọi hàm handleSubmit của Formik
                                color={COLORS.primary}
                            >
                                Save
                            </Button>
                            </Card.Actions>
                        </Card>
                        ) : (
                        <Card onPress={handleEdit} style={{ marginTop: 10, marginHorizontal: 5, marginBottom: 1 }}>
                            <Card.Actions style={{ flexDirection: 'column', marginHorizontal: 2 }}>
                            <Button
                                style={{ width: '100%', borderRadius: 20 }}
                                mode="contained"
                                onPress={handleEdit}
                                color={COLORS.primary}
                            >
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

export default UpdateFamilyScreen;
