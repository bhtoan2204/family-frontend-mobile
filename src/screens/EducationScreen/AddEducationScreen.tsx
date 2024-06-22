import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, Button, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, StyleSheet } from 'react-native'
import { AddEducationScreenProps, AddHouseHoldItemScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import FamilyImage from 'src/assets/images/household.png';
// import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
// import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
// import { household_category_dat } from './const/data';
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
// import AddHouseHoldItemInfoSheet from './AddHouseHoldItemInfoSheet/AddHouseHoldItemInfoSheet';
// import StepIndicator from './AddHouseHoldItemInfoSheet/StepIndicator';
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

import EduImage from 'src/assets/images/education_assets/add_edu.png';
import { addEducation } from 'src/redux/slices/EducationSlice';
import { Education } from 'src/interface/education/education';
import EducationServices from 'src/services/apiclient/EducationService';

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

const AddEducationScreen: React.FC<AddEducationScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    // const [rooms, setRooms] = React.useState(roomsData)
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    const rooms = useSelector((state: RootState) => state.room)
    const dispatch = useDispatch<AppDispatch>()
    const [step, setStep] = React.useState(0);
    const [householdName, setHouseholdName] = React.useState('')
    const [householdCategory, setHouseholdCategory] = React.useState(-1)
    const [householdRoom, setHouseholdRoom] = React.useState(-1)

    const [idUser, setIdUser] = React.useState<string>("")
    const [title, setTitle] = React.useState<string>("")
    const [progressNotes, setProgressNotes] = React.useState<string>("")
    const [schoolInfo, setSchoolInfo] = React.useState<string>("")

    const members = useSelector((state: RootState) => state.members)
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

    const onSetIdUser = (id: string) => {
        setIdUser(id)
    }
    const onSetTitle = (title: string) => {
        setTitle(title)
    }
    const onSetProgressNotes = (notes: string) => {
        setProgressNotes(notes)
    }
    const onSetSchoolInfo = (info: string) => {
        setSchoolInfo(info)
    }

    const handleAdd = async () => {
        console.log('add')
        // const newHouseholdItem: HouseHoldItemInterface = {
        //     id_family: id_family!,
        //     item_name: householdName,
        //     item_description: '',
        //     item_imageurl: '',
        //     id_category: householdCategory,
        //     id_household_item: Math.floor(Math.random() * 1000)
        // }
        // dispatch(addHouseholdItem(newHouseholdItem))
        const memberData = members.find(member => member.id_user === idUser)
        const res = await EducationServices.createEducation(
            id_family!,
            idUser,
            title,
            progressNotes,
            schoolInfo
        )
        if (res) {
            const newEducation: Education = {
                id_education_progress: res.id_education_progress,
                id_family: id_family!,
                id_user: idUser,
                created_at: res.created_at,
                updated_at: res.updated_at,
                title: res.title,
                progress_notes: res.progress_notes,
                school_info: res.school_info,
                subjects: [],
                user: {
                    avatar: memberData?.avatar || '',
                    birthdate: memberData?.birthdate || null,
                    firstname: memberData?.firstname || '',
                    lastname: memberData?.lastname || '',
                    genre: memberData?.genre || '',
                }
            }
            dispatch(addEducation(newEducation))
            navigation.goBack()
        } else {
            console.log("error")
            navigation.goBack();
        }
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
                            <TouchableOpacity style={{
                                // width: 35,
                                // height: 35
                                opacity: step === 0 ? 0 : 1
                            }} className='ml-2  z-10 ' disabled={step == 0} onPress={() => {
                                setStep((prev: number) => prev - 1)
                            }}>
                                <Material name="chevron-left" size={23} color={'black'} />
                            </TouchableOpacity>
                            {/* <Material name="package-variant" size={35} style={{ color: iOSGrayColors.systemGray6.accessibleDark, fontWeight: "bold" }} /> */}
                            <Image source={EduImage} style={{ width: 35, height: 35 }} />
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

                            }}>{
                                    step === 0
                                        ? 'New Item' :
                                        step === 1 ? 'Pick a member'
                                            : 'Give us more info'


                                }</Text>
                        </View>
                        {/* <Text>3-Step indicator here</Text> */}
                        <View className='w-full justify-center items-center my-3'>
                            <AddHouseholdStepIndicator currentStep={step} steps={steps} />
                        </View>
                        {
                            step === 0 && <Step1Component setStep={setStep} />
                        }
                        {
                            step === 1 && <Step2Component
                                setStep={setStep}
                                idUser={idUser}
                                onSetIdUser={onSetIdUser}
                            />
                        }
                        {
                            step === 2 && <Step3Component
                                setStep={setStep}
                                progress_notes={progressNotes}
                                onSetProgressNotes={onSetProgressNotes}
                                title={title}
                                onSetTitle={onSetTitle}
                                school_info={schoolInfo}
                                onSetSchoolInfo={onSetSchoolInfo}
                                handleAddEdu={handleAdd} navigationBack={navigationBack}

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
                <View className='mt-10 mx-10 items-center'>
                    {/* <Text className='text-2xl font-bold' style={{
                        color: iOSGrayColors.systemGray6.accessibleDark

                    }}>Great</Text> */}
                    <Text className='text-2xl font-bold text-center' style={{
                        color: iOSGrayColors.systemGray6.accessibleDark

                    }}>Let's add a progress on your member education</Text>
                </View>
                <View className='my-6 mx-6'>
                    <Text className='text-base text-center' style={{
                        color: iOSGrayColors.systemGray.defaultDark

                    }}>
                        You can add a progress of your member education to keep track of their learning journey

                    </Text>
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
            </View>
        </>
    )
}

const Step2Component = ({ setStep, idUser, onSetIdUser }: any) => {
    // const [text, setText] = React.useState(name || '')
    // const [isEmpty, setIsEmpty] = React.useState(0)
    const members = useSelector((state: RootState) => state.members)
    const [memberId, setMemberId] = React.useState<string>(idUser || '')

    // React.useEffect(() => {
    //     if (text.length == 0) {
    //         setIsEmpty(1)
    //     }

    // }, [text])



    return (
        <>
            <Animatable.View animation={"slideInRight"} duration={400} className=' flex  items-center flex-1 w-full '>
                <ScrollView className='flex-1 w-full h-full'>
                    <View className='flex-1 items-center content-center'>
                        {/* <View className='mb-6 mx-16' style={{}}>
                            <Text className='text-2xl font-bold  text-center' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark

                            }}>Pick a member</Text>
                        </View> */}
                        <View className='w-[90%] mt-6'>
                            {
                                members.map((member, index) => {
                                    return <React.Fragment key={index}>
                                        <TouchableOpacity className='w-[100%] bg-white my-1 px-2 py-5  rounded-lg' style={{
                                            borderColor: memberId === member.id_user ? iOSColors.systemBlue.defaultLight : iOSGrayColors.systemGray6.defaultLight,
                                            borderWidth: memberId === member.id_user ? 2 : 1,
                                        }} onPress={() => {
                                            if (memberId === member.id_user) {
                                                setMemberId('')
                                            } else {
                                                console.log(member.id_user)
                                                setMemberId(member.id_user)
                                            }
                                        }}>
                                            <View className='flex-row items-center justify-between'>
                                                <View className='flex-row items-center'>
                                                    <ImageComponent
                                                        defaultImage={EduImage}
                                                        className=''
                                                        imageUrl={member.avatar || ''}
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            borderRadius: 50
                                                        }}
                                                    />
                                                    <View className='w-[50%]'>
                                                        <Text style={{
                                                            color: iOSGrayColors.systemGray6.accessibleDark,
                                                            fontSize: 15,
                                                            fontWeight: 500,
                                                            marginLeft: 10
                                                        }}>{member.firstname} {member.lastname}</Text>
                                                    </View>
                                                </View>
                                                <View className='mr-2'>
                                                    <Material name="check-circle" size={24} color={memberId === member.id_user ? iOSColors.systemBlue.defaultLight : iOSGrayColors.systemGray6.defaultLight} />
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    </React.Fragment>
                                })
                            }
                        </View>

                        <Animatable.View animation={'fadeIn'} key={memberId} className='w-[55%] py-2 my-3'>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 12,
                                    elevation: 3,
                                    backgroundColor: memberId == '' ? '#EEECEC' : iOSColors.systemBlue.defaultLight,
                                }}
                                disabled={
                                    memberId == ''
                                }
                                onPress={() => {
                                    if (memberId == '') {
                                        // console.log('1')
                                        // onSetName(text)
                                    }
                                    else {
                                        onSetIdUser(memberId)
                                        setStep((prev: any) => prev + 1)
                                    }
                                }} className='py-2 mb-2 '>
                                <Text className='text-white text-base font-bold' style={{
                                    color: memberId == '' ? iOSColors.systemBlue.defaultLight : 'white'
                                }}>
                                    {
                                        memberId == '' ? 'Pick one' : 'Next'
                                    }

                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </ScrollView>

            </Animatable.View>
        </>
    )
}
const Step3Component = ({
    setStep,
    progress_notes,
    onSetProgressNotes,
    title,
    onSetTitle,
    school_info,
    onSetSchoolInfo,
    handleAddEdu,
    navigationBack }: any) => {
    // const roomPickRef = useRef<BottomSheet>(null);
    // const categoryPickRef = useRef<BottomSheet>(null);

    const titleInputRef = useRef<TextInput>(null)
    const descriptionInputRef = useRef<TextInput>(null)
    const schoolInfoInputRef = useRef<TextInput>(null)
    const [titleInput, setTitleInput] = React.useState(title || '')
    const [descriptionInput, setDescriptionInput] = React.useState(progress_notes || '')
    const [schoolInfoInput, setSchoolInfoInput] = React.useState(school_info || '')
    const [isTitleFocused, setIsTitleFocused] = React.useState(false)
    const [isDescriptionFocused, setIsDescriptionFocused] = React.useState(false)
    const [isSchoolInfoFocused, setIsSchoolInfoFocused] = React.useState(false)

    const dispatch = useDispatch<AppDispatch>()





    return (
        <>
            <Animatable.View animation={"slideInRight"} duration={400} className=' flex  flex-1 w-full'>
                <KeyboardAvoidingView
                    className='flex-1'
                    enabled={true}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView className='flex-1'
                        keyboardShouldPersistTaps={'handled'}
                        automaticallyAdjustKeyboardInsets
                    // automaticallyAdjustKeyboardInsets={true}
                    // automaticallyAdjustContentInsets={true}
                    // automaticallyAdjustsScrollIndicatorInsets={true}
                    >
                        <View className='mt-3'>

                        </View>
                        <TextInput
                            placeholder="Title of the progress, e.g. 'Math 101'"
                            ref={titleInputRef}
                            autoFocus
                            returnKeyType='next'
                            onFocus={() => {
                                setIsTitleFocused(true)
                            }}
                            onBlur={() => {
                                setIsTitleFocused(false)
                            }}
                            style={{
                                height: screenHeight * 0.08,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                margin: 10,
                                padding: 10,
                                paddingLeft: 16,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: iOSGrayColors.systemGray2.accessibleLight,
                                borderWidth: isTitleFocused ? 1 : 0,
                                borderColor: isTitleFocused ? iOSColors.systemBlue.defaultLight : 'transparent'
                            }}
                            value={title || ""}
                            onChangeText={(text) => {
                                onSetTitle(text)
                            }}
                            keyboardType='default'
                            keyboardAppearance='default'
                            onSubmitEditing={() => {
                                // dispatch(addRoom({
                                //     id_room: fakeId, room_name: text
                                // }))
                                // onAddRoom ? ({
                                //     id_room: Math.random(), room_name: text
                                // })
                                // navigation.goBack()
                                descriptionInputRef.current?.focus()
                            }}
                            clearButtonMode="always"
                        />
                        <TextInput
                            className=' transition-all duration-300 ease-in-out'
                            placeholder="Progress notes (optional)"
                            ref={descriptionInputRef}
                            returnKeyType='next'
                            onFocus={() => {
                                setIsDescriptionFocused(true)
                            }}
                            onBlur={() => {
                                setIsDescriptionFocused(false)
                            }}
                            style={{
                                height: screenHeight * 0.08,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                margin: 10,
                                padding: 10,
                                paddingLeft: 16,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: iOSGrayColors.systemGray2.accessibleLight,
                                borderWidth: isDescriptionFocused ? 1 : 0,
                                borderColor: isDescriptionFocused ? iOSColors.systemBlue.defaultLight : 'transparent'

                            }}
                            value={progress_notes || ""}
                            onChangeText={(text) => {
                                onSetProgressNotes(text)
                            }}
                            keyboardType='default'
                            keyboardAppearance='default'
                            onSubmitEditing={async () => {
                                schoolInfoInputRef.current?.focus()
                            }}
                            clearButtonMode="always"
                        />
                        <TextInput
                            className='transition-all duration-300 ease-in-out'
                            placeholder="Add school name or other information (optional)"
                            ref={schoolInfoInputRef}
                            returnKeyType='done'
                            onFocus={() => {
                                setIsSchoolInfoFocused(true)
                            }}
                            onBlur={() => {
                                setIsSchoolInfoFocused(false)
                            }}
                            style={{
                                height: screenHeight * 0.08,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                margin: 10,
                                padding: 10,
                                paddingLeft: 16,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: iOSGrayColors.systemGray2.accessibleLight,
                                borderWidth: isSchoolInfoFocused ? 1 : 0,
                                borderColor: isSchoolInfoFocused ? iOSColors.systemBlue.defaultLight : 'transparent'

                            }}
                            value={school_info || ""}
                            onChangeText={(text) => {
                                onSetSchoolInfo(text)
                            }}
                            keyboardType='default'
                            keyboardAppearance='default'
                            onSubmitEditing={async () => {
                                await handleAddEdu()
                            }}
                            clearButtonMode="always"
                        />


                        <View className='flex-1 mt-2 h-20 justify-center items-center' >
                            <TouchableOpacity activeOpacity={0.65} disabled={
                                title.length == 0
                            } className='w-[50%] items-center py-4 rounded-lg' style={{

                                backgroundColor: title.length == 0 ? iOSGrayColors.systemGray.accessibleDark : iOSColors.systemBlue.defaultLight,
                            }} onPress={async () => {
                                await handleAddEdu()
                            }}>
                                <Text className='text-base text-white font-medium'>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </Animatable.View>

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
export default AddEducationScreen