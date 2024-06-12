import React from 'react'

import { Dimensions, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput, Switch, Platform } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Education } from 'src/interface/education/education'
import { Member } from 'src/interface/member/member'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import ImageComponent from 'src/components/Image/Image'
import FamilyImage from 'src/assets/images/default_ava.png'
import * as Animatable from 'react-native-animatable'
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

const AddMemberEducationSheet = ({ bottomSheetRef, setMemberEducationDatas, members }: { bottomSheetRef: React.RefObject<any>, setMemberEducationDatas: React.Dispatch<React.SetStateAction<Education[]>>, members: Member[] }) => {
    const [choosenMember, setChoosenMember] = React.useState<Member | undefined>(undefined)
    const [choosenMemberId, setChoosenMemberId] = React.useState<string>("")
    const [inputProgressNote, setInputProgressNote] = React.useState<string>("")
    const [inputSchoolInfo, setInputSchoolInfo] = React.useState<string>("")
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [inputProgressNote2, setInputProgressNote2] = React.useState<string>("")
    const [inputSchoolInfo2, setInputSchoolInfo2] = React.useState<string>("")
    const [startAnimation, setStartAnimation] = React.useState<boolean>(false)

    const [pickSheetIndex, setPickSheetIndex] = React.useState<number>(0)

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const inputDescriptionRef = React.useRef<TextInput>(null)

    React.useEffect(() => {
        if (choosenMember != null) {
            setChoosenMemberId(choosenMember.email)
        } else {
            setChoosenMemberId("")
        }

    }, [choosenMember])



    const showHeader = () => {
        if (pickSheetIndex == 0) {
            return <Animatable.View animation={"slideInLeft"} duration={400} className='w-full  flex-row justify-between items-center py-4 z-10 ' >
                <TouchableOpacity
                    onPress={() => {
                        bottomSheetRef.current?.close()
                        setChoosenMemberId("")
                        setInputProgressNote("")
                        setInputSchoolInfo("")
                        setChoosenMember(undefined)
                    }}
                ><Text className='text-blue-600 text-base pl-4'>Cancel</Text>
                </TouchableOpacity>

                <View>
                    <Text className='text-base font-semibold'>Add Member</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    const newEdu: Education = {
                        id_education_progress: 0,
                        id_user: choosenMember!.id_user,
                        title: "",
                        progress_notes: inputProgressNote,
                        school_info: inputSchoolInfo,
                        created_at: "",
                        updated_at: "",
                        avatar: choosenMember?.avatar,
                        firstname: choosenMember!.firstname,
                        lastname: choosenMember!.lastname,
                        // status: isEnabled ? "done" : "in_progress"
                    }
                    console.log(newEdu)
                    setMemberEducationDatas((prev) => {
                        return [
                            ...prev,
                            newEdu
                        ]
                    })
                    bottomSheetRef.current?.close()


                }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={
                    choosenMember == null || choosenMember == undefined || choosenMemberId == ""
                }>
                    <Text className=' text-base font-semibold ' >Add</Text>
                </TouchableOpacity>
            </Animatable.View>
        } else if (pickSheetIndex == 1) {
            return <Animatable.View animation={"slideInRight"} duration={400} className='w-full  flex-row justify-between items-center py-4 z-10 ' >
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
                    setChoosenMember(
                        members.find((item) => item.email == choosenMemberId)
                    )
                    setPickSheetIndex(0)
                }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={choosenMemberId == null || choosenMemberId == ""}>
                    <Text className=' text-base font-semibold ' >Done</Text>
                </TouchableOpacity>
            </Animatable.View>
        } else if (pickSheetIndex == 2) {
            return <Animatable.View animation={"slideInRight"} duration={400} className='w-full  flex-row justify-between items-center py-4 z-10 ' >
                <TouchableOpacity
                    onPress={() => {
                        setPickSheetIndex(0)
                        setInputProgressNote2("")
                    }}
                ><Text className='text-blue-600 text-base pl-4'>Cancel</Text>
                </TouchableOpacity>

                <View>
                    <Text className='text-base font-semibold'>Input progress note</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    setInputProgressNote(inputProgressNote2)
                    setPickSheetIndex(0)
                }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={inputProgressNote2 == ""} >
                    <Text className=' text-base font-semibold ' >Done</Text>
                </TouchableOpacity>
            </Animatable.View>
        } else if (pickSheetIndex == 3) {
            return <Animatable.View animation={"slideInRight"} duration={400} className='w-full  flex-row justify-between items-center py-4 z-10 ' >
                <TouchableOpacity
                    onPress={() => {
                        setPickSheetIndex(0)
                        setInputSchoolInfo2("")
                    }}
                ><Text className='text-blue-600 text-base pl-4'>Cancel</Text>
                </TouchableOpacity>

                <View>
                    <Text className='text-base font-semibold'>Input school info</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    setInputSchoolInfo(inputSchoolInfo2)
                    setPickSheetIndex(0)
                }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={inputSchoolInfo2 == ""}>
                    <Text className=' text-base font-semibold ' >Done</Text>
                </TouchableOpacity>
            </Animatable.View>
        }
    }

    const showContentIndex = () => {
        if (pickSheetIndex == 0) {
            return <Animatable.View animation={"slideInLeft"} duration={400} className='p-4'>
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
                            {
                                inputProgressNote == "" ? <Text className='mr-2 text-[#8F8E90] font-medium text-base'>Progress note</Text> : <Text className='mr-2 text-[#8F8E90] font-medium text-base w-24 ' numberOfLines={1} style={{ textAlign: 'right' }}>{inputProgressNote}</Text>
                            }
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
                            {
                                inputSchoolInfo == "" ? <Text className='mr-2 text-[#8F8E90] font-medium text-base'>School Info</Text> : <Text className='mr-2 text-[#8F8E90] font-medium text-base w-24 ' numberOfLines={1} style={{ textAlign: 'right' }}>{inputSchoolInfo}</Text>
                            }
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
                {/* <View className='bg-white rounded-lg mt-10 border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-[#ccc] border-[0.5px]  px-2 py-3'>
                    <Text className='ml-2 text-[#F93E3E] font-medium text-base text-center'>Delete this member </Text>
                </View> */}
            </Animatable.View>
        } else if (pickSheetIndex == 1) {
            return <Animatable.View animation={"slideInRight"} duration={400} className='p-4'>
                <View className='bg-white rounded-lg'>
                    {
                        members.map((item, index) => {
                            return <TouchableOpacity key={index} className={index == 0 ? 'w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 rounded-tl-lg rounded-tr-lg' : index == members.length - 1 ? 'w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 ' : 'w-full flex-row justify-between items-center border-[0.5px] border-t-[#ccc] border-l-[#ccc] border-r-[#ccc] border-b-0 px-2 py-3 '}
                                onPress={() => { setChoosenMemberId(item.email) }}
                            >
                                <View className='ml-4'>
                                    <ImageComponent imageUrl={item.avatar || ""} style={{ width: 30, height: 30 }} defaultImage={FamilyImage} className='rounded-sm ' />

                                </View>
                                {/* <Text className='ml-2 text-[#8F8E90] font-medium text-base'>Aha</Text> */}
                                <View className='flex-row items-center'>
                                    <Text className='mr-2 text-[#8F8E90] font-medium text-base'>{
                                        item.firstname + " " + item.lastname
                                    }</Text>
                                    <View className='justify-self-end'>
                                        {
                                            item.email == choosenMemberId && <Material name="check" size={24} color={"#49CC90"} />
                                        }

                                    </View>
                                </View>
                            </TouchableOpacity>
                        })
                    }


                </View>

            </Animatable.View>
        } else if (pickSheetIndex == 2) {
            return <Animatable.View animation={"slideInRight"} duration={400} className='p-4'>
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
                        placeholder="Input progress note"
                        value={inputProgressNote2}
                        onChangeText={(text) => setInputProgressNote2(text)}
                        className='bg-white'
                        autoFocus
                    />


                </View>

            </Animatable.View>
        } else if (pickSheetIndex == 3) {
            return <Animatable.View animation={"slideInRight"} duration={400} className='p-4'>
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
                        placeholder="Input school info"
                        value={inputSchoolInfo2}
                        onChangeText={(text) => setInputSchoolInfo2(text)}
                        className='bg-white'
                        autoFocus
                    />



                </View>

            </Animatable.View>
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
            // customModalProps={{
            //     animationType: 'slide'
            // }}
            onClose={() => {
                setChoosenMemberId("")
                setInputProgressNote("")
                setInputSchoolInfo("")
                setChoosenMember(undefined)
                // setStartAnimation(false)
            }}
            // onOpen={() => {
            //     setTimeout(() => {
            //         setStartAnimation(true)
            //     }, 1000)
            // }}
        >
            <View className='flex-1 '>
                {showHeader()}
                <KeyboardAvoidingView className="flex-1 " behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={true} className='flex-1 ' keyboardShouldPersistTaps="handled" >

                        {showContentIndex()}
                    </ScrollView>
                </KeyboardAvoidingView>

            </View>
        </RBSheet>
    )
}

export default AddMemberEducationSheet