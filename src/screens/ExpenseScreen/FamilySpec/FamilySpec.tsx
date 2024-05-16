import React, { useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { Family } from "src/interface/family/family";
import { ExpenseServices, FamilyServices } from "src/services/apiclient";
import styles from "./styles";
import { FamilySpecProps } from "src/navigation/NavigationTypes";
import Icon from 'react-native-vector-icons/Ionicons';
import { Expenditure } from "src/interface/expense/getExpense";
import { Income } from "src/interface/expense/getIncome";

const FamilySpecScreen = ({ navigation, route }: FamilySpecProps) => {
    const { id_family } = route.params || {};
    const [expenses, setExpenses] = useState<Expenditure[]>([]);
    const [income, setIncome] = useState<Income[]>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<Expenditure[]>([]);
    const [filteredIncome, setFilteredIncome] = useState<Income[]>([]);

    const [currentIndex, setCurrentIndex] = useState(1);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedFilterExpense, setSelectedFilterExpense] = useState<'30' | '60' | '90' | 'all'>('30');
    const [selectedFilterIncome, setSelectedFilterIncome] = useState<'30' | '60' | '90' | 'all'>('30');
    const [selectedCategoryType, setSelectedCategoryType] = useState<string>('Income'); 
    const [sumIncome, setSumIncome] = useState<number>(0);
    const [sumExpense, setSumExpense] = useState<number>(0);
    const [families, setFamilies] = useState<Family[]>([]);
    const [selectedFamily, setSelectedFamily] = useState<number | undefined>(undefined);
    const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
    const filterUri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0i6wYs08kFWJKDu9843LWdW43Xom8IW89cIZREgBKg&s';
    const familyUri = 'https://t3.ftcdn.net/jpg/06/75/38/14/360_F_675381468_yjYEK9SvCRYpRUyKNRWsnArIalbMeBU4.jpg';
    useEffect(() => {
         fetchAllFamily();
    },[]);

    useEffect(() => {
        if(selectedFamily != undefined){
            fetchExpenses();
            fetchIncome();
        }
    }, [currentIndex, selectedFamily]);

    useEffect(() => {
        filterExpenses(selectedFilterExpense);
    },[selectedFilterExpense, expenses]); 
    
    useEffect(() => {
        filterIncome(selectedFilterIncome);
    },[selectedFilterIncome, income]); 
    
    const fetchExpenses = async () => {
        try {
            const result: Expenditure[] = await ExpenseServices.getExpense(currentIndex, 10, selectedFamily);
            if (result) {
                setExpenses(prevExpenses => [...prevExpenses, ...result]);
            }
        } catch (error) {
            console.log('fetchExpenses error:', error);
        }
    }
    const fetchIncome = async () => {
        try {
            const result: Income[] = await ExpenseServices.getIncome(currentIndex, 10, selectedFamily);
            if (result) {
                setIncome(prevIncome => [...prevIncome, ...result]);
            }
        } catch (error) {
            console.log('fetchIncome error:', error);
        }
    }
    const fetchAllFamily = async () => {
        try {
            const result = await FamilyServices.getAllFamily();
            setFamilies(result);
            setSelectedFamily(result[0]?.id_family || null); 
        } catch (error: any) {
            console.log('FamilyServices.getAllFamily error:', error);
        }
    };
    

    const filterExpenses = (option : any) => {
        let filtered: Expenditure[] = [];
        setFilterModalVisible(false);
        setSelectedFilterExpense(option);

        switch (selectedFilterExpense) {
            case '30':
            case '60':
            case '90':
                const days = parseInt(selectedFilterExpense);
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - days);

                filtered = expenses.filter(expense => {
                    const expenseDate = new Date(expense.expenditure_date);
                    return expenseDate >= cutoffDate;
                });
                break;
            case 'all':
                filtered = expenses;
                break;
        }
        const totalExpense = filtered.reduce((sum, expense) => {
            const amount = parseFloat(expense.amount);
            if (!isNaN(amount)) {
                return sum + amount;
            } else {
                return sum; 
            }
        }, 0);
        const roundedTotalExpense = parseFloat(totalExpense.toFixed(1));

        setSumExpense(roundedTotalExpense);
        setFilteredExpenses(filtered);
    };

    const filterIncome = (option : any) => {
        let filtered: Income[] = [];
        setFilterModalVisible(false);
        setSelectedFilterIncome(option);

        switch (selectedFilterIncome) {
            case '30':
            case '60':
            case '90':
                const days = parseInt(selectedFilterIncome);
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - days);

                filtered = income.filter(income => {
                    const incomeDate = new Date(income.income_date);
                    return incomeDate >= cutoffDate;
                });
                break;
            case 'all':
                filtered = income;
                break;
        }
        const totalIncome = filtered.reduce((sum, income) => {
            const amount = parseFloat(income.amount);
            if (!isNaN(amount)) {
                return sum + amount;
            } else {
                return sum; 
            }
        }, 0);        
        const roundedTotalIncome = parseFloat(totalIncome.toFixed(1));
        setSumIncome(roundedTotalIncome);
        setFilteredIncome(filtered);
    };



    const formatDate = (isoDateTime: string) => {
        const date = new Date(isoDateTime);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
        return formattedDate;
    }
    
    const padZero = (num: number) => {
        return num < 10 ? '0' + num : num;
    }
    
    
    const renderExpenseItem = ({ item }: { item: Expenditure }) => (
        <TouchableOpacity style={styles.expenseItem}>
            <View style={styles.itemContainer}>
                <View style={styles.expenseContent}>
                    <Text style={styles.expenseTitle}>{item.description}</Text>
                    <Text style={styles.expenseAmount}>{item.amount}</Text>
                </View>
                <Text style={styles.expenseDate}>{formatDate(item.expenditure_date)}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderIncomeItem = ({ item }: { item: Income }) => (
        <TouchableOpacity style={styles.expenseItem}>
            <View style={styles.itemContainer}>
                <View style={styles.expenseContent}>
                    <Text style={styles.expenseTitle}>{item.description}</Text>
                    <Text style={styles.expenseAmount}>{item.amount}</Text>
                </View>
                <Text style={styles.expenseDate}>{formatDate(item.income_date)}</Text>
            </View>
        </TouchableOpacity>
    );

    const selectOption= async(option: string)=> {
        setSelectedCategoryType(option);
    } 
    const handleFamilySelection = (selectedFamily: Family) => {
        setIsFamilyModalOpen(false);
        setSelectedFamily(selectedFamily.id_family)
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeTab', {screen: 'ReportScreen'})} style={styles.headerButton}>
                    <Icon name="arrow-back" size={30} style={styles.backButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFamilyModalOpen(!isFamilyModalOpen)}>
                    <View style={styles.circle}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.headerText}>Family</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.chevronContainer} onPress={() => setFilterModalVisible(!filterModalVisible)}>
                    <Icon name="filter" size={30} style={styles.filterButton} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerTab}>
                <TouchableOpacity
                    onPress={() => selectOption('Income')}
                    style={[styles.tabButton, selectedCategoryType === 'Income' && styles.selectedTabButton]}
                >
                    <Text style={styles.tabButtonText}>Income</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => selectOption('Expense')}
                    style={[styles.tabButton, selectedCategoryType === 'Expense' && styles.selectedTabButton]}
                >
                    <Text style={styles.tabButtonText}>Expense</Text>
                </TouchableOpacity>
                <View style={[styles.bottomLine, { left: selectedCategoryType === 'Income' ? 0 : '50%' }]} />
            </View>
            {selectedCategoryType === 'Expense' && (
                <View style={styles.sumContainer}>
                    <Text style={styles.sumText}>Total Expense: {sumExpense}</Text>
                </View>
            )}

            {selectedCategoryType === 'Income' && (
                <View style={styles.sumContainer}>
                    <Text style={styles.sumText}>Total Income: {sumIncome}</Text>
                </View>
            )}
            {selectedCategoryType == 'Expense' && (
        
                <FlatList
                        data={filteredExpenses}
                        renderItem={renderExpenseItem}
                        keyExtractor={(item, index) => `${item.id_expenditure}_${index}`}
                        onEndReached={() => setCurrentIndex(prevIndex => prevIndex + 1)}
                        onEndReachedThreshold={0.1}
                        keyboardShouldPersistTaps="handled" />)}

            {selectedCategoryType == 'Income' && (
     
            <FlatList
                data={filteredIncome}
                renderItem={renderIncomeItem}
                keyExtractor={(item, index) => `${item.id_income_source}_${index}`}
                onEndReached={() => setCurrentIndex(prevIndex => prevIndex + 1)}
                onEndReachedThreshold={0.1}
                keyboardShouldPersistTaps="handled"
            />
            )}

            <Modal
                visible={filterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPress={() => setFilterModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.dropdownMenu}>
                            <TouchableOpacity style={styles.filterItem} onPress={() => filterExpenses('30')}>
                                <Image source={{ uri: filterUri}} style={styles.avatar} />
                                <Text style={styles.text}>Last 30 Days</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterItem} onPress={() => filterExpenses('60')}>
                                <Image source={{ uri: filterUri}} style={styles.avatar} />
                                <Text style={styles.text}>Last 60 Days</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterItem} onPress={() => filterExpenses('90')}>
                                <Image source={{ uri: filterUri}} style={styles.avatar} />
                                <Text style={styles.text}>Last 90 Days</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterItem} onPress={() => filterExpenses('all')}>
                                <Image source={{ uri: filterUri}} style={styles.avatar} />
                                <Text style={styles.text}>All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>


            <Modal
                visible={isFamilyModalOpen}
                animationType="slide"
                transparent={true}
                presentationStyle="overFullScreen" 
                onRequestClose={() => setIsFamilyModalOpen(false)}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPress={() => setIsFamilyModalOpen(false)} 
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.dropdownMenu}>
                            <FlatList
                                data={families}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.filterItem} onPress={() => handleFamilySelection(item)}>
                                        <Image source={{ uri: familyUri}} style={styles.avatar} />
                                        <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>


        </View>
    );
}

export default FamilySpecScreen;
