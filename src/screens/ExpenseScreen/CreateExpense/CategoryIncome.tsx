import React, {useState, useRef} from 'react';
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
import {useSelector} from 'react-redux';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
const incomeCategoryIcons = {
  Salary: 'cash',
  Services: 'briefcase',
  Investments: 'trending-up',
  Rent: 'home',
  Dividends: 'star',
  'Consulting fees': 'chatbubbles',
  Royalties: 'gift',
  Grants: 'cash',
  Bonuses: 'star',
  Interest: 'money',
};

const CategoryIncome = ({
  incomeCategory,
  pressSelectCategory,
  handleMostUsedPress,
  isScrollViewVisible,
  scrollX,
  dataIncomeTypeToShow,
  handleIncomeTypePress,
  widthOfYourPage,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const urlCatetory =
    'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg';
  const translate = useSelector(getTranslate);
  const location = useSelector(selectLocale);
  const color = useThemeColors();

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
          {incomeCategory?.income_source_name || translate('Select category')}
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
          // justifyContent: 'space-between',
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
            <FlatList
              data={Object.values(dataIncomeTypeToShow)}
              numColumns={3}
              keyExtractor={item => item.id_income_source.toString()}
              contentContainerStyle={{marginLeft: 10}}
              scrollEnabled={false}
              renderItem={({item}) => {
                const iconName =
                  incomeCategoryIcons[item.income_source_name] || 'error';

                return (
                  <TouchableOpacity onPress={() => handleIncomeTypePress(item)}>
                    <View
                      style={[
                        styles.categoryContainer,
                        {width: 125, height: 80},
                      ]}>
                      <Icon
                        name={iconName}
                        size={40}
                        color={color.text}
                        style={styles.icon}
                      />
                      <Text
                        style={[styles.expenseItem, {color: color.text}]}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {location === 'vi'
                          ? item.income_source_name_vn
                          : item.income_source_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </Animated.ScrollView>
          {/* 
          <View style={styles.pagination}>
            <FlatList
              data={Object.values(dataIncomeTypeToShow)}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ index }) => (
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: index === currentPage ? 'gray' : '#ccc',
                    },
                  ]}
                />
              )}
            />
          </View>
          */}
        </>
      )}
    </View>
  );
};

export default CategoryIncome;
