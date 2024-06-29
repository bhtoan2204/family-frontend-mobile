import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { ExpenseDetailScreenProps } from 'src/navigation/NavigationTypes';
import { Expenditure, selectExpense } from 'src/redux/slices/ExpenseAnalysis';
import Icon from 'react-native-vector-icons/Ionicons';

const ExpenseDetailScreen = ({ navigation }: ExpenseDetailScreenProps) => {
  const expense: Expenditure | null = useSelector(selectExpense);

  useEffect(() => {
    console.log(expense);
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/background-expense-chart1.png')}
      style={{ flex: 1 }}
      resizeMode="cover">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() =>
                //navigation.navigate('HomeTab', {screen: 'Expense'})
                navigation.goBack()
              }
              style={styles.headerButton}>
              <Icon name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerText}>Expense Details</Text>
            </View>
            
          </View>
          
          <View style={styles.detailContainer}>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Category:</Text>
              <Text style={styles.value}>{expense?.expense_category}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Amount:</Text>
              <Text style={[styles.value, styles.amountValue]}>-${expense?.expense_amount}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.value}>{expense?.description}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Created By:</Text>
              <Text style={styles.value}>{expense?.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{expense?.expenditure_date}</Text>
            </View>
            {expense?.image_url && (
              <View style={styles.imageContainer}>
                <Text style={styles.label}>Receipt:</Text>
                <Image source={{ uri: expense.image_url }} style={styles.image} resizeMode="contain" />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
  },
  backButton: {
    color: 'white',
  },
  headerButton: {
    paddingHorizontal: 0,
  },
  headerContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    height: '7%',
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
    color: '#555',
  },
  value: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  amountValue: {
    color: 'red',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default ExpenseDetailScreen;
