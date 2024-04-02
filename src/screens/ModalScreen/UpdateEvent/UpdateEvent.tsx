import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, View, TextInput } from 'react-native';
import { Button, Card, PaperProvider, Text } from 'react-native-paper';
import { UpdateEventScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import CalendarServices from 'src/services/apiclient/CalendarService';
import DateTimePicker from '@react-native-community/datetimepicker';

const UpdateEventScreen: React.FC<UpdateEventScreenProps> = ({ navigation, route }) => {
  const { id_calendar: initialId, title: initialTitle, description: initialDescription, datetime: initialDatetime } = route.params || {};
  const [chosenDate, setChosenDate] = useState(new Date());
  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [showDatePicker, setShowDatePicker] = useState(true);

  const handleUpdateEvent = async () => {
    try {
      const response = await CalendarServices.UpdateEvent(
        initialId || 0,
        title || '',
        description || '',
        chosenDate.toISOString() 
      );
      Alert.alert(
        'Success',
        'Successfully updated event',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await CalendarServices.DeleteEvent(initialId);
      Alert.alert('Success', 'Event deleted successfully');
      //navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  useEffect(() => {

  }, []);

  return (
    <PaperProvider>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
        <Text style={styles.text}>Title</Text>

          <View style={{ flex: 1, marginHorizontal: 5, marginTop: 5 }}>
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          <Text style={styles.text}>Description</Text>

            <TextInput
              placeholder="Description"
              style={[styles.input, { marginTop: 5 }]}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <View>
              <Text style={styles.text}>Datetime:</Text>
              {showDatePicker && (
                <DateTimePicker
                  value={chosenDate}
                  mode="datetime"
                  display="default"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setChosenDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>
            <Card onPress={handleUpdateEvent} style={{ marginTop: 10, marginBottom: 1 }}>
              <Card.Actions style={{ flexDirection: 'row', marginHorizontal: 1 }}>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleDeleteEvent}
                >
                  Delete
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleUpdateEvent}
                >
                  Save
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default UpdateEventScreen;
