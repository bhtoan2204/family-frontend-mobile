import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CustomDay = ({date, marking, onPress}) => {
  const today = new XDate();
  const isPast = new XDate(date).isBefore(today, 'day');

  return (
    <View
      style={[
        styles.dayContainer,
        isPast && styles.pastDay,
        marking?.marked && styles.markedDay,
      ]}
      onTouchEnd={() => onPress && onPress(date)}>
      <Text style={styles.dayText}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pastDay: {
    backgroundColor: 'lightgray',
  },
  markedDay: {
    borderColor: 'blue',
    borderWidth: 1,
  },
  dayText: {
    color: 'black',
  },
});

export default CustomDay;
