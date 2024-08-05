import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import CalendarServices from 'src/services/apiclient/CalendarService';
import {CategoryEvent} from 'src/interface/calendar/CategoryEvent';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const {width: screenWidth} = Dimensions.get('window');

const ColorPicker = ({
  navigation,
  id_Family,
  setSelectedColorIndex,
  selectedColorIndex,
  setEventCategory,
  setAvailableColors,
  setSelectedColor,
}) => {
  const [availableColors, setAvailableColorsState] = useState<CategoryEvent[]>(
    [],
  );
  const animation = useState(new Animated.Value(-1))[0];
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CalendarServices.getAllCategoryEvent(id_Family);
        setAvailableColorsState(result);
        setAvailableColors(result); // Pass colors to parent
      } catch (error) {
        console.log('Error fetching colors:', error);
      }
    };

    fetchData();
  }, [id_Family]);

  useEffect(() => {
    // Animate when selectedColorIndex changes
    Animated.timing(animation, {
      toValue: selectedColorIndex !== null ? selectedColorIndex : -1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedColorIndex]);

  const handleColorSelect = (index: number, item: CategoryEvent) => {
    setEventCategory(item);
    setSelectedColorIndex(selectedColorIndex === index ? null : index);
    setSelectedColor(item.color); // Update the selected color
  };

  const handleCreateCategory = () => {
    navigation.navigate('CalendarStack', {
      screen: 'CreateCategoryEvent',
      params: {id_family: id_Family},
    });
  };

  const renderColorRectangle = ({item, index}) => {
    const isSelected = selectedColorIndex === index;
    const animatedStyle = {
      transform: [
        {
          scale: animation.interpolate({
            inputRange: [-1, index],
            outputRange: [1, 1.2],
          }),
        },
      ],
    };

    return (
      <View key={item.id_category_event} style={styles.containerColor}>
        <TouchableOpacity
          style={[
            styles.colorRectangle,
            {backgroundColor: item.color, borderColor: item.color},
            isSelected && styles.selectedColor,
          ]}
          onPress={() => handleColorSelect(index, item)}>
          <Text style={[styles.textHashtag, {color: '#fff'}]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container1}>
      <Text style={[styles.title, {color: color.text}]}>
        {translate('Category')}
      </Text>
      <FlatList
        data={[...availableColors, {id_category_event: 'addButton'}]} // Add a dummy item for the add button
        renderItem={({item, index}) =>
          item.id_category_event === 'addButton' ? (
            <TouchableOpacity
              style={[styles.colorRectangle, styles.addButton]}
              onPress={handleCreateCategory}>
              <Material name="plus" size={22} style={styles.plusSign} />
            </TouchableOpacity>
          ) : (
            renderColorRectangle({item, index})
          )
        }
        keyExtractor={item => item.id_category_event.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  container1: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  containerColor: {
    alignItems: 'center',
    paddingHorizontal: 5, // Reduce horizontal padding
  },
  textHashtag: {
    marginTop: 3,
    fontSize: 15,
    fontFamily: 'Arial',
    color: '#fff',
  },
  colorRectangle: {
    paddingVertical: 15, // Reduce vertical padding
    paddingHorizontal: 25, // Reduce horizontal padding
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 10,
    margin: 2, // Reduce margin to ensure closer spacing
  },
  selectedColor: {
    borderWidth: 1,
    borderColor: '#bdbdbd', // Change this to the desired border color
  },
  addButton: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6, // Reduce vertical padding
    paddingHorizontal: 10, // Reduce horizontal padding
    borderRadius: 10,
    margin: 2, // Reduce margin to ensure closer spacing
  },
  plusSign: {
    color: '#000',
  },
});

export default ColorPicker;
