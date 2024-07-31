import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {UtilitiesType} from 'src/interface/income/getIncome';
import {IncomeServices} from 'src/services/apiclient';
import {useSelector} from 'react-redux';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {COLORS} from 'src/constants';

const iconMapping = {
  1: 'flame',
  2: 'flash',
  3: 'water',
  4: 'globe',
  5: 'trash',
  6: 'build',
  7: 'snow',
  8: 'snow',
  9: 'tv',
  10: 'call',
  11: 'shield',
  12: 'refresh-circle',
  13: 'help-circle',
};

const CategoryUtilities = ({
  widthOfYourPage,
  utilitiesSelect,
  handleUtilitieTypePress,
  scrollX,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [utilities, setUtilities] = useState<UtilitiesType[]>([]);
  const scrollViewRef = useRef(null);
  const translate = useSelector(getTranslate);
  const urlCatetory =
    'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg';
  const location = useSelector(selectLocale);
  const color = useThemeColors();

  const fetchCategoryUtilities = async () => {
    try {
      const data = await IncomeServices.getUtilityTypes();
      setUtilities(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryUtilities();
  }, []);

  return (
    <View
      style={[styles.ContainerCategory, {backgroundColor: color.background}]}>
      <View style={styles.selectedItemContainer}>
        <Image source={{uri: urlCatetory}} style={styles.avatar} />
        <Text
          style={[
            styles.inputAmount,
            {textAlign: 'left'},
            {fontSize: 18},
            {color: color.text},
          ]}>
          {utilitiesSelect?.name_vn || translate('Select category')}
        </Text>
      </View>
      <View style={{height: 1, backgroundColor: color.background, bottom: 5}} />

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
              const pageIndex = Math.round(
                event.nativeEvent.contentOffset.x / widthOfYourPage,
              );
              setCurrentPage(pageIndex);
            },
          },
        )}>
        <FlatList
          data={utilities}
          numColumns={7}
          keyExtractor={item => item.id_utilities_type.toString()}
          contentContainerStyle={{marginLeft: 10}}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleUtilitieTypePress(item)}>
              <View
                style={[styles.categoryContainer, {width: 125, height: 80}]}>
                <Icon
                  name={iconMapping[item.id_utilities_type]}
                  size={30}
                  color={COLORS.AzureishWhite}
                  style={styles.icon}
                />
                <Text
                  style={[styles.expenseItem, {color: color.text}]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {location === 'vi' ? item.name_vn : item.name_en}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.ScrollView>
    </View>
  );
};

export default CategoryUtilities;
