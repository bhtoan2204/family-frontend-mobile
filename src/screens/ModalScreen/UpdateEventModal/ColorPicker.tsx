import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, getFamily, setColor, setIdcate } from 'src/redux/slices/CalendarSlice';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Navigation from 'src/navigation/NavigationContainer';
import { CategoryEvent } from 'src/interface/calendar/CategoryEvent';
import { Event } from 'src/interface/calendar/Event';


const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('window').width;

const ColorPicker = ({ navigation }) => {

  const [event , setEvent ] = useState<Event>(useSelector(getEvent));

  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(event.category);
  const [availableColors, setAvailableColors] = useState<CategoryEvent[]>([]);
  const id_family = useSelector(getFamily);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(event.category)
    const fetchData = async () => {
      try {
        const result = await CalendarServices.getAllCategoryEvent(id_family);
        setAvailableColors(result);

      } catch (error) {
        console.log('Error fetching colors:', error);
      }

    };
    fetchData();
  }, [id_family]);

  const handleColorSelect = (index: number, item: CategoryEvent) => {
    dispatch(setColor(item.color))
    dispatch(setIdcate(item.id_category_event))
    setSelectedColorIndex(selectedColorIndex === item.id_category_event ? null : item.id_category_event);
  };

  const handleCreateCategory= () => {
    //bottomSheetRef.current?.open();
    navigation.navigate('CalendarStack', {screen: 'CreateCategoryEvent', params: {id_famiy: id_family}})
  };
  const renderColorCircle = ({ item, index }: { item: CategoryEvent, index: number }) => (
    <View style= { styles.containerColor}> 
      <TouchableOpacity
        style={[
          styles.colorCircle,
          { 
            backgroundColor: item.color,
          }
        ]}
        onPress={() => handleColorSelect(index, item)}
      >
        {selectedColorIndex === item.id_category_event && <View style={styles.selected} />}

      </TouchableOpacity>
      <Text style= { styles.textHashtag}>#{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick a color</Text>
      <FlatList
        data={availableColors}
        keyExtractor={(item) => item.id_category_event.toString()}
        horizontal
        renderItem={renderColorCircle}
        contentContainerStyle={styles.colorList}
        ListFooterComponent={(
          <TouchableOpacity
            style={styles.colorCircle}
            onPress={() => handleCreateCategory()}
          >
            <Text style={styles.plusSign}>{}</Text>
          </TouchableOpacity>
        )}
      />
     
      
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
    flexDirection: 'column',
    paddingRight: 10,
  },
  textHashtag: {
    marginTop: screenHeight * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenHeight * 0.015,
    fontFamily: 'Arial',
  },
  colorCircle: {
    width: screenWidth * 0.13,
    height: screenHeight * 0.06,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#ccc',
    marginRight: 20
  },
  selected: {
    width: screenWidth * 0.07,
    height: screenHeight * 0.03,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#ccc',
  },
  plusSign: {
    fontSize: screenHeight * 0.04,
    fontWeight: 'bold',
  },
});

export default ColorPicker;
