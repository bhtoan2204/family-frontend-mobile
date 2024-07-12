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

// {
//   "message": "Success",
//   "data": [
//     {
//       "id_education_progress": 4,
//       "id_family": 96,
//       "id_user": "bd94ba3a-b046-4a05-a260-890913e09df9",
//       "title": "Figma Update",
//       "progress_notes": "75",
//       "school_info": "Truong doi",
//       "created_at": "2024-06-20T11:33:30.329Z",
//       "updated_at": "2024-07-07T10:29:24.048Z",
//       "subjects": [
//         {
//           "id_subject": 4,
//           "id_education_progress": 4,
//           "subject_name": "Math",
//           "description": "Mathematics",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 5,
//           "id_education_progress": 4,
//           "subject_name": "Xác xuất thống kê 2",
//           "description": "GVLT: Nguyễn Văn A, GVTH:  Phạm Thị B",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 6,
//           "id_education_progress": 4,
//           "subject_name": "Toán tổ hợp",
//           "description": "GVLT: Nguyễn Văn A, GVTH:  Phạm Thị B",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 3,
//           "id_education_progress": 4,
//           "subject_name": "Đại số tuyến tính",
//           "description": "GVLT: Nguyễn Văn A, GVTH:  Phạm Thị B",
//           "component_scores": [
//             {
//               "component_name": "Gg",
//               "score": 0
//             },
//             {
//               "component_name": "Gg",
//               "score": 0
//             }
//           ],
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 50,
//           "id_education_progress": 4,
//           "subject_name": "Figma",
//           "description": "",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 51,
//           "id_education_progress": 4,
//           "subject_name": "Ok",
//           "description": "",
//           "component_scores": [
//             {
//               "component_name": "Ok",
//               "score": 0
//             },
//             {
//               "component_name": "Ok",
//               "score": 0
//             }
//           ],
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         }
//       ],
//       "user": {
//         "firstname": "Toan",
//         "lastname": "Banh",
//         "avatar": "https://storage.googleapis.com/famfund-bucket/avatar/avatar_bd94ba3a-b046-4a05-a260-890913e09df9_1720550907750_8828FA52-8F39-4BEF-A8B9-E18C01880CC8.jpg",
//         "genre": "male",
//         "birthdate": "2002-06-20"
//       }
//     },
//     {
//       "id_education_progress": 6,
//       "id_family": 96,
//       "id_user": "28905675-858b-4a93-a283-205899779622",
//       "title": "Đại học năm 3",
//       "progress_notes": "Đại học năm 3 - HKII",
//       "school_info": "Đại học Khoa học Tự Nhiên",
//       "created_at": "2024-06-20T12:37:24.144Z",
//       "updated_at": "2024-06-20T12:37:24.144Z",
//       "subjects": [
//         {
//           "id_subject": 8,
//           "id_education_progress": 6,
//           "subject_name": "Xác xuất thống kê 2",
//           "description": "GVLT: Nguyễn Văn A, GVTH:  Phạm Thị B",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 7,
//           "id_education_progress": 6,
//           "subject_name": "Toán tổ hợp",
//           "description": "GVLT: Nguyễn Văn A, GVTH:  Phạm Thị B",
//           "component_scores": [
//             {
//               "component_name": "Hâh",
//               "score": 0
//             },
//             {
//               "component_name": "Hâh",
//               "score": 0
//             }
//           ],
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         }
//       ],
//       "user": {
//         "firstname": "Hiền",
//         "lastname": "Thu",
//         "avatar": "https://storage.googleapis.com/famfund-bucket/avatar/avatar_28905675-858b-4a93-a283-205899779622_1717948664029_77E37648-6EDA-406D-920A-2B32C9E3F0F5.jpg",
//         "genre": "male",
//         "birthdate": "2006-10-21"
//       }
//     },
//     {
//       "id_education_progress": 1,
//       "id_family": 96,
//       "id_user": "bd94ba3a-b046-4a05-a260-890913e09df9",
//       "title": "stringgg",
//       "progress_notes": "testtttt",
//       "school_info": "testtttt",
//       "created_at": "2024-06-19T17:57:02.288Z",
//       "updated_at": "2024-06-22T06:53:18.254Z",
//       "subjects": [
//         {
//           "id_subject": 9,
//           "id_education_progress": 1,
//           "subject_name": "Math 1",
//           "description": "Mathematics 2",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 10,
//           "id_education_progress": 1,
//           "subject_name": "Math 3",
//           "description": "",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 1,
//           "id_education_progress": 1,
//           "subject_name": "Math 2",
//           "description": "Mathematics",
//           "component_scores": [
//             {
//               "component_name": "Homework 4",
//               "score": 8.9
//             },
//             {
//               "component_name": "Homework 1",
//               "score": 8.9
//             },
//             {
//               "component_name": "Homework 1",
//               "score": 8.9
//             },
//             {
//               "component_name": "Homework 1",
//               "score": 8.9
//             }
//           ],
//           "midterm_score": 10,
//           "final_score": 10,
//           "bonus_score": 10,
//           "status": "done"
//         }
//       ],
//       "user": {
//         "firstname": "Toan",
//         "lastname": "Banh",
//         "avatar": "https://storage.googleapis.com/famfund-bucket/avatar/avatar_bd94ba3a-b046-4a05-a260-890913e09df9_1720550907750_8828FA52-8F39-4BEF-A8B9-E18C01880CC8.jpg",
//         "genre": "male",
//         "birthdate": "2002-06-20"
//       }
//     },
//     {
//       "id_education_progress": 10,
//       "id_family": 96,
//       "id_user": "db31bfb8-ec15-4cb1-9cbe-ebe3edaca323",
//       "title": "Oki",
//       "progress_notes": "Ko",
//       "school_info": "Hcmus",
//       "created_at": "2024-06-22T07:24:49.439Z",
//       "updated_at": "2024-06-22T07:24:49.439Z",
//       "subjects": [
//         {
//           "id_subject": 11,
//           "id_education_progress": 10,
//           "subject_name": "Ee",
//           "description": "",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 12,
//           "id_education_progress": 10,
//           "subject_name": "Tesr",
//           "description": "",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 13,
//           "id_education_progress": 10,
//           "subject_name": "Tt",
//           "description": "",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 14,
//           "id_education_progress": 10,
//           "subject_name": "Pop",
//           "description": "",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         },
//         {
//           "id_subject": 15,
//           "id_education_progress": 10,
//           "subject_name": "Pipi",
//           "description": "",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         }
//       ],
//       "user": {
//         "firstname": "Tang",
//         "lastname": "Long",
//         "avatar": "https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
//         "genre": "male",
//         "birthdate": "2007-08-18"
//       }
//     },
//     {
//       "id_education_progress": 11,
//       "id_family": 96,
//       "id_user": "db31bfb8-ec15-4cb1-9cbe-ebe3edaca323",
//       "title": "Math 10",
//       "progress_notes": "K",
//       "school_info": "Hcmus",
//       "created_at": "2024-06-26T11:27:43.550Z",
//       "updated_at": "2024-06-26T11:27:43.550Z",
//       "subjects": [
//         {
//           "id_subject": 16,
//           "id_education_progress": 11,
//           "subject_name": "M1",
//           "description": "",
//           "component_scores": [
//             {
//               "component_name": "Quiz 1",
//               "score": 0
//             },
//             {
//               "component_name": "Quiz 1",
//               "score": 0
//             },
//             {
//               "component_name": "Quiz 1",
//               "score": 0
//             },
//             {
//               "component_name": "Quiz",
//               "score": 0
//             },
//             {
//               "component_name": "quiz",
//               "score": 0
//             }
//           ],
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         }
//       ],
//       "user": {
//         "firstname": "Tang",
//         "lastname": "Long",
//         "avatar": "https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
//         "genre": "male",
//         "birthdate": "2007-08-18"
//       }
//     },
//     {
//       "id_education_progress": 47,
//       "id_family": 96,
//       "id_user": "bd94ba3a-b046-4a05-a260-890913e09df9",
//       "title": "Giang Test Education",
//       "progress_notes": "De lam UI",
//       "school_info": "Truong Doi",
//       "created_at": "2024-07-08T23:54:42.151Z",
//       "updated_at": "2024-07-08T23:54:42.151Z",
//       "subjects": [
//         {
//           "id_subject": 52,
//           "id_education_progress": 47,
//           "subject_name": "Figma",
//           "description": "Giang hoc Figma",
//           "component_scores": null,
//           "midterm_score": null,
//           "final_score": null,
//           "bonus_score": null,
//           "status": "in_progress"
//         }
//       ],
//       "user": {
//         "firstname": "Toan",
//         "lastname": "Banh",
//         "avatar": "https://storage.googleapis.com/famfund-bucket/avatar/avatar_bd94ba3a-b046-4a05-a260-890913e09df9_1720550907750_8828FA52-8F39-4BEF-A8B9-E18C01880CC8.jpg",
//         "genre": "male",
//         "birthdate": "2002-06-20"
//       }
//     },
//     {
//       "id_education_progress": 44,
//       "id_family": 96,
//       "id_user": "101627d7-019e-4a58-b8c0-b30806db3780",
//       "title": "ádasdasd",
//       "progress_notes": "ádasdasd",
//       "school_info": "ádasdasd",
//       "created_at": "2024-07-02T19:24:45.207Z",
//       "updated_at": "2024-07-02T19:24:45.207Z",
//       "subjects": [],
//       "user": {
//         "firstname": "Dương",
//         "lastname": "Phạm",
//         "avatar": "https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
//         "genre": "male",
//         "birthdate": "2001-12-15"
//       }
//     },
//     {
//       "id_education_progress": 45,
//       "id_family": 96,
//       "id_user": "101627d7-019e-4a58-b8c0-b30806db3780",
//       "title": "ádasdasd",
//       "progress_notes": "ádasdasd",
//       "school_info": "ádasdasd",
//       "created_at": "2024-07-02T19:24:45.465Z",
//       "updated_at": "2024-07-02T19:24:45.465Z",
//       "subjects": [],
//       "user": {
//         "firstname": "Dương",
//         "lastname": "Phạm",
//         "avatar": "https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
//         "genre": "male",
//         "birthdate": "2001-12-15"
//       }
//     }
//   ],
//   "total": 8
// }