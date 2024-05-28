import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarScreenProps } from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format, parseISO } from 'date-fns';
import BottomSheet from './BottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import EventList from './EventList';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import styles from './style';
import { useDispatch } from 'react-redux';
import { setFamily } from 'src/redux/slices/CalendarSlice';
import { Event } from 'src/interface/calendar/Event';

const CalendarScreen = ({ route, navigation }: CalendarScreenProps) => {
    const { id_family } = route.params || {};
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventDetails, setEventDetails] = useState<Event[]>([]);
    const dispatch = useDispatch();
    const [selectedDates, setSelectedDates] = useState({}); 

    type FormattedEvents = {
        [date: string]: { marked: boolean; icon?: () => JSX.Element };
    };
   
    useEffect(() => {
        dispatch(setFamily(id_family));

       
        handleGetCalendar();
    }, [id_family]);

    useEffect(() => {
        handleGetEventOnDate();
    }, [id_family,selectedDate ]);

  
const handleGetEventOnDate = async () => {
    try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await CalendarServices.getEventOnDate(id_family, formattedDate);
        if (Array.isArray(response)) {
            setEventDetails(response);
        } else {
            console.log('Unexpected response format', response);
        }
    } catch (error) {
        console.log('Error fetching calendar data:', error);
    }
};

    const handleGetCalendar = async () => {
        try {
            const response = await CalendarServices.getCalendar({ id_family });
            if (Array.isArray(response)) {
                const formattedEvents: FormattedEvents = {};
                response.forEach((item: { time_start: string, time_end: string }) => {
                    const startDate = new Date(item.time_start);
                    const endDate = new Date(item.time_end);
                    const currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        const date = currentDate.toISOString().split('T')[0];
                        formattedEvents[date] = { marked: true };
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                });
                setEvents(formattedEvents);

            } else {
                console.log('Unexpected response format', response);
            }
        } catch (error) {
            console.log('Error fetching calendar data:', error);
        }
    };
    

 

    const handleDayPress = (day: any) => {
 
        setSelectedDate(day.dateString);
    };

    const handleAddEvent = () => {
        navigation.navigate('CreateEvent', { id_family });
    };

  

    const handleLongPress = () => {
        navigation.navigate('CalendarList', { id_family });
    };

    return (
        <View style={styles.calendar}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Calendar</Text>
            </View>

            <LongPressGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        handleLongPress();
                    }
                }}
            >
                <View>
                    <Calendar
                        onDayPress={handleDayPress}
                        monthFormat={'yyyy/MM'}
                        firstDay={1}
                        enableSwipeMonths={true}
                        markedDates={{ ...events, ...{ [selectedDate]: { selected: true, selectedColor: '#00adf5' } } }} 
                        />

                    <View>
                        <EventList selectDate={selectedDate} id_family={id_family} />
                    </View>
                </View>
            </LongPressGestureHandler>

            <TouchableOpacity onPress={handleAddEvent} style={styles.plusIcon}>
                <Icon name="plus" size={18} color="white" />
            </TouchableOpacity>

            
       
        </View>
    );
};

export default CalendarScreen;
