import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import {getDate} from 'src/redux/slices/ExpenseAnalysis';
import {ExpenseServices} from 'src/services/apiclient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface DailyData {
  id_expense_type: number;
  expense_category: string;
  expense_amount: number;
  description: string;
  name: string;
}
interface BarChartScreenProps {
  id_family: number;
}

const BarChartScreen: React.FC<BarChartScreenProps> = ({id_family}) => {
  const [showDetails, setShowDetails] = useState<boolean[]>([]);
  const date = useSelector(getDate);

  const [selectedDate, setSelectedDate] = useState<string>(date);
  const [barChartData, setBarChartData] = useState<DailyData[]>([]);

  useEffect(() => {
    fetchData(selectedDate, id_family);
  }, [selectedDate]);

  const fetchData = async (date: string, id_family: number) => {
    try {
      const response = await ExpenseServices.getExpenseByDate(date, id_family);
      if (Array.isArray(response)) {
        setBarChartData(response);
        setShowDetails(new Array(response.length).fill(false));
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    setSelectedDate(currentDate);
    fetchData(currentDate, id_family);
  };

  const toggleDetails = (index: number) => {
    const updatedShowDetails = [...showDetails];
    updatedShowDetails[index] = !updatedShowDetails[index];
    setShowDetails(updatedShowDetails);
  };

  return (
    <ScrollView>
      {/* <View style={styles.itemContainer}>
          <Icon name="calendar" size={25} color="black" style={styles.icon} />
          <Text style={styles.text}>Select Date</Text>
        </View> */}
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          value={new Date(selectedDate)}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      </View>

      <View style={[styles.chartBarContainer, {marginTop: 20}]}>
        {barChartData.map((expense, index) => (
          <View key={index}>
            <View style={styles.expenseDateItem}>
              <View style={styles.expenseDetails}>
                <Text style={styles.expenseText}>
                  {expense.expense_category}
                </Text>
                <Text style={styles.expenseAmount}>
                  -{expense.expense_amount} đ
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggleDetails(index)}>
                <View style={{flexDirection: 'row'}}>
                  <Text>View details</Text>
                  <EvilIcons name={'chevron-right'} size={30} color="#ccc" />
                </View>
              </TouchableOpacity>

              {showDetails[index] && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.containerTextName}> {expense.name}</Text>
                  <Text style={styles.expenseText}>
                    Description: {expense.description}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                borderBottomColor: '#F3F1EE',
                borderBottomWidth: 1,
                width: '90%',
                alignSelf: 'center',
                // borderStyle: 'dashed',
                // borderRadius: 1,
              }}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: 500,
          marginTop: -30,
        }}
      />
    </ScrollView>
  );
};

export default BarChartScreen;
