import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard } from 'react-native'
import { EducationScreenProps, HouseHoldScreenProps, ProgressScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';

// import AccordionItem from 'src/components/AccordionItem/accordion-item';

import EducationScreenHeader from 'src/components/user/education/education-screen/education-screen-header';
import EducationScreenSearchBar from 'src/components/user/education/education-screen/search-bar';
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
import AddComponentScoreSheet from 'src/components/user/education/subject-screen/sheet/AddComponentScoreSheet';
import AddComponentScoreSheet1 from 'src/components/user/education/subject-screen/sheet/add-component-score-sheet-1';
import AddComponentScoreSheet2 from 'src/components/user/education/subject-screen/sheet/add-component-score-sheet2';
const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation, route }) => {
    const { id_family, id_progress } = route.params
    console.log('id_family', id_family)
    console.log('id_progress', id_progress)
    const dispatch = useDispatch<AppDispatch>()
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily
    const [choosenTab, setChoosenTab] = React.useState<number>(0)
    const toast = useToast();

    const progressData = useSelector((state: RootState) => state.educations).find(item => {
        return item.id_education_progress == id_progress
    })
    console.log(progressData)

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

    const buildListEmpty = () => {
        return <TouchableOpacity className='flex-1 z-10 items-center justify-center bg-[#F7F7F7] dark:bg-[#0A1220]' activeOpacity={1.0} onPress={() => {
            Keyboard.dismiss()
        }}>
            <Text className='text-center text-lg text-gray-500'>No Education Found</Text>
        </TouchableOpacity>
    }


    const buildList = () => {
        return <ScrollView className='flex-1 z-10 mt-5 bg-[#F7F7F7] dark:bg-[#0A1220]'
            showsVerticalScrollIndicator={false}
        >
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
        </ScrollView>
    }

    return (
        <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]">
            {/* <TouchableOpacity activeOpacity={1.0} className='flex-1 bg-transparent' onPress={() => {
                console.log('pressed')
                Keyboard.dismiss()
            }}
                disabled={isKeyboardVisible == false}
            >
                

            </TouchableOpacity> */}
            <ProgressScreenHeader navigationBack={() => navigation.goBack()}
                idFamily={id_family!}
                imageUrl={familyInfo!.avatar || undefined}
                addCourseBottomSheetRef={addCourseBottomSheetRef}
            />

            <View className=' bg-[#f7f7f7] dark:bg-[#0A1220] mt-[-3%]  rounded-tl-xl rounded-tr-xl h-[4%]'>
                <View className='mt-[-5%] bg-transparent justify-center items-center  '>
                    <ProgressTab choosenTab={choosenTab} setChoosenTab={setChoosenTab} />
                </View>

            </View>

            <View className='flex-1'>
                {
                    filteredData.length > 0 ? <>
                        {buildList()}
                    </> : <>
                        {buildListEmpty()}
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