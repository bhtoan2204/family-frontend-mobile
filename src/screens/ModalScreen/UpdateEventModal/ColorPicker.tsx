import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
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
}) => {
  const [availableColors, setAvailableColors] = useState<CategoryEvent[]>([]);
  const animation = useState(new Animated.Value(-1))[0];
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CalendarServices.getAllCategoryEvent(id_Family);
        console.log(result);
        setAvailableColors(result);
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
    console.log(item.id_category_event);
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
    return availableColors.map((item, index) => {
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
              styles.colorCircle,
              {backgroundColor: item.color, borderColor: item.color},
              isSelected && styles.selectedColor,
            ]}
            onPress={() => handleColorSelect(index, item)}>
            {isSelected && (
              <Animated.View
                style={[
                  styles.selected,
                  {backgroundColor: item.color},
                  animatedStyle,
                ]}
              />
            )}
            {isSelected && <View style={styles.centerDot} />}
          </TouchableOpacity>
          <Text
            style={[
              styles.textHashtag,
              {color: item.color},
            ]}>{`#${item.title}`}</Text>
        </View>
      );
    });
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
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorList: {
    alignItems: 'center',
    marginTop: 10,
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
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: screenWidth * 0.1,
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
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: screenWidth * 0.1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  centerDot: {
    position: 'absolute',
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: screenWidth * 0.1,
    marginBottom: 20,
  },
  plusSign: {
    color: '#000',
  },
});

export default ColorPicker;
