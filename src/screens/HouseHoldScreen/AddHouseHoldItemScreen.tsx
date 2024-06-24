import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, Button, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, StyleSheet } from 'react-native'
import { AddHouseHoldItemScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import FamilyImage from 'src/assets/images/household.png';
import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
import { household_category_dat } from './const/data';
import HouseHoldFilterBar from 'src/components/user/household/household-filter-bar';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import useImageValid from 'src/hooks/useImageValid';
import BoxImage from 'src/assets/images/household_assets/box.png';
import InfoIcon from 'src/assets/images/household_assets/info.png';
import BillsIcon from 'src/assets/images/household_assets/bills.png';
import CategoryIcon from 'src/assets/images/household_assets/category.png';
import ImageIcon from 'src/assets/images/household_assets/image.png';
import RoomIcon from 'src/assets/images/household_assets/room.png';
import ReceiptImage from 'src/assets/images/household_assets/receipt.png';
import AddHouseHoldItemInfoSheet from './AddHouseHoldItemInfoSheet/AddHouseHoldItemInfoSheet';
import StepIndicator from './AddHouseHoldItemInfoSheet/StepIndicator';
import AddHouseholdStepIndicator from 'src/components/user/household/add-household-step-indicator';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddHouseHoldItemStep1Sheet from 'src/components/user/household/add-household-item-step1-sheet';
import * as Animatable from 'react-native-animatable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddHouseHoldItemPickRoomSheet from 'src/components/user/household/add-household-item-pickroomsheet';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { clearRoom, setRoom } from 'src/redux/slices/RoomSlice';
import AddHouseHoldItemPickCategorySheet from 'src/components/user/household/add-household-item-pickcategorysheet';
import { addHouseholdItem } from 'src/redux/slices/HouseHoldSlice';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';

const household_items = [
    {
        "id_household_item": 4,
        "id_family": 96,
        "item_name": "Máy giặt",
        "item_description": "máy giặt toshiba nhà tao",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451417048",
        "id_category": 1
    },
    {
        "id_household_item": 5,
        "id_family": 96,
        "item_name": "Hủ muối tiêu",
        "item_description": "ai mà ăn muối tiêu chanh này sẽ bị ám suốt đời",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451468168",
        "id_category": 1
    },

    {
        "id_household_item": 10,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454576319",
        "id_category": 1
    },
    {
        "id_household_item": 11,
        "id_family": 96,
        "item_name": "eulaaaaa",
        "item_description": "đây là bé eula dễ thương",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713502246879",
        "id_category": 1
    },
    {
        "id_household_item": 13,
        "id_family": 96,
        "item_name": "Adudu",
        "item_description": "lalala",
        "item_imageurl": null,
        "id_category": 2
    }
]

const steps = [
    {
        title: "Step 0",
        description: "Intro"
    },
    {
        title: "Step 1",
        description: "Item add"
    },
    {
        title: "Step 2",
        description: "Enter brand"
    },
    {
        title: "Step 3",
        description: "Enter receipt",
    }

]

const roomsData = [
    {
        id_room: 2,
        room_name: "Living Room"
    }
]
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const AddHouseHoldItemScreen: React.FC<AddHouseHoldItemScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    // const [rooms, setRooms] = React.useState(roomsData)
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    const rooms = useSelector((state: RootState) => state.room)
    const dispatch = useDispatch<AppDispatch>()
    const [step, setStep] = React.useState(0);
    const [householdName, setHouseholdName] = React.useState('')
    const [householdCategory, setHouseholdCategory] = React.useState(-1)
    const [householdRoom, setHouseholdRoom] = React.useState(-1)

    const onSetName = (name: string) => {
        setHouseholdName(name)
    }

    const onSetCategory = (category: number) => {
        console.log("category ", category)
        setHouseholdCategory(category)
    }

    const onSetRoom = (room: number) => {
        console.log("room ", room)
        setHouseholdRoom(room)
    }

    const handleAdd = async () => {
        console.log('add')
        const newHouseholdItem: HouseHoldItemInterface = {
            id_family: id_family!,
            item_name: householdName,
            description: '',
            item_imageurl: '',
            id_category: householdCategory,
            id_household_item: Math.floor(Math.random() * 1000)
        }
        dispatch(addHouseholdItem(newHouseholdItem))
    }

    const navigationBack = () => {
        navigation.goBack()
    }
    React.useEffect(() => {
        console.log("a")
        dispatch(setRoom(roomsData))
        return () => {
            dispatch(clearRoom())
        }
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1]">
            <View className='bg-[#F9F6F2] pt-8 rounded-tl-xl rounded-tr-xl flex-1' >
                <TouchableOpacity activeOpacity={1} className='flex-1' onPress={() => {
                    Keyboard.dismiss()
                }}>

                    <View className='flex-1'>
                        <View className='w-full items-center mt-5 flex-row justify-between '>
                            <View style={{
                                width: 35,
                                height: 35
                            }}></View>
                            <Material name="package-variant" size={35} style={{ color: iOSGrayColors.systemGray6.accessibleDark, fontWeight: "bold" }} />
                            <TouchableOpacity className=' rounded-full border-[1px] z-10 mr-2' style={{
                                borderColor: iOSGrayColors.systemGray.accessibleDark,
                                backgroundColor: iOSGrayColors.systemGray.accessibleLight
                            }} onPress={() => {
                                navigation.goBack()
                            }} >
                                <Material name="close" size={23} color={'white'} />
                            </TouchableOpacity>
                        </View>
                        <View className='content-center my-2'>
                            <Text className='text-center' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 20,
                                fontWeight: 'bold'

                            }}>New item</Text>
                        </View>
                        {/* <Text>3-Step indicator here</Text> */}
                        <View className='w-full justify-center items-center my-3'>
                            <AddHouseholdStepIndicator currentStep={step} steps={steps} />
                        </View>
                        {
                            step === 0 && <Step1Component setStep={setStep} />
                        }
                        {
                            step === 1 && <Step2Component setStep={setStep} name={householdName} onSetName={onSetName} />
                        }
                        {
                            step === 2 && <Step3Component setStep={setStep} rooms={rooms} onNavigateCreateRoom={
                                () => {
                                    navigation.navigate('AddHouseHoldRoom', {
                                        id_family: id_family,
                                    })
                                }
                            } room={householdRoom} category={householdCategory} onSetRoom={onSetRoom} onSetCategory={onSetCategory} handleAdd={handleAdd} navigationBack={navigationBack}

                            />
                        }

                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const Step1Component = ({ setStep }: any) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    return (
        <>
            <View className=' flex  items-center flex-1'>
                <View className='mt-10 items-center'>
                    <Text className='text-2xl font-bold' style={{
                        color: iOSGrayColors.systemGray6.accessibleDark

                    }}>Great</Text>
                    <Text className='text-2xl font-bold' style={{
                        color: iOSGrayColors.systemGray6.accessibleDark

                    }}>Lets add an item</Text>
                </View>
                <View className='my-3'>
                    <Text className='text-lg' style={{
                        color: iOSGrayColors.systemGray.defaultDark

                    }}>It only takes a few minutes</Text>
                </View>
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    elevation: 3,
                    backgroundColor: iOSColors.systemBlue.defaultLight,
                }} onPress={() => {
                    setStep((prev: any) => prev + 1)
                }} className='w-[45%] py-2'>
                    <Text className='text-white text-base font-bold'>Let's start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    elevation: 3,
                }} onPress={() => {
                    // console.log(1)
                    bottomSheetRef.current?.expand()
                }} className='w-[45%] py-2 mt-6'>
                    <Text className='text-sm font-bold' style={{
                        color: iOSColors.systemBlue.defaultLight
                    }} >Why should i do this</Text>
                </TouchableOpacity>

            </View>
            <AddHouseHoldItemStep1Sheet refRBSheet={bottomSheetRef} />
        </>
    )
}

const Step2Component = ({ setStep, name, onSetName }: any) => {
    const [text, setText] = React.useState(name || '')
    const [isEmpty, setIsEmpty] = React.useState(0)

    React.useEffect(() => {
        if (text.length == 0) {
            setIsEmpty(1)
        }

    }, [text])



    return (
        <>
            <Animatable.View animation={"slideInRight"} duration={400} className=' flex  items-center flex-1 w-full '>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} className='flex-1'>
                    <View className='flex-1 mt-24 items-center w-full h-full content-center'>
                        <View className='mb-6 mx-16' style={{}}>
                            <Text className='text-2xl font-bold  text-center' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark

                            }}>Name of the item you want to add?</Text>
                        </View>
                        <TextInput
                            style={{
                                width: '90%',
                                fontSize: 18,
                                backgroundColor: 'white',
                                borderRadius: 12,

                            }}
                            className='mb-6 py-5 pl-5 font-bold'
                            value={text}
                            placeholder='TV, Heat pump, Dishwasher, etc...'
                            onChangeText={(text) => {
                                setText(text)
                                // onSetName(text)
                            }}
                        />
                        <Animatable.View animation={text.length == 0 || text.length == 1 ? 'fadeIn' : undefined} key={text} className='w-[55%] py-2 mb-2 '>
                            <TouchableOpacity style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 12,
                                elevation: 3,
                                backgroundColor: text == '' ? '#EEECEC' : iOSColors.systemBlue.defaultLight,
                            }} onPress={() => {
                                if (text == '') {
                                    // console.log('1')
                                    // onSetName(text)
                                }
                                else {
                                    onSetName(text)
                                    setStep((prev: any) => prev + 1)
                                }
                            }} className='py-2 mb-2 '>
                                <Text className='text-white text-base font-bold' style={{
                                    color: text == '' ? iOSColors.systemBlue.defaultLight : 'white'
                                }}>
                                    {
                                        text == '' ? 'Show suggestions' : 'Next'
                                    }

                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </KeyboardAvoidingView>

            </Animatable.View>
        </>
    )
}
const Step3Component = ({ setStep, rooms, onNavigateCreateRoom, room, category, onSetRoom, onSetCategory, handleAdd, navigationBack }: any) => {
    const roomPickRef = useRef<BottomSheet>(null);
    const categoryPickRef = useRef<BottomSheet>(null);

    const dispatch = useDispatch<AppDispatch>()

    const findRoomText = (id: number) => {
        return rooms.find((room: any) => room.id_room === id)?.room_name
    }
    const findCategoryText = (id: number) => {
        return household_category_dat.find((category: any) => category.id_category === id)?.category_name
    }


    return (
        <>
            <Animatable.View animation={"slideInRight"} duration={400} className=' flex justify-center items-center flex-1 w-full'>
                <View className='flex-1   items-center w-full h-full content-center'>
                    <View className='my-6 mx-16' style={{}}>
                        <Text className='text-xl font-bold  text-center' style={{
                            color: iOSGrayColors.systemGray6.accessibleDark

                        }}>Pick room and category</Text>
                    </View>
                    <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
                        height: screenHeight * 0.1,
                        width: screenWidth * 0.9,
                        borderWidth: category != -1 ? 2 : 0,
                        borderColor: iOSColors.systemBlue.defaultLight,
                    }} onPress={() => {
                        categoryPickRef.current?.expand()
                    }}>
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row px-4 items-center '>
                                <Image source={CategoryIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                <Text className='pl-4 text-base'>Category</Text>
                            </View>
                            <View className='mr-4'>
                                <Text style={{
                                    color: category == -1 ? iOSGrayColors.systemGray3.defaultLight : iOSColors.systemBlue.defaultLight,
                                    fontSize: 15,
                                    fontWeight: 500

                                }}>{
                                        category == -1 ? "Choose room" : findCategoryText(category)
                                    }</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
                        height: screenHeight * 0.1,
                        width: screenWidth * 0.9,
                        borderWidth: room != -1 ? 2 : 0,
                        borderColor: iOSColors.systemBlue.defaultLight,
                    }} onPress={() => {
                        roomPickRef.current?.expand()
                    }}>
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row px-4 items-center '>
                                <Image source={RoomIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                <Text className='pl-4 text-base'>Choose room</Text>
                            </View>
                            <View className='mr-4'>
                                <Text style={{
                                    color: room == -1 ? iOSGrayColors.systemGray3.defaultLight : iOSColors.systemBlue.defaultLight,
                                    fontSize: 15,
                                    fontWeight: 500

                                }}>{
                                        room == -1 ? "Choose" : findRoomText(room)
                                    }</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                        room != -1 && category != -1 && <Animatable.View
                            animation={
                                room != -1 && category != -1 ? 'fadeIn' : undefined
                            }
                            duration={400}
                            className='w-[55%] py-2 mb-2 '

                        >
                            <TouchableOpacity style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 12,
                                elevation: 3,
                                backgroundColor: iOSColors.systemBlue.defaultLight,
                            }} onPress={async () => {
                                await handleAdd()
                                navigationBack()
                                // setStep((prev: any) => prev + 1)
                            }} className='py-2 my-3 '>
                                <Text className='text-white text-base font-bold' style={{
                                    color: 'white'
                                }}>
                                    Add

                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    }
                </View>

            </Animatable.View>
            <AddHouseHoldItemPickCategorySheet refRBSheet={categoryPickRef} category={category} onSetCategory={onSetCategory} />
            <AddHouseHoldItemPickRoomSheet refRBSheet={roomPickRef} roomsData={rooms} onNavigateCreateRoom={onNavigateCreateRoom} room={room} onSetRoom={onSetRoom} />
        </>
    )
}
const styles = StyleSheet.create({
    receipt: {
        height: screenHeight * 0.12
    },
    item: {
        height: screenHeight * 0.1,
        width: screenWidth * 0.9,
    }
})
export default AddHouseHoldItemScreen