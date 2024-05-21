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
import styles from './style';

type Event = {
    id_calendar: number;
    event_datetime: Date;
    event_description: string;
    event_id_family: number;
    event_title: string;
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
            const formattedEvents: FormattedEvents = {};
            response.data.forEach((item: { datetime: string }) => {
                const date = new Date(item.datetime).toISOString().split('T')[0];
                formattedEvents[date] = { marked: true };
            });
            setEvents(formattedEvents);
        } catch (error) {
            console.log('getCalendar', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                handleGetCalendar();
                const eventData = await CalendarServices.getEventOnDate(id_family, format(selectedDate, 'yyyy-MM-dd'));
                setEventDetails(eventData.data);
            } catch (error) {
                console.log('handleDayPress', error);
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

                {/* <Icon name="navicon" size={20} color="black" /> */}

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
                        title={event.event_title}
                        description={event.event_description}
                        datetime={event.event_datetime}
                    />
                ))}
            </RBSheet>
        </View>
    );
};

export default CalendarScreen;
