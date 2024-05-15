import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SVGText } from 'react-native-svg';
import moment from 'moment';
import MonthPicker from 'react-native-month-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getDate, setSelectedDate, setSelectedOption } from 'src/redux/slices/ExpenseAnalysis';

const PieChartComponent = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const date= useSelector(getDate);

  useEffect(() => {
    const parsedDate = new Date(date);
    setSelectedMonth(parsedDate);
  }, [date]);

  const fakeExpenses = [
    { date: "2023-05-01", category: "Food", amount: 4000, color: "gray" },
    { date: "2023-05-02", category: "Transportation", amount: 2000, color: "blue" },
    { date: "2023-05-03", category: "Housing", amount: 3000, color: "green" },
    { date: "2023-05-04", category: "Food", amount: 1000, color: "gray" },
    { date: "2023-05-05", category: "Transportation", amount: 1500, color: "blue" },
    { date: "2023-05-06", category: "Housing", amount: 2500, color: "green" },
  ];

  const totalExpense = fakeExpenses.reduce((total, expense) => total + expense.amount, 0);

  const pieChartData = fakeExpenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.key === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({
        key: expense.category,
        value: expense.amount,
        svg: { fill: expense.color },
        arc: { outerRadius: '100%', innerRadius: '60%' },
      });
    }
    return acc;
  }, []);

  pieChartData.forEach(item => {
    item.value = ((item.value / totalExpense) * 100);
    item.label = `${item.value.toFixed(2)}%`;
  });

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const formatMonthYear = (date) => {
    return moment(date).format('MM/YYYY');
  };

  const handleMonthPickerConfirm = (newDate) => {
    setSelectedMonth(newDate);
    setMonthPickerVisible(false);
  };

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <G key={index} x={pieCentroid[0]} y={pieCentroid[1]}>
          <SVGText
            fill="black"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={14}
            stroke="black"
            strokeWidth={0.2}
          >
            {data.label}
          </SVGText>
        </G>
      );
    });
  };

  const Legend = ({ data }) => {
    return (
      <ScrollView horizontal contentContainerStyle={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: item.svg.fill }]} />
            <Text style={styles.legendText}>{item.key}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const groupedExpenses = fakeExpenses.reduce((acc, expense) => {
    const date = moment(expense.date).format('DD/MM/YYYY');
    if (!acc[date]) {
      acc[date] = { date, expenses: [], dailyTotal: 0 };
    }
    acc[date].expenses.push(expense);
    acc[date].dailyTotal += expense.amount;
    return acc;
  }, {});

  const expenseDetails = Object.keys(groupedExpenses).map(date => ({
    date,
    expenses: groupedExpenses[date].expenses,
    dailyTotal: groupedExpenses[date].dailyTotal,
  }));

  const handlePressDate = (date: string) => {
    const formattedDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    dispatch(setSelectedOption('Day'));
    dispatch(setSelectedDate(formattedDate));
  };

  return (
    <ScrollView style={{ height: '80%' }}>
      <View style={styles.itemContainer}>
        <Icon name="calendar" size={25} color="black" style={styles.icon} />
        <Text style={styles.text}>Select Month</Text>
      </View>
      <TouchableOpacity style={styles.monthPickerContainer} onPress={() => setMonthPickerVisible(!isMonthPickerVisible)}>
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{formatMonthYear(selectedMonth)}</Text>
        </View>
      </TouchableOpacity>

      {isMonthPickerVisible && (
        <MonthPicker
          selectedDate={selectedMonth}
          onMonthChange={handleMonthPickerConfirm}
        />
      )}

      <View style={styles.chartContainer}>
        <PieChart
          style={{ height: 250 }}
          data={pieChartData}
          outerRadius={'100%'}
          innerRadius={'60%'}
          labelRadius={120}
        >
          <Labels />
        </PieChart>
      </View>

      <Legend data={pieChartData} />

      <View style={styles.buttonContainer}>
        <Button
          title={showDetails ? "Hide Details" : "View Details"}
          onPress={() => setShowDetails(!showDetails)}
        />
      </View>

      {showDetails && (
        <View style={styles.ContainerCategory}>
          {expenseDetails.map((detail, index) => (
            <TouchableOpacity key={index} style={styles.expenseItem} onPress={() => handlePressDate(detail.date)}>
              <View style={styles.expenseDetails}>
                <Image source={{ uri: `https://dummyimage.com/40x40/000/fff&text=${detail.date.split('/')[0]}` }} style={styles.avatar} />
                <Text style={styles.expenseText}>{detail.date}</Text>
              </View>
              <View style={styles.expenseDetails}>
                <Text style={styles.expenseAmount}>-{detail.dailyTotal} đ</Text>
                <Icon name="chevron-right" size={20} color="#ccc" />

              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};


export default PieChartComponent;
