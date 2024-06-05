import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {CalendarScreenProps} from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {format} from 'date-fns';
import {useDispatch} from 'react-redux';
import {setFamily} from 'src/redux/slices/CalendarSlice';
import styles from './style';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from './BottomSheet';
import {Event} from 'src/interface/calendar/Event';
import {Swipeable} from 'react-native-gesture-handler';
import IconL from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Feather, Ionicons} from '@expo/vector-icons';
import {COLORS} from 'src/constants';

const CalendarScreen = ({route, navigation}: CalendarScreenProps) => {
  const {id_family} = route.params || {};
  const [events, setEvents] = useState<Event[]>([]);
  const dispatch = useDispatch();
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const bottomSheetRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;

  useEffect(() => {
    dispatch(setFamily(id_family));
    handleGetCalendar();
  }, [id_family, dispatch]);

  const handleGetCalendar = useCallback(async () => {
    try {
      const response = await CalendarServices.getCalendar({id_family});
      if (Array.isArray(response)) {
        const formattedEvents = response.map(item => ({
          ...item,
          time_start: new Date(item.time_start),
          time_end: new Date(item.time_end),
        }));
        setEvents(formattedEvents);
      } else {
        console.log('Unexpected response format', response);
      }
    } catch (error) {
      console.log('Error fetching calendar data:', error);
    }
  }, [id_family]);

  const handleAddEvent = () => {
    navigation.navigate('CreateEvent', {id_family});
  };

  const renderEvents = useMemo(() => {
    const items = events.reduce((acc, event) => {
      const startDate = new Date(event.time_start);
      const endDate = new Date(event.time_end);
      const date1 = format(startDate, 'yyyy-MM-dd');
      const date2 = format(endDate, 'yyyy-MM-dd');

      if (!acc[date1]) acc[date1] = [];
      acc[date1].push(event);

      if (!acc[date2]) acc[date2] = [];
      acc[date2].push(event);

      return acc;
    }, {});

    return (
      <Agenda
        items={items}
        renderItem={(item, firstItemInDay) => (
          <Swipeable renderRightActions={() => renderRightActions(item)}>
            <View style={[styles.agendaItem, {backgroundColor: item.color}]}>
              <Text
                style={[
                  styles.agendaItemText,
                  {color: item.color !== 'white' ? 'white' : 'black'},
                ]}>
                {item.title}
              </Text>
              {!item.is_all_day && (
                <Text
                  style={[
                    styles.agendaItemTime,
                    {color: item.color !== 'white' ? 'white' : 'black'},
                  ]}>
                  {format(new Date(item.time_start), 'HH:mm')} -{' '}
                  {format(new Date(item.time_end), 'HH:mm')}
                </Text>
              )}
              {item.is_all_day && (
                <Text
                  style={[
                    styles.agendaItemTime,
                    {color: item.color !== 'white' ? 'white' : 'black'},
                  ]}>
                  {format(new Date(item.time_start), 'yyyy/MM/dd')} -{' '}
                  {format(new Date(item.time_end), 'yyyy/MM/dd')}
                </Text>
              )}
            </View>
          </Swipeable>
        )}
      />
    );
  }, [events]);

  const onDelete = async (event: Event) => {
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
              await CalendarServices.DeleteEvent(event.id_calendar);
              Alert.alert('Success', 'Event has been deleted successfully.');
              await handleGetCalendar();
            } catch (error) {
              console.error('Error deleting event:', error);
              Alert.alert(
                'Error',
                'An error occurred while deleting the event.',
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onUpdate = (event: Event) => {
    setEventDetails(event);
    bottomSheetRef.current?.open();
  };

  const renderRightActions = (event: Event) => (
    <View style={styles.rightAction}>
      <IconL
        name="create-outline"
        size={35}
        color="gray"
        onPress={() => onUpdate(event)}
      />
      <IconL
        name="trash-outline"
        size={35}
        color="red"
        onPress={() => onDelete(event)}
      />
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.calendar}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 40, fontWeight: '300', marginBottom: 5}}>
              Today
            </Text>
            <Text style={{fontSize: 14, fontWeight: '300'}}>
              Welcome, Jennie
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleAddEvent}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#00adf5',
              padding: 15,
              borderRadius: 30,
              paddingHorizontal: 20,
              shadowColor: '#00adf5',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 2,
            }}>
            <Feather name="plus" size={20} color="white" />
            <Text style={{marginLeft: 10, fontWeight: '700', color: 'white'}}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>

        {renderEvents}

        {/* <TouchableOpacity onPress={handleAddEvent} style={styles.plusIcon}>
          <Icon name="plus" size={18} color="white" />
        </TouchableOpacity> */}
        <RBSheet
          ref={bottomSheetRef}
          closeOnDragDown={true}
          height={screenHeight * 0.5}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}>
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
    </SafeAreaView>
  );
};

export default CalendarScreen;
