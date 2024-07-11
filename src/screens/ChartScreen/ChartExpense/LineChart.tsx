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
import {useDispatch} from 'react-redux';
import {
  setSelectedDate,
  setSelectedOption,
} from 'src/redux/slices/ExpenseAnalysis';
import moment from 'moment';
import {ExpenseServices} from 'src/services/apiclient';
import {Ionicons} from '@expo/vector-icons';

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
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedLegends, setSelectedLegends] = useState<string[]>(['Total']);
  const [isYearPickerVisible, setYearPickerVisible] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [years, setYears] = useState<number[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const dispatch = useDispatch();
  const [allCategories, setAllCategories] = useState<Set<string>>(new Set());

  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const fullLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
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
        amount: category.amount / 1000,
      })),
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
    'rgba(255, 0, 0, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(255, 255, 0, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(0, 255, 255, 1)',
    'rgba(128, 0, 0, 1)',
    'rgba(0, 128, 0, 1)',
    'rgba(0, 0, 128, 1)',
    'rgba(128, 128, 0, 1)',
    'rgba(128, 0, 128, 1)',
    'rgba(255, 165, 0, 1)',
    'rgba(255, 192, 203, 1)',
    'rgba(0, 255, 127, 1)',
    'rgba(255, 20, 147, 1)',
    'rgba(255, 140, 0, 1)',
    'rgba(0, 255, 255, 0.5)',
    'rgba(255, 255, 255, 0.5)',
    'rgba(255, 255, 0, 0.5)',
    'rgba(128, 0, 128, 0.5)',
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
          const categoryData = month.categories.find(cat => cat.name === categoryId);
          categoryDataAmount = categoryData ? categoryData.amount : 0;
        } else if (typeof month.categories === 'object') {
          const categoryData = Object.values(month.categories).find(cat => cat.name === categoryId);
          categoryDataAmount = categoryData ? categoryData.amount : 0;
        }
        return categoryDataAmount;
      }),
      color: () => categoryColors[categoryId.length % 20],
    };
    categoryDatasets.push(dataset);
  });







  const displayedDatasets = selectedLegends.length > 0
    ? categoryDatasets.filter(dataset => selectedLegends.includes(dataset.name))
    : [
        ...categoryDatasets,
        {
          data: monthlyTotals,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        },
      ];
     
  const formatCurrency = (amount: string | number | bigint) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  const formatCurrency1 = (amount: number) => {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
  };
    
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
        <Text>(Unit: kVNĐ)</Text>
        {displayedDatasets.length > 0 && (
          <LineChart
          data={{
            labels: monthlyData.map(month => labels[month.month - 1]),
            datasets: displayedDatasets,
          }}
          width={400}
          height={220}
          yAxisSuffix="k"
          chartConfig={{
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `#ccc`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '2',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            propsForBackgroundLines: {
              strokeWidth: 0.1,
            },
     
          }}
        
           // bezier
           style={styles.linechart}
           renderDotContent={({ x, y, index }) => {
            const month = monthlyData[index];
            let categoryAmount = 0;
        
            if (selectedLegends.length === 1 ) {
              if (selectedLegends.length === 1 && selectedLegends[0] === 'Total') {
                categoryAmount = month.total;
              } else if (selectedLegends.length === 1 && month.categories.find(cat => cat.name === selectedLegends[0])) {
                const selectedCategory = month.categories.find(cat => cat.name === selectedLegends[0]);
                categoryAmount = selectedCategory ? selectedCategory.amount : 0;
              }
        
            return (
              <View>
                <Text key={index} style={{ position: 'absolute', left: x, top: y - 20, fontSize: 10, color: 'gray' }}>
                {categoryAmount !== 0 ? `${categoryAmount.toFixed(0)} VNĐ` : ''}
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

        <ScrollView style={styles.ContainerCategory}>
          {monthlyData.map(monthData => (
            <TouchableOpacity
              key={monthData.month}
              style={styles.expenseItem}
              onPress={() => handlePressMonth(`${monthData.month}`)}>
              <View style={styles.expenseDetails}>
                <Image
                  source={{uri: `${avatarUrlTemplate}${monthData.month}`}}
                  style={styles.avatar}
                />
                <Text
                  style={styles.expenseText}>{fullLabels[monthData.month-1]}</Text>
              </View>
              <View style={styles.expenseDetails}>
           
                <Text style={styles.expenseAmount}>-{formatCurrency(monthData.total * 1000)}</Text>

                <Icon name="chevron-right" size={20} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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