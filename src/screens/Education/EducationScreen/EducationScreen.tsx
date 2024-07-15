import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard } from 'react-native'
import { EducationScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';

// import AccordionItem from 'src/components/AccordionItem/accordion-item';

import EducationScreenHeader from 'src/components/user/education/education-screen/education-screen-header';
import EducationScreenSearchBar from 'src/components/user/education/education-screen/search-bar';
import { Education } from 'src/interface/education/education';
import DefaultAvatar from 'src/assets/images/education_assets/default_avatar.png';
import { ScreenHeight } from '@rneui/base';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddProgressSheet from 'src/components/user/education/education-screen/sheet/add-progress-sheet';
import AddProgressPickMemberSheet from 'src/components/user/education/education-screen/sheet/pick-member-sheet';
import { useColorScheme } from 'nativewind';

const EducationScreen: React.FC<EducationScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params

    const dispatch = useDispatch<AppDispatch>()
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily
    const [searchQuery, setSearchQuery] = React.useState<string>('')
    const educationData = useSelector((state: RootState) => state.educations)
    const addProgressBottomSheetRef = useRef<BottomSheet>(null)
    const pickMemberBottomSheetRef = useRef<BottomSheet>(null)
    const members = useSelector((state: RootState) => state.family).familyMembers.filter(item => {
        return item.id_family == id_family
    })
    const [pickedIdUser, setPickedIdUser] = React.useState<string>("")
    const { colorScheme, setColorScheme } = useColorScheme()

    useEffect(()=>{
        setColorScheme('dark')
    },[])

    // console.log("members of family", id_family, members)
    const handleNavigateProgress = (id_progress: number) => {
        navigation.navigate('ProgressScreen', { id_family: id_family, id_progress: id_progress })
    }

    const buildListEmpty = () => {
        return <TouchableOpacity className='flex-1 z-10 items-center justify-center bg-[#F7F7F7]' activeOpacity={1.0} onPress={() => {
            Keyboard.dismiss()
        }}>
            <Text className='text-center text-lg text-gray-500'>No Education Found</Text>
        </TouchableOpacity>
    }

    const buildList = () => {
        return <ScrollView className='flex-1 z-10 mt-5 bg-[#F7F7F7] '>
            {
                educationData.map((item, index) => {
                    return <React.Fragment key={index}>
                        <EducationItem item={item} handleNavigateProgress={handleNavigateProgress} />
                    </React.Fragment>
                })
            }
        </ScrollView>
    }

    return (
        <View className="flex-1 bg-[#F7F7F7]">
            {/* <TouchableOpacity activeOpacity={1.0} className='flex-1 bg-transparent' onPress={() => {
                console.log('pressed')
                Keyboard.dismiss()
            }}
                disabled={isKeyboardVisible == false}
            >
                

            </TouchableOpacity> */}
            <EducationScreenHeader navigationBack={() => navigation.goBack()}
                idFamily={id_family!}
                imageUrl={familyInfo!.avatar || undefined}
                addProgressBottomSheetRef={addProgressBottomSheetRef}
            />

            <View className=' bg-[#f7f7f7] mt-[-3%]  rounded-tl-xl rounded-tr-xl h-[3%]'>
                <View className='mt-[-5%] bg-transparent justify-center items-center  '>
                    <EducationScreenSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </View>

            </View>
            <View className='flex-1 '>
                {
                    educationData.length > 0 ? <>
                        {buildList()}
                    </> : <>
                        {buildListEmpty()}
                    </>
                }
            </View>
            <AddProgressSheet bottomSheetRef={addProgressBottomSheetRef}
                members={members}
                id_family={id_family!}
                pickedIdUser={pickedIdUser}
                setPickedIdUser={(id_user: string) => {
                    setPickedIdUser(id_user)
                }}
                pickMemberBottomSheetRef={pickMemberBottomSheetRef}
            />
            <AddProgressPickMemberSheet
                refRBSheet={pickMemberBottomSheetRef}
                members={members}
                pickedIdUser={pickedIdUser}
                setPickedIdUser={(id_user: string) => {
                    setPickedIdUser(id_user)
                }}
            />
        </View>

    )
}

interface EducationItemProps {
    item: Education,
    handleNavigateProgress: (id_progress: number) => void
}

const EducationItem = ({ item, handleNavigateProgress }: EducationItemProps) => {
    return <TouchableOpacity className='flex-row mx-6 items-center my-2 py-3  bg-white shadow-lg rounded-lg'
        onPress={() => {
            handleNavigateProgress(item.id_education_progress)
        }}
    >
        <View className='flex-row items-center'>
            <View className='mx-4'>
                <Image source={item.user.avatar != "" ? { uri: item.user.avatar } : DefaultAvatar} style={{ width: ScreenHeight * 0.17, height: ScreenHeight * 0.17, borderRadius: 12 }}
                />
            </View>
            <View className='flex-1 mr-3 py-1 ' style={{
                height: ScreenHeight * 0.17,
                justifyContent: 'space-between'
            }}>
                <View className='justify-between flex-row'>
                    <View className='w-[80%]'>
                        <Text className='text-base text-[#DEC802] font-bold' numberOfLines={1}>{item.title}</Text>
                    </View>
                    <View className=''>
                        <Material name="dots-horizontal" size={ScreenHeight * 0.035} style={{ color: '#434343', fontWeight: "bold" }} />
                    </View>
                </View>
                <View className='flex-row items-center overflow-clip mr-5 '>
                    <Material name="account-outline" size={ScreenHeight * 0.035} style={{ color: '#2F2F34', fontWeight: "bold" }} />
                    <Text className='ml-3 text-sm font-semibold ' numberOfLines={1} >{item.user.firstname} {item.user.lastname}</Text>
                </View>
                <View className='flex-row items-center overflow-clip mr-5'>
                    <Material name="town-hall" size={ScreenHeight * 0.035} style={{ color: '#2F2F34', fontWeight: "bold" }} />
                    <Text className='ml-3 text-sm text-[#9A9A9A]' numberOfLines={1}>{item.school_info}</Text>
                </View>
                <View className='flex-row items-center overflow-clip mr-5'>
                    <Material name="note-outline" size={ScreenHeight * 0.035} style={{ color: '#2F2F34', fontWeight: "bold" }} />
                    <Text className='ml-3 text-sm text-[#9A9A9A]' numberOfLines={1}>{item.progress_notes}</Text>
                </View>

            </View>

        </View>

    </TouchableOpacity>
}

export default EducationScreen