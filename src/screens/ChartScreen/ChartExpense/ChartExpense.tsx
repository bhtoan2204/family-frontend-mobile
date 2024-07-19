import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,

  ImageBackground,
} from 'react-native';
import {ChartExpenseProps} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import PieChartComponent from './PieChart';
import LineChartScreen from './LineChart';
import BarChartScreen from './BarChart';
import {useSelector} from 'react-redux';
import {getOption} from 'src/redux/slices/ExpenseAnalysis';
import {SafeAreaView} from 'react-native-safe-area-context';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';
import { getTranslate } from 'src/redux/slices/languageSlice';

const ChartExpenseScreen = ({navigation}: ChartExpenseProps) => {
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('');
  const translate = useSelector(getTranslate);
  let option = useSelector(getOption);

  const profile = useSelector(selectProfile);
  let family =useSelector(selectSelectedFamily);

  useEffect(() => {
      setSelectedCategoryType(option);
    
  }, [option]);




  return (
    <ImageBackground
      source={require('../../../assets/images/background-expense-chart1.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.goBack()
              }
              style={styles.headerButton}>
              <Icon name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerText}>{translate('ExpenseAnalysis')}</Text>
            </View>

          </View>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 20,
              bottom: 5,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 5,
                color: 'white',
              }}>
              {translate('Hello')}, {profile.firstname} {profile.lastname}
            </Text>
            {selectedCategoryType === 'Year' && (
                <Text style={{fontSize: 16, color: '#ccc'}}>
                  {translate('overviewYear')}
                </Text>
              )}
              {selectedCategoryType === 'Month' && (
                <Text style={{fontSize: 16, color: '#ccc'}}>
                  {translate('overviewMonth')}
                </Text>
              )}
              {selectedCategoryType === 'Day' && (
                <Text style={{fontSize: 16, color: '#ccc'}}>
                  {translate('detailDay')}
                </Text>
              )}

          </View>
         
          {selectedCategoryType === 'Day' && (
            <View>
              <BarChartScreen id_family={family.id_family} navigation={navigation} />
            </View>
          )}
          {selectedCategoryType === 'Month' && (
            <View>
              <PieChartComponent id_family={family.id_family} />
            </View>
          )}
          {selectedCategoryType === 'Year' && (
            <View>
              <LineChartScreen id_family={family.id_family} />
            </View>
          )}
          
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ChartExpenseScreen;
