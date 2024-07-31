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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useSelector} from 'react-redux';
import {useThemeColors} from 'src/hooks/useThemeColor';

const iconMapping = {
  1: 'fast-food',
  2: 'home',
  3: 'water',
  4: 'car',
  5: 'medkit',
  6: 'school',
  7: 'game-controller',
  8: 'shield',
  9: 'card',
  10: 'piggy-bank',
};

const CategoryExpense = ({
  expenseCategory,
  pressSelectCategory,
  handleMostUsedPress,
  isScrollViewVisible,
  scrollX,
  expenseType,
  dataExpenseTypeToShow,
  handleExpenseTypePress,
  widthOfYourPage,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const translate = useSelector(getTranslate);
  const location = useSelector(selectLocale);
  const urlCatetory =
    'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg';
  const color = useThemeColors();

  useEffect(() => {
    console.log(expenseType);
  });

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
          {expenseCategory?.expense_type_name || translate('Select category')}
        </Text>

        <TouchableOpacity
          style={styles.chevronContainer}
          onPress={pressSelectCategory}>
          <Text
            style={[
              {
                color: color.text,
                fontWeight: '600',
                fontSize: 16,
                marginRight: 5,
              },
            ]}>
            {translate('View All')}
          </Text>
          <Icon name="chevron-forward-outline" size={22} color={color.text} />
        </TouchableOpacity>
      </View>
      <View style={{height: 1, backgroundColor: color.background, bottom: 5}} />
      <TouchableOpacity
        onPress={handleMostUsedPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={[styles.mostUsedButton, {marginRight: -10}]}>
          {translate('Most used')}{' '}
        </Text>
        <EvilIcons
          name={isScrollViewVisible ? 'chevron-down' : 'chevron-right'}
          size={30}
          color="#878C9A"
        />
      </TouchableOpacity>

      {isScrollViewVisible && (
        <>
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
            {expenseType && (
              <FlatList
                data={Object.values(dataExpenseTypeToShow)}
                keyExtractor={item => item.id_expenditure_type.toString()}
                numColumns={3}
                contentContainerStyle={{marginLeft: 10, paddingBottom: 10}}
                scrollEnabled={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleExpenseTypePress(item)}>
                    <View
                      style={[
                        styles.categoryContainer,
                        {width: 125, height: 80},
                      ]}>
                      <Icon
                        name={iconMapping[item.id_expenditure_type]}
                        size={30}
                        color={color.text}
                        style={styles.icon}
                      />
                      <Text
                        style={[styles.expenseItem, {color: color.text}]}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {location === 'vi'
                          ? item.expense_type_name_vn
                          : item.expense_type_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </Animated.ScrollView>
        </>
      )}
    </View>
  );
};

export default CategoryExpense;
