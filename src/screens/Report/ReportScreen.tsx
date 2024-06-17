import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {ExpenditureScreenProps} from 'src/navigation/NavigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReportScreen = ({navigation}: ExpenditureScreenProps) => {
  const pressExVsIn = () => {
    navigation.navigate('ExpenseStack', {
      screen: 'FamilySpec',
      params: {id_family: 0},
    });
  };
  const pressExpenseAnalysis = () => {
    navigation.navigate('ExpenseStack', {screen: 'ChartExpense'});
  };
  const pressIncomeAnalysis = () => {
    navigation.navigate('IncomeStack', {screen: 'ChartInomeScreen'});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.expenseContainer} onPress={pressExVsIn}>
          <Icon
            name="compare-arrows"
            size={35}
            color={COLORS.black}
            style={styles.icon}
          />
          <Text style={styles.heading}>Expense vs Income</Text>
        </TouchableOpacity>

        <View style={styles.analysisContainer}>
          <TouchableOpacity
            style={styles.expenseAnalysis}
            onPress={pressExpenseAnalysis}>
            <Icon
              name="show-chart"
              size={35}
              color={COLORS.black}
              style={styles.icon}
            />
            <Text style={styles.heading}>Expense Analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.incomeAnalysis}
            onPress={pressIncomeAnalysis}>
            <Icon
              name="bar-chart"
              size={35}
              color={COLORS.black}
              style={styles.icon}
            />
            <Text style={styles.heading}>Income Analysis</Text>
          </TouchableOpacity>
        </View> */}

        <View style={{flex: 1}}>
          <Image
            source={require('../../assets/images/report-bg.png')}
            style={{flex: 1, width: '100%', height: '100%'}}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={pressExVsIn}
            style={{
              flex: 1,
              position: 'absolute',
              left: 200,
              width: 150,
              height: 150,
              bottom: 385,
            }}>
            <Image
              source={require('../../assets/images/bar-chart.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pressExpenseAnalysis}
            style={{
              flex: 1,
              position: 'absolute',
              right: 185,
              width: 200,
              height: 200,
              bottom: 230,
              zIndex: 2,
            }}>
            <Image
              source={require('../../assets/images/pie-chart.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pressIncomeAnalysis}
            style={{
              flex: 1,
              position: 'absolute',
              left: 210,
              width: 150,
              height: 150,
              top: 375,
              zIndex: 2,
            }}>
            <Image
              source={require('../../assets/images/line-chart.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;
