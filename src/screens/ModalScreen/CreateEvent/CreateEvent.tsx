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
import CalendarServices from 'src/services/apiclient/CalendarService';
import {CreateEventScreenProps} from 'src/navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

const CreateEventModal: React.FC<CreateEventScreenProps> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chosenDate, setChosenDate] = useState(new Date());
  const {id_family} = route.params;
  const [selectedValue, setSelectedValue] = useState('none');

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
    // <Modal
    //   animationType="none"
    //   transparent={true}
    //   visible={true}
    //   onRequestClose={() => navigation.goBack()}>
    //   <View style={styles.overlay}>
    //     <View style={styles.modalContainer}>
    //       <View style={styles.modalHeader}>
    //         <TouchableOpacity onPress={() => navigation.goBack()}>
    //           <Icon name="arrow-back" size={30} style={styles.backButton} />
    //         </TouchableOpacity>
    //         <Text style={styles.headerTitle}>Create New Event</Text>
    //       </View>

    //       <View style={styles.modalBody}>
    //         <View>
    //           <Text style={styles.label}>Title:</Text>
    //           <TextInput
    //             style={styles.input}
    //             placeholder="Enter title"
    //             value={title}
    //             onChangeText={setTitle}
    //           />
    //         </View>
    //         <Text style={styles.label}>Description:</Text>
    //         <TextInput
    //           style={styles.input}
    //           placeholder="Enter description"
    //           value={description}
    //           onChangeText={setDescription}
    //           multiline={true}
    //           numberOfLines={4}
    //         />
    //         <Text style={styles.label}>Date time:</Text>
    //         <DateTimePicker
    //           value={chosenDate}
    //           mode="datetime"
    //           display="default"
    //           onChange={handleDateChange}
    //         />
    //       </View>
    //       <View style={styles.modalBody}>
    //         <View style={styles.formAction}>
    //           <TouchableOpacity onPress={handleSubmit}>
    //             <View style={styles.btn}>
    //               <Text style={styles.btnText}>Submit</Text>
    //             </View>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // </Modal>

    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View
            style={[
              {
                backgroundColor: '#ffffff',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
              },
            ]}>
            <View style={styles.row}>
              <Text style={styles.headerTitle}>Add New Event</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} style={styles.backButton} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[{color: 'gray'}, {fontSize: 16}]}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>
          <View
            style={[
              styles.row,
              {
                backgroundColor: '#ffffff',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
                alignItems: 'center',
              },
            ]}>
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={30}
              style={{color: 'gray'}}
            />
            <Text style={[{right: 20}, {fontSize: 16}, {color: 'gray'}]}>
              Date Time
            </Text>
            <DateTimePicker
              value={chosenDate}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          </View>
          <View
            style={[
              styles.row,
              {
                backgroundColor: '#ffffff',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
                alignItems: 'center',
              },
            ]}>
            <MaterialCommunityIcons
              name="repeat"
              size={30}
              style={{color: 'gray'}}
            />
            <Text style={[{right: 30}, {fontSize: 16}, {color: 'gray'}]}>
              Repeat
            </Text>
            {/* <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Biweekly" value="biweekly" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Yearly" value="yearly" />
            </Picker> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateEventModal;
