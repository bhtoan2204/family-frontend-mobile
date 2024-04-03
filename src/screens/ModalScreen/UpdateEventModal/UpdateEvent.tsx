import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View, TextInput, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { UpdateEventScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles'; // Import styles file here
import CalendarServices from 'src/services/apiclient/CalendarService';
import DateTimePicker from '@react-native-community/datetimepicker';

const UpdateEventScreen: React.FC<UpdateEventScreenProps> = ({ navigation, route }) => {
  const { id_calendar: initialId, title: initialTitle, description: initialDescription, datetime: initialDatetime } = route.params || {};
  const [chosenDate, setChosenDate] = useState(new Date());
  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => { 
    try {
      console.log('Update event');
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
      console.log('Delete event');
      const response = await CalendarServices.DeleteEvent(initialId);
      Alert.alert('Success', response.data.message);
      navigation.goBack(); 
    } catch (error: any) {
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  useEffect(() => {
    setShowDatePicker(true); 
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.text}>Title</Text>
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
          <Text style={styles.text}>Datetime:</Text>
          <View style={{ alignItems: 'center' }}>

          {showDatePicker && (
            <View style={styles.dateTimePickerContainer}>
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
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Card onPress={handleDeleteEvent} style={styles.buttonCard}>
            <Card.Actions style={styles.buttonCardActions}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleDeleteEvent} 
              >
                Delete
              </Button>
            </Card.Actions>
          </Card>
          <Card onPress={handleSubmit} style={styles.buttonCard}>
            <Card.Actions style={styles.buttonCardActions}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleSubmit} 
              >
                Save
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateEventScreen;


