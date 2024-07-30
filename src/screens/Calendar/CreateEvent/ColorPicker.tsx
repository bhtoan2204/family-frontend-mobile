import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import CalendarServices from 'src/services/apiclient/CalendarService';
import {CategoryEvent} from 'src/interface/calendar/CategoryEvent';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ColorPicker = ({
  navigation,
  id_Family,
  setSelectedColorIndex,
  selectedColorIndex,
  setEventCategory,
}) => {
  const [availableColors, setAvailableColors] = useState<CategoryEvent[]>([]);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

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
    navigation.navigate('CalendarStack', {
      screen: 'CreateCategoryEvent',
      params: {id_family: id_Family},
    });
  };

  const renderColorCircles = () => {
    return availableColors.map((item, index) => (
      <View key={item.id_category_event} style={styles.containerColor}>
        <TouchableOpacity
          style={[
            styles.colorCircle,
            {backgroundColor: item.color},
            selectedColorIndex === index && styles.selectedColor,
          ]}
          onPress={() => handleColorSelect(index, item)}>
          {selectedColorIndex === index && <View style={styles.selected} />}
        </TouchableOpacity>
        <Text
          style={[
            styles.textHashtag,
            {color: item.color},
          ]}>{`#${item.title}`}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: color.text}]}>
        {translate('Category')}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.colorList}>
        {renderColorCircles()}
        <TouchableOpacity
          style={[styles.colorCircle, styles.addButton]}
          onPress={handleCreateCategory}>
          <Material name="plus" size={22} style={styles.plusSign} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorList: {
    alignItems: 'center',
  },
  containerColor: {
    paddingRight: 15,
    alignItems: 'center',
  },
  textHashtag: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Arial',
  },
  colorCircle: {
    width: screenWidth * 0.2,
    height: screenHeight * 0.05,
    borderRadius: screenHeight * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f0f0f0',
    marginRight: 15,
    borderWidth: 1,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  selected: {
    width: screenWidth * 0.1,
    height: screenHeight * 0.05,
    borderRadius: screenHeight * 0.025,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  plusSign: {
    color: '#000',
  },
});

export default ColorPicker;
