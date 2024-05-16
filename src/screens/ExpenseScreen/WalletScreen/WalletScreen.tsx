import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import navigation from 'src/navigation';
import { CategoryExpenseScreenProps } from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

interface Wallet {
    id: number;
    name: string;
    balance: number;
}
const WalletScreen = ({navigation}: CategoryExpenseScreenProps) => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const fakeWalletData = [
        { id: 1, name: 'Wallet 1', balance: 100 },
        { id: 2, name: 'Wallet 2', balance: 200 },
        { id: 3, name: 'Wallet 3', balance: 300 },
        { id: 4, name: 'Wallet 4', balance: 400 },
        { id: 5, name: 'Wallet 5', balance: 500 },
    ];

    useEffect(() => {
        setWallets(fakeWalletData);
    }, []);

    const renderItem = ({ item }: { item: Wallet }) => (
        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>{item.name}</Text>
            <Text>Balance: {item.balance}</Text>
        </View>
    );
    

    return (
        <View style={styles.headcontainer}>
                    <View style={styles.header}>

                    <TouchableOpacity onPress={() => navigation.navigate('HomeTab', {screen: 'Expense'})} style={styles.headerButton}>
                        <Icon name="arrow-back" size={30} style={styles.backButton} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerText}>Wallet</Text>
                    </View>
            
                    </View>

        
            <FlatList
                data={wallets}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} 
            />
        </View>
    );
};

export default WalletScreen;
