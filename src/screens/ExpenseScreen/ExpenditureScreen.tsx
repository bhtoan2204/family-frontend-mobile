import React, { useState, useEffect } from 'react';
import { View, Button, SafeAreaView, TextInput, Text, FlatList, ScrollView, TouchableOpacity,Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ExpenseServices from "src/services/apiclient/ExpenseServices";
import styles from './styles'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

interface ExpenseType {
    id_expense_type: number;
    expense_name: string;
}

const ExpenditureScreen = () => {
    const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedExpenseType, setSelectedExpenseType] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [wallet, setWallet] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [showCategory, setShowCategory] = useState<boolean>(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Expense'); 
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const items = [
        { label: 'Expense', value: 'expense' },
        { label: 'Income', value: 'income' },
        { label: 'Loan', value: 'loan' },
      ];
    const url = 'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg';
    const urlCatetory= 'https://static.thenounproject.com/png/2351449-200.png';
    
    
    useEffect(() => {
        fetchExpenseType();
    }, []);

    const fetchExpenseType = async () => {
        try {
            const response = await ExpenseServices.getExpenseType();
            setExpenseType(response);
            setLoading(false);
        } catch (error: any) {
            console.error('Error in getExpenseType:', error.message);
        }
    }

    const handleSubmit = () => {
        console.log("Amount:", amount);
        console.log("Selected Expense Type:", selectedExpenseType);
        console.log("Description:", description);
        console.log("Date:", date);
        console.log("Wallet:", wallet);
        console.log("Image:", image);
    }


    const handleDateChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
      };
    const handleExpenseTypePress = (item: ExpenseType) => {
    };
    const handleMostUsedPress = () => {
        setShowCategory(!showCategory); 
    };
    const handleOptionChange = (option: any) => {
        setSelectedOption(option);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.headcontainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Expenditure Screen</Text>
                  
                </View >
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.inputAmount}
                                placeholder="Amount"
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType="numeric"
                            />
                        </View>
                        <Text style={styles.currency}>VNĐ</Text>
                    </View>

                    <View style={styles.ContainerCategory}>
                        <View style={styles.selectedItemContainer}>
                            <Image source={{ uri: urlCatetory}} style={styles.avatar} />

                            <Text style={styles.inputAmount}>Select Category</Text>
                            <TouchableOpacity style={styles.chevronContainer}>
                                <Icon name="chevron-right" size={22} color="gray" />
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity onPress={handleMostUsedPress}>
                            <Text style={styles.mostUsedButton}>Most used </Text>
                        </TouchableOpacity>

                        {showCategory && (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {expenseType.map((item) => (
                                        <TouchableOpacity key={item.id_expense_type} onPress={() => handleExpenseTypePress(item)}>
                                            <View style={styles.itemContainer}>
                                                <Image source={{ uri: url}} style={styles.avatar} />
                                                <Text style={styles.expenseItem}>{item.expense_name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}
                    </View>


                <View style={styles.container}>
                <View style={styles.datePickerContainer}>
                    <View style={styles.itemContainer} >
                            <Icon name="pencil" size={25} color="black" style={styles.icon} />
                            <TextInput
                                style={styles.titleText}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                            />
                    </View>
                    </View>

                <View style={styles.datePickerContainer}>
                <View style={styles.itemContainer} >
                <Icon name="calendar" size={25} color="black" style={styles.icon} />

                    <Text style={styles.titleText}>Select Date</Text>
                    </View>

                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                </View>

                <View style={styles.datePickerContainer}>
                    <View style={styles.itemContainer}>
                    <TouchableOpacity>
                        <View style={styles.walletContainer}>
                            <Icon name="credit-card" size={25} color="black" style={styles.icon} />
                            <Text style={styles.titleText}>Wallet</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={22} color="gray" />
                    </TouchableOpacity>
                </View>

                </View>

            </View>
            <View style={styles.imageContainer}> 
                <TouchableOpacity>
                        <Icon name="image" size={60} color="gray"  />
                </TouchableOpacity>

                <TouchableOpacity>
                        <Icon name="camera" size={60} color="gray" />
                </TouchableOpacity>
            </View>


                    <Button title="Save" onPress={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
}    

export default ExpenditureScreen;
