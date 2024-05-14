import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button, Image } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { setSelectedDate, setSelectedOption } from "src/redux/slices/ExpenseAnalysis";

const LineChartScreen = () => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedLegend, setSelectedLegend] = useState<number | null>(null);
    const [isYearPickerVisible, setYearPickerVisible] = useState<boolean>(false);
    const moment = require('moment');
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const [years, setYears] = useState<number[]>([]);
    const dispatch = useDispatch();

    const lineChartData = [
        { name: "Food", data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], color: "red" },
        { name: "Transportation", data: [20, 30, 25, 35, 45, 50, 55, 60, 70, 65, 75, 80], color: "blue" },
        { name: "Housing", data: [15, 25, 20, 30, 35, 40, 45, 50, 55, 60, 65, 70], color: "green" },
    ];

    const generateRecentYears = () => {
        const currentYear = moment().year();
        const recentYears = [];
        for (let i = currentYear - 2; i <= currentYear; i++) {
            recentYears.push(i);
        }
        return recentYears;
    };

    useEffect(() => {
        const recentYears = generateRecentYears();
        setYears(recentYears);
    }, []);

    const toggleLegend = (index: number) => {
        setSelectedLegend(index === selectedLegend ? null : index);
    };

    const legendItemStyle = (index: number) => [
        styles.legendItem,
        selectedLegend === index && styles.selectedLegendItem
    ];

    const calculateMonthlyTotals = () => {
        const totals = [];
        const months = lineChartData[0].data.length;

        for (let i = 0; i < months; i++) {
            let monthlyTotal = 0;
            lineChartData.forEach(line => {
                monthlyTotal += line.data[i];
            });
            totals.push(monthlyTotal);
        }

        return totals;
    };

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    };

    const monthlyTotals = calculateMonthlyTotals();

    const avatarUrlTemplate = 'https://dummyimage.com/40x40/000/fff&text='; 

    const handlePressMonth = (month: string) => {
        const date = `${selectedYear}-${month}-01`;
        dispatch(setSelectedOption('Month'));
        dispatch(setSelectedDate(date));
    };

    return (
        <ScrollView style={{height: '80%'}}>
            <View style={styles.itemContainer}>
                <Icon name="calendar" size={25} color="black" style={styles.icon} />
                <Text style={styles.text}>Select Year</Text>
            </View>
            <TouchableOpacity style={styles.monthPickerContainer} onPress={() => setYearPickerVisible(!isYearPickerVisible)}>
                <View style={styles.monthContainer}>
                    <Text style={styles.monthText}>{selectedYear}</Text>
                </View>
            </TouchableOpacity>
            {isYearPickerVisible && (
                <View style={styles.yearPickerContainer}>
                    <Picker
                        selectedValue={selectedYear}
                        style={styles.dropdownYear}
                        onValueChange={(itemValue) => handleYearChange(itemValue)}>
                        {years.map((year: number) => (
                            <Picker.Item key={year} label={year.toString()} value={year} />
                        ))}
                    </Picker>
                </View>
            )}
            <View style={styles.chartContainer}>
                <Text>(Unit: Milion VNĐ)</Text>
                <LineChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: lineChartData.map((line, index) => ({
                            data: line.data,
                            color: () => (selectedLegend === null || selectedLegend === index ? line.color : "rgba(0, 0, 0, 0)"),
                        })),
                    }}
                    width={400}
                    height={220}
                    chartConfig={{
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientTo: "#FFFFFF",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: {
                            r: "3",
                            strokeWidth: "2",
                            stroke: "#ffa726",
                        },
                    }}
                    bezier
                    style={styles.linechart}
                />
            </View>
            <ScrollView horizontal contentContainerStyle={styles.legendContainer}>
                {lineChartData.map((line, index) => (
                    <TouchableOpacity
                        key={index}
                        style={legendItemStyle(index)}
                        onPress={() => toggleLegend(index)}
                    >
                        <View
                            style={[
                                styles.legendColor,
                                { backgroundColor: line.color },
                            ]}
                        />
                        <Text style={styles.legendText}>{line.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title={showDetails ? "Hide Details" : "View Details"}
                    onPress={() => setShowDetails(!showDetails)}
                />
            </View>
            {showDetails && (
                <View style={styles.ContainerCategory}>
                    {monthlyTotals.map((total, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.expenseItem}
                            onPress={() => handlePressMonth(`${index + 1}`)}
                            >
                                <View style={styles.expenseDetails}>
                                    <Image source={{ uri: `${avatarUrlTemplate}${index + 1}` }} style={styles.avatar} />
                                    <Text style={styles.expenseText}>{`Month ${index + 1}`}</Text>
                                </View>
                                <View style={styles.expenseDetails}>
                                    <Text style={styles.expenseAmount}>{`Total: ${total} đ`}</Text>
                                    <Icon name="chevron-right" size={20} color="#ccc" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        );
    };
    
    export default LineChartScreen;
    