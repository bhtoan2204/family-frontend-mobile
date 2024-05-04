import React, { useState, useEffect } from 'react';
import { View, Button, SafeAreaView, TextInput, Text, ScrollView, TouchableOpacity, Image, Modal, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ExpenseServices from "src/services/apiclient/ExpenseServices";
import styles from './styles'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ExpenditureScreenProps } from 'src/navigation/NavigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getFinance, setType, setCategory_id, setCategory_name} from 'src/redux/slices/FinanceSlice';
import { FamilyServices } from 'src/services/apiclient';
import { Family } from 'src/interface/family/family';

interface ExpenseType {
    id_expense_type: number;
    expense_name: string;
}

const ExpenditureScreen = ({navigation}: ExpenditureScreenProps) => {
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
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string>('Expense');
    const dispatch = useDispatch();
    let state = useSelector(getFinance);
    const [category, setCategory] = useState<ExpenseType>();
    const url = 'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg'; 
    const urlCatetory= 'https://static.thenounproject.com/png/2351449-200.png'; 
    const urlMoney='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMpESFH3-fByKNSoaMNWOHuOp-blpyaDhabTnEbtjMmA&s';
    const [families, setFamilies] = useState<Family[]>([]);
    const [selectedFamily, setSelectedFamily] = useState(null);

    
    useEffect(() => {
        fetchExpenseType();
        setSelectedMenu(state.type);
        fetchAllFamily();
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
    const fetchAllFamily = async () => {
        try {
          const result = await FamilyServices.getAllFamily();
          setFamilies(result);
        } catch (error: any) {
          console.log('FamilyServices.getAllFamily error:', error);
        }
      };


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
        setCategory(item);
        dispatch(setCategory_id(item.id_expense_type));
        dispatch(setCategory_name(item.expense_name));

    };

    const handleMostUsedPress = () => {
        setShowCategory(!showCategory); 
    };

    const handleOptionPress = (option: string) => {
        setIsPickerOpen(false);
        setSelectedMenu(option)
        dispatch(setType(option));
    };

    const headerPress = () => {
        setIsPickerOpen(!isPickerOpen);
    };
    const handleOpenImageLibrary = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
          });
    
        //   if (!result.canceled) {
        //     const compressedImage = await ImageManipulator.manipulateAsync(result.assets[0].uri, [], { compress: 0.5 });
        //     const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);
    
        //     if (fileInfo.exists && fileInfo.size) {
        //       if (fileInfo.size < 50000) {
        //         const base64 = await FileSystem.readAsStringAsync(compressedImage.uri, { encoding: 'base64' });
        //         await handleSendImage(base64);
        //       } else {
        //         alert('Selected image size exceeds 50KB limit');
        //       }
        //     } else {
        //       console.error('File does not exist or size cannot be determined');
        //     }
        //   }
        } catch (error) {
          console.error('Error opening image library:', error);
        }
      };
      const pressSelectCategory = () => {
        navigation.navigate('HomeTab', {screen: 'CategoryExpense'});
    }
    const handleFamilyPress = (family: any) => {
        if (selectedFamily == family){
            setSelectedFamily(null);
        }
        else {
        setSelectedFamily(family);
        }
    };
    const pressWallet = () => {
        navigation.navigate('HomeTab', {screen: 'Wallet'});
    }
    return (
     <View style={styles.headcontainer}>
        <ScrollView style={styles.headcontainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => headerPress()}>
                <View style={styles.circle}>

                    <View style={styles.itemContainer}>
                            <Text style={styles.headerText}>{selectedMenu}</Text>
                            <Icon name="chevron-down" size={15} color="white" />

                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.chevronContainer} onPress={handleSubmit}>
                    <Icon name="check" size={25} />
                </TouchableOpacity>
            </View>


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
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.familycontainer}>
                        <Text style={styles.text}>Family</Text>
                        {families.map((family, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.family,
                                    selectedFamily === family && styles.selectedFamily 
                                ]}
                                onPress={() => handleFamilyPress(family)}
                            >
                                <Text style={styles.familyText}>{family.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.ContainerCategory}>
                    <View style={styles.selectedItemContainer}>
                        <Image source={{ uri: urlCatetory}} style={styles.avatar} />
                            <Text style={styles.inputAmount}>{category?.expense_name || 'Select category'}</Text>
                        <TouchableOpacity style={styles.chevronContainer} onPress={pressSelectCategory}>
                            <Icon name="chevron-right" size={22} color="gray" />
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity onPress={handleMostUsedPress}>
                        <Text style={styles.mostUsedButton}>Most used </Text>
                    </TouchableOpacity>

                        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                            {expenseType.map((item) => (
                                <TouchableOpacity key={item.id_expense_type} onPress={() => handleExpenseTypePress(item)}>
                                    <View style={styles.categoryContainer}>
                                        <Image source={{ uri: url}} style={styles.avatar} />
                                        <Text style={styles.expenseItem}>{item.expense_name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    
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
                            <Text style={styles.text}>Select Date</Text>
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
                            <TouchableOpacity onPress={()=> pressWallet()}>
                                <View style={styles.walletContainer}>
                                    <Icon name="credit-card" size={25} color="black" style={styles.icon} />
                                    <Text style={styles.text}>Wallet</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.chevronContainer}  onPress={()=> pressWallet()}>
                                <Icon name="chevron-right" size={22} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.imageContainer}> 
                    <TouchableOpacity onPress={()=> handleOpenImageLibrary()}>
                        <Icon name="image" size={60} color="gray"  />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="camera" size={60} color="gray" />
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isPickerOpen}
                onRequestClose={() => {
                    setIsPickerOpen(!isPickerOpen)
                }}
            >
                <View style={styles.modalContainer}>
        

                    <TouchableOpacity
                        style={styles.modalBackground}
                        activeOpacity={1}
                        onPress={() => setIsPickerOpen(!isPickerOpen)}
                    >
                        <View style={styles.dropdownMenu}>
                        <TouchableOpacity onPress={() => handleOptionPress("Expense")}>
                            <View style={styles.menuItem}>
                                <Image source={{ uri: urlMoney}} style={styles.avatar} />
                                <Text style={styles.text}>Expense</Text>
                                <View style={styles.checkIcon}> 
                                    {selectedMenu === "Expense" && <Icon name="check" size={20} color="green" />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOptionPress("Income")}>
                            <View style={styles.menuItem}>
                                <Image source={{ uri: urlMoney}} style={styles.avatar} />
                                <Text style={styles.text}>Income</Text>
                                <View style={styles.checkIcon}> 
                                    {selectedMenu === "Income" && <Icon name="check" size={20} color="green" />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOptionPress("Lend")}>
                            <View style={styles.menuItem}>
                                <Image source={{ uri: urlMoney}} style={styles.avatar} />
                                <Text style={styles.text}>Lend</Text>
                                <View style={styles.checkIcon}> 
                                    {selectedMenu === "Lend" && <Icon name="check" size={20} color="green" />}
                                </View>
                            </View>
                        </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>

            </View>
    );
}    

export default ExpenditureScreen;
