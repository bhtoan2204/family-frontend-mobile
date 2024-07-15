import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { EventDetailsScreenProps } from 'src/navigation/NavigationTypes';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { COLORS } from 'src/constants';
import { deleteEventOnly, selectSelectedEvent, setOnly } from 'src/redux/slices/CalendarSlice';
import { deleteEvent } from 'src/redux/slices/CalendarSlice';
import moment from 'moment';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarServices from 'src/services/apiclient/CalendarService';

const EventDetailsScreen = ({ route, navigation }: EventDetailsScreenProps) => {
    const { id_family } = route.params;
    const event = useSelector(selectSelectedEvent);
    const dispatch = useDispatch();

    const onUpdate = () => {
      if (event?.recurrence_rule) {
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
      } else {
        navigation.navigate('UpdateEvent', { id_family });
      }
    };
  

    const onDelete = () => {
        if (!event?.recurrence_rule) {
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
                                await dispatch(deleteEvent(event?.id_calendar));
                                Alert.alert('Success', 'Event has been deleted successfully.');
                                navigation.goBack();
                            } catch (error) {
                                console.error('Error deleting event:', error);
                                Alert.alert('Error', 'An error occurred while deleting the event.');
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        } else {
            Alert.alert(
                'Confirm Delete',
                'What do you want to do with this event?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete This Event Only',
                        onPress: async () => {
                            try {
                                await CalendarServices.UpdateEvent(event.id_calendar,  id_family, event.title, event.description, event.time_start, event.time_end, event.color, event.is_all_day, event.category, event.location, event.time_start+',', event.recurrence_id, event.recurrence_rule, event.start_timezone, event.end_timezone);
                                dispatch(deleteEventOnly({ id_calendar: event.id_calendar, time_start: event.time_start }));
                                Alert.alert('Success', 'Event has been deleted successfully.');
                                navigation.goBack();
                            } catch (error) {
                                console.error('Error deleting event:', error);
                                Alert.alert('Error', 'An error occurred while deleting the event.');
                            }
                        },
                    },
                    {
                        text: 'Delete All Future Events',
                        onPress: async () => {
                            try {
                                await dispatch(deleteEvent(event.id_calendar));
                                Alert.alert('Success', 'Event has been deleted successfully.');
                                navigation.goBack();
                            } catch (error) {
                                console.error('Error deleting event:', error);
                                Alert.alert('Error', 'An error occurred while deleting the event.');
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        }
    };

    if (!event) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Event Detail</Text>
                <TouchableOpacity
                    onPress={onUpdate}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#00adf5',
                        padding: 15,
                        borderRadius: 30,
                        paddingHorizontal: 20,
                        shadowColor: '#00adf5',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                    }}>
                    <Feather name="edit" size={20} color="white" />
                    <Text style={{ marginLeft: 10, fontWeight: '700', color: 'white' }}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.description}>Description: {event.description}</Text>
                <View style={styles.locationContainer}>
                    <Text style={styles.location}>Location:</Text>
                    <Text style={{ color: COLORS.DenimBlue, fontSize: 16 }}> {event.location}</Text>
                </View>
                <View style={styles.locationContainer}>
                    <Text style={styles.location}>Category:</Text>
                    <Text style={{ color: event.color, fontSize: 16 }}> {event.categoryEvent.title}</Text>
                </View>
            </View>
            <View style={styles.containerBtnDelete}>
                <TouchableOpacity style={styles.button} onPress={onDelete}>
                    <Text style={styles.textDelete}>Delete event</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EventDetailsScreen;


