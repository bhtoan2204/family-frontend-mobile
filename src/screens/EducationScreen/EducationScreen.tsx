import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, StatusBar } from 'react-native'
import { EducationScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import EduImg from 'src/assets/images/education.png'
// import CircularProgress from './CircularProgress';
// import CourseItem from './CourseItem';
// import MemberEducationItem from './MemberEducationItem';
import RBSheet from 'react-native-raw-bottom-sheet';

import { Education } from 'src/interface/education/education';
import { Member } from 'src/interface/member/member';
import { FamilyServices } from 'src/services/apiclient';
import AddMemberEducationSheet from './AddMemberEducationSheet/AddMemberEducationSheet';
import { ActivityIndicator } from 'react-native-paper';
import MemberEducationItem from 'src/components/user/education/member-education-item';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { clearEducation, deleteEducation, setEducation } from 'src/redux/slices/EducationSlice';
import { clearMembers, setMembers } from 'src/redux/slices/MemberSlice';
import EducationServices from 'src/services/apiclient/EducationService';

const data = {
  "message": "Success",
  "data": [
    {
      "id_education_progress": 1,
      "id_user": "db31bfb8-ec15-4cb1-9cbe-ebe3edaca323",
      "title": "Discrete Mathematic",
      "progress_notes": "M",
      "school_info": "Hcmus",
      "created_at": "2024-04-30T08:59:03.177Z",
      "updated_at": "2024-04-30T08:59:03.177Z",
      "avatar": "[NULL]",
      "firstname": "Tang",
      "lastname": "Long"
    },
    {
      "id_education_progress": 2,
      "id_user": "db31bfb8-ec15-4cb1-9cbe-ebe3edaca323",
      "title": "Discrete Mathematic",
      "progress_notes": "M",
      "school_info": "Đại học Khoa học Tự Nhiên ÁDASDASDASDASDADASD",
      "created_at": "2024-04-30T08:59:03.177Z",
      "updated_at": "2024-04-30T08:59:03.177Z",
      "avatar": "[NULL]",
      "firstname": "Toan",
      "lastname": "Banh"
    }
  ]
}

const data2 = {
  "message": "Success",
  "data": [
    {
      "id_education_progress": 1,
      "id_family": 96,
      "id_user": "bd94ba3a-b046-4a05-a260-890913e09df9",
      "title": "string",
      "progress_notes": "test",
      "school_info": "test",
      "created_at": "2024-06-19T17:57:02.288Z",
      "updated_at": "2024-06-19T18:04:27.588Z",
      "subjects": [
        {
          "id_subject": 1,
          "id_education_progress": 1,
          "subject_name": "Math 2",
          "description": "Mathematics",
          "component_scores": [
            {
              "component_name": "Homework 4",
              "score": 8.9
            },
            {
              "component_name": "Homework 1",
              "score": 8.9
            }
          ],
          "midterm_score": null,
          "final_score": null,
          "bonus_score": null,
          "status": "done"
        }
      ],
      "user": {
        "firstname": "Toan",
        "lastname": "Banh",
        "avatar": "https://storage.googleapis.com/famfund-bucket/avatar/avatar_bd94ba3a-b046-4a05-a260-890913e09df9_1718554422671_A19FB315-F97A-429B-AB36-E9BFDA2CB5D4.jpg",
        "genre": "male",
        "birthdate": "2024-06-13"
      }
    },
    {
      "id_education_progress": 3,
      "id_family": 96,
      "id_user": "bd94ba3a-b046-4a05-a260-890913e09df9",
      "title": "Đại học năm 3",
      "progress_notes": "Đại học năm 3 - HKII",
      "school_info": "Đại học Khoa học Tự Nhiên",
      "created_at": "2024-06-20T10:42:46.935Z",
      "updated_at": "2024-06-20T10:51:16.334Z",
      "subjects": [],
      "user": {
        "firstname": "Toan",
        "lastname": "Banh",
        "avatar": "https://storage.googleapis.com/famfund-bucket/avatar/avatar_bd94ba3a-b046-4a05-a260-890913e09df9_1718554422671_A19FB315-F97A-429B-AB36-E9BFDA2CB5D4.jpg",
        "genre": "male",
        "birthdate": "2024-06-13"
      }
    }
  ],
  "total": 2
}
const EducationScreen: React.FC<EducationScreenProps> = ({ navigation, route }) => {
  const { id_family } = route.params
  // const [members, setMembers] = React.useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = React.useState<Member[]>([])
  const [memberEducationData, setMemberEducationData] = React.useState<Education>()
  // const [memberEducationDatas, setMemberEducationDatas] = React.useState<Education[]>(data2.data)
  const dispatch = useDispatch<AppDispatch>()
  const memberEducationDatas = useSelector((state: RootState) => state.educations)
  const bottomSheetRef = React.useRef<any>(null);

  useEffect(() => {
    const handleFetchAllMember = async () => {
      try {
        const result = await FamilyServices.getAllMembers({ id_family });
        console.log('FamilyServices.getAllMembers result:', result);
        dispatch(setMembers(result as Member[]))
        // setMembers(result as Member[]);
        // setFilteredMembers(result)
      } catch (error) {
        console.log('FamilyServices.getAllMembers error:', error);
      }
    };
    handleFetchAllMember()

    return () => {
      dispatch(clearMembers())
    }
  }, [])


  useEffect(() => {
    const handleFetchEducation = async () => {
      //api call here
      // const edu = data2.data;
      const educationsData = await EducationServices.getAllEducation(id_family!);
      const edu = educationsData.map((education: any) => {
        return {
          ...education,
          subjects: education.subjects.map((subject: any) => {
            return {
              ...subject,
              midterm_score: {
                component_name: 'Midterm',
                score: subject.midterm_score,
              },
              final_score: {
                component_name: 'Final',
                score: subject.final_score,
              },
            };
          }),
        };
      }) as Education[];
      dispatch(setEducation(edu))
    }
    handleFetchEducation()

    return () => {
      dispatch(clearEducation())
    }
  }, [])

  // useEffect(() => {
  //     if (memberEducationDatas != null) {
  //         const filteredMembersArray = []
  //         memberEducationDatas.forEach((item) => {
  //             if (members != null) {
  //                 members.forEach((member) => {
  //                     if (item.id_user == member.id_user) {
  //                         filteredMembersArray.push(member)
  //                     }
  //                 })
  //             }
  //         })

  //     }
  // }, [memberEducationDatas, members])

  if (memberEducationDatas == null) {
    return <ActivityIndicator size={"small"} />
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]" >

      <View className="flex-1 bg-[#F7F7F7]">
        <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
          <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
            <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
            <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Back</Text>
          </TouchableOpacity>
          <View className='mr-3'>
            <TouchableOpacity onPress={() => {
              // refRBSheet.current?.open()
              // bottomSheetRef.current?.open()
              navigation.navigate('AddEducation', {
                id_family
              })
            }} >
              {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
              <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className=' '>
          {
            memberEducationDatas != null ? memberEducationDatas.map((item: Education, index: number) => {
              return (
                <React.Fragment key={index}>
                  {/* <MemberEducationItem data={item} onPress={() => {
                                        navigation.navigate('EducationDetail', {
                                            id_education_progress: item.id_education_progress,
                                            id_family: route.params.id_family,
                                        })
                                    }} /> */}
                  <MemberEducationItem data={item} onPress={() => {
                    navigation.navigate('EducationDetail', {
                      id_education_progress: item.id_education_progress,
                      id_family: route.params.id_family,
                    })
                  }}
                    index={index}
                    handleNavigationEdit={
                      () => {
                        navigation.navigate('EditEducation', {
                          id_education_progress: item.id_education_progress,
                          id_family: id_family,
                          title: item.title,
                          school_info: item.school_info,
                          progress_notes: item.progress_notes,
                        })
                      }}
                    handleDeleteEducation={
                      async () => {
                        await EducationServices.deleteEducation(item.id_education_progress, id_family!)
                      }
                    }
                  />
                </React.Fragment>
              )
            }) : <ActivityIndicator size={"small"} />

          }

        </ScrollView>
        {/* <AddMemberEducationSheet bottomSheetRef={bottomSheetRef} setMemberEducationDatas={setMemberEducationDatas} members={filteredMembers} /> */}

      </View>
    </SafeAreaView>
  )
}

export default EducationScreen