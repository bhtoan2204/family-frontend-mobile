// import React from 'react'
// import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
// import CircularProgress from './circular-progress'
// import { COLORS } from 'src/constants'
// import EduImg from 'src/assets/images/education.png'
// import CourseImg from 'src/assets/images/course_2.png'
// import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
// // import * as Gradients from 'src/assets/images/gradients'
// import { gradients_list } from 'src/assets/images/gradients'
// import { Subject } from 'src/interface/education/education'

// interface CourseItemProps {
//     data: Subject;
//     onPress: () => void;
//     index: number;
// }

// const CourseItem = ({ data, onPress, index }: CourseItemProps) => {
//     // const rand_gradient = gradients_list[Math.floor(Math.random() * gradients_list.length)]
//     const getColor = (status: string) => {
//         if (status == 'done') return iOSColors.systemGreen.defaultLight;
//         if (status == 'in_progress') return iOSColors.systemBlue.defaultLight;
//         return iOSColors.systemBlue.defaultLight;
//     }
//     // const statusText = (status: string) => {
//     //     if (status == 'done') return <Text className='text-base text-gray-600 flex-row items-center'>Status:
//     //         <Text className='text-green-600'> Done</Text>
//     //     </Text>;
//     //     if (status == 'in_progress') return <Text className='text-base text-gray-600 flex-row items-center'>Status:
//     //         <Text style={{ color: COLORS.AuroMetalSaurus }}> In Progress</Text>
//     //     </Text>;
//     //     return 'Not Started';
//     // }
//     const calculateScore = (data: Subject) => {
//         if (data.component_scores) {
//             let total = 0;
//             data.component_scores.forEach((item) => {
//                 if (item.score) total += item.score;
//             })
//             return total / data.component_scores.length;
//         }
//         return 0;
//     }

//     const calculateProgress = (data: Subject) => {
//         const i = 2; //Điểm của final và midterm
//         const isFinalDone = data.final_score
//             ? data.final_score.score
//                 ? 1 : 0
//             : 0;
//         const isMidtermDone = data.midterm_score ? data.midterm_score.score ? 1 : 0 : 0;
//         if (data.component_scores) {
//             let total = 0;
//             data.component_scores.forEach((item) => {
//                 if (item.score) total += 1;
//             })
//             return (total + isFinalDone + isMidtermDone) * 100 / (data.component_scores.length + i);
//         }
//         return 0;

//     }

//     return (
//         data && <TouchableOpacity className=' h-auto  mt-4 ' onPress={onPress}>
//             <View className='flex-row items-center bg-white p-4'>
//                 <Image source={gradients_list[index % gradients_list.length]} width={50}
//                     height={50}
//                     className="w-16 h-16 mr-4  " />
//                 <View className='flex-1'>
//                     <Text className='font-light text-lg' style={{ color: iOSGrayColors.systemGray.accessibleDark }}>{data.subject_name}</Text>

//                     <Text className='text-base text-gray-600 font-light'>Score: {calculateScore(data)}</Text>
//                 </View>
//                 <View className='flex-row items-center  '>
//                     <CircularProgress
//                         size={60}
//                         progress={calculateProgress(data)}
//                         strokeWidth={5}
//                         backgroundColor="#e0e0e0"
//                         progressColor={getColor(data.status)}
//                     />

//                 </View>
//             </View>
//         </TouchableOpacity>
//     )
// }

// export default CourseItem