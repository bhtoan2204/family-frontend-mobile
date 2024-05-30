// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import WeekView from 'react-native-week-view';
// import { ScheduleScreenProps } from 'src/navigation/NavigationTypes';
// import CalendarServices from 'src/services/apiclient/CalendarService';
// import { Event } from 'src/interface/calendar/Event';

// const ScheduleScreen = ({ route, navigation }: ScheduleScreenProps) => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const { id_family } = route.params;

//   useEffect(() => {
//     fetchData();
//   }, [id_family]);

//   const fetchData = async () => {
//     try {
//       const calendarData = await CalendarServices.getCalendar({ id_family });
//       if (Array.isArray(calendarData)) {
//         console.log(calendarData);
//         setEvents(calendarData);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error fetching calendar data:', error);
//       setError('Error fetching calendar data');
//       setLoading(false);
//     }
//   };

//   const formatEventsForWeekView = (events: Event[]) => {
//     return events.map(event => ({
//       id: event.id_calendar,
//       description: event.title,
//       startDate: new Date(event.time_start),
//       endDate: new Date(event.time_end),
//       color: event.color || 'blue',
//     }));
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }

//   const formattedEvents = formatEventsForWeekView(events);

//   return (
//     <View style={{ flex: 1 }}>
//       <WeekView
//         events={formattedEvents}
//         selectedDate={new Date()}
//         numberOfDays={7}
//         onEventPress={(event) => console.log(event)}
//         headerStyle={styles.header}
//         formatDateHeader="MMM D"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//   },
//   event: {
//     backgroundColor: 'lightblue',
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
// });

// export default ScheduleScreen;
