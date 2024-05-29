// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import WeekView from 'react-native-week-view';
// import CalendarServices from 'src/services/apiclient/CalendarService';

// const ScheduleScreen = ({ id_family }) => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const calendarData = await CalendarServices.getCalendar({ id_family });
//         setEvents(calendarData.events);
//       } catch (error) {
//         console.error('Error fetching calendar data:', error);
//       }
//     };

//     fetchData();
//   }, [id_family]);

//   return (
//     <View style={{ flex: 1 }}>
//       <WeekView
//         events={events}
//         numberOfDays={7}
//         onEventPress={(event) => console.log('Event pressed:', event)}
//         headerStyle={{
//           backgroundColor: '#f5f5f5',
//           borderBottomWidth: 1,
//           borderBottomColor: '#ddd',
//         }}
//       />
//     </View>
//   );
// };

// export default ScheduleScreen;