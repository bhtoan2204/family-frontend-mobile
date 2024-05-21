import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';

const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(`${i < 10 ? '0' : ''}${i}:00`);
    }
    return hours;
};

const EventList = ({ events }) => {
    // Sắp xếp sự kiện theo thời gian
    const sortedEvents = events.sort((a, b) => new Date(a.event_datetime) - new Date(b.event_datetime));

    const hours = generateHours();

    const renderHourItem = ({ item: hour }) => {
        const eventsAtHour = sortedEvents.filter(event => format(new Date(event.event_datetime), 'HH:00') === hour);
    
        if (eventsAtHour.length === 0) {
            return null; // Không có sự kiện nào ở giờ này, không cần hiển thị
        }
    
        return (
            <View style={styles.hourBlock}>
                <Text style={styles.hourText}>{hour}</Text>
                <View style={styles.eventContainer}>
                    {eventsAtHour.map((event, index) => (
                        <View key={index} style={styles.eventCard}>
                            <Text style={styles.eventTitle}>{event.event_title}</Text>
                            <Text style={styles.eventTime}>{format(new Date(event.event_datetime), 'HH:mm')}</Text>
                            <Text style={styles.eventDescription}>{event.event_description}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };
    

    return (
        <FlatList
            data={hours}
            renderItem={renderHourItem}
            keyExtractor={(item) => item}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20,
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
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventTime: {
        color: '#666',
        marginBottom: 5,
    },
    eventDescription: {
        color: '#333',
    },
});

export default EventList;
