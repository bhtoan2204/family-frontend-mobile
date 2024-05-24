import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button, Image } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { setSelectedDate, setSelectedOption } from "src/redux/slices/ExpenseAnalysis";
import axios from "axios";
import moment from 'moment';
import { ExpenseServices } from "src/services/apiclient";

interface Category {
    name: string;
    amount: number;
}

interface MonthlyData {
    month: number;
    total: number;
    categories: Category[];
}

interface LineChartScreenProps {
    id_family: number;
}

const LineChartScreen: React.FC<LineChartScreenProps> = ({ id_family }) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedLegend, setSelectedLegend] = useState<number | null>(null);
    const [isYearPickerVisible, setYearPickerVisible] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const [years, setYears] = useState<number[]>([]);
    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const recentYears = generateRecentYears();
        setYears(recentYears);
        fetchData(selectedYear, id_family);
    }, [selectedYear, id_family]);

    const generateRecentYears = () => {
        const currentYear = moment().year();
        const recentYears = [];
        for (let i = currentYear - 2; i <= currentYear; i++) {
            recentYears.push(i);
        }
        return recentYears;
    };

    const fetchData = async (year: number, id_family: number) => {
        try {
            const response = await ExpenseServices.getExpenseByYear(year, id_family);
            const transformedData = response.map((monthData: MonthlyData) => ({
                month: monthData.month,
                total: monthData.total,
                categories: monthData.categories ? monthData.categories.reduce((acc: { [key: string]: number }, category: Category) => {
                    acc[category.name] = category.amount;
                    return acc;
                }, {}) : {} // If categories is undefined, assign an empty object
            }));
            
            setMonthlyData(transformedData);
            console.log(monthlyData[0].categories)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
  
    const toggleLegend = (index: number) => {
        setSelectedLegend(index === selectedLegend ? null : index);
    };

    const legendItemStyle = (index: number) => [
        styles.legendItem,
        selectedLegend === index && styles.selectedLegendItem
    ];

    const calculateMonthlyTotals = () => {
        return monthlyData.map(month => month.total);
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

    // Tạo một mảng chứa tất cả các loại danh mục duy nhất
    const categories = monthlyData.reduce((acc: string[], month) => {
        if (Array.isArray(month.categories)) { // Check if month.categories is an array
            month.categories.forEach(category => {
                if (!acc.includes(category.name)) {
                    acc.push(category.name);
                }
            });
        }
        return acc;
    }, []);
    
    // Tạo mảng dữ liệu cho mỗi loại danh mục
    let categoryDatasets: any[] = [];
    if (monthlyData.length > 0) {
        categoryDatasets = Object.keys(monthlyData[0].categories).map(category => {
            return {
                name: category,
                data: monthlyData.map(month => {
                    const categoryData = month.categories[category];
                    return categoryData ? categoryData : 0;
                }),
                color: () => `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`, // Màu ngẫu nhiên cho mỗi loại danh mục
            };
        });
    }

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
                <Text>(Unit: Million VNĐ)</Text>
                <LineChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            ...categoryDatasets,
                            {
                                data: monthlyTotals, // Dữ liệu tổng số liệu hàng tháng
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Màu cho dữ liệu tổng số liệu hàng tháng
                            },
                        ],
                    }}
                    width={400}
                    height={220}
                    chartConfig={{
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientTo: "#FFFFFF",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, .0, 0, ${opacity})`,
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
                {categoryDatasets.map((dataset, index) => (
                    <TouchableOpacity
                        key={index}
                        style={legendItemStyle(index)}
                        onPress={() => toggleLegend(index)}
                    >
                        <View
                            style={[
                                styles.legendColor,
                                { backgroundColor: dataset.color() },
                            ]}
                        />
                        <Text style={styles.legendText}>{dataset.name}</Text>
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
                    {monthlyData.map((monthData) => (
                        <TouchableOpacity
                            key={monthData.month}
                            style={styles.expenseItem}
                            onPress={() => handlePressMonth(`${monthData.month}`)}
                        >
                            <View style={styles.expenseDetails}>
                                <Image source={{ uri: `${avatarUrlTemplate}${monthData.month}` }} style={styles.avatar} />
                                <Text style={styles.expenseText}>{`Month ${monthData.month}`}</Text>
                            </View>
                            <View style={styles.expenseDetails}>
                                {monthData.categories && Array.isArray(monthData.categories) && monthData.categories.map((category) => (
                                    <View key={category.name}>
                                        <Text>{`${category.name}: ${category.amount}`}</Text>
                                    </View>
                                ))}
                                <Text style={styles.expenseAmount}>{`Total: ${monthData.total} đ`}</Text>
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

