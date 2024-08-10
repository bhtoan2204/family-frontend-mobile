import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard, RefreshControl } from 'react-native'
import { EducationScreenProps, HouseHoldScreenProps, ProgressScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { Education, Subject } from 'src/interface/education/education';
import DefaultAvatar from 'src/assets/images/education_assets/default_avatar.png';
import { ScreenHeight } from '@rneui/base';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
import ProgressScreenHeader from 'src/components/user/education/progress-screen/progress-screen-header';
import ProgressTab from 'src/components/user/education/progress-screen/progress-tab';
import { calculateProgress, calculateScore } from 'src/utils/education/util';
import CourseItem from 'src/components/user/education/progress-screen/course-item';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddCourseSheet from 'src/components/user/education/progress-screen/sheet/add-course-sheet';
import { useToast } from 'react-native-toast-notifications';
import { goal_data } from 'src/components/user/education/progress-screen/const/color';
import AddComponentScoreSheet1 from 'src/components/user/education/subject-screen/sheet/add-component-score-sheet-1';
import AddComponentScoreSheet2 from 'src/components/user/education/subject-screen/sheet/add-component-score-sheet2';
import EducationServices from 'src/services/apiclient/EducationService';
import { setEducation, setLoading } from 'src/redux/slices/EducationSlice';
import EmptyListIcon from 'src/assets/images/education_assets/no_member.png';

const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation, route }) => {
    const { id_family, id_progress } = route.params
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.educations).loading
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily
    const [choosenTab, setChoosenTab] = React.useState<number>(0)

    const progressData = useSelector((state: RootState) => state.educations).educations.find(item => {
        return item.id_education_progress == id_progress
    })
    const toast = useToast();
    // console.log(progressData)

    const [pickedTargets, setPickedTargets] = React.useState<string[]>([])

    const [goalData, setGoalData] = React.useState<{
        id: number,
        title: string,
        color: string,
    }[]>(goal_data)
    const [filteredData, setFilteredData] = React.useState<Subject[]>([])

    const addCourseBottomSheetRef = useRef<BottomSheet>(null)
    const pickedTargetsBottomSheetRef = useRef<BottomSheet>(null)
    const addGoalBottomSheetRef = useRef<BottomSheet>(null)
    const scrollViewRef = useRef<any>(null)

    const fetchDatas = React.useCallback(async () => {
        const handleFetchEducation = async () => {
            const educationsData = await EducationServices.getAllEducation(id_family!, 1, 100);
            dispatch(setEducation(educationsData))
        }
        dispatch(setLoading(true))
        await handleFetchEducation()
        dispatch(setLoading(false))
    }, [])

    useEffect(() => {
        if (progressData) {
            const subjects = progressData.subjects
            console.log(subjects)
            const filtered = subjects.filter(item => {
                if (choosenTab == 0) {
                    return item.id_education_progress == id_progress
                } else if (choosenTab == 1) {
                    return item.id_education_progress == id_progress && item.status == "in_progress"
                } else if (choosenTab == 2) {
                    return item.id_education_progress == id_progress && item.status != "in_progress"
                }
            })
            setFilteredData(filtered)
        }
    }, [choosenTab, progressData])

    const buildListEmpty = React.useCallback(() => {
        return <View className='flex-1 justify-center items-center '>
            <ScrollView className='flex-1' ref={scrollViewRef} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchDatas} />
            }>
                <View className='justify-center items-center mt-32'>
                    <View className='mb-4'>
                        <Image source={EmptyListIcon} style={{
                            height: ScreenHeight * 0.2,
                            width: ScreenHeight * 0.2,
                        }} />
                    </View>
                    <Text className='text-[#747474] dark:text-[#8D94A5] my-2 font-bold text-lg'>Nothing here</Text>
                    <Text className='mx-[15%] text-center text-sm text-[#747474] dark:text-[#8D94A5]'>{
                        choosenTab == 0 ? "No subject added yet" : choosenTab == 1 ? "No in progress subject" : "No completed subject"
                    }</Text>
                </View>
            </ScrollView>
        </View>
    }, [loading, choosenTab])


    const buildList = React.useCallback(() => {
        return <ScrollView className='flex-1 z-10 mt-5 bg-[#F7F7F7] dark:bg-[#0A1220]'
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchDatas} />
            }
        >
            <>
                {
                    filteredData.map((item, index) => {
                        return <React.Fragment key={index}>
                            <CourseItem data={item} onPress={() => {
                                navigation.navigate('SubjectScreen', {
                                    id_progress: item.id_education_progress,
                                    id_family,
                                    id_subject: item.id_subject
                                })
                            }}
                                index={index}
                            />
                        </React.Fragment>
                    })
                }
                <View className='my-2'>

                </View>
            </>
        </ScrollView>
    }, [filteredData, loading])

    return (
        <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]">
            <ProgressScreenHeader navigationBack={() => navigation.goBack()}
                idFamily={id_family!}
                imageUrl={familyInfo!.avatar || undefined}
                addCourseBottomSheetRef={addCourseBottomSheetRef}
            />

            <View className=' bg-[#f7f7f7] dark:bg-[#0A1220] mt-[-3%]  rounded-tl-xl rounded-tr-xl h-[4%]'>
                <View className='mt-[-5%] bg-transparent justify-center items-center  '>
                    <ProgressTab choosenTab={choosenTab} setChoosenTab={(tab: number) => {
                        setChoosenTab(tab)
                        scrollViewRef.current?.scrollTo({ y: 0, animated: true })

                    }} />
                </View>

            </View>

            <View className='flex-1'>
                {
                    loading ? <>
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
            <AddCourseSheet bottomSheetRef={addCourseBottomSheetRef} id_family={id_family!} id_education_progress={id_progress!}
                onAddSuccess={
                    () => {
                        setGoalData(goal_data)
                        setPickedTargets([])
                        toast.show("New subject added for family", {
                            type: "success",
                            duration: 2000,
                            icon: <Material name="check" size={24} color={"white"} />,
                        });
                    }
                }
                onAddFailed={
                    () => {
                        toast.show("Failed to add new subject for progress", {
                            type: "error",
                            duration: 2000,
                            icon: <Material name="close" size={24} color={"white"} />,
                        });
                    }
                }
                pickedTargets={pickedTargets}
                pickTargetBottomSheetRef={pickedTargetsBottomSheetRef}
                targets={goalData}
            />
            <AddComponentScoreSheet1
                bottomSheetRef={pickedTargetsBottomSheetRef}
                addComponentSheet2Ref={addGoalBottomSheetRef}
                pickedTargets={pickedTargets}
                targetData={goalData}
                id_education_progress={id_progress!}
                id_family={id_family!}
                onAddSuccess={() => {

                    toast.show("New component score added", {
                        type: "success",
                        duration: 2000,
                        icon: <Material name="check" size={24} color={"white"} />,
                    });
                }}
                onAddFailed={() => {
                    toast.show("Failed to add new component score", {
                        type: "error",
                        duration: 2000,
                        icon: <Material name="close" size={24} color={"white"} />,
                    });
                }}
                setPickedTargets={(id: string) => {
                    setPickedTargets((prev) => {
                        return [...prev, id]
                    })
                }}
                removePickedTargets={(id: string) => {
                    setPickedTargets((prev) => {
                        return prev.filter(item => item != id)
                    })
                }}
            />
            <AddComponentScoreSheet2
                bottomSheetRef={addGoalBottomSheetRef}
                addComponentSheet1Ref={pickedTargetsBottomSheetRef}
                onAddSuccess={(input: string) => {
                    const newGoal = {
                        id: goalData.length + 1,
                        title: input,
                        color: COLORS.DenimBlue
                    }
                    console.log(newGoal)
                    setGoalData((prev) => {
                        return [...prev, newGoal]
                    })
                    setPickedTargets((prev) => {
                        return [...prev, newGoal.id.toString()]
                    })
                    // setGoalData([...goalData, newGoal])
                    // setPickedTargets([...pickedTargets, newGoal.id.toString()])
                }}
            />
        </View>

    )
}



export default ProgressScreen