import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Modal, TextInput, Button, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ExpenseServices from "src/services/apiclient/ExpenseServices";
import { CategoryExpenseScreenProps } from "src/navigation/NavigationTypes";
import styles from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import {getFamily, getType, setExpenseCategory_id, setExpenseCategory_name, setIncomeCategory_id, setIncomeCategory_name, setType } from "src/redux/slices/FinanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { IncomeServices } from "src/services/apiclient";

interface ExpenseType {
    id_expense_type: number;
    category: string;
}
interface IncomeType {
    id_income_source: number;
    category: string;
}

const CategoryExpenseScreen = ({navigation}: CategoryExpenseScreenProps) => {
    const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);
    const [incomeCategories, setIncomeCategories] = useState<IncomeType[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const dispatch = useDispatch();
    const [selectedCategoryType, setSelectedCategoryType] = useState<string>(''); 
    const urlFood = 'https://img.freepik.com/premium-vector/icon-food-drink-illustration-vector_643279-134.jpg';
    const addUrl ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBWw-U6s-Q1k-tt_xXKV02dPlypckiNOJMxJo3KxWW-g&s';
    let state = useSelector(getType);
    let id_family = useSelector(getFamily);

    const [selectedFamily, setSelectedFamily] = useState<number | null>(null);


    useEffect(() => {
        fetchExpenseType(id_family);
        fetchIncomeType(id_family);
        setSelectedCategoryType(state);
    }, [state]);

    const fetchExpenseType = async (id_family: any) => {
        try {
            const response = await ExpenseServices.getExpenseType(id_family);
            setExpenseType(response);
            setLoading(false);
        } catch (error: any) {
            console.error('Error in getExpenseType:', error.message);
        }
    }
    const fetchIncomeType = async (id_family: any) => {
        try {
            const response = await IncomeServices.getIncomeType(id_family);
            setIncomeCategories(response);
            setLoading(false);
        } catch (error: any) {
            console.error('Error in getExpenseType:', error.message);
        }
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const createCategory = async () => {
        try {
            await ExpenseServices.createExpenseType(id_family,newCategoryName);
            fetchExpenseType(id_family);
            toggleModal(); 
            setNewCategoryName(''); 
        } catch (error: any) {
            console.error('Error creating category:', error.message);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }
    const selectCategory = async(item: any)=> {
        dispatch(setType(selectedCategoryType));
        if (selectedCategoryType == 'Expense') {
            dispatch(setExpenseCategory_id(item.id_expense_type));
            dispatch(setExpenseCategory_name(item.category));
        }
        else if (selectedCategoryType=='Income'){
            dispatch(setIncomeCategory_id(item.id_income_source));
            dispatch(setIncomeCategory_name(item.category));
    
        }
        navigation.navigate('HomeTab', {screen: 'Expense'})
    };
    const selectOption= async(option: string)=> {
        setSelectedCategoryType(option);
    } 
    return (
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeTab', {screen: 'Expense'})} style={styles.headerButton}>
                <Icon name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
                <Text style={styles.headerText}>Categories</Text>
            </View>
      
            <TouchableOpacity onPress={toggleModal} style={styles.headerButton}>
            <Icon name="add" size={30} style={styles.addImage} />
            </TouchableOpacity>
        </View>
        <View style={styles.containerTab}>
            <TouchableOpacity
            onPress={() => selectOption('Income')}
            style={[styles.tabButton, selectedCategoryType === 'Income' && styles.selectedTabButton]}
            >
            <Text style={[styles.tabButtonText, selectedCategoryType === 'Income' && styles.selectedTabText]}>
                Income
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => selectOption('Expense')}
            style={[styles.tabButton, selectedCategoryType === 'Expense' && styles.selectedTabButton]}
            >
            <Text style={[styles.tabButtonText, selectedCategoryType === 'Expense' && styles.selectedTabText]}>
                Expense
            </Text>
            </TouchableOpacity>
            <View style={[styles.bottomLine, { left: selectedCategoryType === 'Income' ? 0 : '50%' }]} />
        </View>

        <ScrollView style={styles.scrollView}>
            {selectedCategoryType === 'Expense' && (
                expenseType.map((item, index) => (
                    <TouchableOpacity key={index.toString()} onPress={() => selectCategory(item)} style={styles.categoryItemContainer}>
                        <Image source={{ uri: urlFood }} style={styles.categoryImage} />
                        <Text style={styles.categoryName}>{item.category}</Text>
                    </TouchableOpacity>
                ))
            )}

            {selectedCategoryType === 'Income' && (
                incomeCategories.map((item, index) => (
                    <TouchableOpacity key={index.toString()} onPress={() => selectCategory(item)} style={styles.categoryItemContainer}>
                        <Image source={{ uri: urlFood }} style={styles.categoryImage} />
                        <Text style={styles.categoryName}>{item.category}</Text>
                    </TouchableOpacity>
                ))
            )}
        </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Category</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter category name"
                            value={newCategoryName}
                            onChangeText={setNewCategoryName}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={toggleModal} color="gray" />
                            <Button title="Create" onPress={createCategory} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default CategoryExpenseScreen;

