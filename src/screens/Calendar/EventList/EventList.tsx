// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions, Alert, TouchableOpacity } from 'react-native';
// import { format } from 'date-fns';
// import { Event } from 'src/interface/calendar/Event';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Swipeable } from 'react-native-gesture-handler';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import BottomSheet from '../BottomSheet';
// import CalendarServices from 'src/services/apiclient/CalendarService';
// import { EventListScreenProps } from 'src/navigation/NavigationTypes';

// const EventListScreen = ({ route, navigation }: EventListScreenProps) => {
//     const { id_family} = route.params || '';
//     const [events, setEvents] = useState<Event[]>([]);
//     const [eventDetails, setEventDetails] = useState<Event | null>(null);
//     const bottomSheetRef = useRef<RBSheet>(null);
//     const screenHeight = Dimensions.get('screen').height;

//     useEffect(() => {
//         handleGetAllEvents();
//     }, [id_family]);

//     const handleGetAllEvents = async () => {
//         try {
//             const response = await CalendarServices.getCalendar({ id_family });
//             if (Array.isArray(response)) {
//                 setEvents(response);
//             } else {
//                 console.error('Unexpected response format', response);
//             }
//         } catch (error) {
//             console.error('Error fetching calendar data:', error);
//         }
//     };

//     const onDelete = async (event: Event) => {
//         Alert.alert(
//             'Confirm Delete',
//             'Are you sure you want to delete this event?',
//             [
//                 {
//                     text: 'Cancel',
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Delete',
//                     onPress: async () => {
//                         try {
//                             await CalendarServices.DeleteEvent(event.id_calendar);
//                             Alert.alert('Success', 'Event has been deleted successfully.');
//                             await handleGetAllEvents();
//                         } catch (error) {
//                             console.error('Error deleting event:', error);
//                             Alert.alert('Error', 'An error occurred while deleting the event.');
//                         }
//                     },
//                 },
//             ],
//             { cancelable: true }
//         );
//     };

//     const onUpdate = (event: Event) => {
//         setEventDetails(event);
//         bottomSheetRef.current?.open();
//     };

//     const renderRightActions = (event: Event) => (
//         <View style={styles.rightAction}>
//             <Icon name="create-outline" size={35} color="gray" onPress={() => onUpdate(event)} />
//             <Icon name="trash-outline" size={35} color="red" onPress={() => onDelete(event)} />
//         </View>
//     );

//     const DateBlock = ({ date }: { date: string }) => (
//         <View style={styles.dateBlock}>
//             <Text style={styles.dateText}>{format(new Date(date), 'yyyy-MM-dd')}</Text>
//         </View>
//     );

//     const renderItem = ({ item: event, index }: { item: Event; index: number }) => {
//         const currentEventStartDate = event.time_start.split('T')[0];
//         const prevEventStartDate = index > 0 ? events[index - 1].time_start.split('T')[0] : null;

//         return (
//             <View>
//                 {prevEventStartDate !== currentEventStartDate && (
//                     <DateBlock key={currentEventStartDate} date={currentEventStartDate} />
//                 )}
//                     <View style={[styles.eventCard, { backgroundColor: event.color }]}>
//                         <Text style={[styles.eventTitle, event.color === 'white' && { color: 'black' }]}>
//                             {event.title}
//                         </Text>
//                         {event.is_all_day ? (
//                             <Text style={[styles.eventTime, event.color === 'white' && { color: 'black' }]}>
//                                 {format(new Date(event.time_start), 'yyyy-MM-dd')} - {format(new Date(event.time_end), 'yyyy-MM-dd')}
//                             </Text>
//                         ) : (
//                             <Text style={[styles.eventTime, event.color === 'white' && { color: 'black' }]}>
//                                 {format(new Date(event.time_start), 'yyyy-MM-dd HH:mm')} - {format(new Date(event.time_end), 'yyyy-MM-dd HH:mm')}
//                             </Text>
//                         )}
//                         <View style={styles.containerLocation}>
//                             <MaterialCommunityIcons
//                                 name="playlist-edit"
//                                 size={30}
//                                 style={{ color: 'gray' }}
//                             />
//                             <Text style={[styles.eventDescription, event.color === 'white' && { color: 'black' }]}>
//                                 {event.description}
//                             </Text>
//                         </View>
//                         <View style={styles.containerLocation}>
//                             <Icon name="location" size={28} color="gray" />
//                             <Text style={[styles.eventDescription, event.color === 'white' && { color: 'black' }]}>
//                                 {event.location}
//                             </Text>
//                         </View>
//                     </View>
//                 </Swipeable>
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Events</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('AddEvent')}>
//                     <Icon name="add" size={24} color="black" />
//                 </TouchableOpacity>
//             </View>
//             <FlatList
//                 data={events}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id_calendar.toString()}
//                 ListEmptyComponent={<Text>No events.</Text>}
//             />
//             <RBSheet
//                 ref={bottomSheetRef}
//                 closeOnDragDown={true}
//                 height={screenHeight * 0.5}
//                 customStyles={{
//                     container: {
//                         borderTopLeftRadius: 20,
//                         borderTopRightRadius: 20,
//                     },
//                 }}
//             >
//                 {eventDetails && (
//                     <BottomSheet
//                         id_calendar={eventDetails.id_calendar}
//                         title={eventDetails.title}
//                         description={eventDetails.description}
//                         datetime={eventDetails.time_start}
//                     />
//                 )}
//             </RBSheet>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     headerText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
   
//     eventCard: {
//         borderRadius: 8,
//         padding: 10,
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 2,
//         marginLeft: 40
//     },
//     eventTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     eventTime: {
//         color: '#ddd',
//         marginBottom: 5,
//     },
//     eventDescription: {
//         color: '#ccc',
//         marginLeft: 10,
//     },
//     containerLocation: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     rightAction: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 10,
//         borderRadius: 8,
//         marginBottom: 10,
//         width: '30%',
//     },
//     dateBlock: {
//         backgroundColor: '#f0f0f0',
//         paddingVertical: 5,
//         paddingHorizontal: 10,
//         marginBottom: 5,
//         borderRadius: 5,
//     },
//     dateText: {
//         fontWeight: 'bold',
//     },
// });

// export default EventListScreen;
