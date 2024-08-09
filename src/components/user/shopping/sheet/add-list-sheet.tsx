import React, { useEffect, useRef } from 'react'
import { View, Text, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import Ingredients from 'src/assets/images/household_assets/Ingredients.png'
import NewListImg from 'src/assets/images/todo_assets/new_list_img.png'

import { useColorScheme } from 'nativewind';
import { handleRestore } from 'src/utils/sheet/func';
import { iconList } from 'src/assets/images/todo_assets/icon';
import Icon13 from 'src/assets/images/todo_assets/icon/13.png'
import { TodoListType } from 'src/interface/todo/todo';
import TodoListServices from 'src/services/apiclient/TodoListService';
import { addTodoListType } from 'src/redux/slices/TodoListSlice';
import { addShoppingListType } from 'src/redux/slices/ShoppingListSlice';

interface AddListSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
    id_calendar?: number
    appearsOnIndex: boolean
    onAddSuccess: (id_category: number) => void
    onAddFailed: () => void
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddListSheet = ({
    bottomSheetRef,
    id_family,
    id_calendar,
    appearsOnIndex,
    onAddSuccess,
    onAddFailed
}: AddListSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [inputName, setInputName] = React.useState('')
    const [pickIcon, setPickIcon] = React.useState<string>(iconList[0])
    const [showExpandIcon, setShowExpandIcon] = React.useState(false)
    const { colorScheme } = useColorScheme()

    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false)
                setErrorText('')
            }, 3000)
        }

    }, [showError])



    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehavior={
            loading ? 'none' : undefined
        } />,
        []
    );

    const handleSubmit = async () => {
        Keyboard.dismiss()
        await handleRestore()
        console.log("inputName", inputName)
        console.log("pickIcon", pickIcon)
        if (inputName == '') {
            setErrorText('Please fill in all the fields')
            setShowError(true)
            return
        }
        else {
            // const newTodoListType = await TodoListServices.addTodoListType({
            //     id_family: id_family,
            //     name: inputName,
            //     id_calendar: id_calendar ? id_calendar : 0,
            //     icon_url: pickIcon
            // })
            // console.log("newTodoListType", newTodoListType)
            // if (newTodoListType) {
            //     bottomSheetRef.current?.close()
            //     // dispatch(addShoppingListType(newTodoListType))
            //     onAddSuccess(newTodoListType.id_checklist_type)
            // } else {
            //     bottomSheetRef.current?.close()
            //     onAddFailed()
            // }


        }
    }


    const buildInputName = React.useCallback(() => {
        return <BottomSheetTextInput
            placeholder='Give your new checklist a name'
            value={inputName}
            onChangeText={(text) => {
                setInputName(text)
            }}
            placeholderTextColor={colorScheme === 'light' ? '#b0b0b0' : '#A6A6A6'}
            style={{
                backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#171A21',
                borderWidth: colorScheme === 'light' ? 1 : 1.5,
                borderColor: colorScheme === 'light' ? '#DEDCDC' : '#66C0F4',
                borderRadius: 10,
                marginVertical: 10,
                paddingVertical: screenHeight * 0.02,
                paddingHorizontal: screenWidth * 0.05,
                marginHorizontal: screenWidth * 0.05,
                // fontWeight: 'bold',
                fontSize: 15,
                color: colorScheme === 'light' ? '#b0b0b0' : '#A6A6A6'
            }}
            keyboardAppearance={colorScheme}
        />

    }, [inputName, colorScheme])

    const buildPickIcon = React.useCallback(() => {
        return <>
            <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
                backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#171A21',
                borderWidth: colorScheme === 'light' ? 1 : 1.5,
                borderColor: colorScheme === 'light' ? '#DEDCDC' : '#66C0F4',
                borderRadius: 10,
                marginVertical: 10,
                paddingVertical: screenHeight * 0.01,
                paddingHorizontal: screenWidth * 0.05,
                marginHorizontal: screenWidth * 0.05,

            }} onPress={() => {
                // pickCategorySheetRef.current?.expand()
                Keyboard.dismiss()
                setShowExpandIcon((prev) => {
                    return !prev
                })
                // addRoomSheetRef.current?.expand()
            }}>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row  items-center '>
                        <Image source={{ uri: pickIcon }} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                        <Text className='pl-4' style={{
                            color: "#b0b0b0",
                            fontSize: 15,
                            // fontWeight: 500

                        }}>Icon</Text>
                    </View>
                    <View className=''>
                        <Text style={{
                            color: 1 == 1 ? "#b0b0b0" : iOSColors.systemBlue.defaultLight,
                            fontSize: 15,

                        }}>{
                                "Pick Icon"
                            }</Text>
                    </View>
                </View>

            </TouchableOpacity>

            {
                showExpandIcon && <View className='' style={{
                    backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#171A21',
                    borderWidth: colorScheme === 'light' ? 1 : 1.5,
                    borderColor: colorScheme === 'light' ? '#DEDCDC' : '#66C0F4',
                    borderRadius: 10,
                    marginVertical: 10,
                    paddingVertical: screenHeight * 0.01,
                    paddingHorizontal: screenWidth * 0.05,
                    marginHorizontal: screenWidth * 0.05,
                }}>
                    <View className='flex-row flex-wrap justify-around'>
                        {
                            iconList.map((icon, index) => {
                                if (index > 0) {
                                    return <TouchableOpacity key={index} className='flex-row items-center justify-between mr-3 mb-2' onPress={() => {
                                        setPickIcon(icon)
                                        setShowExpandIcon(false)
                                    }}>
                                        <Image source={{
                                            uri: icon
                                        }} style={{ width: screenWidth * 0.08, height: screenWidth * 0.08 }} />
                                    </TouchableOpacity>
                                }

                            })
                        }
                    </View>
                </View>
            }

        </>

    }, [pickIcon, colorScheme, showExpandIcon])






    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={appearsOnIndex ? 0 : -1}
            enableOverDrag={true}
            enablePanDownToClose={loading ? false : true}
            enableDynamicSizing={true}
            // snapPoints={snapPoints}

            // handleComponent={null}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backgroundStyle={{
                backgroundColor: colorScheme === 'dark' ? '#0A1220' : '#F7F7F7',
            }}

            // backgroundComponent={null}
            backdropComponent={renderBackdrop}
            keyboardBehavior='interactive'
            keyboardBlurBehavior='restore'
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(index)
                if (index == -1) {
                    setInputName('')
                }
            }}
        // keyboardBehavior="extend"
        // keyboardBlurBehavior="restore"

        >
            <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220] '>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

                    <View className='flex-1  mt-10'>
                        <View className='my-3 items-center'>
                            <Image source={NewListImg} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                        </View>
                        <View className=' items-center'>
                            <Text className='text-base font-semibold text-[#2A475E] dark:text-white' >Add New Checklist</Text>
                            <Text className='text-sm my-3  text-[#2A475E] dark:text-[#8D94A5]'>Give a name for your new list</Text>
                        </View>
                        {
                            buildInputName()
                        }
                        {
                            buildPickIcon()
                        }


                        <View>
                            {
                                showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
                            }
                        </View>

                        <View className='items-end pr-3 my-3 mt-12 '>
                            <TouchableOpacity className='items-center rounded-lg justify-center' style={{
                                width: screenWidth * 0.1,
                                height: screenWidth * 0.1,
                                backgroundColor: inputName != "" ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                            }}
                                onPress={async () => {
                                    await handleSubmit()
                                }}
                                disabled={inputName == "" ? true : false}
                            >
                                <Material name='arrow-right' size={24} color={
                                    inputName != "" ? 'white' : iOSGrayColors.systemGray.defaultDark
                                }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheetScrollView>
            </View>

        </BottomSheet>
    )
}


export default AddListSheet