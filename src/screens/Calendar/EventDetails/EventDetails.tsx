import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { EventDetailsScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import CalendarServices from 'src/services/apiclient/CalendarService';
import { Event } from 'src/interface/calendar/Event';
import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from '../BottomSheet';
import { getEvent, setOnly } from 'src/redux/slices/CalendarSlice';
import { useDispatch, useSelector } from 'react-redux';
const EventDetailsScreen = ({ route, navigation }: EventDetailsScreenProps) => {
    const { id_family, id_calendar } = route.params;
    const [event , setEvent ] = useState<Event>(useSelector(getEvent));
    const bottomSheetRef = useRef<RBSheet>(null);
    const screenHeight = Dimensions.get('screen').height;
    const dispatch = useDispatch();



    const onUpdate = async () => {
        if (event.recurrence_rule){

        
        Alert.alert(
          'Choose Edit Option',
          'Do you want to edit only this event or all future events?',
          [
            {
              text: 'Only this event',
              onPress: async () => {
                await dispatch(setOnly(true));
                navigation.navigate('UpdateEvent', { id_family });
              },
            },
            {
              text: 'All future events',
              onPress: async () => {
                await dispatch(setOnly(false));
                navigation.navigate('UpdateEvent', { id_family });
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
    } else{
        await dispatch(setOnly(true));
        navigation.navigate('UpdateEvent', { id_family });
    }
      };
      
    const onDelete = async () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this event?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await CalendarServices.DeleteEvent(event?.id_calendar);
                            Alert.alert('Success', 'Event has been deleted successfully.');
                            navigation.goBack()
                        } catch (error) {
                            console.error('Error deleting event:', error);
                            Alert.alert('Error', 'An error occurred while deleting the event.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>

                <View style={styles.headerp}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerp}>
                    <Text style={styles.headerText}>Event Detail</Text>

                </View>
                <View style={styles.headerp}>
                    <TouchableOpacity onPress={()=> onUpdate()}> 
                        <Text style={styles.textDelete}> Edit</Text>
                    </TouchableOpacity>
                </View>

            </View>

    <View> 
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>Description: {event?.description}</Text>
        <Text style={styles.location}>Location: {event?.location}</Text>
    </View>
    
    
    <View style={styles.containerBtnDelete}>
      <TouchableOpacity style={styles.button} onPress={() => onDelete()}>
        <Text style={styles.textDelete}>Delete event</Text>
      </TouchableOpacity>
    </View>

        
    </View>
  );
};

export default EventDetailsScreen;

