import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import {EvilIcons} from '@expo/vector-icons';

const CreateInvoiceScreen = () => {
  const [items, setItems] = useState([{name: '', quantity: 0, totalPrice: ''}]);
  const [isDeleteMode, setDeleteMode] = useState(false);
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
      scrollViewRef.current?.scrollTo({x: 0, animated: false});
    }
  };

  const handleDeleteItemPress = () => {
    setDeleteMode(!isDeleteMode);
  };

  const handleDeleteIconPress = index => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    if (newItems.length === 0) {
      setDeleteMode(false);
    }
  };

  const [isScrollViewVisible, setScrollViewVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  return isScrollViewVisible ? (
    <ScrollView style={{backgroundColor: 'white'}} ref={scrollViewRef}>
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
            {isDeleteMode && (
              <TouchableOpacity
                onPress={() => handleDeleteIconPress(index)}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                <Image
                  source={require('src/assets/icons/delete.png')}
                  resizeMode="stretch"
                  style={{width: 30, height: 30, left: 360, bottom: 30}}
                />
              </TouchableOpacity>
            )}

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
                handleInputChange(index, 'totalPrice', number)
              }
            />
          </View>
        ))}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={addItem}>
            <Text>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteItemPress}>
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
