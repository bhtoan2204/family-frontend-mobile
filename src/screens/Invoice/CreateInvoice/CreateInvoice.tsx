import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {EvilIcons} from '@expo/vector-icons';

const CreateInvoiceScreen = () => {
  const [items, setItems] = useState([{name: '', quantity: 0, totalPrice: ''}]);

  const addItem = () => {
    setItems([...items, {name: '', quantity: 0, totalPrice: ''}]);
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

  const handleCreateInvoicePress = () => {
    setScrollViewVisible(!isScrollViewVisible);
    if (!isScrollViewVisible) {
      //   setCurrentPage(0);
      scrollViewRef.current?.scrollTo({x: 0, animated: false});
    }
  };

  const [isScrollViewVisible, setScrollViewVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  return isScrollViewVisible ? (
    <ScrollView style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={handleCreateInvoicePress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, padding: 15}}>Create Invoice</Text>
        <EvilIcons
          name={isScrollViewVisible ? 'chevron-down' : 'chevron-up'}
          size={30}
          color="#878C9A"
        />
      </TouchableOpacity>
      <View style={styles.container}>
        {items.map((item, index) => (
          <View key={index} style={styles.containerinput}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={item.name}
              onChangeText={text => handleInputChange(index, 'name', text)}
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
              onChangeText={number =>
                handleInputChange(index, 'totalPrice', Text)
              }
            />
          </View>
        ))}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={addItem}>
            <Text>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Delete Item</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: 1, backgroundColor: '#F4F4F4', bottom: 5}} />
    </ScrollView>
  ) : (
    <View style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={handleCreateInvoicePress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, padding: 15}}>Create Invoice</Text>
        <EvilIcons
          name={isScrollViewVisible ? 'chevron-down' : 'chevron-up'}
          size={30}
          color="#878C9A"
        />
      </TouchableOpacity>
      <View style={{height: 1, backgroundColor: '#F4F4F4', bottom: 5}} />
    </View>
  );
};

export default CreateInvoiceScreen;
