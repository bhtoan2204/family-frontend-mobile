import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from "react-redux";

import { getIncomeList, getSelectedDate, setIncomeList, setSelectedIncome } from "src/redux/slices/IncomeAnalysis";
import { IncomeServices } from "src/services/apiclient";
import { DailyIncome } from "src/interface/income/IncomeDaily";
import moment from "moment";
import { COLORS } from "src/constants";

const screenHeight = Dimensions.get('screen').height;

interface BarChartScreenProps {
  id_family: number;
  navigation: any;
}

const BarChartScreen : React.FC<BarChartScreenProps> = ({ id_family, navigation }) => {
  const date = useSelector(getSelectedDate);

  const [selectedDate, setSelectedDate] = useState<string>(date);
  const barChartData = useSelector(getIncomeList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(selectedDate, id_family);
  }, [selectedDate]);

  const fetchData = async (date: string, id_family: number) => {
    try {
      const response = await IncomeServices.getIncomeByDate(date, id_family);
      if (response) {
        dispatch(setIncomeList(response));
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

 

  const handlePressExpenseItem = async (item: DailyIncome) => {
    await dispatch(setSelectedIncome(item));
    navigation.navigate('ExpenseDetailScreen');
  };

  const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const formatDate = (isoDateTime: string) => {
    return moment(isoDateTime).format('DD/MM/YYYY HH:mm');
  };

  const renderItem = ({ item, index }: { item: DailyIncome; index: number }) => (
    <TouchableOpacity onPress={() => handlePressExpenseItem(item)} style={styles.expenseItem}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
            <Text style={styles.expenseCategory}>{item.financeIncomeSource.income_source_name}</Text>
            <View style={styles.row}>
              <Text style={{ color: 'gray' }}>By: </Text>
              <Text style={styles.expenseName}>{item.users.firstname} {item.users.lastname}</Text>
            </View>
            <Text style={styles.expenseDescription}>{item.description}</Text>
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <View style={styles.rowInfo}>
              <Text style={styles.incomeAmount}>+{formatCurrency(item.amount)}</Text>
              <Text style={styles.expenseDate}>{formatDate(item.income_date)}</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Icon name="chevron-forward" size={20} style={styles.forwardIcon} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          value={new Date(selectedDate)}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      </View>
      {barChartData.length > 0 ? (
        <View style={styles.DataContainer}>
        <FlatList
          data={barChartData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 700 }}
        />
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Image
            source={require('src/assets/icons/search.png')}
            resizeMode="stretch"
            style={styles.noDataImage}
          />
          <Text style={styles.noDataText}>No data</Text>
          <Text style={styles.noDataDescription}>No data available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  expenseContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseCategory: {
    fontSize: 16,
    color: COLORS.Rhino,
    fontWeight: '500',
  },
  expenseDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  expenseName: {
    fontSize: 14,
    color: COLORS.DenimBlue,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rowInfo: {
    marginTop: 5,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseDate: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  forwardIcon: {
    marginLeft: 10,
  },
  datePickerContainer: {
    top: 10,
    paddingHorizontal: 0,
    fontSize: 20,
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '30%',
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  expenseItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noDataContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 700,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  noDataImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 30,
    fontWeight: '500',
  },
  noDataDescription: {
    color: '#90A4AD',
    fontSize: 16,
  },
  DataContainer: {
    bottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
    height: screenHeight*0.8,
    paddingTop: 40,
  },
  incomeAmount: {
    fontSize: 15,
    color: 'green',
    marginRight: 10
  },
});

export default BarChartScreen;
