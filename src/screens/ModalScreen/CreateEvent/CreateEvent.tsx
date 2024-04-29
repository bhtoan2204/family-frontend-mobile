import React, {useState} from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {CreateEventScreenProps} from '../../../navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateEventModal: React.FC<CreateEventScreenProps> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chosenDate, setChosenDate] = useState(new Date());
  const {id_family} = route.params;

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setChosenDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await CalendarServices.CreateEvent(
        id_family,
        title || '',
        description || '',
        chosenDate.toISOString(),
      );
      Alert.alert('Success', 'Successfully created event', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  // return (
  //     <Modal
  //         animationType="slide"
  //         transparent={true}
  //         visible={true}
  //         onRequestClose={() => navigation.goBack()}
  //     >
  //         <View style={styles.container}>
  //             <View style={styles.headerfile}>
  //                 <TouchableOpacity onPress={() => navigation.goBack()}>
  //                     <Icon name="arrow-back" size={30} style={styles.backButton} />
  //                 </TouchableOpacity>
  //                 <Text style={styles.headerTitle}>CREATE EVENT</Text>
  //             </View>

  //             <Text>Title: </Text>
  //             <TextInput
  //                 style={styles.input}
  //                 placeholder="Title"
  //                 value={title}
  //                 onChangeText={setTitle}
  //             />
  //             <Text>Description: </Text>

  //             <TextInput
  //                 style={styles.input}
  //                 placeholder="Description"
  //                 value={description}
  //                 onChangeText={setDescription}
  //             />
  //             <Text>Date time: </Text>

  //             <DateTimePicker
  //                 value={chosenDate}
  //                 mode="datetime"
  //                 display="default"
  //                 onChange={handleDateChange}
  //             />
  //             <View style={ styles.containerBtn}>
  //                 <TouchableOpacity style={styles.button} onPress={handleSubmit}>
  //                     <Text>Submit</Text>
  //                 </TouchableOpacity>

  //                 {/* <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
  //                     <Text>Close</Text>
  //                 </TouchableOpacity> */}
  //             </View>
  //         </View>
  //     </Modal>
  // );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => navigation.goBack()}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Event</Text>
        </View>

        <View style={styles.modalBody}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />
          <Text style={styles.label}>Date time:</Text>
          <DateTimePicker
            value={chosenDate}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
          />
        </View>
        <View style={styles.modalBody}>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateEventModal;
