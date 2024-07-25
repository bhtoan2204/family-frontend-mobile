import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {G, Text as SVGText} from 'react-native-svg';
import moment from 'moment';
import MonthPicker from 'react-native-month-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {ExpenseServices, IncomeServices} from 'src/services/apiclient';
import {
  getSelectedDate,
  setSelectedDate,
  setSelectedOptionIncome,
} from 'src/redux/slices/IncomeAnalysis';
import {IncomeMonthly} from 'src/interface/income/IncomeMonthly';
import {useThemeColors} from 'src/hooks/useThemeColor';

interface PieChartScreenProps {
  id_family: number;
}

type DataType = {
  svg: {
    fill: string;
  };
  key: string;
};
interface LegendProps {
  data: DataType[];
  style?: React.CSSProperties;
}
type SliceType = {
  pieCentroid: number[];
  data: {
    label: string;
  };
};

const PieChartComponent: React.FC<PieChartScreenProps> = ({id_family}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [dailyData, setDailyData] = useState<IncomeMonthly[]>([]);
  const dispatch = useDispatch();
  const date = useSelector(getSelectedDate);
  const color = useThemeColors();
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<string>('Total');

  useEffect(() => {
    console.log(date);
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      setSelectedMonth(parsedDate);
      fetchData(parsedDate.getMonth() + 1, parsedDate.getFullYear(), id_family);
    }
  }, [date, id_family]);

  const fetchData = async (month: number, year: number, id_family: number) => {
    try {
      let response;
      if (
        month === new Date().getMonth() + 1 &&
        year === new Date().getFullYear()
      ) {
        const currentDate = new Date().getDate();
        response = await IncomeServices.getIncomeByMonth(
          month,
          year,
          id_family,
        );

        if (response) {
          response = response.filter(
            (item: {day: number}) => item.day < currentDate,
          );
          console.log(response);
        }
      } else {
        response = await IncomeServices.getIncomeByMonth(
          month,
          year,
          id_family,
        );
      }

      if (response) {
        setDailyData(response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const categoryColors: {[key: number]: string} = {
    1: `rgba(32, 178, 170, 0.8)`, // Cyan
    2: `rgba(210, 105, 30, 0.8)`, // Light green
    3: `rgba(0, 128, 128, 0.8)`, // Teal
    4: `rgba(255, 215, 0, 0.8)`, // Gold
    5: `rgba(75, 0, 130, 0.8)`, // Indigo
    6: `rgba(255, 20, 147, 0.5)`, // Hot pink
    7: `rgba(255, 20, 147, 0.5)`, // Steel blue
    8: `rgba(255, 165, 0, 0.8)`, // Orange
    9: `rgba(135, 206, 250, 0.8)`, // Light sky blue
    10: `rgba(210, 105, 30, 0.8)`, // Chocolate
    11: `rgba(218, 165, 32, 0.8)`, // Goldenrod
    12: `rgba(255, 140, 0, 0.8)`, // Dark orange
    13: `rgba(186, 85, 211, 0.8)`, // Medium orchid
    14: `rgba(32, 178, 170, 0.8)`, // Cyan (duplicate, different opacity)
    15: `rgba(0, 191, 255, 0.8)`, // Deep sky blue
    16: `rgba(240, 128, 128, 0.8)`, // Light coral
    17: `rgba(255, 20, 147, 0.5)`, // Deep pink (transparent)
    18: `rgba(255, 255, 255, 0.5)`, // White (transparent)
    19: `rgba(255, 255, 0, 0.5)`, // Yellow (transparent)
    20: `rgba(128, 0, 128, 0.5)`, // Purple (transparent)
  };

  const totalExpense = dailyData.reduce(
    (total, expense) => total + expense.total,
    0,
  );

  const categoryData = dailyData.reduce<{[key: string]: number}>(
    (acc, expense) => {
      expense.categories.forEach(category => {
        acc[category.name] = (acc[category.name] || 0) + category.amount;
      });
      return acc;
    },
    {},
  );

  // const pieChartData = Object.entries(categoryData).map(
  //   ([name, amount], index) => ({
  //     key: name,
  //     value: (amount / totalExpense) * 100,
  //     svg: {fill: categoryColors[index + 1]},
  //     arc: {outerRadius: '100%', innerRadius: '60%'},
  //     label: `${((amount / totalExpense) * 100).toFixed(2)}%`,
  //   }),
  // );
  const pieChartData = Object.entries(categoryData).map(
    ([name, amount], index) => {
      const percentage = (amount / totalExpense) * 100;
      return {
        key: name,
        value: percentage,
        svg: {fill: categoryColors[index + 1]},
        arc: {outerRadius: '100%', innerRadius: '60%'},
        label: percentage > 10 ? `${percentage.toFixed(1)}%` : '',
      };
    },
  );

  pieChartData.sort((a, b) => b.value - a.value);

  const formatMonthYear = (date: moment.MomentInput) => {
    return moment(date).format('MM/YYYY');
  };

  const handleMonthPickerConfirm = (newDate: Date) => {
    const year = moment(newDate).year();
    const month = moment(newDate).month() + 1;
    setSelectedMonth(new Date(newDate));
    setMonthPickerVisible(false);
    fetchData(month, year, id_family);
  };

  const Labels = ({slices}: {slices: SliceType[]}) => {
    return slices.map((slice, index) => {
      const {pieCentroid, data} = slice;
      return (
        <G key={index} x={pieCentroid[0]} y={pieCentroid[1]}>
          <SVGText
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={14}
            fontWeight="900"
            stroke="black"
            strokeWidth={0.2}>
            {data.label}
          </SVGText>
        </G>
      );
    });
  };

  const Legend: React.FC<LegendProps> = ({data, style}) => {
    return (
      <ScrollView contentContainerStyle={styles.legendContainerPieChart}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, {backgroundColor: item.svg.fill}]}
            />
            <Text style={styles.legendLineText}>{item.key}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };
  const selectOption = (option: string) => {
    setSelectedCategoryType(option);
  };

  const handlePressDate = (day: number) => {
    const formattedDate = moment(selectedMonth)
      .set('date', day)
      .format('YYYY-MM-DD');
    dispatch(setSelectedOptionIncome('Day'));
    dispatch(setSelectedDate(formattedDate));
  };

  const formatCurrency = (amount: string | number | bigint) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  return (
    // <ScrollView style={{height: '80%'}}>

    //   {/* <View style={styles.buttonContainer}>
    //     <Button
    //       title={showDetails ? 'Hide Details' : 'View Details'}
    //       onPress={() => setShowDetails(!showDetails)}
    //     />
    //   </View> */}
    // </ScrollView>
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          paddingTop: 10,
          color: color.text,
          paddingBottom: 10,
        }}>
        Total Expense for {formatMonthYear(selectedMonth)}:
        <Text style={{color: 'red'}}> - {formatCurrency(totalExpense)}</Text>
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <PieChart
          style={{height: 250, flex: 40}}
          data={pieChartData}
          outerRadius={'80%'}
          innerRadius={'60%'}
          labelRadius={120}>
          <Labels slices={pieChartData} />
        </PieChart>
        <Legend data={pieChartData} style={{flex: 1}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.monthPickerContainer}
          onPress={() => setMonthPickerVisible(!isMonthPickerVisible)}>
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>
              {formatMonthYear(selectedMonth)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {isMonthPickerVisible && (
        <View style={{zIndex: 2, marginBottom: 50, padding: 10}}>
          <MonthPicker
            selectedDate={selectedMonth}
            onMonthChange={handleMonthPickerConfirm}
          />
        </View>
      )}
      <View
        style={[
          styles.chartContainer,
          {backgroundColor: color.halfBackground},
        ]}>
        <View style={styles.containerTab}>
          <TouchableOpacity
            onPress={() => selectOption('Total')}
            style={[
              styles.tabButton,
              {backgroundColor: color.buttonGroup},
              selectedCategoryType === 'Total'
                ? {
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    backgroundColor: color.buttonGroupChooseIncome,
                  }
                : {
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                  },
            ]}>
            <Text
              style={[
                styles.tabButtonText,
                {color: color.text},
                selectedCategoryType === 'Total' && styles.selectedTabText,
              ]}>
              Total
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectOption('Detail')}
            style={[
              styles.tabButton,
              {backgroundColor: color.buttonGroup},
              selectedCategoryType === 'Detail'
                ? {
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    backgroundColor: color.buttonGroupChooseIncome,
                  }
                : {
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                  },
            ]}>
            <Text
              style={[
                styles.tabButtonText,
                {color: color.text},
                selectedCategoryType === 'Detail' && styles.selectedTabText,
              ]}>
              Detail
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          {selectedCategoryType === 'Detail' && (
            <View style={styles.ContainerCategory}>
              {dailyData.map((detail, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.expenseItem}
                  onPress={() => handlePressDate(detail.day)}>
                  <View style={styles.expenseDetails}>
                    {/* <Image
                  source={{
                    uri: `https://via.placeholder.com/40?text=${('0' + detail.day).slice(-2)}`,
                  }}
                  style={styles.avatar}
                /> */}
                    <Text style={[styles.expenseText, {color: color.text}]}>
                      {('0' + detail.day).slice(-2)}/
                      {('0' + (selectedMonth.getMonth() + 1)).slice(-2)}
                    </Text>
                  </View>
                  <View style={styles.expenseDetails}>
                    <Text style={styles.expenseAmount}>
                      - {formatCurrency(detail.total)}
                    </Text>
                    <Icon name="chevron-right" size={20} color="#ccc" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedCategoryType === 'Total' && (
            <View style={styles.ContainerCategory}>
              {/* <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  paddingTop: 20,
                  color: color.text,
                  paddingBottom: 10,
                }}>
                Total Expense for {formatMonthYear(selectedMonth)}:
                <Text style={{color: 'red'}}>
                  {' '}
                  - {formatCurrency(totalExpense)}
                </Text>
              </Text> */}
              {Object.entries(categoryData).map(([name, amount], index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.expenseItem}
                  onPress={() => setShowDetails(!showDetails)}>
                  <View style={styles.expenseDetails}>
                    <View
                      style={[
                        styles.CategoryColorBox,
                        {backgroundColor: categoryColors[index + 1]},
                      ]}
                    />
                    <Text style={[styles.expenseText, {color: color.text}]}>
                      {name === 'null' ? 'Other' : name}
                    </Text>
                  </View>
                  <View style={styles.expenseDetails}>
                    <Text style={styles.expenseAmount}>
                      - {formatCurrency(amount)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: 500,
          marginTop: 0,
        }}
      />
    </View>
  );
};

export default PieChartComponent;
