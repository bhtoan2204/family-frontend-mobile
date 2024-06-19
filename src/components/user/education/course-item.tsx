import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import CircularProgress from './circular-progress'
import { COLORS } from 'src/constants'
import EduImg from 'src/assets/images/education.png'
import CourseImg from 'src/assets/images/course_2.png'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
// import * as Gradients from 'src/assets/images/gradients'
import { gradients_list } from 'src/assets/images/gradients'
const CourseItem = ({ data, onPress, img }: any) => {
    // const rand_gradient = gradients_list[Math.floor(Math.random() * gradients_list.length)]
    const getColor = (status: string) => {
        if (status == 'done') return iOSColors.systemGreen.defaultLight;
        if (status == 'in_progress') return iOSColors.systemBlue.defaultLight;
        return iOSColors.systemBlue.defaultLight;
    }
    const statusText = (status: string) => {
        if (status == 'done') return <Text className='text-base text-gray-600 flex-row items-center'>Status:
            <Text className='text-green-600'> Done</Text>
        </Text>;
        if (status == 'in_progress') return <Text className='text-base text-gray-600 flex-row items-center'>Status:
            <Text style={{ color: COLORS.AuroMetalSaurus }}> In Progress</Text>
        </Text>;
        return 'Not Started';
    }
    return (
        data && <TouchableOpacity className=' h-auto  mt-4 ' onPress={onPress}>
            <View className='flex-row items-center bg-white p-4'>
                <Image source={img} width={50}
                    height={50}
                    className="w-16 h-16 mr-4  " />
                <View className='flex-1'>
                    <Text className='font-light text-lg' style={{ color: iOSGrayColors.systemGray.accessibleDark }}>{data.subject_name}</Text>

                    <Text className='text-base text-gray-600 font-light'>Score: 91</Text>
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