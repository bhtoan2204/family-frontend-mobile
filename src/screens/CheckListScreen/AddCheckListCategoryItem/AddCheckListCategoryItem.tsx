import React from 'react'

import { Dimensions, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput, Switch, Platform } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Education } from 'src/interface/education/education'
import { Member } from 'src/interface/member/member'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import ImageComponent from 'src/components/Image/Image'
import FamilyImage from 'src/assets/images/default_ava.png'
import { CheckListCategoryInterface } from 'src/interface/checklist/checklist'
import { checklist_category_type } from '../constant/checklist_category_type'
import { shoppingListItemColor, shoppingListItemColorInside } from '../constant/color'
import { TimePickerSheet } from '../AddItemCheckListSheet'
import { AppDispatch } from 'src/redux/store'
import { useDispatch } from 'react-redux'
import { addNewCheckListItem } from 'src/redux/slices/CheckListSlice'
const sheetIndex = [
    {
        id: 0,
        title: "main"
    },
    {
        id: 1,
        title: "pick_member",
    },
    {
        id: 2,
        title: "progress_note",
    },
    {
        id: 3,
        title: "school_info",
    },
]

const AddCheckListCategoryItem = ({ bottomSheetRef, id_family }: {
    bottomSheetRef: React.RefObject<any>, id_family: number
}) => {
    const timePickerSheetRef = React.useRef<any>(null)
    const [choosenCategory, setChoosenCategory] = React.useState<number | undefined>(undefined)
    const [inputProgressNote, setInputProgressNote] = React.useState<string>("")
    const [inputSchoolInfo, setInputSchoolInfo] = React.useState<string>("")
    const [inputProgressNote2, setInputProgressNote2] = React.useState<string>("")
    const [inputSchoolInfo2, setInputSchoolInfo2] = React.useState<string>("")
    const [pickSheetIndex, setPickSheetIndex] = React.useState<number>(0)
    const [dueDate, setDueDate] = React.useState<Date | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const inputDescriptionRef = React.useRef<TextInput>(null)

    const buildDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }


    const showHeader = () => {
        if (pickSheetIndex == 0) {
            return <View className='w-full  flex-row justify-between items-center py-4 z-10 ' >
                <TouchableOpacity
                    onPress={() => {
                        bottomSheetRef.current?.close()
                        setChoosenCategory(6)
                        setInputProgressNote("")
                        setInputSchoolInfo("")
                    }}
                ><Text className='text-blue-600 text-base pl-4'>Cancel</Text>
                </TouchableOpacity>

                <View>
                    <Text className='text-base font-semibold'>Add ShoppingList</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    const newCheckListCategory: CheckListCategoryInterface = {
                        id: Math.floor(Math.random() * 1000),
                        id_item_type: choosenCategory!,
                        completed: 0,
                        total: 0,
                        category_name: checklist_category_type.find((item) => item.id_item_type == choosenCategory)?.item_type_name,
                        id_family: id_family,
                        createdAt: new Date(),
                        title: inputProgressNote,
                        checklistItems: []
                    }
                    // setCheckList((prev) => {
                    //     return [
                    //         ...prev,
                    //         newCheckListCategory
                    //     ]
                    // })
                    dispatch(addNewCheckListItem(newCheckListCategory))

                    // setMemberEducationDatas((prev) => {
                    //     return [
                    //         ...prev,
                    //         newEdu
                    //     ]
                    // })
                    bottomSheetRef.current?.close()


                }} className='pr-4 disabled:text-gray-600 text-blue-600' >
                    <Text className=' text-base font-semibold ' >Add</Text>
                </TouchableOpacity>
            </View>
        } else if (pickSheetIndex == 1) {
            return <View className='w-full  flex-row justify-between items-center py-4 z-10 ' >
                <TouchableOpacity
                    onPress={() => {
                        setPickSheetIndex(0)
                    }}
                ><Text className='text-blue-600 text-base pl-4'>Cancel</Text>
                </TouchableOpacity>

                <View>
                    <Text className='text-base font-semibold'>Choose member</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    // setChoosenMember(
                    //     members.find((item) => item.email == choosenMemberId)
                    // )
                    setPickSheetIndex(0)
                }} className='pr-4 disabled:text-gray-600 text-blue-600' >
                    <Text className=' text-base font-semibold ' >Done</Text>
                </TouchableOpacity>
            </View>
        } else if (pickSheetIndex == 2) {
            return <View className='w-full  flex-row justify-between items-center py-4 z-10 ' >
                <TouchableOpacity
                    onPress={() => {
                        setPickSheetIndex(0)
                        setInputProgressNote2("")
                    }}
                ><Text className='text-blue-600 text-base pl-4'>Cancel</Text>
                </TouchableOpacity>

                <View>
                    <Text className='text-base font-semibold'>Input title</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    setInputProgressNote(inputProgressNote2)
                    setPickSheetIndex(0)
                }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={inputProgressNote2 == ""} >
                    <Text className=' text-base font-semibold ' >Done</Text>
                </TouchableOpacity>
            </View>
        } else if (pickSheetIndex == 3) {
            return <View className='w-full  flex-row justify-between items-center py-4 z-10 ' >
                <TouchableOpacity
                    onPress={() => {
                        setPickSheetIndex(0)
                        setInputSchoolInfo2("")
                        timePickerSheetRef.current?.close()
                    }}
                ><Text className='text-blue-600 text-base pl-4'>Cancel</Text>
                </TouchableOpacity>

                <View>
                    <Text className='text-base font-semibold'>Pick time</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    setInputSchoolInfo(inputSchoolInfo2)
                    setPickSheetIndex(0)
                }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={inputSchoolInfo2 == ""}>
                    <Text className=' text-base font-semibold ' >Done</Text>
                </TouchableOpacity>
            </View>
        }
    }

    const showContentIndex = () => {
        if (pickSheetIndex == 0) {
            return <View className='p-4'>
                <View className='bg-white rounded-lg'>
                    <TouchableOpacity className='w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 rounded-tl-lg rounded-tr-lg'
                        onPress={() => { setPickSheetIndex(1) }}
                    >
                        <Text className='ml-2 text-[#8F8E90] font-medium text-base'>Pick category</Text>
                        <View className='flex-row items-center'>
                            <Text className='mr-2 text-[#8F8E90] font-medium text-base' style={{
                                color: choosenCategory ? shoppingListItemColor[choosenCategory - 1] : "#8F8E90",
                                fontWeight: choosenCategory ? "bold" : "normal"
                            }}>{
                                    choosenCategory ?
                                        checklist_category_type.find((item) => item.id_item_type == choosenCategory)?.item_type_name
                                        : "Choose category"
                                }</Text>
                            <View className='justify-self-end'>
                                <Material name="chevron-right" size={24} color={"#8F8E90"} />

                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 '
                        onPress={() => { setPickSheetIndex(2) }}
                    >
                        <Text className='ml-2 text-[#8F8E90] font-medium text-base'>Title</Text>
                        <View className='flex-row items-center'>
                            {
                                inputProgressNote == "" ? <Text className='mr-2 text-[#8F8E90] font-medium text-base'>Title</Text> : <Text className='mr-2 text-[#8F8E90] font-medium text-base w-24 ' numberOfLines={1} style={{ textAlign: 'right' }}>{inputProgressNote}</Text>
                            }
                            <View className='justify-self-end'>
                                <Material name="chevron-right" size={24} color={"#8F8E90"} />

                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className='w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-[#ccc]  px-2 py-3 rounded-bl-lg rounded-br-lg'
                        onPress={() => {
                            // setPickSheetIndex(3)
                            timePickerSheetRef.current?.open()

                        }}
                    >
                        <Text className='ml-2 text-[#8F8E90] font-medium text-base'>Pick Time </Text>
                        <View className='flex-row items-center'>
                            {
                                dueDate == null ? <Text className='mr-2 text-[#8F8E90] font-medium text-base'>Date</Text> : <Text className='mr-2 text-[#8F8E90] font-medium text-base w-24 ' numberOfLines={1} style={{ textAlign: 'right' }}>{buildDate(dueDate!)}</Text>
                            }
                            <View className='justify-self-end'>
                                <Material name="chevron-right" size={24} color={"#8F8E90"} />

                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <View className='bg-white rounded-lg mt-10 border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-[#ccc] border-[0.5px]  px-2 py-3'>
                    <Text className='ml-2 text-[#F93E3E] font-medium text-base text-center'>Delete this member </Text>
                </View> */}
            </View>
        } else if (pickSheetIndex == 1) {
            return <View className='p-4'>
                <View className='bg-white rounded-lg'>
                    {
                        checklist_category_type.map((item, index) => {
                            return <TouchableOpacity key={index} className={index == 0 ? 'w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 rounded-tl-lg rounded-tr-lg' : index == checklist_category_type.length - 1 ? 'w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 ' : 'w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 '}
                                onPress={() => { setChoosenCategory(item.id_item_type) }}
                            >
                                <View className='ml-2'>
                                    {/* <ImageComponent imageUrl={item.avatar || ""} style={{ width: 30, height: 30 }} defaultImage={FamilyImage} className='rounded-sm ' /> */}
                                    <View className='rounded-full ' style={{
                                        width: 30, height: 30,
                                        backgroundColor: shoppingListItemColor[item.id_item_type - 1]


                                    }} >

                                    </View>
                                </View>
                                {/* <Text className='ml-2 text-[#8F8E90] font-medium text-base'>Aha</Text> */}
                                <View className='flex-row items-center'>
                                    <Text className='mr-2 text-[#8F8E90] font-medium text-base'>{
                                        item.item_type_name
                                    }</Text>
                                    <View className='justify-self-end'>
                                        {
                                            item.id_item_type == choosenCategory && <Material name="check" size={24} color={"#49CC90"} />
                                        }

                                    </View>
                                </View>
                            </TouchableOpacity>
                        })
                    }


                </View>

            </View>
        } else if (pickSheetIndex == 2) {
            return <View className='p-4'>
                <View className='bg-white rounded-lg'>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 5,
                            // marginBottom: 20,
                            fontSize: 17,
                            padding: 17,
                        }}
                        ref={inputDescriptionRef}
                        editable
                        placeholder="Input title"
                        value={inputProgressNote2}
                        onChangeText={(text) => setInputProgressNote2(text)}
                        className='bg-white'
                        autoFocus
                    />


                </View>

            </View>
        } else if (pickSheetIndex == 3) {
            return <View className='p-4'>


            </View>
        }
    }

    return (
        <RBSheet
            ref={bottomSheetRef}
            closeOnPressBack
            closeOnPressMask
            customStyles={{
                container: {
                    backgroundColor: "#F2F1F6",
                    height: Platform.OS == 'ios' ? Dimensions.get('window').height * 1 : Dimensions.get('window').height * 0.8,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                wrapper: {
                    backgroundColor: Platform.OS == 'ios' ? 'transparent' : undefined
                },
                draggableIcon: {
                    backgroundColor: '#CDCDCC',
                },
            }}

            customModalProps={{
                animationType: 'slide',
                presentationStyle: Platform.OS == 'ios' ? 'formSheet' : undefined,
                transparent: Platform.OS == 'ios' ? false : undefined,
                statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
                enabled: false,
            }}

            onClose={() => {
                setPickSheetIndex(0)
                setChoosenCategory(6)
                setInputProgressNote("")
                setInputSchoolInfo("")
                timePickerSheetRef.current?.close()
                setDueDate(null)
            }}
        >
            <View className='flex-1 '>
                {showHeader()}
                <KeyboardAvoidingView className="flex-1 " behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={true} className='flex-1 ' keyboardShouldPersistTaps="handled" >
                        {/* <View className='p-4'>
                            <View className='bg-white rounded-lg'>
                                <TouchableOpacity className='w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 rounded-tl-lg rounded-tr-lg'
                                    onPress={() => { setPickSheetIndex(1) }}
                                >
                                    <Text className='ml-2 text-[#8F8E90] font-medium text-base'>Member</Text>
                                    <View className='flex-row items-center'>
                                        <Text className='mr-2 text-[#8F8E90] font-medium text-base'>{
                                            choosenMember ? choosenMember.firstname + " " + choosenMember.lastname : "Choose member"
                                        }</Text>
                                        <View className='justify-self-end'>
                                            <Material name="chevron-right" size={24} color={"#8F8E90"} />

                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity className='w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 '
                                    onPress={() => { setPickSheetIndex(2) }}
                                >
                                    <Text className='ml-2 text-[#8F8E90] font-medium text-base'>Note</Text>
                                    <View className='flex-row items-center'>
                                        <Text className='mr-2 text-[#8F8E90] font-medium text-base'>Progress note</Text>
                                        <View className='justify-self-end'>
                                            <Material name="chevron-right" size={24} color={"#8F8E90"} />

                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity className='w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 '
                                    onPress={() => { setPickSheetIndex(3) }}
                                >
                                    <Text className='ml-2 text-[#8F8E90] font-medium text-base'>School Info</Text>
                                    <View className='flex-row items-center'>
                                        <Text className='mr-2 text-[#8F8E90] font-medium text-base'>School Info</Text>
                                        <View className='justify-self-end'>
                                            <Material name="chevron-right" size={24} color={"#8F8E90"} />

                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity className='w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-[#ccc]  px-2 py-3 rounded-bl-lg rounded-br-lg'>
                                    <Text className='ml-2 text-[#8F8E90] font-medium text-base'>Done </Text>
                                    <View className='flex-row items-center mr-2'>
                                        <Switch
                                            trackColor={{ false: '#DDDDDD', true: '#36CF56' }}
                                            thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                                            ios_backgroundColor="#DDDDDD"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}

                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View className='bg-white rounded-lg mt-10 border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-[#ccc] border-[0.5px]  px-2 py-3'>
                                <Text className='ml-2 text-[#F93E3E] font-medium text-base text-center'>Delete this member </Text>
                            </View>
                        </View> */}
                        {showContentIndex()}
                    </ScrollView>
                </KeyboardAvoidingView>
                <TimePickerSheet refRBSheet={timePickerSheetRef} setSave={setDueDate} initialValue={dueDate} />
            </View>

        </RBSheet>
    )
}

export default AddCheckListCategoryItem