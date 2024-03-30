import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RoleService from 'src/services/apiclient/RoleServices';
import { CalendarScreenProps } from 'src/navigation/NavigationTypes';
import styles from './style';

const CalendarScreen = ({navigation, route} : CalendarScreenProps) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
    "November", "December"];
  const weekDays = [
    "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
  ]; 
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const [activeDate, setActiveDate] = useState(new Date());


  const handlegetCalendar = async() => {
    try{
       //const respone = await RoleService.getAllRole({id_family});
    }catch (error){
        console.log(error);
    }
  };

  const setMonth = (month: number) => {
    const newActiveDate = new Date(activeDate);
    newActiveDate.setMonth(month);
    setActiveDate(newActiveDate);
  };

  const changeMonth = (n: number) => {
    const newActiveDate = new Date(activeDate);
    newActiveDate.setMonth(newActiveDate.getMonth() + n);
    setActiveDate(newActiveDate);
  };

  const month = activeDate.getMonth();
  const year = activeDate.getFullYear();

  return (
    <View style={styles.calendar}>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Previous" onPress={() => changeMonth(-1)} />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`${month + 1}/${year}`}</Text>
        <Button title="Next" onPress={() => changeMonth(1)} />
      </View> */}
      <Calendar
        onDayPress={(day) => console.log('selected day', day)}
        monthFormat={'yyyy/MM'}
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        firstDay={1}
        enableSwipeMonths={true}
        markedDates={{
          [`${year}-${month + 1}-1`]: { selected: true},
        }}
      />
    </View>
  );
};

export default CalendarScreen;
