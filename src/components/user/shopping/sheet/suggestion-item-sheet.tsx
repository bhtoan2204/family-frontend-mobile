import React, { useEffect, useRef } from 'react'
import { View, Text, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground, ImageSourcePropType, Linking } from 'react-native'
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
import { addShoppingListItem, addShoppingListType } from 'src/redux/slices/ShoppingListSlice';
import { ShoppingListItem, ShoppingListItemType, ShoppingListType } from 'src/interface/shopping/shopping_list';
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices';
import { ScreenHeight } from '@rneui/base';
import DefaultAvatar from 'src/assets/images/education_assets/default_avatar.png';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionsCustomStyle,

} from 'react-native-popup-menu';
import { convertToNumber, convertToNumberVND } from 'src/utils/currency/convertPriceFromDB';
import { useToast } from 'react-native-toast-notifications';

interface AddListSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
    id_item_type: number
    id_list: number
    id_item: number
    itemType: ShoppingListItemType
    onAddSuccess: () => void
    onAddFailed: () => void
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Divider = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3 }} />
    )
}

const SuggestItemSheet = ({
    bottomSheetRef,
    id_item_type,
    id_list,
    id_item,
    id_family,
    itemType,
    onAddSuccess,
    onAddFailed
}: AddListSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [dataSuggest, setDataSuggest] = React.useState<{
        title: string;
        source: string;
        link?: string;
        price: string;
        delivery: string;
        imageUrl: string;
        position?: number;
    }[]>([])
    const { colorScheme } = useColorScheme()
    const toast = useToast()
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

    const handleSubmit = async ({ name, price }: {
        name: string;
        price: number;
    }) => {
        const res = await ShoppingListServices.createShoppingListItem({
            id_family: id_family,
            id_list: id_list,
            id_item_type: id_item_type,
            item_name: name,
            description: '',
            quantity: 1,
            priority_level: 0,
            reminder_date: new Date().toISOString(),
            price: price,
        });
        if (res) {
            dispatch(
                addShoppingListItem({
                    id_item: res.id_item,
                    id_list: res.id_list,
                    id_item_type: res.id_item_type,
                    item_name: res.item_name,
                    description: res.description,
                    quantity: res.quantity,
                    is_purchased: res.is_purchased,
                    priority_level: res.priority_level,
                    reminder_date: res.reminder_date,
                    price: res.price,
                    created_at: res.created_at,
                    updated_at: res.updated_at,
                    itemType: itemType,
                })
            );
            toast.show('Add item successfully', {
                type: 'success',
                duration: 3000,
                icon: <Material name='check' size={24} color='white' />,
            });
        } else {
            toast.show('Add item failed', {
                type: 'error',
                duration: 3000,
                icon: <Material name='close' size={24} color='white' />,
            });
        }

    }
    // const handleSubmit = async () => {
    //     Keyboard.dismiss()
    //     await handleRestore()
    //     console.log("inputName", inputName)
    //     console.log("pickIcon", pickIcon)
    //     if (inputName == '') {
    //         setErrorText('Please fill in all the fields')
    //         setShowError(true)
    //         return
    //     }
    //     else {
    //         const newShoppingListType: ShoppingListType = {
    //             id_shopping_list_type: Math.floor(Math.random() * 1000),
    //             type_name_en: inputName,
    //             type_name_vn: inputName,
    //             icon_url: pickIcon,
    //         }
    //         dispatch(addShoppingListType(newShoppingListType))
    //         bottomSheetRef.current?.close()



    //     }
    // }


    const fetchSuggestions = React.useCallback(async () => {
        setLoading(true)
        const response = await ShoppingListServices.getSuggestion({
            id_family: id_family,
            id_list: id_list,
            id_item: id_item,
        })
        if (response) {
            setDataSuggest(response)
            setLoading(false)
        }
        else {
            setLoading(false)
        }
    }, [id_family, id_item, id_list])
    const handleChangeIndexSheet = React.useCallback((index: number) => {
        if (index == 0) {
            fetchSuggestions()
            // setInputName('')
        } else {
            setDataSuggest([])
        }
    }, [])


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={true}
            enablePanDownToClose={loading ? false : true}
            // enableDynamicSizing={true}
            snapPoints={snapPoints}

            // handleComponent={null}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backgroundStyle={{
                backgroundColor: colorScheme === 'dark' ? '#0A1220' : '#F7F7F7',
            }}

            backdropComponent={renderBackdrop}
            keyboardBehavior='interactive'
            keyboardBlurBehavior='restore'
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                handleChangeIndexSheet(index)
            }}


        >

            <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220] '>
                <>
                    {
                        loading && <View className='flex-1 absolute w-full h-full bg-white opacity-50 z-10 items-center justify-center'>
                            <View className='items-center justify-center bg-black  rounded-lg'
                                style={{
                                    width: screenHeight * 0.1,
                                    height: screenHeight * 0.1,
                                }}
                            >
                                <ActivityIndicator size='small' color={'white'} />
                            </View>
                        </View>
                    }
                </>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

                    {
                        !loading && <View className='flex-1  mt-10'>
                            {
                                dataSuggest.length > 0 ? <>
                                    {
                                        dataSuggest.map((item, index) => {
                                            return <React.Fragment>
                                                <SuggestionItem
                                                    item={item} isDarkMode={colorScheme === 'dark' ? true : false}
                                                    handleSubmit={handleSubmit}
                                                />

                                            </React.Fragment>
                                        })
                                    }
                                </> : <>
                                    <View className='items-center justify-center'>
                                        <Image source={NewListImg} style={{
                                            width: screenWidth * 0.4,
                                            height: screenWidth * 0.4,
                                        }} />
                                    </View>
                                    <Text className='text-center text-base font-bold py-3'>No suggestion</Text>
                                </>
                            }

                        </View>
                    }
                    {/* <View>
                            {
                                showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
                            }
                        </View> */}

                    {/* <View className='items-end pr-3 my-3 mt-12 '>
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
                        </View> */}
                </BottomSheetScrollView>
            </View>

        </BottomSheet>
    )
}

const SuggestionItem = ({ item, isDarkMode, handleSubmit }: {
    item: {
        title: string;
        source: string;
        link?: string;
        price: string;
        delivery: string;
        imageUrl: string;
        position?: number;
    },
    isDarkMode: boolean,
    handleSubmit: ({ name, price }: { name: string, price: number }) => Promise<void>
}) => {
    return <TouchableOpacity className='flex-row mx-6 items-center my-2 py-3  bg-white dark:bg-[#252D3B] shadow-lg rounded-lg'
        onPress={() => {
            // handleNavigateProgress(item.id_education_progress)
        }}
    >

        <View className='flex-row items-center'>
            <View className='mx-4'>
                <Image
                    source={{
                        uri: item.imageUrl,
                        cache: 'default'
                    }}
                    style={{ width: ScreenHeight * 0.17, height: ScreenHeight * 0.17, borderRadius: 12 }}
                />
            </View>
            <View className='flex-1 mr-3 py-1 ' style={{
                height: ScreenHeight * 0.17,
                justifyContent: 'space-between'
            }}>
                <View className='justify-between flex-row'>
                    <View className='w-[80%]'>
                        <Text className='text-base text-[#DEC802] font-bold' numberOfLines={1}>{item.source}</Text>
                    </View>

                    <View className=''>
                        <Menu >
                            <MenuTrigger>
                                <Material name="dots-horizontal" size={ScreenHeight * 0.035} style={{ color: isDarkMode ? 'white' : '#434343', fontWeight: "bold" }} />
                            </MenuTrigger>
                            <MenuOptions customStyles={{
                                optionsContainer: {
                                    borderRadius: 10,
                                    marginTop: 24,
                                    backgroundColor: isDarkMode ? '#0A1220' : 'white',
                                },
                                optionWrapper: {
                                    padding: 10,
                                },
                            }} >
                                <MenuOption onSelect={async () => {
                                    await handleSubmit({ name: item.title, price: convertToNumberVND(item.price) })
                                }} >

                                    <View className='flex-row items-center justify-between'>
                                        <Text className='text-base' style={{ color: iOSColors.systemBlue.defaultLight }}>
                                            Add To List
                                        </Text>
                                        <Material name="pencil" size={20} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} />
                                    </View>
                                </MenuOption>
                                <Divider />
                                <MenuOption onSelect={async () => {
                                    // await handleShareEdu(item)
                                    item.link && Linking.openURL(item.link)
                                }} >
                                    <View className='flex-row items-center justify-between'>
                                        <Text className='text-base' style={{ color: iOSColors.systemBlue.defaultLight }}>
                                            View Detail
                                        </Text>
                                        <Material name="publish-off" size={20} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} />
                                    </View>

                                </MenuOption>
                                <Divider />
                            </MenuOptions>
                        </Menu>

                    </View>
                </View>
                <View className='flex-row items-center overflow-clip mr-5 '>
                    {/* <Material name="account-outline" size={ScreenHeight * 0.035} style={{
                        color: isDarkMode ? 'white' : '#2F2F34',
                        fontWeight: "bold"
                    }} /> */}
                    <Text className=' text-sm font-semibold dark:text-white ' numberOfLines={1} >{
                        item.title
                    }</Text>
                </View>
                <View className='flex-row items-center overflow-clip mr-5'>
                    {/* <Material name="town-hall" size={ScreenHeight * 0.035} style={{ color: isDarkMode ? 'white' : '#2F2F34', fontWeight: "bold" }} /> */}
                    <Text className=' text-sm text-[#9A9A9A]' numberOfLines={1}>{
                        item.price
                    }</Text>
                </View>
                <View className='flex-row items-center overflow-clip mr-5'>
                    {/* <Material name="note-outline" size={ScreenHeight * 0.035} style={{ color: isDarkMode ? 'white' : '#2F2F34', fontWeight: "bold" }} /> */}
                    <Text className=' text-sm text-[#9A9A9A]' numberOfLines={1}>{
                        item.delivery != "" ? item.delivery : 'Free delivery'
                    }</Text>
                </View>

            </View>

        </View>

    </TouchableOpacity >
}

export default SuggestItemSheet