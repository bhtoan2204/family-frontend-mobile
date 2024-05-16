import { useEffect, useState } from "react";
import { FlatList, View,Text, TouchableOpacity } from "react-native";
import { Family } from "src/interface/family/family";
import { FamilyServices } from "src/services/apiclient";
import styles from "./styles";
import { ExpenditureScreenProps } from "src/navigation/NavigationTypes";
import Icon from 'react-native-vector-icons/Ionicons';

const FamilyScreen = ({navigation}: ExpenditureScreenProps) => {
    const [families, setFamilies] = useState<Family[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<string>('');

    useEffect( () => {
        fetchAllFamily();
    })
    const fetchAllFamily = async () => {
        try {
          const result = await FamilyServices.getAllFamily();
          setFamilies(result);
        } catch (error: any) {
          console.log('FamilyServices.getAllFamily error:', error);
        }
      };
      const pressFamily = (id_family: number) => {
        navigation.navigate('ExpenseStack', {screen: 'FamilySpec', params: {id_family: id_family}});
      }
      const renderFamilyItem = ({ item }: { item: Family }) => (
        <TouchableOpacity style={styles.familyItem} onPress={()=>pressFamily(item.id_family)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
        
                <TouchableOpacity onPress={() => navigation.navigate('HomeTab', {screen: 'Expense'})} style={styles.headerButton}>
                    <Icon name="arrow-back" size={30} style={styles.backButton} />
                </TouchableOpacity>

                <TouchableOpacity >
                <View style={styles.circle}>

                    <View style={styles.itemContainer}>
                            <Text style={styles.headerText}>Family</Text>

                        </View>
                    </View>
                </TouchableOpacity>

            </View>

            <FlatList
                data={families}
                renderItem={renderFamilyItem}
                keyExtractor={(item) => item.id_family.toString()}
            />
        </View>

  
    );
}

export default FamilyScreen;