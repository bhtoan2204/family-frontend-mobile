import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native'
import { EducationDetailScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
// import CourseItem from './CourseItem';
import { EducationDetail, Subject } from 'src/interface/education/education';
import AddSubjectSheet from './SubjectSheet/AddSubjectSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { gradients_list } from 'src/assets/images/gradients';
import CourseItem from 'src/components/user/education/course-item';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { ActivityIndicator } from 'react-native-paper';
import { iOSGrayColors } from 'src/constants/ios-color';
// const data = {
//     "message": "Success",
//     "data": [
//         {
//             "id_education_progress": 3,
//             "education_progress_info": {
//                 "id_education_progress": 3,
//                 "id_family": 96,
//                 "id_user": "db31bfb8-ec15-4cb1-9cbe-ebe3edaca323",
//                 "title": "Học trên trường",
//                 "progress_notes": "tình hình ko ổn, lười học quá",
//                 "created_at": "2024-04-09T04:29:20.875637",
//                 "updated_at": "2024-04-09T04:39:57.716122",
//                 "school_info": "địa chỉ cơ sở 2 nguyễn văn cừ, đh khoa học tự nhiên"
//             },
//             "subjects_info": [
//                 {
//                     "id_subject": 6,
//                     "subject_name": "Introduction to Statistics",
//                     "description": "Stanford's \"Introduction to Statistics\" teaches you statistical thinking concepts that are essential for learning from data and communicating insights.",
//                     "status": "in_progress"
//                 },
//                 {
//                     "id_subject": 4,
//                     "subject_name": "Discrete mathematics",
//                     "description": "Discrete mathematics is the study of mathematical structures that can be considered \"discrete\" rather than \"continuous\". Objects studied in discrete mathematics include integers, graphs, and statements in logic.",
//                     "status": "done"
//                 }
//             ]
//         }
//     ]
// }
const { height: screenHeight } = Dimensions.get("screen")
const EducationDetailScreen: React.FC<EducationDetailScreenProps> = ({ navigation, route }) => {
  const { id_education_progress, id_family } = route.params
  const educationDetailData = useSelector((state: RootState) => state.educations).find((item) => item.id_education_progress === id_education_progress)
  // const [educationDetailData, setEducationDetailData] = React.useState<EducationDetail>(data.data[0])
  const refRBSheet = React.useRef<any>(null);

  if (!educationDetailData == null) {
    return <ActivityIndicator size="large" color={COLORS.AuroMetalSaurus} />
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      <View className="flex-1 bg-[#F7F7F7]">
        <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
          <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
            <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
            <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Back</Text>
          </TouchableOpacity>
          <View className='mr-3'>
            <TouchableOpacity onPress={() => {
              // refRBSheet.current?.open()
              navigation.navigate("AddSubject", {
                id_family: id_family,
                id_education_progress: id_education_progress,
              })
            }} >
              {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
              <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className=' '>
          {
            educationDetailData && educationDetailData.subjects.map((item: Subject, index: number) => {
              return (
                <React.Fragment key={index}>
                  {/* <CourseItem data={item} onPress={() => {
                                        navigation.navigate('SubjectDetail', {
                                            id_education_progress,
                                            id_family,
                                            id_subject: item.id_subject
                                        })

                                    }}
                                        img={gradients_list[Math.floor(Math.random() * gradients_list.length)]} /> */}
                  <CourseItem data={item} onPress={() => {
                    navigation.navigate('SubjectDetail', {
                      id_education_progress,
                      id_family,
                      id_subject: item.id_subject
                    })
                  }}
                    index={index}
                  />

                </React.Fragment>
              )
            })
          }

          {
            educationDetailData && educationDetailData.subjects.length == 0 && (
              <TouchableOpacity activeOpacity={0.65} className='flex-1  mt-4  rounded-lg bg-white' onPress={() => {
                navigation.navigate("AddSubject", {
                  id_family: id_family,
                  id_education_progress: id_education_progress,
                })
              }}>
                <View className=' flex-row items-center  p-4'>
                  <View className="w-16 h-16 mr-4  items-center justify-center">
                    <Material name="plus" size={20} style={{ fontWeight: "bold" }} />
                  </View>
                  <Text className='text-lg ' >Add a subject</Text>
                </View>
              </TouchableOpacity>
            )
          }

        </ScrollView>

        {/* <AddSubjectSheet refRBSheet={refRBSheet}
                    id_education_progress={id_education_progress}
                    id_family={id_family!}
                    setEducationDetailData={setEducationDetailData}
                /> */}

      </View>
    </SafeAreaView>

  )
}

export default EducationDetailScreen