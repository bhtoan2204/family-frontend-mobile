import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import styles from "./styles"; 
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from "react-redux";
import { getDate } from "src/redux/slices/ExpenseAnalysis";

const BarChartScreen = () => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const date= useSelector(getDate);

    useEffect(() => {
      const parsedDate = new Date(date);
      setSelectedDate(parsedDate);
    },[]);

  const barChartData = [
    { category: "Food", amount: 4000, color: "gray" },
    { category: "Transportation", amount: 2000, color: "blue" },
    { category: "Housing", amount: 3000, color: "green" },
  ];

  const totalCategories = barChartData.length;

  const data = {
    labels: barChartData.map((item) => item.category), 
    datasets: [
      {
        data: barChartData.map((item) => item.amount),
      },
    ],
  };
  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setSelectedDate(currentDate);
  };

  return (
    <ScrollView>
    <View style={styles.itemContainer} >
            <Icon name="calendar" size={25} color="black" style={styles.icon} />
            <Text style={styles.text}>Select Date</Text>
        </View>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          </View>

      <View style={styles.chartContainer}>
      <Text>(Unit: VNĐ)</Text>

        <BarChart
          data={data}
          width={400}
          height={220}
       
          fromZero={true} 
          chartConfig={{
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 0, 
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={showDetails ? "Hide Details" : "View Details"}
          onPress={() => setShowDetails(!showDetails)}
        />
      </View>

      {showDetails && (
        <View  style={styles.ContainerCategory}> 

          {barChartData.map((expense, index) => (
            <View key={index} style={styles.expenseItem}>    
               <View style={styles.expenseDetails}>
                <Text style={styles.expenseText}>{expense.category}</Text>
                </View>
                <View style={styles.expenseDetails}>
                    <Text style={styles.expenseAmount}>-{expense.amount} đ</Text>
                </View>
                </View>
          ))}
         </View>

      )}

    </ScrollView>
  );
};

export default BarChartScreen;
