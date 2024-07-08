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
import {
  getDate,
  setSelectedDate,
  setSelectedOption,
} from 'src/redux/slices/ExpenseAnalysis';
import {ExpenseServices} from 'src/services/apiclient';
import {Ionicons} from '@expo/vector-icons';

interface PieChartScreenProps {
  id_family: number;
}

interface LegendProps {
  data: DataType[];
  style?: React.CSSProperties;
}

interface Category {
  name: string;
  amount: number;
  id_expense_type: number;
}

interface ExpenseData {
  categories: Category[];
  day: number;
  total: number;
}


type SliceType = {
  pieCentroid: number[];
  data: {
    label: string;
  };
};

type DataType = {
  svg: {
    fill: string;
  };
  key: string;
};

const PieChartComponent: React.FC<PieChartScreenProps> = ({id_family}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [dailyData, setDailyData] = useState<ExpenseData[]>([]);
  const dispatch = useDispatch();
  const date = useSelector(getDate);

  useEffect(() => {
    const parsedDate = new Date(date);
    setSelectedMonth(parsedDate);
    fetchData(parsedDate.getMonth() + 1, parsedDate.getFullYear(), id_family);
  }, [date, id_family]);

  const fetchData = async (month: number, year: number, id_family: number) => {
    try {
      let response;
      if (month === new Date().getMonth() + 1 && year === new Date().getFullYear()) {
        const currentDate = new Date().getDate();
        response = await ExpenseServices.getExpenseByMonth(month, year, id_family);

        if (response) {
          response = response.filter((item: { day: number; }) => item.day < currentDate);
          console.log(response)
        }
      } else {
        response = await ExpenseServices.getExpenseByMonth(month, year, id_family);
      }
      
      if (response) {
        setDailyData(response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const categoryColors: {[key: number]: string} = {
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
    ([name, amount], index) => ({
      pieCentroid: [0, 0],
      data: {
        label: name,
      },
      key: name,
      value: (amount / totalExpense) * 100,
      svg: {fill: categoryColors[index + 1]},
      arc: {outerRadius: '100%', innerRadius: '60%'},
      label: `${((amount / totalExpense) * 100).toFixed(2)}%`,
    }),
  );

  const formatMonthYear = (date: moment.MomentInput) => {
    return moment(date).format('MM/YYYY');
  };

  const handleMonthPickerConfirm = (newDate: Date) => {
    const year = moment(newDate).year();
    const month = moment(newDate).month() + 1;
    setSelectedMonth(newDate);
    setMonthPickerVisible(false);
    fetchData(month, year, id_family);
  };


  const Labels = ({slices}: {slices: SliceType[]}) => {
    return slices.map((slice, index) => {
      const {pieCentroid, data} = slice;
      return (
        <G key={index} x={pieCentroid[0]} y={pieCentroid[1]}>
          <SVGText
            fill="black"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={14}
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
      <ScrollView contentContainerStyle={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, {backgroundColor: item.svg.fill}]}
            />
            <Text style={styles.legendText}>{item.key}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const handlePressDate = (day: number) => {
    const formattedDate = moment(selectedMonth).set('date', day).format('YYYY-MM-DD');
    console.log(date)
    dispatch(setSelectedOption('Day'));
    dispatch(setSelectedDate(formattedDate));
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
      <View style={{flexDirection: 'row', top: 0, zIndex: 1}}>
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
      <View style={styles.chartContainer}>
        <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.ContainerCategory}>
            {dailyData.map((detail, index) => (
              <TouchableOpacity
                key={index}
                style={styles.expenseItem}
                onPress={() => handlePressDate(detail.day)}>
                <View style={styles.expenseDetails}>
                  <Image
                    source={{
                      uri: `https://via.placeholder.com/40?text=${detail.day}`,
                    }}
                    style={styles.avatar}
                  />
                  <Text style={styles.expenseText}>{detail.day}</Text>
                </View>
                <View style={styles.expenseDetails}>
                  <Text style={styles.expenseAmount}>- {detail.total} đ</Text>
                  {/* <Icon name="chevron-right" size={20} color="#ccc" /> */}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: 600,
          marginTop: -30,
        }}
      />
    </View>
  );
};

export default PieChartComponent;
