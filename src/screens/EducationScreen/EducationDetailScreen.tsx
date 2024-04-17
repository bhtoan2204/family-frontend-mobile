import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { EducationDetailScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import CourseItem from './CourseItem';
const data = {
    "message": "Success",
    "data": [
        {
            "id_education_progress": 3,
            "education_progress_info": {
                "id_education_progress": 3,
                "id_family": 96,
                "id_user": "db31bfb8-ec15-4cb1-9cbe-ebe3edaca323",
                "title": "Học trên trường",
                "progress_notes": "tình hình ko ổn, lười học quá",
                "created_at": "2024-04-09T04:29:20.875637",
                "updated_at": "2024-04-09T04:39:57.716122",
                "school_info": "địa chỉ cơ sở 2 nguyễn văn cừ, đh khoa học tự nhiên"
            },
            "subjects_info": [
                {
                    "id_subject": 6,
                    "subject_name": "Introduction to Statistics",
                    "description": "Stanford's \"Introduction to Statistics\" teaches you statistical thinking concepts that are essential for learning from data and communicating insights.",
                    "status": "in_progress"
                },
                {
                    "id_subject": 4,
                    "subject_name": "Discrete mathematics",
                    "description": "Discrete mathematics is the study of mathematical structures that can be considered \"discrete\" rather than \"continuous\". Objects studied in discrete mathematics include integers, graphs, and statements in logic.",
                    "status": "done"
                }
            ]
        }
    ]
}
const EducationDetailScreen: React.FC<EducationDetailScreenProps> = ({ navigation, route }) => {
    const { id_education_progress, id_family } = route.params
    return (
        <View className="flex-1 bg-[#F7F7F7]">
            <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View className='mr-3'>
                    <TouchableOpacity onPress={() => {
                        // refRBSheet.current?.open()
                    }} >
                        {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                        <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView className=' '>
                {
                    data && data.data[0].subjects_info.map((item: any, index: number) => {
                        return (
                            <React.Fragment key={index}>
                                <CourseItem data={item} onPress={() => {
                                    navigation.navigate('SubjectDetail', {
                                        id_education_progress,
                                        id_family,
                                        id_subject: item.id_subject
                                    })
                                }} />
                            </React.Fragment>
                        )
                    })
                }

            </ScrollView>


        </View>

    )
}

export default EducationDetailScreen