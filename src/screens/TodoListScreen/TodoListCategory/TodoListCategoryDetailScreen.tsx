import { addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { Agenda, AgendaSchedule, Calendar, CalendarList } from 'react-native-calendars'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingListCategoryScreenProps, ShoppingListDetailScreenProps, TodoListItemDetailScreenProps } from 'src/navigation/NavigationTypes'
import { AppDispatch, RootState } from 'src/redux/store'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from 'src/constants'
import { colors, textColors } from '../const/color'

import GroceryImage from 'src/assets/images/shoppinglist_assets/grocery.png'
import ElectronicsImage from 'src/assets/images/shoppinglist_assets/Electronics.png'
import ClothingImage from 'src/assets/images/shoppinglist_assets/Clothing.png'
import FurnitureImage from 'src/assets/images/shoppinglist_assets/Furniture.png'
import PharmacyImage from 'src/assets/images/shoppinglist_assets/Pharmacy.png'
import OtherImage from 'src/assets/images/shoppinglist_assets/Other.png'
import GroceryBgImage from 'src/assets/images/shoppinglist_assets/grocery_bg_image.png'
import ElectronicsBgImage from 'src/assets/images/shoppinglist_assets/electronics_bg_image.png'
import ClothingBgImage from 'src/assets/images/shoppinglist_assets/clothing_bg_image.png'
import FurnitureBgImage from 'src/assets/images/shoppinglist_assets/furniture_bg_image.png'
import PharmacyBgImage from 'src/assets/images/shoppinglist_assets/pharmacy_bg_image.png'
import OtherBgImage from 'src/assets/images/shoppinglist_assets/other_bg_image.png'
import GamingIcon from 'src/assets/images/shoppinglist_assets/gaming_icon.png'

import { ListItem } from '@rneui/themed';
import { gradients_list } from 'src/assets/images/gradients'
import { ScreenWidth } from '@rneui/base'
import { ShoppingListItemInterface } from 'src/interface/checklist/checklist'
import { updatePurchasedItem } from 'src/redux/slices/ShoppingListSlice'
import BottomSheet from '@gorhom/bottom-sheet'

import { convertToNumber } from 'src/utils/currency/convertPriceFromDB'
import { deleteTodoList, updateDoneTodoList } from 'src/redux/slices/TodoListSlice'
import UpdateDateItemSheet from 'src/components/user/shopping-todo/sheet/update-date-item-sheet'
import UpdateDescriptionSheet from 'src/components/user/shopping-todo/sheet/update-description-sheet'
import { useColorScheme } from 'nativewind'
import { useToast } from 'react-native-toast-notifications'
import { categoriesImage } from '../const/image'
import TodoListServices from 'src/services/apiclient/TodoListService'
import { TodoListItem } from 'src/interface/todo/todo'

const screenHeight = Dimensions.get('screen').height;


const TodoListCategoryDetailScreen = ({ navigation, route }: TodoListItemDetailScreenProps) => {
  const { id_family, id_category, id_item } = route.params
  const dispatch = useDispatch<AppDispatch>()
  const itemDetail = useSelector((state: RootState) => state.todoList).todoListType.find(item => item.id_checklist_type == id_category)?.checklists.find(item => item.id_checklist == id_item)
  const categoryDetail = useSelector((state: RootState) => state.todoList).todoListType.find(item => item.id_checklist_type == id_category)

  const updateDateBottomSheetRef = React.useRef<BottomSheet>(null)
  // const addInformationBottomSheetRef = React.useRef<BottomSheet>(null)
  const updateDescriptionBottomSheetRef = React.useRef<BottomSheet>(null)
  const { colorScheme } = useColorScheme()
  const toast = useToast()


  // useEffect(() => {
  //     console.log("item", itemDetail)
  // }, [])

  const getImage = React.useCallback((id_category: number) => {
    return categoriesImage[id_category - 1] != undefined ? categoriesImage[id_category - 1] : categoriesImage[9]
  }, [])
  const ApiCall = async (item: TodoListItem) => {
    console.log({
      id_checklist: item.id_checklist,
      id_checklist_type: id_category,
      id_family: id_family!,
      is_completed: !item.is_completed,
      description: item.description,
      task_name: item.task_name,
      due_date: item.due_date,
    })
    const res = await TodoListServices.updateItem({
      id_checklist: item.id_checklist,
      id_checklist_type: id_category,
      id_family: id_family!,
      is_completed: !item.is_completed,
      description: item.description,
      task_name: item.task_name,
      due_date: item.due_date,
    })
    if (res) {
      return true

    } else {
      return false
    }
  }
  const handleUpdateComplete = async (item: TodoListItem) => {
    dispatch(updateDoneTodoList({
      id_checklist: item.id_checklist,
      id_checklist_type: id_category,
    }))
    const res = await ApiCall(item)
    if (res) {
      toast.show('Update successfully', {
        duration: 2000,
        icon: <Material name='check' size={24} color={'white'} />,
        type: 'success',
      })

    } else {
      toast.show('Update failed', {
        duration: 2000,
        icon: <Material name='close' size={24} color={'white'} />,
        type: 'error',
      })
    }

  }
  const buildInfoBox = React.useCallback(() => {
    return <View className='mx-10 py-4 border-b-[1px] border-[#CFCFCF]'>
      <View className='flex-row  items-center  w-full  py-2 '>
        <View className=' flex-row mr-2 items-center'>

          <TouchableOpacity className=' rounded-full mr-2  items-center justify-center' style={{
            height: screenHeight * 0.04,
            width: screenHeight * 0.04,
            borderWidth: itemDetail?.is_completed ? 0 : 2,
            borderColor: itemDetail?.is_completed ? 'transparent' : '#CBCBCB',
            backgroundColor: itemDetail?.is_completed ? '#00AE00' : undefined,
          }}
            onPress={async () => {
              await handleUpdateComplete(itemDetail!)
              // dispatch(updateDoneTodoList({
              //     id_checklist: id_item,
              //     id_checklist_type: id_category,
              // }))
            }}
          >
            {
              itemDetail?.is_completed && <Material name='check' size={24} color={'white'} />
            }
          </TouchableOpacity>
          <Text className='text-base text-[#2F2F34] dark:text-white'>{itemDetail?.task_name}</Text>
        </View>

      </View>
    </View>
  }, [itemDetail?.is_completed, colorScheme])

  const buildCalendarBox = React.useCallback(() => {
    return <TouchableOpacity className='mx-10 py-4 border-b-[1px] border-[#CFCFCF]' onPress={() => {
      updateDateBottomSheetRef.current?.expand()
    }}>
      <View className='flex-row  items-center  w-full  py-2 '>
        <View className='mr-2'>

          <Material name='calendar-month-outline' size={30} color={
            colorScheme == 'light' ? '#5D5D5D' : 'white'
          }

          />
        </View>

        <Text className='text-base text-[#2F2F34] dark:text-white'>
          {
            itemDetail?.due_date ? format(new Date(itemDetail?.due_date), 'dd/MM/yyyy') : 'Set reminder date'
          }
        </Text>
      </View>
    </TouchableOpacity>
  }, [itemDetail?.due_date, colorScheme])

  const buildRepeatBox = React.useCallback(() => {
    return <TouchableOpacity className='mx-10 py-4 border-b-[1px] border-[#CFCFCF]'
      onPress={() => {
      }}
    >
      <View className='flex-row  items-center  w-full  py-2 '>
        <View className='mr-2'>

          <Material name='repeat' size={30} color={
            colorScheme == 'light' ? '#5D5D5D' : 'white'
          } />
        </View>

        <Text className='text-base text-[#2F2F34] dark:text-white'>Repeat</Text>
      </View>
    </TouchableOpacity>
  }, [colorScheme])

  // const buildAddInfoBox = React.useCallback(() => {
  //     return <TouchableOpacity className='mx-10 py-4 border-b-[1px] border-[#CFCFCF]'
  //         onPress={() => {
  //             addInformationBottomSheetRef.current?.expand()
  //         }}
  //     >
  //         <View className='flex-row  items-center  w-full  py-2 '>
  //             <View className='mr-2'>

  //                 <Material name='information-outline' size={30} color={
  //                     colorScheme == 'light' ? '#5D5D5D' : 'white'
  //                 } />
  //             </View>

  //             <Text className='text-base text-[#2F2F34] dark:text-white'>Add more information</Text>
  //         </View>
  //     </TouchableOpacity>
  // }, [colorScheme, itemDetail?.description])

  const buildDescriptionBox = React.useCallback(() => {
    return <TouchableOpacity className='mx-10 py-4 border-b-[1px] border-[#CFCFCF]'
      onPress={() => {
        updateDescriptionBottomSheetRef.current?.expand()
      }}
    >
      <View className='flex-row  items-center  w-full  py-2 '>
        <View className='mr-2'>

          <Material name='format-list-bulleted' size={30} color={
            colorScheme == 'light' ? '#5D5D5D' : 'white'
          } />
        </View>

        <Text className='text-base text-[#2F2F34] dark:text-white'>{
          itemDetail?.description != '' ? itemDetail?.description : 'Add description'
        }</Text>
      </View>
    </TouchableOpacity>
  }, [itemDetail?.description, colorScheme])

  const handleDeleteApi = React.useCallback(async () => {
    const res = await TodoListServices.deleteItem({
      id_family: id_family!,
      id_checklist: id_item,
      // id_checklist: id_item
    })
    if (res == true) {
      toast.show("Deleted", {
        type: "success",
        duration: 2000,
        icon: <Material name="check" size={24} color={"white"} />,
      });
    } else {
      toast.show("Failed to delete", {
        type: "error",
        duration: 2000,
        icon: <Material name="close" size={24} color={"white"} />,
      });
    }
  }, [])

  const handleDeleteItem = React.useCallback(() => {
    Alert.alert('Delete item', 'Are you sure you want to delete this item?', [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await handleDeleteApi()
          navigation.goBack()
          dispatch(deleteTodoList({
            id_checklist: id_item,
            id_checklist_type: id_category,
          }))

          // toast.show("Deleted", {
          //     type: "success",
          //     duration: 2000,
          //     icon: <Material name="check" size={24} color={"white"} />,
          // });
        }
      },
      {
        text: 'Cancel',
        onPress: () => {
          // dispatch()
        }
      },
    ])
  }, [])

  return (
    <View style={{
      flex: 1,
      backgroundColor: colorScheme === 'light' ? '#f7f7f7' : '#0A1220'
    }}>
      <View className='py-6 h-[29%] ' style={{
        backgroundColor: colors[id_category - 1],
      }}>

        <View className='flex-row z-10 '>
          <View className='flex-row justify-between w-full mt-2'>
            <TouchableOpacity className='' onPress={() => {
              navigation.goBack()
            }}>
              <Material name='chevron-left' size={35} color={COLORS.Rhino} />
            </TouchableOpacity>
            <TouchableOpacity className='' onPress={() => {
              handleDeleteItem()
            }}>
              <Material name='delete-outline' size={35} color={COLORS.Rhino} />
            </TouchableOpacity>

          </View>
          {/* <Text className='flex-1 text-center text-lg'
                        style={{ color: COLORS.Rhino, fontWeight: 'bold' }}
                    >Shopping List</Text> */}
          <View className='absolute top-[200%] right-[-20] '>
            <Image source={getImage(id_category)} style={{
              height: screenHeight * 0.2,
              width: screenHeight * 0.2,
              transform: [{ rotate: '-20deg' }]

              // position: 'absolute',
              // right: 0,
            }} />
          </View>
        </View>
        <View className='ml-3 mt-10'>
          <Text className='' style={{
            fontSize: 40,
            color: textColors[id_category - 1],
            fontWeight: '600',
          }}>{
              categoryDetail?.name_en ? categoryDetail?.name_en : 'Other'

            }</Text>
        </View>
      </View>

      <View className='flex-1 mt-[-5%] rounded-tl-xl rounded-tr-xl r bg-white dark:bg-[#0A1220] overflow-hidden z-100'>
        <View className='bg-white dark:bg-[#0A1220] flex-1 '>
          <ScrollView className=''>
            <View style={{
            }} className=' py-4'>
              <View className='my-2'></View>

              <View>
                {buildInfoBox()}
                {buildCalendarBox()}
                {buildRepeatBox()}
                {buildDescriptionBox()}
                {/* {buildAddInfoBox()} */}
              </View>

            </View>

          </ScrollView>
        </View>
      </View>
      <UpdateDateItemSheet
        bottomSheetRef={updateDateBottomSheetRef}
        id_family={id_family!}
        id_item={id_item}
        id_list={id_category}
        initialDate={itemDetail?.due_date ? itemDetail?.due_date : new Date().toISOString()}
        onUpdateSuccess={
          () => {
            toast.show("Date updated", {
              type: "success",
              duration: 2000,
              icon: <Material name="check" size={24} color={"white"} />,
            });
          }
        }
        onUpdateFailed={
          () => {
            toast.show("Failed to updated date", {
              type: "error",
              duration: 2000,
              icon: <Material name="close" size={24} color={"white"} />,
            });
          }
        }
      />
      <UpdateDescriptionSheet
        bottomSheetRef={updateDescriptionBottomSheetRef}
        id_family={id_family!}
        id_item={id_item}
        id_list={id_category}
        description={itemDetail?.description || ""}
        onUpdateSuccess={
          () => {
            toast.show("Description updated", {
              type: "success",
              duration: 2000,
              icon: <Material name="check" size={24} color={"white"} />,
            });
          }
        }
        onUpdateFailed={
          () => {
            toast.show("Failed to update description", {
              type: "error",
              duration: 2000,
              icon: <Material name="close" size={24} color={"white"} />,
            });
          }
        }
      />
    </View>

  )
}

export default TodoListCategoryDetailScreen