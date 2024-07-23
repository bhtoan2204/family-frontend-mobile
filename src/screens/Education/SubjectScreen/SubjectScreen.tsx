import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard } from 'react-native'
import { EducationScreenProps, HouseHoldScreenProps, ProgressScreenProps, SubjectScreenProps } from 'src/navigation/NavigationTypes'
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
import SubjectItem from 'src/screens/EducationScreen/SubjectItem/SubjectItem';
import SubjectItemEmpty from 'src/screens/EducationScreen/SubjectItem/SubjectItemEmp';
// import AddComponentScoreSheet from 'src/screens/EducationScreen/SubjectSheet/AddComponentScoreSheet';
import SubjectScreenHeader from 'src/components/user/education/subject-screen/subject-screen-header';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddComponentScoreSheet from 'src/components/user/education/subject-screen/sheet/add-component-score-sheet';


const SubjectScreen: React.FC<SubjectScreenProps> = ({ navigation, route }) => {
    const { id_progress, id_family, id_subject } = route.params
    const dispatch = useDispatch<AppDispatch>()
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily
    const [searchQuery, setSearchQuery] = React.useState<string>('')

    const subjectDetailData = useSelector((state: RootState) => state.educations).find((item) => item.id_education_progress === id_progress)!.subjects.find((item) => item.id_subject === id_subject)!
    const [expectedGrade, setExpectedGrade] = React.useState<number>(0)
    const [currentGrade, setCurrentGrade] = React.useState<number>(0)
    const addComponentScoreSheetRef = React.useRef<BottomSheet>(null)

    const getFirstLetterSubject = (subject: string) => {
        var str = subject.split(" ");
        return str[0]
    }

    useEffect(() => {
        console.log(subjectDetailData)
    }, [])

    useEffect(() => {
        const handleCalculateScore = () => {
            let totalScore = 0
            let totalExpectedScore = 0
            let scoreCount = 0
            let expectedCount = 0

            if (subjectDetailData) {
                if (subjectDetailData.final_score != null) {
                    if (subjectDetailData.final_score.score != null) {
                        scoreCount += 1
                        totalScore += parseFloat((subjectDetailData.final_score.score || 0).toString())
                    }
                    if (subjectDetailData.final_score.expected_score != null) {
                        expectedCount += 1
                        totalExpectedScore += parseFloat((subjectDetailData.final_score.expected_score || 0).toString())
                    }
                }
                if (subjectDetailData.midterm_score != null) {
                    if (subjectDetailData.midterm_score.score != null) {
                        scoreCount += 1
                        totalScore += parseFloat((subjectDetailData.midterm_score.score || 0).toString())
                    }
                    if (subjectDetailData.midterm_score.expected_score != null) {
                        expectedCount += 1
                        totalExpectedScore += parseFloat((subjectDetailData.midterm_score.expected_score || 0).toString())
                    }
                }
                if (subjectDetailData.component_scores != null) {
                    subjectDetailData.component_scores.map((item) => {
                        if (item.score != null) {
                            scoreCount += 1
                            totalScore += parseFloat((item.score).toString())
                        }
                        if (item.expected_score != null) {
                            expectedCount += 1
                            totalExpectedScore += parseFloat((item.expected_score).toString())
                        }
                    })

                }
                setCurrentGrade(parseFloat((totalScore / scoreCount).toPrecision(2)) || 0)
                setExpectedGrade(parseFloat((totalExpectedScore / expectedCount).toPrecision(2)) || 0)
            }
        }
        handleCalculateScore()
    }, [subjectDetailData])

    if (!subjectDetailData) return
    <ActivityIndicator size='large' color={COLORS.AuroMetalSaurus} />


    return (
        <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]">
            <SubjectScreenHeader navigationBack={() => navigation.goBack()}
                idFamily={id_family!}
                imageUrl={familyInfo!.avatar || undefined}
                title={getFirstLetterSubject(subjectDetailData.subject_name)}
                addComponentScoreSheetRef={addComponentScoreSheetRef}
            />
            <View className='flex-1   mt-[-3%] bg-white dark:bg-[#0A1220] rounded-tl-xl rounded-tr-xl overflow-hidden'>
                <View className='h-28 bg-white dark:bg-[#0A1220] border-b-[1px] border-gray-200 dark:border-[#232A3D]'>
                    <View className='flex-row h-full p-2 bg-[#FFFFFE] dark:bg-[#0A1220]'>
                        <View className='flex-1 border-r-[1px] border-gray-200 dark:border-[#232A3D]  flex-col  items-center'>
                            <Text className='text-base  text-opacity-0 font-medium text-[#2F2F34] dark:text-white'  >Current grades</Text>
                            <View className='mt-2'>
                                <Text className='text-4xl font-light text-[#2F2F34] dark:text-white'  >{currentGrade}</Text>
                            </View>
                        </View>
                        <View className='flex-1   flex-col  items-center'>
                            <Text className='text-base  font-medium text-[#2F2F34] dark:text-white'  >Target grades</Text>
                            <View className='border-b-[1px] mt-2 border-[#56409e] dark:border-white'>
                                <Text className='text-4xl font-light text-[#2F2F34] dark:text-white' >{expectedGrade}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView className=' ' >
                    <View className='my-3'>
                        <Text className='ml-4 mb-3 text-lg font-medium'>Final & Mid</Text>
                        <SubjectItem
                            isGraded={subjectDetailData.midterm_score?.score != null} subjectComponentData={subjectDetailData.final_score}
                            index={-1}
                            id_education_progress={id_progress}
                            id_subject={id_subject}
                            id_family={id_family!}
                        />
                        <SubjectItem
                            isGraded={subjectDetailData.midterm_score?.score != null} subjectComponentData={subjectDetailData.midterm_score}
                            index={-2}
                            id_education_progress={id_progress}
                            id_subject={id_subject}
                            id_family={id_family!}
                        />
                    </View>

                    <View className='mb-3'>
                        <Text className='ml-4 mb-3 text-lg font-medium'>Others</Text>
                        {/* <SubjectItem isGraded={true} title='Homework 1' />
                    <SubjectItem isGraded={true} title='Homework 2' />
                    <SubjectItem isGraded={false} title='Homework 3' /> */}
                        {
                            subjectDetailData.component_scores && subjectDetailData.component_scores.map((item, index) => {
                                return (
                                    <SubjectItem
                                        key={index} isGraded={item.score != null} subjectComponentData={item}
                                        index={index}
                                        id_education_progress={id_progress}
                                        id_subject={id_subject}
                                        id_family={id_family!}
                                    />
                                )
                            })
                        }
                        {
                            subjectDetailData && subjectDetailData.component_scores == null && <SubjectItemEmpty
                                bottomSheetRef={addComponentScoreSheetRef}
                                index={-3}
                                id_education_progress={id_progress}
                                id_subject={id_subject}
                                id_family={id_family!}
                            />
                        }
                    </View>



                </ScrollView>
                {/* <AddComponentScoreSheet refRBSheet={addComponentScoreSheetRef}
                    id_education_progress={id_progress}
                    id_subject={id_subject}
                    id_family={id_family!}
                /> */}
            </View>
            <AddComponentScoreSheet bottomSheetRef={addComponentScoreSheetRef}
                id_education_progress={id_progress}
                id_subject={id_subject}
                id_family={id_family}

            />


        </View>

    )
}


export default SubjectScreen