import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles'; 

const CreateInvoiceScreen = () => {
    const [items, setItems] = useState([
        { name: '', quantity: 0, totalPrice: '' }
    ]);

    const addItem = () => {
        setItems([...items, { name: '', quantity: 0, totalPrice: '' }]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleQuantityChange = (index, value) => {
        const updatedItems = [...items];
        updatedItems[index].quantity += value;
        setItems(updatedItems);
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {items.map((item, index) => (
                    <View key={index} style={styles.containerinput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={item.name}
                            onChangeText={(text) => handleInputChange(index, 'name', text)}
                        />
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => handleQuantityChange(index, -1)}>
                                <Text style={styles.quantityButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => handleQuantityChange(index, 1)}>
                                <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Price"
                            value={item.totalPrice}
                            onChangeText={(number) => handleInputChange(index, 'totalPrice', text)}
                        />
                    </View>
                ))}
                <TouchableOpacity onPress={addItem}>
                    <Text>Add Item</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}    

export default CreateInvoiceScreen;
