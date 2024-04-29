import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarScreenProps } from '../../navigation/NavigationTypes';
import styles from './style';
import CalendarServices from '../../services/apiclient/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import BottomSheet from './BottomSheet'; 
import RBSheet from 'react-native-raw-bottom-sheet';

type Event = {
    id_calendar: number;
    event_datetime: Date;
    event_description: string;
    event_id_family: number;
    event_title: string;
}

const CalendarScreen = ({ route, navigation }: CalendarScreenProps) => {
    const { id_family } = route.params || {};
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCreateEventModal, setShowCreateEventModal] = useState(false); 
    const [showUpdateEventModal, setShowUpdateEventModal] = useState(false);
    const bottomSheetRef = useRef<RBSheet>(null); 
    const screenHeight = Dimensions.get('screen').height;
    const [eventDetails, setEventDetails] = useState<Event[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    type FormattedEvents = {
        [date: string]: { marked: boolean; icon?: () => JSX.Element };
    };

    const handleGetCalendar = async () => {
        try {
            const response = await CalendarServices.getCalendar({ id_family: id_family });
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
        navigation.navigate('CreateEvent',{id_family: id_family});
    };

    const updateEvent = (id_calendar: number, title: string, description: string, datetime: Date) => {
        bottomSheetRef.current?.open(); 
        const selectedEvent = eventDetails.find(event => event.id_calendar === id_calendar);
        if (selectedEvent) {
          setEventDetails([selectedEvent]);
      }
    };

    return (
        <View style={styles.calendar}>
            <Calendar
                onDayPress={handleDayPress}
                monthFormat={'yyyy/MM'}
                firstDay={1}
                enableSwipeMonths={true}
                markedDates={events}
            />

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalIcon}>
                        <Text style={styles.modalTitle}> {format(selectedDate, 'yyyy-MM-dd')} </Text>
                        <TouchableOpacity onPress={handleAddEvent} style={styles.plusIcon}>
                            <Icon name="plus" size={18} color="black" />
                        </TouchableOpacity>
                    </View>

                    {eventDetails.length === 0 ? (
                        <Text style={styles.noEventText}>No events for today.</Text>
                    ) : (
                        eventDetails.map((event, index) => (
                            <View key={index} style={styles.card}>
                                <View style={styles.eventInfo}>
                                    <Text style={styles.eventTitle}>{event.event_title}</Text>
                                    <Text>{format(event.event_datetime, 'yyyy-MM-dd hh:mm')}</Text>
                                    <Text>{event.event_description}</Text>
                                </View>
                                <TouchableOpacity onPress={() => updateEvent(event.id_calendar, event.event_title, event.event_description, event.event_datetime)}>
                                    <Icon name="edit" size={20} color="black" style={styles.editIcon} />
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            </View>

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

            {/* <CreateEventModal 
                navigation={navigation}
                isVisible={showCreateEventModal} 
                id_family={id_family} 
                onClose={() => setShowCreateEventModal(false)} 
                onSubmit={() => setShowCreateEventModal(false)} 
            /> */}

            {/* <UpdateEventModal
                isVisible={showUpdateEventModal}
                eventId={selectedEventId}
                onClose={() => setShowUpdateEventModal(false)}
                onSubmit={() => setShowUpdateEventModal(false)}
            /> */}
        </View>
    );
};

export default CalendarScreen;
