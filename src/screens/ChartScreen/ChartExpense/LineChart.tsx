import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSelectedDate,
  setSelectedOption,
} from 'src/redux/slices/ExpenseAnalysis';
import moment from 'moment';
import {ExpenseServices} from 'src/services/apiclient';
import {Ionicons} from '@expo/vector-icons';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import YearPicker from './YearPicker';

interface Category {
  name: string;
  amount: number;
  id_expense_type: number;
}

interface MonthlyData {
  month: number;
  total: number;
  categories: Category[];
}

interface LineChartScreenProps {
  id_family: number;
}

const LineChartScreen: React.FC<LineChartScreenProps> = ({id_family}) => {
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [selectedLegends, setSelectedLegends] = useState<string[]>(['Total']);
  const [isYearPickerVisible, setYearPickerVisible] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [years, setYears] = useState<number[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const dispatch = useDispatch();
  const [allCategories, setAllCategories] = useState<Set<string>>(new Set());
  const color = useThemeColors();

  const labels = [
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
  ];
  const fullLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const translate = useSelector(getTranslate);

  useEffect(() => {
    const recentYears = generateRecentYears();
    setYears(recentYears);
    fetchData(selectedYear);
  }, [selectedYear, id_family]);

  const generateRecentYears = () => {
    const currentYear = moment().year();
    const recentYears = [];
    for (let i = currentYear - 2; i <= currentYear; i++) {
      recentYears.push(i);
    }
    return recentYears;
  };
  const fetchData = async (year: number) => {
    try {
      const currentYear = moment().year();
      const currentMonth = moment().month() + 1;
      const response = await ExpenseServices.getExpenseByYear(year, id_family);

      const filteredData = response.filter((monthData: MonthlyData) => {
        if (year === currentYear) {
          return monthData.month <= currentMonth;
        }
        return true;
      });

      const transformedData = filteredData.map((monthData: MonthlyData) => ({
        ...monthData,
        categories: monthData.categories.map(category => ({
          ...category,
          name: category.name ? category.name : 'Other',
          amount: category.amount / 1000000,
        })),
        total: monthData.total / 1000000,
      }));

      setMonthlyData(transformedData);

      const categoriesSet = new Set<string>();
      transformedData.forEach(month => {
        month.categories.forEach(category => {
          categoriesSet.add(category.name);
        });
      });
      setAllCategories(categoriesSet);
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

  const categoryColors: string[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(199, 199, 199, 1)',
    'rgba(83, 102, 132, 1)',
    'rgba(190, 60, 70, 1)',
    'rgba(50, 150, 50, 1)',
    'rgba(255, 20, 147, 1)',
    'rgba(255, 69, 0, 1)',
    'rgba(135, 206, 250, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(255, 105, 180, 1)',
    'rgba(30, 144, 255, 1)',
    'rgba(219, 112, 147, 1)',
    'rgba(255, 20, 147, 0.8)',
    'rgba(123, 104, 238, 1)',
    'rgba(0, 139, 139, 1)',
    'rgba(255, 69, 0, 0.8)',
    'rgba(255, 99, 71, 1)',
    'rgba(32, 178, 170, 1)',
    'rgba(128, 128, 128, 1)',
    'rgba(255, 0, 0, 0.5)',
    'rgba(0, 255, 0, 0.5)',
    'rgba(0, 0, 255, 0.5)',
    'rgba(255, 255, 0, 0.5)',
    'rgba(255, 105, 180, 0.7)',
    'rgba(139, 0, 139, 0.8)',
    'rgba(255, 69, 0, 0.6)',
    'rgba(0, 128, 128, 0.6)',
    'rgba(255, 192, 203, 0.5)',
    'rgba(64, 224, 208, 0.7)',
    'rgba(0, 191, 255, 0.7)',
    'rgba(186, 85, 211, 0.7)',
    'rgba(255, 165, 0, 0.5)',
    'rgba(144, 238, 144, 0.6)',
    'rgba(135, 206, 250, 0.5)',
    'rgba(255, 228, 196, 0.7)',
    'rgba(255, 140, 0, 0.6)',
    'rgba(255, 20, 147, 0.7)',
    'rgba(0, 250, 154, 0.6)',
  ];

  const categoryDatasets: any[] = [];

  if (monthlyData.length > 0) {
    categoryDatasets.push({
      name: 'Total',
      data: monthlyTotals,
      color: () => categoryColors[0],
    });
  }
  allCategories.forEach((categoryId, index) => {
    const dataset = {
      name: categoryId,
      data: monthlyData.map(month => {
        let categoryDataAmount = 0;
        if (Array.isArray(month.categories)) {
          const categoryData = month.categories.find(
            cat => cat.name === categoryId,
          );
          categoryDataAmount = categoryData ? categoryData.amount : 0;
        } else if (typeof month.categories === 'object') {
          const categoryData = Object.values(month.categories).find(
            cat => cat.name === categoryId,
          );
          categoryDataAmount = categoryData ? categoryData.amount : 0;
        }
        return categoryDataAmount;
      }),
      color: () => categoryColors[categoryId.length % 10],
    };
    categoryDatasets.push(dataset);
  });

  const displayedDatasets =
    selectedLegends.length > 0
      ? categoryDatasets.filter(dataset =>
          selectedLegends.includes(dataset.name),
        )
      : [
          ...categoryDatasets,
          {
            data: monthlyTotals,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          },
        ];

  const formatCurrency = (amount: string | number | bigint) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  const formatCurrency1 = (amount: number) => {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
  };

  return (
    <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={[styles.monthPickerContainer, {zIndex: 1}]}
        onPress={() => setYearPickerVisible(!isYearPickerVisible)}>
        <View style={styles.monthContainer}>
          <Text style={[styles.monthText, {color: color.text}]}>
            {selectedYear}
          </Text>
        </View>
      </TouchableOpacity>
      {isYearPickerVisible && (
        <View style={styles.yearPickerContainer}>
          <Picker
            selectedValue={selectedYear}
            style={styles.dropdownYear}
            onValueChange={itemValue => handleYearChange(itemValue)}>
            {years.map((year: number) => (
              <Picker.Item key={year} label={year.toString()} value={year} />
            ))}
          </Picker>
        </View>
      )}
      <View
        style={[
          styles.chartLineContainer,
          {backgroundColor: color.background},
        ]}>
        <Text style={{color: color.text}}>({translate('Unit')}: VNĐ)</Text>
        {displayedDatasets.length > 0 && (
          <LineChart
            data={{
              labels: monthlyData.map(month => labels[month.month - 1]),
              datasets: displayedDatasets,
            }}
            width={400}
            height={220}
            yAxisSuffix="M"
            chartConfig={{
              backgroundGradientFrom: color.background,
              backgroundGradientTo: color.background,
              decimalPlaces: 0,
              color: (opacity = 1) => color.text,
              labelColor: (opacity = 1) => color.text,
              propsForDots: {
                r: '2',
                strokeWidth: '2',
                stroke: color.text,
              },
              propsForBackgroundLines: {
                strokeWidth: 0.1,
                stroke: `rgba(255, 255, 255, 0.2)`,
              },
              propsForHorizontalLabels: {
                fontSize: 10,
                color: 'white',
              },
            }}
            // bezier
            style={styles.linechart}
            renderDotContent={({x, y, index}) => {
              const month = monthlyData[index];
              let categoryAmount = 0;

              if (selectedLegends.length === 1) {
                if (selectedLegends[0] === 'Total') {
                  categoryAmount = month.total;
                } else {
                  const selectedCategory = month.categories.find(
                    cat => cat.name === selectedLegends[0],
                  );
                  categoryAmount = selectedCategory
                    ? selectedCategory.amount
                    : 0;
                }

                return (
                  <View key={`dot-content-${index}`}>
                    <Text
                      style={{
                        position: 'absolute',
                        left: x - 15,
                        top: y - 20,
                        fontSize: 10,
                        color: 'green',
                      }}>
                      {categoryAmount !== 0
                        ? `${categoryAmount.toFixed(0)}M VNĐ`
                        : ''}
                    </Text>
                  </View>
                );
              }
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
              <View
                style={[
                  styles.legendItem,
                  selectedLegends.includes(dataset.name) &&
                    styles.selectedLegendItem,
                ]}>
                <View
                  style={[
                    styles.legendColor,
                    {backgroundColor: dataset.color()},
                  ]}
                />
                <Text style={[styles.legendText, {color: color.text}]}>
                  {dataset.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{height: 1, backgroundColor: color.background, marginTop: 10}}
        />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => setShowDetails(!showDetails)}>
          <Text style={{fontWeight: '500', color: color.text}}>
            {showDetails
              ? translate('Hide details')
              : translate('View details')}
          </Text>
          <Ionicons
            name={showDetails ? 'chevron-down' : 'chevron-forward'}
            size={20}
            color={color.text}
          />
        </TouchableOpacity>
        {showDetails && (
          <ScrollView
            style={[
              styles.ContainerCategory,
              {backgroundColor: color.background},
            ]}>
            {monthlyData.map(monthData => (
              <TouchableOpacity
                key={monthData.month}
                style={styles.expenseItem}
                onPress={() => handlePressMonth(`${monthData.month}`)}>
                <View style={styles.expenseDetails}>
                  {/* <Image
                  source={{uri: `${avatarUrlTemplate}${monthData.month}`}}
                  style={styles.avatar}
                /> */}
                  <Text style={[styles.expenseText, {color: color.text}]}>
                    {translate(fullLabels[monthData.month - 1])}
                  </Text>
                </View>
                <View style={styles.expenseDetails}>
                  <Text style={[styles.expenseAmount]}>
                    + {formatCurrency(monthData.total * 1000000)}
                  </Text>

                  <Icon name="chevron-right" size={20} color="#ccc" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      <View
        style={{
          backgroundColor: color.background,
          width: '100%',
          height: 400,
          marginTop: -30,
        }}
      />
    </ScrollView>
  );
};

export default LineChartScreen;
