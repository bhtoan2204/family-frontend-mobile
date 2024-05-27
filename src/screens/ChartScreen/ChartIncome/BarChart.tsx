import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles"; 
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from "react-redux";

import { IncomeServices } from "src/services/apiclient";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { getDate } from "src/redux/slices/IncomeAnalysis";

interface DailyData {
    id_income_source: number;
    income_category: string;
    income_amount: number;
    description: string;
    name: string;
}
interface BarChartScreenProps {
  id_family: number;
}

const BarChartScreen : React.FC<BarChartScreenProps> = ({ id_family }) => {
    const [showDetails, setShowDetails] = useState<boolean[]>([]);
    const date = useSelector(getDate);

    const [selectedDate, setSelectedDate] = useState<string>(date);
    const [barChartData, setBarChartData] = useState<DailyData[]>([]);

    useEffect(() => {
        fetchData(selectedDate, id_family);
        
    },[id_family, selectedDate]);

    const fetchData = async (date: string, id_family: number) => {
      try {
          const response = await IncomeServices.getIncomeByDate(date, id_family);
          if (Array.isArray(response)) {
            setBarChartData(response);
            setShowDetails(new Array(response.length).fill(false));
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]; 
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
          <View style={styles.itemContainer}>
            <Icon name="calendar" size={25} color="black" style={styles.icon} />
            <Text style={styles.text}>Select Date</Text>
          </View>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={new Date(selectedDate)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          </View>
      
         
           { barChartData.map((income, index) => (
              <View key={index} style={styles.incomeDateItem}>
                <View style={styles.incomeDetails}>
                  <Text style={styles.incomeText}>{income.income_category}</Text>
                  <Text style={styles.incomeAmount}>-{income.income_amount} đ</Text>
                </View>
      
                <TouchableOpacity onPress={() => toggleDetails(index)}> 
                  <View style={{ flexDirection: 'row' }}>
                    <Text>View details</Text>
                    <EvilIcons
                      name={'chevron-right'}
                      size={30}
                      color="#ccc"
                    /> 
                  </View>
                </TouchableOpacity>
      
                {showDetails[index] && (
                  <View style={styles.detailsContainer}>
                    <Text style={styles.incomeTextName}> {income.name}</Text>
                    <Text style={styles.incomeText}>Description: {income.description}</Text>
                  </View>
                )}
              </View>
            ))
        }
        </ScrollView>
      );
      
};

export default BarChartScreen;
