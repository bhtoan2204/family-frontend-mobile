import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';
import { format } from 'date-fns';
import { Event } from 'src/interface/calendar/Event';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Swipeable } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from './BottomSheet';
import CalendarServices from 'src/services/apiclient/CalendarService';

const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(`${i < 10 ? '0' : ''}${i}:00`);
    }
    return hours;
};

const EventList = ({ selectDate, id_family }: { selectDate: Date , id_family?: number}) => {
    const [events, setEvents] = useState<Event[]>([]);

    const sortedEvents = events.sort((a, b) => new Date(a.time_start).getTime() - new Date(b.time_start).getTime());

    const hours = generateHours();
    const allDayEvents = sortedEvents.filter(event => event.is_all_day);
    const timedEvents = sortedEvents.filter(event => !event.is_all_day);
    const bottomSheetRef = useRef<RBSheet>(null);
    const [eventDetails, setEventDetails] = useState<Event>();
    const screenHeight = Dimensions.get('screen').height;

    const onUpdate = (event: Event) => {
        setEventDetails(event);
        bottomSheetRef.current?.open();
    }
    useEffect(() => {
        handleGetEventOnDate();
    }, [id_family ,selectDate ]);

    const handleGetEventOnDate = async () => {
        try {
            const formattedDate = format(selectDate, 'yyyy-MM-dd');
            const response = await CalendarServices.getEventOnDate(id_family, formattedDate);
            if (Array.isArray(response)) {
                setEvents(response);
            } else {
                console.log('Unexpected response format', response);
            }
        } catch (error) {
            console.log('Error fetching calendar data:', error);
        }
    };

    const onDelete = (event: Event) => {
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
                    await CalendarServices.DeleteEvent(event.id_calendar)
                    Alert.alert('Success', 'Event has been deleted successfully.');
                    await handleGetEventOnDate();
                  } catch (error) {
                    console.log('Error deleting event:', error);
                    Alert.alert('Error', 'An error occurred while deleting the event.');
                  }
                },
              },
            ],
            { cancelable: true }
          );
    }

    const renderRightActions = (event: Event) => (
        <View style={styles.rightAction}>
            <View style={[styles.colorBar, { backgroundColor: event.color }]} />
            <Icon name="create-outline" size={35} color="gray" onPress={() => onUpdate(event)} />
            <Icon name="trash-outline" size={35} color="red" onPress={() => onDelete(event)} />
        </View>
    );

    const renderHourItem = ({ item: hour }) => {
        const eventsAtHour = timedEvents.filter(event => format(new Date(event.time_start), 'HH:00') === hour);

        if (eventsAtHour.length === 0) {
            return null;
        }

        return (
            <View style={styles.hourBlock}>
                <Text style={styles.hourText}>{hour}</Text>
                <View style={styles.eventContainer}>
                    {eventsAtHour.map((event, index) => (
                        <Swipeable
                            key={index}
                            renderRightActions={() => renderRightActions(event)}
                        >
                            <View style={[styles.eventCard, { backgroundColor: event.color }]}>
                                <Text style={[styles.eventTitle, event.color === 'white' && { color: 'black' }]}>
                                    {event.title}
                                </Text>
                                <Text style={[styles.eventTime, event.color === 'white' && { color: 'black' }]}>
                                    {event.is_all_day ? 'All Day' : `${format(new Date(event.time_start), 'HH:mm')} - ${format(new Date(event.time_end), 'HH:mm')}`}
                                </Text>
                                <View style={styles.containerLocation}>
                                    <Icon name="location" size={28} color="gray" />
                                    <Text style={[styles.eventDescription, event.color === 'white' && { color: 'black' }]}>
                                        {event.location}
                                    </Text>
                                </View>
                            </View>
                        </Swipeable>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={hours}
                ListHeaderComponent={
                    allDayEvents.length > 0 && (
                        <View>
                            <Text style={styles.allDayHeader}>All day</Text>
                            <View style={styles.allDayContainer}>
                                {allDayEvents.map((event, index) => (
                                    <Swipeable
                                        key={index}
                                        renderRightActions={() => renderRightActions(event)}
                                    >
                                        <View style={[styles.eventCard, { backgroundColor: event.color }]}>
                                            <Text style={[styles.eventTitle, event.color === 'white' && { color: 'black' }]}>
                                                {event.title}
                                            </Text>
                                            <View style={styles.containerLocation}>
                                                <MaterialCommunityIcons
                                                    name="playlist-edit"
                                                    size={30}
                                                    style={{ color: 'gray' }}
                                                />
                                                <Text style={[styles.eventDescription, event.color === 'white' && { color: 'black' }]}>
                                                    {event.description}
                                                </Text>
                                            </View>
                                            <View style={styles.containerLocation}>
                                                <Icon name="location" size={28} color="gray" />
                                                <Text style={[styles.eventDescription, event.color === 'white' && { color: 'black' }]}>
                                                    {event.location}
                                                </Text>
                                            </View>
                                        </View>
                                    </Swipeable>
                                ))}
                            </View>
                        </View>
                    )
                }
                renderItem={renderHourItem}
                keyExtractor={(item) => item}
                style={styles.container}
            />
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
                {eventDetails && (
                    <BottomSheet
                        id_calendar={eventDetails.id_calendar}
                        title={eventDetails.title}
                        description={eventDetails.description}
                        datetime={eventDetails.time_start}
                    />
                )}
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    containerLocation: {
        flexDirection: 'row',
        alignItems
        : 'center',
    },
    container: {
        marginTop: 20,
        paddingHorizontal: 20,
        height: '70%',
    },
    allDayContainer: {
        marginBottom: 20,
        marginLeft: 50,
    },
    allDayHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    hourBlock: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    hourText: {
        width: 60,
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    eventCard: {
        flexDirection: 'column',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        justifyContent: 'space-between',
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    eventTime: {
        color: '#ddd',
        marginBottom: 5,
    },
    eventDescription: {
        color: '#ccc',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    rightAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: '30%',
    },
    colorBar: {
        height: '100%',
        width: 5,
        marginRight: 10,
        borderRadius: 4,
    },
});

export default EventList;
