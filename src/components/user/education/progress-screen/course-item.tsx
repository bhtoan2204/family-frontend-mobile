import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'

import { COLORS } from 'src/constants'
import EduImg from 'src/assets/images/education.png'
import CourseImg from 'src/assets/images/course_2.png'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
// import * as Gradients from 'src/assets/images/gradients'
import { gradients_list } from 'src/assets/images/gradients'
import { Subject } from 'src/interface/education/education'
import CircularProgress from '../circular-progress'
import { progress_color } from './const/color'
import { ScreenHeight } from 'react-native-elements/dist/helpers'

interface CourseItemProps {
    data: Subject;
    onPress: () => void;
    index: number;
}

const CourseItem = ({ data, onPress, index }: CourseItemProps) => {
    // const rand_gradient = gradients_list[Math.floor(Math.random() * gradients_list.length)]

    const getColor = (data: Subject) => {
        const p = handleCalculateExpectedScore()
        if (p <= 36) return progress_color.LessThan36
        else if (p <= 51) return progress_color.LessThan51
        else if (p <= 96) return progress_color.LessThan99
        else if (p == 100) return progress_color.Equal100
    }

    const handleCalculateScore = React.useCallback(() => {
        let totalScore = 0
        let totalExpectedScore = 0
        let scoreCount = 0
        let expectedCount = 0

        if (data) {

            if (data.component_scores != null) {
                data.component_scores.map((item) => {
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
            return parseFloat((totalScore / scoreCount).toPrecision(2))

        }
    }, [data])

    const handleCalculateExpectedScore = React.useCallback(() => {
        if (data.component_scores) {
            let total = 0;
            data.component_scores.forEach((item) => {
                if (item.score && item.score != 0) total += 1;
            })
            const fin = (total) * 100 / (data.component_scores.length);
            return Math.floor(fin)
        }
        return 0;
    }, [data])

    // const calculateScore = (data: Subject) => {
    //     let totalComponent = 0;
    //     let total = 0


    //     if (data.component_scores) {
    //         data.component_scores.forEach((item) => {
    //             if (item.score != null && item.score != 0) {
    //                 total += parseFloat((item.score).toString())
    //             }
    //         })
    //         return total / (data.component_scores.length);
    //     }
    //     return 0;
    // }

    // const calculateProgress = (data: Subject) => {

    //     if (data.component_scores) {
    //         let total = 0;
    //         data.component_scores.forEach((item) => {
    //             if (item.score && item.score != 0) total += 1;
    //         })
    //         const fin = (total) * 100 / (data.component_scores.length);
    //         return Math.floor(fin)
    //     }
    //     return 0;

    // }

    return (
        data && <TouchableOpacity className=' h-auto  mt-4 mx-5 ' onPress={onPress}>
            <View className='flex-row items-center bg-white dark:bg-[#252D3B] p-4 rounded-lg shadow-lg '>
                <Image source={gradients_list[index % gradients_list.length]} width={ScreenHeight * 0.2}
                    height={ScreenHeight * 0.12}
                    className=" mr-4  "
                    style={{
                        borderRadius: 10,
                        resizeMode: 'cover',
                        width: ScreenHeight * 0.13,
                        height: ScreenHeight * 0.13,
                    }}
                />
                <View className='flex-1 ' style={{

                }}>
                    <Text className='font-bold text-[#2F2F34] dark:text-white flex-1 '
                        style={{
                            fontSize: 16,
                            lineHeight: 0

                        }}
                        numberOfLines={1}
                    >{data.subject_name}</Text>
                    <Text className='font-medium text-[#2F2F34] dark:text-[#8D94A5]  flex-1' style={{
                        fontSize: 15,
                        lineHeight: 0

                    }}
                        numberOfLines={1}
                    >{data.description || "no description"}</Text>

                    <Text className=' text-[#8F8F8F] dark:text-white font-light flex-1 '
                        style={{
                            fontSize: 14,
                            lineHeight: 0
                        }}
                        numberOfLines={1}

                    >Total score: {handleCalculateScore()}</Text>
                </View>
                <View className='flex-row items-center  '>
                    <CircularProgress
                        size={60}
                        progress={handleCalculateExpectedScore()}
                        strokeWidth={5}
                        backgroundColor="#e0e0e0"
                        progressColor={getColor(data)}
                    />

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CourseItem