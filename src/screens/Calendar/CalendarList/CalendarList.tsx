import React, { useEffect, useState, memo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { addMonths, subMonths, format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CalendarListScreenProps } from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';

const CalendarListScreen = ({ route, navigation }: CalendarListScreenProps) => {
    const { id_family } = route.params || {};
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendars, setCalendars] = useState([]);
    const [events, setEvents] = useState({});

    useEffect(() => {
        handleGetCalendar();
        const initialDate = new Date();
        const pastMonths = Array.from({ length: 10 }, (_, index) => subMonths(initialDate, 10 - index));
        const futureMonths = Array.from({ length: 10 }, (_, index) => addMonths(initialDate, index + 1));
        const allMonths = pastMonths.concat([initialDate], futureMonths);
        setCalendars(allMonths);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchMoreCalendars();
            fetchPastCalendars();
        }, 10000);

        return () => clearInterval(intervalId);
    }, [calendars]);

    type FormattedEvents = {
        [date: string]: { marked: boolean; dotColor?: string };
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

    const fetchMoreCalendars = () => {
        const lastDate = calendars[calendars.length - 1];
        const newFutureMonths = Array.from({ length: 10 }, (_, index) => addMonths(lastDate, index + 1));
        setCalendars([...calendars, ...newFutureMonths]);
    };

    const fetchPastCalendars = () => {
        const firstDate = calendars[0];
        const newPastMonths = Array.from({ length: 10 }, (_, index) => subMonths(firstDate, index + 1)).reverse();
        setCalendars([...newPastMonths, ...calendars]);
    };

    const CalendarItem = memo(({ date, index }) => (
        <View style={[styles.calendarContainer, index % 2 === 0 ? styles.leftContainer : styles.rightContainer]}>
            <Calendar
                current={format(date, 'yyyy-MM-dd')}
                markedDates={events}
                onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
                hideArrows={true}
                hideDayNames={true}
                style={styles.calendar}
                hideExtraDays={true}

                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: 'black',
                    indicatorColor: 'black',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
            />
        </View>
    ));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Calendar List</Text>
            </View>
            <ScrollView contentContainerStyle={styles.listContent}>
                {calendars.map((date, index) => (
                    <CalendarItem key={index} date={date} index={index} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#ffffff',
    },
    calendarContainer: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    leftContainer: {
        marginRight: 5,
    },
    rightContainer: {
        marginLeft: 5,
    },
    calendar: {
        width: '100%',
        backgroundColor: '#ffffff',
    },
});

export default CalendarListScreen;
