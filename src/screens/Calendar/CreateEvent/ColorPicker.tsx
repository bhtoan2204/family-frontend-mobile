import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Navigation from 'src/navigation/NavigationContainer';
import { CategoryEvent } from 'src/interface/calendar/CategoryEvent';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('window').width;

const ColorPicker = ({ navigation, id_Family, setSelectedColorIndex, selectedColorIndex, setEventCategory }) => {
  const [availableColors, setAvailableColors] = useState<CategoryEvent[]>([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CalendarServices.getAllCategoryEvent(id_Family);
        setAvailableColors(result);
      } catch (error) {
        console.log('Error fetching colors:', error);
      }
    };

    fetchData();
  }, [id_Family]);

  const handleColorSelect = (index: number, item: CategoryEvent) => {
    setEventCategory(item);
    setSelectedColorIndex(selectedColorIndex === index ? null : index);
  };

  const handleCreateCategory = () => {
    navigation.navigate('CalendarStack', { screen: 'CreateCategoryEvent', params: { id_family: id_Family } });
  };

  const renderColorCircles = () => {
    return availableColors.map((item, index) => (
      <View key={item.id_category_event} style={styles.containerColor}>
        <TouchableOpacity
          style={[
            styles.colorCircle,
            {
              backgroundColor: item.color,
            }
          ]}
          onPress={() => handleColorSelect(index, item)}
        >
          {selectedColorIndex === index && <View style={styles.selected} />}
        </TouchableOpacity>
        <Text style={styles.textHashtag}>#{item.title}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorList}>
        {renderColorCircles()}
        <TouchableOpacity style={styles.colorCircle} onPress={handleCreateCategory}>
          <Material name="plus" size={22} style={styles.plusSign} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorList: {
    justifyContent: 'center',
  },
  containerColor: {
    paddingRight: 10,
  },
  textHashtag: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Arial',
  },
  colorCircle: {
    width: screenWidth * 0.2,
    height: screenHeight * 0.05,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f0f0f0',
    marginRight: 20,
  },
  selected: {
    width: screenWidth * 0.07,
    height: screenHeight * 0.03,
    borderRadius: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  plusSign: {
    fontSize: screenHeight * 0.04,
    fontWeight: 'bold',
  },
});

export default ColorPicker;
