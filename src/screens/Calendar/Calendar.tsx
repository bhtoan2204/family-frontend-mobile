import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarScreenProps } from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import BottomSheet from './BottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import EventList from './EventList';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { RRule } from 'rrule';
import styles from './style';

type Event = {
    id_calendar: number;
    title: string;
    time_start: Date;
    time_end: Date;
    description: string;
    color: string;
    is_all_day: boolean;
    rrule?: string;
};

const CalendarScreen = ({ route, navigation }: CalendarScreenProps) => {
    const { id_family } = route.params || {};
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const bottomSheetRef = useRef<RBSheet>(null);
    const screenHeight = Dimensions.get('screen').height;
    const [eventDetails, setEventDetails] = useState<Event[]>([]);

    type FormattedEvents = {
        [date: string]: { marked: boolean; icon?: () => JSX.Element };
    };

    const handleGetCalendar = async () => {
        try {
            const response = await CalendarServices.getCalendar({ id_family });
            console.log(response); // Log the response to see the actual data structure

            if (Array.isArray(response)) {
                const formattedEvents: FormattedEvents = {};
                response.forEach((item: Event) => {
                    // Generate occurrences for recurring events
                    const occurrences = generateOccurrences(item);
                    occurrences.forEach((date) => {
                        const formattedDate = format(date, 'yyyy-MM-dd');
                        formattedEvents[formattedDate] = { marked: true };
                    });
                });
                setEvents(formattedEvents);
            } else {
                console.log('Unexpected response format', response);
            }
        } catch (error) {
            console.log('Error fetching calendar data:', error);
        }
    };

    const generateOccurrences = (event: Event) => {
        const occurrences = [];
        if (event.rrule) {
            const rule = RRule.fromString(event.rrule);
            const startDate = new Date(event.time_start);
            const endDate = new Date(event.time_end);

            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

            rule.between(startDate, oneYearFromNow).forEach((date) => {
                occurrences.push(date);
            });
        } else {
            occurrences.push(new Date(event.time_start));
        }
        return occurrences;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleGetCalendar();
                const eventData = await CalendarServices.getEventOnDate(id_family, format(selectedDate, 'yyyy-MM-dd'));
                if (Array.isArray(eventData)) {
                    const parsedEvents = eventData.map(event => {
                        try {
                            return {
                                ...event,
                                time_start: new Date(event.time_start),
                                time_end: new Date(event.time_end)
                            };
                        } catch (e) {
                            console.log('Invalid date format for event:', event);
                            return event;
                        }
                    });
                    setEventDetails(parsedEvents);
                } else {
                    console.log('Unexpected event data format', eventData);
                }
            } catch (error) {
                console.log('Error fetching event details:', error);
            }
        };

        fetchData();
    }, [selectedDate, id_family]);

    const handleDayPress = (day: any) => {
        setSelectedDate(new Date(day.dateString));
    };

    const handleAddEvent = () => {
        navigation.navigate('CreateEvent', { id_family });
    };

    const onEventPress = (event: any) => {
        bottomSheetRef.current?.open();
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
                        markedDates={events}
                    />

                    <View>
                        <EventList events={eventDetails} />
                    </View>
                </View>
            </LongPressGestureHandler>

            <TouchableOpacity onPress={handleAddEvent} style={styles.plusIcon}>
                <Icon name="plus" size={18} color="white" />
            </TouchableOpacity>

            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown={true}
                height={screenHeight * 0.5}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                }}
            >
                {eventDetails.map((event, index) => (
                    <BottomSheet
                        key={index}
                        id_calendar={event.id_calendar}
                        title={event.title}
                        description={event.description}
                        datetime={event.time_start}
                    />
                ))}
            </RBSheet>
        </View>
    );
};

export default CalendarScreen;
