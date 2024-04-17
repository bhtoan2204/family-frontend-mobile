import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import CircularProgress from './CircularProgress'
import { COLORS } from 'src/constants'
import EduImg from 'src/assets/images/education.png'
import CourseImg from 'src/assets/images/course_2.png'

const CourseItem = ({ data, onPress }: any) => {

    const getColor = (status: string) => {
        if (status == 'done') return '#27AB6D';
        if (status == 'in_progress') return '#56409e';
        return '#EA5E68';
    }
    const statusText = (status: string) => {
        if (status == 'done') return <Text className='text-base text-gray-600 flex-row items-center'>Status:
            <Text className='text-green-600'> Done</Text>
        </Text>;
        if (status == 'in_progress') return <Text className='text-base text-gray-600 flex-row items-center'>Status:
            <Text style={{ color: COLORS.primary }}> In Progress</Text>
        </Text>;
        return 'Not Started';
    }
    return (
        data && <TouchableOpacity className=' h-auto  mt-4 ' onPress={onPress}>
            <View className='flex-row items-center bg-white p-4'>
                <Image source={CourseImg} width={50}
                    height={50}
                    className="w-16 h-16 mr-4  " />
                <View className='flex-1'>
                    <Text className='font-semibold text-lg' style={{ color: COLORS.primary }}>{data.subject_name}</Text>
                    
                    <Text className='text-base text-gray-600'>Score: 91</Text>
                </View>
                <View className='flex-row items-center  '>
                    <CircularProgress
                        size={60}
                        progress={data.status == 'done' ? 100 : 50}
                        strokeWidth={5}
                        backgroundColor="#e0e0e0"
                        progressColor={getColor(data.status)}
                    />

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CourseItem