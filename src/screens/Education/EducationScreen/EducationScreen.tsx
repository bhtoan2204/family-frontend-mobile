import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard, RefreshControl } from 'react-native'
import { EducationScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';

// import AccordionItem from 'src/components/AccordionItem/accordion-item';

import EducationScreenHeader from 'src/components/user/education/education-screen/education-screen-header';
import { Education } from 'src/interface/education/education';
import DefaultAvatar from 'src/assets/images/education_assets/default_avatar.png';
import { ScreenHeight } from '@rneui/base';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddProgressSheet from 'src/components/user/education/education-screen/sheet/add-progress-sheet';
import AddProgressPickMemberSheet from 'src/components/user/education/education-screen/sheet/pick-member-sheet';
import { useColorScheme } from 'nativewind';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionsCustomStyle,

} from 'react-native-popup-menu';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import UpdateProgressSheet from 'src/components/user/education/education-screen/sheet/update-progress-sheet';
import { clearEducation, deleteEducation, setEducation, setLoading, updateEducation } from 'src/redux/slices/EducationSlice';
import EducationServices from 'src/services/apiclient/EducationService';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { useToast } from "react-native-toast-notifications";
import FamilyServices from 'src/services/apiclient/FamilyServices';
import { Member } from 'src/interface/member/member';
import EducationTab from 'src/components/user/education/education-screen/education-tab';
import EmptyListIcon from 'src/assets/images/education_assets/no_member.png';

const EducationScreen: React.FC<EducationScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    // console.log("id_family", id_family)
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.educations).loading
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily
    const [searchQuery, setSearchQuery] = React.useState<string>('')
    const educationData = useSelector((state: RootState) => state.educations).educations

    const addProgressBottomSheetRef = useRef<BottomSheet>(null)
    const pickMemberBottomSheetRef = useRef<BottomSheet>(null)
    const [members, setFamilyMembers] = React.useState<Member[]>([])

    const [pickedIdUser, setPickedIdUser] = React.useState<string>("")
    const { colorScheme, setColorScheme } = useColorScheme()
    const updateEducationSheetRef = useRef<BottomSheet>(null)
    const [titleUpdate, setTitleUpdate] = React.useState<string>("")
    const [schoolInfoUpdate, setSchoolInfoUpdate] = React.useState<string>("")
    const [progressNotesUpdate, setProgressNotesUpdate] = React.useState<string>("")
    const [pickedIdProgress, setPickedIdProgress] = React.useState<number>(-1)
    const [filteredData, setFilteredData] = React.useState<Education[]>([])
    const [choosenTab, setChoosenTab] = React.useState<number>(0)
    const profile = useSelector((state: RootState) => state.profile).profile

    const toast = useToast();

    const fetchDatas = React.useCallback(async () => {
        const handleFetchMember = async () => {
            try {
                const data = await FamilyServices.getAllMembers("", id_family);
                if (data) {
                    setFamilyMembers(data);
                } else {
                    setFamilyMembers([])
                }
            } catch (error) {
                console.log(error);
            }
        };
        const handleFetchEducation = async () => {
            const educationsData = await EducationServices.getAllEducation(id_family!, 1, 100);
            dispatch(setEducation(educationsData))
        }
        dispatch(setLoading(true))
        await handleFetchMember()
        await handleFetchEducation()
        dispatch(setLoading(false))
    }, [])

    useEffect(() => {
        fetchDatas()
        return () => {
            dispatch(clearEducation())
        }
    }, [])

    useEffect(() => {
        handleFilter(searchQuery, choosenTab, educationData)

    }, [searchQuery, choosenTab, educationData])

    const handleFilter = React.useCallback((searchQuery: string, choosenTab: number, educationData: Education[]) => {
        if (searchQuery == "") {
            if (choosenTab == 0) {
                const filtered = educationData.filter(item => {
                    return item.is_shared == true || item.id_user == profile?.id_user
                })
                setFilteredData(filtered)
            } else if (choosenTab == 1) {
                const filtered = educationData.filter(item => {
                    return item.id_user == profile?.id_user
                })
                setFilteredData(filtered)
            }
        } else {

            const filtered = educationData.filter(item => {
                return item.title.toLowerCase().includes(searchQuery.toLowerCase())
            })
            if (choosenTab == 0) {
                const filtered2 = filtered.filter(item => {
                    return item.is_shared == true || item.id_user == profile?.id_user
                })

                setFilteredData(filtered2)
            } else if (choosenTab == 1) {
                const filtered2 = filtered.filter(item => {
                    return item.id_user == profile?.id_user
                })

                setFilteredData(filtered2)
            }
        }
    }, [])

    const handleNavigateProgress = React.useCallback((id_progress: number) => {
        navigation.navigate('ProgressScreen', { id_family: id_family, id_progress: id_progress })
    }, [])

    const openUpdateProgressSheet = React.useCallback((id_progress: number, title: string, school_info: string, progress_notes: string) => {
        setPickedIdProgress(id_progress)
        setTitleUpdate(title)
        setSchoolInfoUpdate(school_info)
        setProgressNotesUpdate(progress_notes)
        updateEducationSheetRef.current?.expand()
    }, [])


    const onDeleteItem = async (id_progress: number) => {
        dispatch(deleteEducation(id_progress))
        toast.show("Deleted", {
            type: "success",
            duration: 2000,
            icon: <Material name="close" size={24} color={"white"} />,
        })
        const res = await EducationServices.deleteEducation(id_progress, id_family)
        if (res) {
            //setLoading here
        }
        else {
            //handle error here
        }
    }

    const handleShareEdu = React.useCallback(async (item: Education) => {
        const res = await EducationServices.updateEducation(item.id_education_progress, id_family, item.title, item.progress_notes, item.school_info, !item.is_shared)
        if (res) {
            dispatch(updateEducation({
                id_education_progress: item.id_education_progress,
                id_family: id_family!,
                title: item.title,
                progress_notes: item.progress_notes,
                school_info: item.school_info,
                is_shared: !item.is_shared
            }))
            toast.show("Updated", {
                type: "success",
                duration: 2000,
                icon: <Material name="check" size={24} color={"white"} />,
            });
        } else {
            toast.show("Failed to update", {
                type: "error",
                duration: 2000,
                icon: <Material name="close" size={24} color={"white"} />,
            });
        }
    }, [])



    const buildListEmpty = React.useCallback(() => {
        return <View className='flex-1 justify-center items-center '>
            <ScrollView className='flex-1' showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchDatas} />
            }>
                <View className='justify-center items-center mt-32'>
                    <View className='mb-4'>
                        <Image source={EmptyListIcon} style={{
                            height: ScreenHeight * 0.2,
                            width: ScreenHeight * 0.2,
                        }} />
                    </View>
                    <Text className='text-[#747474] dark:text-[#8D94A5] my-2 font-bold text-lg'>Nothing here?</Text>
                    <Text className='mx-[15%] text-center text-sm text-[#747474] dark:text-[#8D94A5]'>Tap on the button to add education</Text>
                </View>
            </ScrollView>
        </View>
    }, [loading])

    const buildList = React.useCallback(() => {
        return <ScrollView className='flex-1 z-10 mt-5 bg-[#F7F7F7] dark:bg-[#0A1220]'
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchDatas} />
            }
        >
            {
                filteredData.map((item, index) => {
                    return <React.Fragment key={index}>
                        <EducationItem
                            item={item}
                            handleNavigateProgress={handleNavigateProgress}
                            openUpdateProgressSheet={openUpdateProgressSheet}
                            handleShareEdu={handleShareEdu}
                            onDeleteItem={onDeleteItem}
                            isMe={profile?.id_user == item.id_user}
                        />
                    </React.Fragment>
                })
            }
            <View className='my-3'>

            </View>
        </ScrollView>
    }, [filteredData, loading])

    return (
        <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]">
            <EducationScreenHeader navigationBack={() => navigation.goBack()}
                idFamily={id_family!}
                imageUrl={familyInfo ? familyInfo.avatar ? familyInfo.avatar : undefined : undefined}
                addProgressBottomSheetRef={addProgressBottomSheetRef}
                pickMemberBottomSheetRef={pickMemberBottomSheetRef}
            />

            <View className=' bg-[#f7f7f7] dark:bg-[#0A1220] mt-[-3%]  rounded-tl-xl rounded-tr-xl h-[3%]'>
                <View className='mt-[-5%] bg-transparent justify-center items-center  '>
                    {/* <EducationScreenSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
                    <EducationTab
                        choosenTab={choosenTab} setChoosenTab={setChoosenTab}
                        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    />
                </View>

            </View>
            <View className='flex-1 bg-[#f7f7f7] dark:bg-[#0A1220]'>
                {
                    loading == true ? <>
                        <View className='flex-1 absolute w-full h-full bg-white dark:bg-[#0A1220] opacity-50 z-10 items-center justify-center'>
                            <View className='items-center justify-center bg-black  rounded-lg'
                                style={{
                                    width: ScreenHeight * 0.1,
                                    height: ScreenHeight * 0.1,
                                }}
                            >
                                <ActivityIndicator size='small' color={'white'} />
                            </View>
                        </View>
                    </> : <>
                        {
                            filteredData.length > 0 ? <>
                                {buildList()}
                            </> : <>
                                {buildListEmpty()}
                            </>
                        }
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
                onAddSuccess={
                    (id_progress: number) => {
                        setChoosenTab(1)
                        navigation.navigate('ProgressScreen', { id_family: id_family, id_progress: id_progress })
                        toast.show("New progress added for family", {
                            type: "success",
                            duration: 2000,
                            icon: <Material name="check" size={24} color={"white"} />,
                        });
                    }
                }
                onAddFailed={
                    () => {
                        toast.show("Failed to add new progress for family", {
                            type: "error",
                            duration: 2000,
                            icon: <Material name="close" size={24} color={"white"} />,
                        });
                    }
                }

            />
            <AddProgressPickMemberSheet
                refRBSheet={pickMemberBottomSheetRef}
                members={members}
                pickedIdUser={pickedIdUser}
                setPickedIdUser={(id_user: string) => {
                    setPickedIdUser(id_user)
                }}
                addProgressBottomSheetRef={addProgressBottomSheetRef}
            />
            <UpdateProgressSheet bottomSheetRef={updateEducationSheetRef}
                id_family={id_family!}
                id_progress={pickedIdProgress}
                progressNotes={progressNotesUpdate}
                schoolInfo={schoolInfoUpdate}
                title={titleUpdate}
                onUpdateSuccess={
                    () => {
                        toast.show("Progress updated", {
                            type: "success",
                            duration: 2000,
                            icon: <Material name="check" size={24} color={"white"} />,
                        });
                    }
                }
                onUpdateFailed={
                    () => {
                        toast.show("Failed to update", {
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

const Divider = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3 }} />
    )
}

interface EducationItemProps {
    item: Education,
    handleNavigateProgress: (id_progress: number) => void
    openUpdateProgressSheet: (id_progress: number, title: string, school_info: string, progress_notes: string) => void
    handleShareEdu: (item: Education) => Promise<void>
    onDeleteItem: (id_progress: number) => Promise<void>
    isMe: boolean
}

const EducationItem = ({ item, handleNavigateProgress, openUpdateProgressSheet, onDeleteItem, isMe, handleShareEdu }: EducationItemProps) => {
    const isDarkMode = useSelector(getIsDarkMode)
    return <TouchableOpacity className='flex-row mx-6 items-center my-2 py-3  bg-white dark:bg-[#252D3B] shadow-lg rounded-lg'
        onPress={() => {
            handleNavigateProgress(item.id_education_progress)
        }}
    >

        <View className='flex-row items-center'>
            <View className='mx-4'>
                <Image
                    source={item.users.avatar != "" ? { uri: item.users.avatar } : DefaultAvatar}
                    style={{ width: ScreenHeight * 0.17, height: ScreenHeight * 0.17, borderRadius: 12 }}
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
                                <MenuOption onSelect={() => {
                                    // setIsEditing(true)
                                    openUpdateProgressSheet(item.id_education_progress, item.title, item.school_info, item.progress_notes)
                                }} >

                                    <View className='flex-row items-center justify-between'>
                                        <Text className='text-base' style={{ color: iOSColors.systemBlue.defaultLight }}>Update</Text>
                                        <Material name="pencil" size={20} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} />
                                    </View>
                                </MenuOption>
                                <Divider />
                                {
                                    isMe && <>
                                        <MenuOption onSelect={async () => {
                                            await handleShareEdu(item)
                                        }} >
                                            {
                                                item.is_shared ?
                                                    <View className='flex-row items-center justify-between'>
                                                        <Text className='text-base' style={{ color: iOSColors.systemBlue.defaultLight }}>Private</Text>
                                                        <Material name="publish-off" size={20} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} />
                                                    </View>
                                                    : <View className='flex-row items-center justify-between'>
                                                        <Text className='text-base' style={{ color: iOSColors.systemBlue.defaultLight }}>Public</Text>
                                                        <Material name="publish" size={20} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} />
                                                    </View>
                                            }

                                        </MenuOption>
                                        <Divider />
                                    </>
                                }
                                <MenuOption onSelect={async () => {
                                    await onDeleteItem(item.id_education_progress)
                                }} >

                                    <View className='flex-row items-center justify-between'>
                                        <Text className='text-base ' style={{ color: iOSColors.systemRed.defaultLight }}>Delete</Text>
                                        <Material name="trash-can-outline" size={20} style={{ color: iOSColors.systemRed.defaultLight, fontWeight: "bold" }} />
                                    </View>
                                </MenuOption>
                                <Divider />
                            </MenuOptions>
                        </Menu>

                    </View>
                </View>
                <View className='flex-row items-center overflow-clip mr-5 '>
                    <Material name="account-outline" size={ScreenHeight * 0.035} style={{
                        color: isDarkMode ? 'white' : '#2F2F34',
                        fontWeight: "bold"
                    }} />
                    <Text className='ml-3 text-sm font-semibold dark:text-white ' numberOfLines={1} >{item.users.firstname} {item.users.lastname}</Text>
                </View>
                <View className='flex-row items-center overflow-clip mr-5'>
                    <Material name="town-hall" size={ScreenHeight * 0.035} style={{ color: isDarkMode ? 'white' : '#2F2F34', fontWeight: "bold" }} />
                    <Text className='ml-3 text-sm text-[#9A9A9A]' numberOfLines={1}>{item.school_info}</Text>
                </View>
                <View className='flex-row items-center overflow-clip mr-5'>
                    <Material name="note-outline" size={ScreenHeight * 0.035} style={{ color: isDarkMode ? 'white' : '#2F2F34', fontWeight: "bold" }} />
                    <Text className='ml-3 text-sm text-[#9A9A9A]' numberOfLines={1}>{item.progress_notes}</Text>
                </View>

            </View>

        </View>

    </TouchableOpacity >
}

const optionsStyles: MenuOptionsCustomStyle = {
    optionsContainer: {
        borderRadius: 10,
        marginTop: 24,
        backgroundColor: 'white',
        // opacity: 0.9,
    },
    optionWrapper: {
        padding: 10,
    },

};
export default EducationScreen