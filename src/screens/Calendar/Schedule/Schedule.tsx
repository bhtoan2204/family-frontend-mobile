import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Calendar, ICalendarEventBase } from 'react-native-big-calendar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import styles from '../style';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from '../BottomSheet';
import { ScheduleScreenProps } from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import { RRule, rrulestr } from 'rrule';
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { AgendaSchedule } from 'react-native-calendars';

const ScheduleScreen = ({ route, navigation }: ScheduleScreenProps) => {
    const { id_family } = route.params || {};
    const [events, setEvents] = useState<ICalendarEventBase[]>([]);
    const dispatch = useDispatch();
    const bottomSheetRef = useRef<RBSheet>(null);
    const screenHeight = Dimensions.get('screen').height;
    const [eventDetails, setEventDetails] = useState<Event | null>(null);

    useEffect(() => {
        handleGetCalendarForMonth(new Date());
    }, [id_family, dispatch]);

    const handleGetCalendarForMonth = useCallback(async (date) => {
        const start = startOfMonth(subMonths(date, 1));
        const end = endOfMonth(addMonths(date, 1));
    
        try {
            const response = await CalendarServices.getCalendar({ id_family });
            if (Array.isArray(response)) {
                const formattedEvents = response.flatMap(item => {
                    if (item.recurrence_rule) {
                        const rule = rrulestr(item.recurrence_rule);
                        const dates = rule.between(start, end);
                        return dates.map(date => ({
                            ...item,
                            title: item.title,
                            start: date,
                            end: new Date(date.getTime() + (new Date(item.time_end)).getTime() - (new Date(item.time_start)).getTime()),
                        }));
                    } else {
                        return {
                            ...item,
                            title: item.title,
                            start: new Date(item.time_start),
                            end: new Date(item.time_end),
                        };
                    }
                });
    
                setEvents(formattedEvents);
            } else {
                console.log('Unexpected response format', response);
            }
        } catch (error) {
            console.log('Error fetching calendar data:', error);
        }
    }, [id_family]);
    
    
    

   
    const handleAddEvent = () => {
        navigation.navigate('CreateEvent', { id_family });
    };

    const pressSchedule = () => {
        navigation.navigate('ScheduleScreen', { id_family });
    };

    const handleEventClick = (event: any) => {
        navigation.navigate('EventDetails', { eventId: event.id });
    };
    const handleDateClick = (date: Date) => {
        navigation.navigate('EventListScreen', { id_family});
    };
    
    return (
        <View style={styles.calendar}>
            <View style={styles.header}>
                <View style={styles.headerp}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Calendar</Text>
                    <TouchableOpacity onPress={() => pressSchedule()}>
                        <Icon name="arrow-right" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <Calendar
                events={events} 
                height={600}
                mode="week"
                locale="en"
                onPressEvent={handleEventClick}
                onPressCell={handleDateClick}

            />

            <TouchableOpacity onPress={handleAddEvent} style={styles.plusIcon}>
                <Icon name="plus" size={18} color="white" />
            </TouchableOpacity>
            
        </View>
    );
};

export default ScheduleScreen;
