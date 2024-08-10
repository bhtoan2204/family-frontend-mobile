import {addMonths, endOfMonth, format, startOfMonth, subMonths} from 'date-fns';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  Agenda,
  AgendaSchedule,
  Calendar,
  CalendarList,
} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {
  ShoppingListScreenProps,
  TodoListScreenProps,
} from 'src/navigation/NavigationTypes';
import {AppDispatch, RootState} from 'src/redux/store';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'src/constants';
import {colors} from '../const/color';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
import {setDateSelected} from 'src/redux/slices/TodoListSlice';
import BottomSheet from '@gorhom/bottom-sheet';
import AddListSheet from 'src/components/user/shopping-todo/sheet/add-list-sheet';
import {ScreenHeight} from '@rneui/base';
import {useToast} from 'react-native-toast-notifications';
import TodoListTypeSkeleton from './skeleton';
const screenHeight = Dimensions.get('screen').height;

const TodoListScreen = ({navigation, route}: TodoListScreenProps) => {
  const {id_family, openSheet, id_calendar} = route.params;

  useEffect(() => {
    console.log(id_family, openSheet, id_calendar);
  });
  const [selectDate, setSelectDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const todoListTypes = useSelector(
    (state: RootState) => state.todoList,
  ).todoListType;
  const toast = useToast();
  // const todoList = useSelector((state: RootState) => state.todoList).todoList
  // const todosMap = mapTodoList(todoList, todoListTypes)
  // const { colorScheme, setColorScheme } = useColorScheme();
  const [key, setKey] = useState(false);
  const isDarkMode = useSelector(getIsDarkMode);
  const dispatch = useDispatch<AppDispatch>();
  const addListBottomSheetRef = React.useRef<BottomSheet>(null);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const scrollYRef = React.useRef<any>(0);
  const loading = useSelector((state: RootState) => state.todoList).loading;
  useEffect(() => {
    setKey(prev => !prev);
  }, [isDarkMode]);

  // const loadItemsForMonth = (month: any) => {
  //     console.log('trigger items loading');
  // }
  // const renderEmptyDate = () => {
  //     return (
  //         <View className='flex-1 justify-center items-center'>
  //             <Text>No events for this day</Text>
  //         </View>
  //     );
  // };

  const handleDayPress = (date: any) => {
    if (selectDate === date.dateString) {
      // setSelectDate(new Date);
    } else {
      console.log(date.dateString);
      setSelectDate(date.dateString);
      dispatch(setDateSelected(date.dateString));
    }
  };

  const buildDate = React.useCallback((dateString: string) => {
    const date: Date = new Date(dateString);

    if (isNaN(date.getTime())) {
      //throw new Error('Invalid date string');
    }

    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const month: string = monthNames[date.getMonth()];
    const year: number = date.getFullYear();

    const description: string = `${month} ${year}`;
    return description;
  }, []);

  const customCalendarHeader = React.useCallback(() => {
    return (
      <View
        className="flex-row justify-between items-center py-3 "
        style={{
          marginHorizontal: 10,
        }}>
        <View className="">
          <Text
            className="flex-1 text-center text-base text-[#2A475E] dark:text-[#fff]"
            style={{fontWeight: 'bold'}}>
            {buildDate(selectDate)}
          </Text>
        </View>
        <View className="flex-row ">
          <TouchableOpacity
            className=""
            onPress={() => {
              setSelectDate(
                format(subMonths(new Date(selectDate), 1), 'yyyy-MM-dd'),
              );
            }}>
            <Material name="chevron-left" size={30} color={COLORS.DenimBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => {
              setSelectDate(
                format(addMonths(new Date(selectDate), 1), 'yyyy-MM-dd'),
              );
            }}>
            <Material name="chevron-right" size={30} color={COLORS.DenimBlue} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [selectDate]);

  const buildItems = React.useCallback(() => {
    return todoListTypes.map((type, index) => {
      return (
        <TodoListCategoryItem
          key={type.id_checklist_type}
          id_category={type.id_checklist_type}
          category_name={type.name_en}
          total_items={type.checklists ? type.checklists.length : 0}
          handleNavigateCategory={(id_category: number) => {
            // console.log('navigate')
            navigation.navigate('TodoListCategory', {
              id_family: id_family,
              id_category: id_category,
            });
          }}
          iconUrl={type.icon_url}
          isDarkMode={isDarkMode}
        />
      );
    });
  }, [todoListTypes]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: !isDarkMode ? '#f7f7f7' : '#0A1220',
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollYRef}
        onScroll={event => {
          const currentYPosition = event.nativeEvent.contentOffset.y;
          const oldPosition = scrollYRef.current;

          if (oldPosition < currentYPosition) {
            setIsScrollDown(true);
          } else {
            setIsScrollDown(false);
          }
          scrollYRef.current = currentYPosition;
        }}>
        <View className="flex-row  justify-between items-center py-6">
          <TouchableOpacity
            className="flex-1 "
            onPress={() => {
              navigation.goBack();
            }}>
            <Material
              name="chevron-left"
              size={30}
              color={!isDarkMode ? COLORS.DenimBlue : 'white'}
            />
          </TouchableOpacity>
          <Text
            className="flex-1 text-center text-lg"
            style={{
              color: !isDarkMode ? COLORS.Rhino : 'white',
              fontWeight: 'bold',
            }}>
            CheckList
          </Text>
          <View className="flex-1 items-end">
            <Material
              name="refresh"
              size={25}
              color={!isDarkMode ? COLORS.DenimBlue : 'white'}
              onPress={() => {
                // toggleColorScheme()
              }}
            />
          </View>
        </View>

        <View
          className="bg-[#F7F7F7] dark:bg-[#252D3B] rounded-lg"
          style={{
            marginHorizontal: 10,
          }}>
          <Calendar
            key={key.toString()}
            onDayPress={handleDayPress}
            markedDates={{
              [selectDate]: {selected: true, selectedColor: COLORS.DenimBlue},
            }}
            initialDate={selectDate}
            theme={{
              // calendarBackground: colorScheme === 'light' ? '#f7f7f7' : '#1A1A1A',
              calendarBackground: 'transparent',
              dayTextColor: !isDarkMode ? '#000000' : 'white',
              textDisabledColor: !isDarkMode ? '#7C7C7C' : '#92969D',
            }}
            minDate={'2024-05-10'}
            maxDate={'2026-06-10'}
            disableAllTouchEventsForDisabledDays={true}
            customHeader={customCalendarHeader}
          />
        </View>

        <View style={{}} className=" py-4">
          <Text
            className="ml-6 my-4 text-base font-semibold "
            style={{
              color: isDarkMode ? 'white' : '#292828',
            }}>
            My checklist
          </Text>
          {loading ? (
            <>
              <TodoListTypeSkeleton />
              <TodoListTypeSkeleton />
              <TodoListTypeSkeleton />
            </>
          ) : (
            <>{buildItems()}</>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        className={`absolute rounded-full  bottom-5 right-5  bg-[#66C0F4] items-center justify-center transition duration-75 ${isScrollDown ? 'opacity-30' : ''}`}
        style={{
          width: ScreenHeight * 0.085,
          height: ScreenHeight * 0.085,
        }}
        onPress={() => {
          addListBottomSheetRef.current?.expand();
          // addGuidelineBottomSheetRef.current?.expand()
        }}>
        <Material name="plus" size={30} color="white" />
      </TouchableOpacity>
      <AddListSheet
        bottomSheetRef={addListBottomSheetRef}
        appearsOnIndex={openSheet != null ? openSheet : false}
        id_family={id_family!}
        onAddSuccess={(id_category: number) => {
          if (id_calendar) {
            navigation.setParams({
              id_calendar: undefined,
              openSheet: false,
              id_family: id_family,
            });
          }
          toast.show('New list added', {
            type: 'success',
            duration: 3000,
            icon: <Material name="check" size={24} color="white" />,
          });
          navigation.navigate('TodoListCategory', {
            id_family: id_family,
            id_category: id_category,
          });
        }}
        onAddFailed={() => {}}
        id_calendar={id_calendar}
      />
    </SafeAreaView>
  );
};

interface TodoListCategoryItemProps {
  id_category: number;
  category_name: string;
  total_items: number;
  handleNavigateCategory: (id_category: number) => void;
  iconUrl: string;
  isDarkMode: boolean;
}

export const TodoListCategoryItem = ({
  id_category,
  category_name,
  total_items,
  handleNavigateCategory,
  iconUrl,
  isDarkMode,
}: TodoListCategoryItemProps) => {
  const buildTotal = React.useCallback((total_items: number) => {
    if (total_items > 1) {
      return `${total_items} items`;
    } else if (total_items === 1) {
      return `${total_items} item`;
    } else if (total_items === 0) {
      return `No item`;
    }
  }, []);

  return (
    <TouchableOpacity
      className="flex-row items-center mb-2  "
      onPress={() => {
        handleNavigateCategory(id_category);
      }}>
      <View className="flex-1 w-full items-center flex-row my-2 justify-between ">
        <View className="ml-6 items-center flex-row">
          <View
            className="p-3 mr-3  rounded-full items-center justify-center"
            style={{
              backgroundColor:
                colors[id_category - 1] != null
                  ? colors[id_category - 1]
                  : colors[9],
            }}>
            <Image
              source={{uri: iconUrl}}
              style={{
                width: screenHeight * 0.04,
                height: screenHeight * 0.04,
              }}
            />
          </View>
          <View className=" justify-center">
            <Text className="text-base font-semibold text-[#292828] dark:text-[#fff]">
              {category_name}
            </Text>
            <Text className="text-sm text-[#5C5C5C] dark:text-[#8D94A5]">
              {buildTotal(total_items)}
            </Text>
          </View>
        </View>
        <View
          className=""
          style={{
            marginRight: 10,
          }}>
          <Material
            name="chevron-right"
            size={30}
            color={!isDarkMode ? '#292828' : 'white'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TodoListScreen;
