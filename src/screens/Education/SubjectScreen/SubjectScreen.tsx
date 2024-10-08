import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard } from 'react-native'
import { EducationScreenProps, HouseHoldScreenProps, ProgressScreenProps, SubjectScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';

import SubjectScreenHeader from 'src/components/user/education/subject-screen/subject-screen-header';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddComponentScoreSheet from 'src/components/user/education/subject-screen/sheet/add-component-score-sheet';
import { useToast } from 'react-native-toast-notifications';
import SubjectItem from 'src/components/user/education/subject-screen/SubjectItem';
import SubjectItemEmpty from 'src/components/user/education/subject-screen/SubjectItemEmp';
import { getTranslate } from 'src/redux/slices/languageSlice';


const SubjectScreen: React.FC<SubjectScreenProps> = ({ navigation, route }) => {
    const { id_progress, id_family, id_subject } = route.params
    const dispatch = useDispatch<AppDispatch>()
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily

    const subjectDetailData = useSelector((state: RootState) => state.educations).educations.find((item) => item.id_education_progress === id_progress)!.subjects.find((item) => item.id_subject === id_subject)!
    const [expectedGrade, setExpectedGrade] = React.useState<number>(0)
    const [currentGrade, setCurrentGrade] = React.useState<number>(0)
    const addComponentScoreSheetRef = React.useRef<BottomSheet>(null)
    const translate = useSelector(getTranslate)
    const getFirstLetterSubject = React.useCallback((subject: string) => {
        var str = subject.split(" ");
        return str[0]
    }, [])
    // const getFirstLetterSubject = (subject: string) => {
    //     var str = subject.split(" ");
    //     return str[0]
    // }

    useEffect(() => {
        console.log(subjectDetailData)
    }, [])

    const handleCalculateScore = React.useCallback(() => {
        let totalScore = 0
        let totalExpectedScore = 0
        let scoreCount = 0
        let expectedCount = 0

        if (subjectDetailData) {

            if (subjectDetailData.component_scores != null) {
                subjectDetailData.component_scores.map((item) => {
                    if (item.score != null && item.score != 0) {
                        scoreCount += 1
                        totalScore += parseFloat((item.score).toString())
                    }
                    if (item.target_score != null && item.target_score != 0) {
                        expectedCount += 1
                        totalExpectedScore += parseFloat((item.target_score).toString())
                    }
                })

            }
            setCurrentGrade(parseFloat((totalScore / scoreCount).toPrecision(2)) || 0)
            setExpectedGrade(parseFloat((totalExpectedScore / expectedCount).toPrecision(2)) || 0)
        }
    }, [subjectDetailData])

    useEffect(() => {
        handleCalculateScore()
    }, [subjectDetailData])

    if (!subjectDetailData) return
    <ActivityIndicator size='large' color={COLORS.AuroMetalSaurus} />


    return (
        <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]">
            <SubjectScreenHeader navigationBack={() => navigation.goBack()}
                idFamily={id_family!}
                imageUrl={familyInfo?.avatar || undefined}
                title={getFirstLetterSubject(subjectDetailData.subject_name)}
                addComponentScoreSheetRef={addComponentScoreSheetRef}
            />
            <View className='flex-1   mt-[-3%] bg-white dark:bg-[#0A1220] rounded-tl-xl rounded-tr-xl overflow-hidden'>
                <View className='h-28 bg-white dark:bg-[#0A1220] border-b-[1px] border-gray-200 dark:border-[#232A3D]'>
                    <View className='flex-row h-full p-2 bg-[#FFFFFE] dark:bg-[#0A1220]'>
                        <View className='flex-1 border-r-[1px] border-gray-200 dark:border-[#232A3D]  flex-col  items-center'>
                            <Text className='text-base  text-opacity-0 font-medium text-[#2F2F34] dark:text-white'  >{
                                    translate("subject_screen_current_grades")
                                }</Text>
                            <View className='mt-2'>
                                <Text className='text-4xl font-light text-[#2F2F34] dark:text-white'  >{currentGrade}</Text>
                            </View>
                        </View>
                        <View className='flex-1   flex-col  items-center'>
                            <Text className='text-base  font-medium text-[#2F2F34] dark:text-white'  >{
                                translate("subject_screen_target_grades")
                                }

                            </Text>
                            <View className='border-b-[1px] mt-2 border-[#56409e] dark:border-white'>
                                <Text className='text-4xl font-light text-[#2F2F34] dark:text-white' >{expectedGrade}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView className=' ' >
                    <View className='my-3'>
                        <Text className='ml-4 mb-3 text-lg font-medium text-black dark:text-white'>{
                                translate("Component_Scores")
                            }</Text>

                        {
                            subjectDetailData.component_scores && subjectDetailData.component_scores.map((item, index) => {
                                return (
                                    <SubjectItem
                                        key={index} isGraded={item.score != null}
                                        subjectComponentData={item}
                                        index={index}
                                        id_education_progress={id_progress}
                                        id_subject={id_subject}
                                        id_family={id_family!}
                                        isFirst={
                                            index == 0 ? true : false
                                        }
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

            </View>

        </View>

    )
}


export default SubjectScreen