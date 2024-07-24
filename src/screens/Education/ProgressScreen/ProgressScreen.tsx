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

const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation, route }) => {
    const { id_family, id_progress } = route.params

    const dispatch = useDispatch<AppDispatch>()
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily
    const [searchQuery, setSearchQuery] = React.useState<string>('')
    const educationData = useSelector((state: RootState) => state.educations)
    const isKeyboardVisible = useKeyboardVisible()
    const [choosenTab, setChoosenTab] = React.useState<number>(0)

    const progressData = useSelector((state: RootState) => state.educations).find(item => {
        return item.id_education_progress == id_progress
    })

    const addCourseBottomSheetRef = useRef<BottomSheet>(null)

    // useEffect(() => {
    //     const recalculateScoreAndProgress = () => {
    //         // const subjects: Subject[] = JSON.parse(JSON.stringify(progressData ? progressData?.subjects : []))

    //         if (progressData) {
    //             for (let i = 0; i < progressData.subjects.length; i++) {
    //                 progressData.subjects[i].score_calculated = calculateScore(progressData.subjects[i])
    //                 progressData.subjects[i].progress_calculated = calculateProgress(progressData.subjects[i])
    //             }
    //         }
    //     }
    //     recalculateScoreAndProgress()
    // }, [progressData])

    useEffect(() => {
        console.log('haha')
        console.log(progressData)
    }, [progressData])

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
                progressData && progressData.subjects.map((item, index) => {
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
                    progressData && progressData.subjects.length > 0 ? <>
                        {buildList()}
                    </> : <>
                        {buildListEmpty()}
                    </>
                }
            </View>
            <AddCourseSheet bottomSheetRef={addCourseBottomSheetRef} id_family={id_family!} id_education_progress={id_progress!} />
        </View>

    )
}



export default ProgressScreen