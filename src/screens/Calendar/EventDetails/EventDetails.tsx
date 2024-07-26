import React from 'react';
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
import { getTranslate } from 'src/redux/slices/languageSlice';
import { useThemeColors } from 'src/hooks/useThemeColor';
import { Toast } from 'react-native-toast-notifications';

const EventDetailsScreen = ({ route, navigation }: EventDetailsScreenProps) => {
    const { id_family } = route.params;
    const event = useSelector(selectSelectedEvent);
    const dispatch = useDispatch();
    const translate = useSelector(getTranslate);
    const color = useThemeColors();

    const onUpdate = () => {
        if (event?.recurrence_rule) {
            Alert.alert(
                translate('Choose Edit Option'),
                translate('Do you want to edit only this event or all future events?'),
                [
                    {
                        text: translate('Only this event'),
                        onPress: async () => {
                            await dispatch(setOnly(true));
                            navigation.navigate('UpdateEvent', { id_family });
                        },
                    },
                    {
                        text: translate('All future events'),
                        onPress: async () => {
                            await dispatch(setOnly(false));
                            navigation.navigate('UpdateEvent', { id_family });
                        },
                    },
                    {
                        text: translate('Cancel'),
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
                translate('Confirm Delete'),
                translate('Are you sure you want to delete this event?'),
                [
                    {
                        text: translate('Cancel'),
                        style: 'cancel',
                    },
                    {
                        text: translate('Delete'),
                        onPress: async () => {
                            try {
                                await CalendarServices.DeleteEvent(event?.id_family, event?.id_calendar);
                                await dispatch(deleteEvent(event?.id_calendar));
                                Toast.show(translate('Event has been deleted successfully.'), {
                                    type: 'success',
                                  });
                                navigation.goBack();
                            } catch (error) {
                                console.error('Error deleting event:', error);
                                Toast.show( translate('An error occurred while deleting the event.'), {
                                    type: 'danger',
                                  });
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        } else {
            Alert.alert(
                translate('Confirm Delete'),
                translate('What do you want to do with this event?'),
                [
                    {
                        text: translate('Cancel'),
                        style: 'cancel',
                    },
                    {
                        text: translate('Delete This Event Only'),
                        onPress: async () => {
                            try {
                                await CalendarServices.UpdateEvent(
                                    event.id_calendar,
                                    id_family,
                                    event.title,
                                    event.description,
                                    event.time_start,
                                    event.time_end,
                                    event.color,
                                    event.is_all_day,
                                    event.category,
                                    event.location,
                                    moment(event.time_start).toISOString() + ',',
                                    event.recurrence_id,
                                    event.recurrence_rule,
                                    event.start_timezone,
                                    event.end_timezone
                                );
                                dispatch(deleteEventOnly({ id_calendar: event.id_calendar, time_start: event.time_start }));
                                Toast.show(translate('Event has been deleted successfully.'), {
                                    type: 'success',
                                  });                                
                                navigation.goBack();
                            } catch (error) {
                                console.error('Error deleting event:', error);
                                Toast.show(translate('An error occurred while deleting the event.'), {
                                    type: 'danger',
                                });                            }
                        },
                    },
                    {
                        text: translate('Delete All Future Events'),
                        onPress: async () => {
                            try {
                                await dispatch(deleteEvent(event.id_calendar));
                                Toast.show(translate('Event has been deleted successfully.'), {
                                    type: 'success',
                                  });                                     
                                navigation.goBack();
                            } catch (error) {
                                console.error('Error deleting event:', error);
                                Toast.show(translate('An error occurred while deleting the event.'), {
                                    type: 'danger',
                                  });                              }
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
        <SafeAreaView style={[styles.container, {backgroundColor: color.background}]}>
            <View style={[styles.header,  {backgroundColor: color.background}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color={color.text} />
                </TouchableOpacity>
                <Text style={[styles.headerText, {color: color.text}]}>{translate('Event Detail')}</Text>
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
                    <Text style={{ marginLeft: 10, fontWeight: '700', color: 'white' }}>{translate('Edit')}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.card, {backgroundColor: color.white}]}>
                <Text style={[styles.title, {color: color.text}]}>{event.title}</Text>
                <Text style={[styles.description, {color: color.textSubdued}]}>{translate('Description')}: {event.description}</Text>
                <View style={styles.locationContainer}>
                    <Text style={[styles.location, {color: color.textSubdued}]}>{translate('Location')}:</Text>
                    <Text style={[styles.description, { fontSize: 16, color: color.textSubdued }]}> {event.location}</Text>
                </View>
                <View style={styles.locationContainer}>
                    <Text style={[styles.location, {color: color.textSubdued}]}>{translate('Category')}:</Text>
                    <Text style={{ color: event.color, fontSize: 16 }}> {event.categoryEvent.title}</Text>
                </View>
            </View>
            <View style={[styles.containerBtnDelete, {backgroundColor: color.background}]}>
                <TouchableOpacity style={[styles.button, {backgroundColor: color.background}]} onPress={onDelete}>
                    <Text style={styles.textDelete}>{translate('Delete event')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EventDetailsScreen;
