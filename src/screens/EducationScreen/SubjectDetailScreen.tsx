import React, { useEffect } from 'react'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import { SubjectDetailScreenProps } from 'src/navigation/NavigationTypes';
import SubjectItem from './SubjectItem/SubjectItem';
import { ComponentScore, EducationDetail, Subject } from 'src/interface/education/education';
import AddSubjectSheet from './SubjectSheet/AddSubjectSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
const data = {
    "message": "Success",
    "data": [
        {
            "id_subject": 6,
            "subject_name": "Introduction to Statistics",
            "description": "Stanford's \"Introduction to Statistics\" teaches you statistical thinking concepts that are essential for learning from data and communicating insights.",
            "component_scores": [
                {
                    "expected_score": null,
                    "score": null,
                    "component_name": "Homework 1",
                    "id_family": 96,
                    "id_education_progress": 3,
                    "id_subject": 6
                },
                {
                    "expected_score": null,
                    "score": null,
                    "component_name": "Homework 2",
                    "id_family": 96,
                    "id_education_progress": 3,
                    "id_subject": 6
                },

            ],
            "midterm_score": {
                "expected_score": null,
                "score": null,
                "component_name": "Midterm",
                "id_family": 96,
                "id_education_progress": 3,
                "id_subject": 6
            },
            "final_score": {
                "expected_score": null,
                "score": null,
                "component_name": "Final",
                "id_family": 96,
                "id_education_progress": 3,
                "id_subject": 6
            },
            "bonus_score": 0,
            "status": "in_progress"
        }
    ]
}

const SubjectDetailScreen: React.FC<SubjectDetailScreenProps> = ({ navigation, route }) => {
    const { id_education_progress, id_family, id_subject } = route.params
    const [subjectDetailData, setSubjectDetailData] = React.useState<Subject>(data.data[0])
    const [expectedGrade, setExpectedGrade] = React.useState<number>(0)
    const [currentGrade, setCurrentGrade] = React.useState<number>(0)
    const refRBSheet = React.useRef<RBSheet>(null)
    const getFirstLetterSubject = (subject: string) => {
        var str = subject.split(" ");
        return str[0]
    }

    useEffect(() => {
        const handleCalculateScore = () => {
            let totalScore = 0
            let totalExpectedScore = 0
            let scoreCount = 0
            let expectedCount = 0

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
        handleCalculateScore()
    }, [subjectDetailData])


    return (
        <View className="flex-1 bg-[#F7F7F7]">
            <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View>
                    <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>{getFirstLetterSubject(data.data[0].subject_name)}</Text>
                </View>
                <View className='mr-3'>
                    <TouchableOpacity onPress={() => {
                        refRBSheet.current?.open()
                    }} >

                        <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='h-28 bg-white border-b-[1px] border-gray-200'>
                <View className='flex-row h-full p-2 bg-[#FFFFFE]'>
                    <View className='flex-1 border-r-[1px] border-gray-200  flex-col  items-center'>
                        <Text className='text-base  text-opacity-0 font-medium' style={{ color: COLORS.primary }}  >Current grades</Text>
                        <View className='mt-2'>
                            <Text className='text-4xl font-light' style={{ color: COLORS.primary }} >{currentGrade}</Text>
                        </View>
                    </View>
                    <View className='flex-1   flex-col  items-center'>
                        <Text className='text-base  font-medium'  >Target grades</Text>
                        <View className='border-b-[1px] mt-2 border-[#56409e]'>
                            <Text className='text-4xl font-light' >{expectedGrade}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView className=' '>
                <View className='my-3'>
                    <Text className='ml-4 mb-3 text-lg font-medium'>Final & Mid</Text>
                    <SubjectItem isGraded={subjectDetailData.midterm_score?.score != null} subjectComponentData={subjectDetailData.final_score} setSubjectDetailData={setSubjectDetailData} index={-1} />
                    <SubjectItem isGraded={subjectDetailData.midterm_score?.score != null} subjectComponentData={subjectDetailData.midterm_score} setSubjectDetailData={setSubjectDetailData} index={-2} />
                </View>

                <View className='mb-3'>
                    <Text className='ml-4 mb-3 text-lg font-medium'>Others</Text>
                    {/* <SubjectItem isGraded={true} title='Homework 1' />
                    <SubjectItem isGraded={true} title='Homework 2' />
                    <SubjectItem isGraded={false} title='Homework 3' /> */}
                    {
                        subjectDetailData.component_scores.map((item, index) => {
                            return (
                                <SubjectItem key={index} isGraded={item.score != null} subjectComponentData={item} setSubjectDetailData={setSubjectDetailData} index={index} />
                            )
                        })
                    }
                </View>



            </ScrollView>
            <AddSubjectSheet refRBSheet={refRBSheet} setSubjectDetailData={setSubjectDetailData}
                id_education_progress={id_education_progress}
                id_subject={id_subject}
                id_family={id_family!}
            />
        </View>
    )
}

export default SubjectDetailScreen