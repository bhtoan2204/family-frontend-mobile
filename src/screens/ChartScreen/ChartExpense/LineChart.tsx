import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setSelectedDate, setSelectedOption } from 'src/redux/slices/ExpenseAnalysis';
import moment from 'moment';
import { ExpenseServices } from 'src/services/apiclient';
import { Ionicons } from '@expo/vector-icons';

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
  const [selectedLegends, setSelectedLegends] = useState<string[]>(['Total']);
  const [isYearPickerVisible, setYearPickerVisible] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [years, setYears] = useState<number[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const dispatch = useDispatch();
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);

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
        categories: monthData.categories
          ? monthData.categories.reduce(
              (acc: { [key: string]: number }, category: Category) => {
                acc[category.name] = category.amount;
                return acc;
              },
              {},
            )
          : {},
      }));

      setMonthlyData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleLegend = (category: string) => {
    setSelectedLegends(prevLegends =>
      prevLegends.includes(category)
        ? prevLegends.filter(legend => legend !== category)
        : [...prevLegends, category],
    );
  };

  const legendItemStyle = (category: string) => [
    styles.legendItem,
    selectedLegends.includes(category) && styles.selectedLegendItem,
  ];

  const calculateMonthlyTotals = () => {
    return monthlyData.map(month => month.total);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const monthlyTotals = calculateMonthlyTotals();

  const avatarUrlTemplate = 'https://via.placeholder.com/40?text=';

  const handlePressMonth = (month: string) => {
    const date = `${selectedYear}-${month}-01`;
    dispatch(setSelectedOption('Month'));
    dispatch(setSelectedDate(date));
  };

  const categoryColors: { [key: string]: string } = {
    1: `rgba(255, 0, 0, 1)`,
    2: `rgba(0, 255, 0, 1)`,
    3: `rgba(0, 0, 255, 1)`,
    4: `rgba(255, 255, 0, 1)`,
    5: `rgba(255, 0, 255, 1)`,
    6: `rgba(0, 255, 255, 1)`,
    7: `rgba(128, 0, 0, 1)`,
    8: `rgba(0, 128, 0, 1)`,
    9: `rgba(0, 0, 128, 1)`,
    10: `rgba(128, 128, 0, 1)`,
    11: `rgba(128, 0, 128, 1)`,
    12: `rgba(255, 165, 0, 1)`,
    13: `rgba(255, 192, 203, 1)`,
    14: `rgba(0, 255, 127, 1)`,
    15: `rgba(255, 20, 147, 1)`,
    16: `rgba(255, 140, 0, 1)`,
    17: `rgba(0, 255, 255, 0.5)`,
    18: `rgba(255, 255, 255, 0.5)`,
    19: `rgba(255, 255, 0, 0.5)`,
    20: `rgba(128, 0, 128, 0.5)`,
  };

  let categoryDatasets: any[] = [];
  if (monthlyData.length > 0) {
    categoryDatasets = Object.keys(monthlyData[0].categories).map(
      (category, index) => {
        return {
          name: category,
          data: monthlyData.map(month => {
            const categoryData = month.categories[category as any];
            return categoryData ? categoryData : 0;
          }),
          color: () => categoryColors[(index + 2).toString()],
        };
      },
    );

    categoryDatasets.push({
      name: 'Total',
      data: monthlyTotals,
      color: () => categoryColors[1],
    });
  }

  const displayedDatasets = selectedLegends.length > 0
    ? categoryDatasets.filter(dataset => selectedLegends.includes(dataset.name))
    : [
        ...categoryDatasets,
        {
          data: monthlyTotals,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        },
      ];

  return (
    <ScrollView style={{ height: '80%' }}>
      <TouchableOpacity
        style={[styles.monthPickerContainer, { zIndex: 1 }]}
        onPress={() => setYearPickerVisible(!isYearPickerVisible)}
      >
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{selectedYear}</Text>
        </View>
      </TouchableOpacity>
      {isYearPickerVisible && (
        <View style={styles.yearPickerContainer}>
          <Picker
            selectedValue={selectedYear}
            style={styles.dropdownYear}
            onValueChange={itemValue => handleYearChange(itemValue)}
          >
            {years.map((year: number) => (
              <Picker.Item key={year} label={year.toString()} value={year} />
            ))}
          </Picker>
        </View>
      )}
      <View style={styles.chartLineContainer}>
        <Text>(Unit: VNĐ)</Text>
        {displayedDatasets.length > 0 && (
          <LineChart
            data={{
              labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              datasets: displayedDatasets,
            }}
            width={400}
            height={220}

            chartConfig={{
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 2,
              color: (opacity = 1) => `#ccc`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '0',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
              propsForBackgroundLines: {
                strokeWidth: 0.1,
              },
            }}
            bezier
            style={styles.linechart}
            onDataPointClick={(data) => {
              const { value, dataset, index } = data;
              const month = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ][index];
              Alert.alert(`${dataset.name} in ${month}: ${value} Million VNĐ`);
            }}
          />
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainer
          contentContainerStyle={{
            ...styles.legendContainer,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {categoryDatasets.map((dataset, index) => (
          
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => toggleLegend(dataset.name)}>
                    <View style= { [styles.legendItem,
              selectedLegends.includes(dataset.name) && styles.selectedLegendItem,]}> 
                  <View
                    style={[styles.legendColor, { backgroundColor: dataset.color() }]}
                  />
                  <Text style={styles.legendText}>{dataset.name}</Text>
                  </View>

                </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ height: 1, backgroundColor: '#F3F1EE', marginTop: 10 }} />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => setShowDetails(!showDetails)}>
          <Text style={{ fontWeight: '500' }}>
            {showDetails ? 'Hide details' : 'View details'}
          </Text>
          <Ionicons
            name={showDetails ? 'chevron-down' : 'chevron-forward'}
            size={20}
            color="black"
          />
        </TouchableOpacity>

        {showDetails && (
          <View style={styles.ContainerCategory}>
            {monthlyData.map(monthData => (
              <TouchableOpacity
                key={monthData.month}
                style={styles.expenseItem}
                onPress={() => handlePressMonth(`${monthData.month}`)}>
                <View style={styles.expenseDetails}>
                  <Image
                    source={{ uri: `${avatarUrlTemplate}${monthData.month}` }}
                    style={styles.avatar}
                  />
                  <Text
                    style={
                      styles.expenseText
                    }>{`Month ${monthData.month}`}</Text>
                </View>
                <View style={styles.expenseDetails}>
                  {monthData.categories &&
                    Array.isArray(monthData.categories) &&
                    monthData.categories.map(category => (
                      <View key={category.name}>
                        <Text>{`${category.name}: ${category.amount}`}</Text>
                      </View>
                    ))}
                  <Text
                    style={
                      styles.expenseAmount
                    }>{`- ${monthData.total} đ`}</Text>
                  <Icon name="chevron-right" size={20} color="#ccc" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: 400,
          marginTop: -30,
        }}
      />
    </ScrollView>
  );
};

export default LineChartScreen;
