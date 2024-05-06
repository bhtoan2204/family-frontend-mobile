import { useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, Modal } from "react-native";
import { Family } from "src/interface/family/family";
import { ExpenseServices, FamilyServices } from "src/services/apiclient";
import styles from "./styles";
import { FamilySpecProps } from "src/navigation/NavigationTypes";
import Icon from 'react-native-vector-icons/Ionicons';
import { Expenditure } from "src/interface/expense/getExpense";
import { Picker } from "@react-native-picker/picker";

const FamilySpecScreen = ({ navigation, route }: FamilySpecProps) => {
    const { id_family } = route.params || undefined;
    const [expenses, setExpenses] = useState<Expenditure[]>([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState<number | undefined>(0);
    const [selectedFilter, setSelectedFilter] = useState<'day' | 'month' | 'year' | 'type' | undefined>();

    useEffect(() => {
        fetchExpenses();
    }, [currentIndex]);

    const loadMore = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const fetchExpenses = async () => {
        try {
            const result: Expenditure[] = await ExpenseServices.getExpense(currentIndex, 10, id_family);

            if (result) {
                setExpenses(prevExpenses => [...prevExpenses, ...result]);
            }
        } catch (error) {
            console.log('fetchExpenses error:', error);
        }
    }

    const renderExpenseItem = ({ item }: { item: Expenditure }) => (
        <TouchableOpacity style={styles.expenseItem}>
            <View style={styles.itemContainer}>
                <Text style={styles.expenseTitle}>{item.description}</Text>
                <Text style={styles.expenseAmount}>{item.amount}</Text>
            </View>
        </TouchableOpacity>
    );

    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.expenditure_date).getTime() - new Date(a.expenditure_date).getTime());
    const handleFilterSelection = (filter: 'day' | 'month' | 'year' | 'type') => {
        setSelectedFilter(filter);
        setFilterModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeTab', {screen: 'FamilyFinace'})} style={styles.headerButton}>
                    <Icon name="arrow-back" size={30} style={styles.backButton} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.circle}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.headerText}>Family</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                    <Icon name="filter" size={30} style={styles.filterButton} />
                </TouchableOpacity>
            </View>

            <Modal
                visible={filterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                            <Text style={styles.closeModalButton}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFilterSelection('day')}>
                            <Text style={styles.filterOption}>Filter by Day</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFilterSelection('month')}>
                            <Text style={styles.filterOption}>Filter by Month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFilterSelection('year')}>
                            <Text style={styles.filterOption}>Filter by Year</Text>
                        </TouchableOpacity>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedType}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedType(itemValue)}
                            >
                                <Picker.Item label="Filter by Type" value={0} />
                                {/*Thêm các Picker.Item khác tương ứng với các loại*/}
                            </Picker>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <View style={styles.container}>
                <FlatList
                    data={sortedExpenses}
                    renderItem={renderExpenseItem}
                    keyExtractor={(item) => item.id_expenditure.toString()}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                    keyboardShouldPersistTaps="handled"
                />
            </View>
        </View>
    );
}

export default FamilySpecScreen;
