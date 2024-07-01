import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {EducationScreenProps} from 'src/navigation/NavigationTypes';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'src/constants';
import EduImg from 'src/assets/images/education.png';
import CircularProgress from './CircularProgress';
import CourseItem from './CourseItem';
import MemberEducationItem from './MemberEducationItem';
import RBSheet from 'react-native-raw-bottom-sheet';

import {Education} from 'src/interface/education/education';
import {Member} from 'src/interface/member/member';
import {FamilyServices} from 'src/services/apiclient';
import AddMemberEducationSheet from './AddMemberEducationSheet/AddMemberEducationSheet';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const data = {
  message: 'Success',
  data: [
    {
      id_education_progress: 1,
      id_user: 'db31bfb8-ec15-4cb1-9cbe-ebe3edaca323',
      title: 'Discrete Mathematic',
      progress_notes: 'M',
      school_info: 'Hcmus',
      created_at: '2024-04-30T08:59:03.177Z',
      updated_at: '2024-04-30T08:59:03.177Z',
      avatar: '[NULL]',
      firstname: 'Tang',
      lastname: 'Long',
    },
  ],
};

const EducationScreen: React.FC<EducationScreenProps> = ({
  navigation,
  route,
}) => {
  const {id_family} = route.params;
  const [members, setMembers] = React.useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = React.useState<Member[]>([]);
  const [memberEducationData, setMemberEducationData] =
    React.useState<Education>();
  const [memberEducationDatas, setMemberEducationDatas] = React.useState<
    Education[]
  >([data.data[0]]);

  const bottomSheetRef = React.useRef<RBSheet>(null);

  useEffect(() => {
    const handleViewAllMember = async () => {
      try {
        const result = await FamilyServices.getAllMembers({id_family});
        setMembers(result);
        setFilteredMembers(result);
      } catch (error) {
        console.log('FamilyServices.getAllMembers error:', error);
      }
    };
    handleViewAllMember();
  }, []);

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View className="flex-1 bg-[#F7F7F7]">
        <View className="w-full  flex-row justify-between items-center py-3 bg-white">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" flex-row items-center">
            <Material
              name="chevron-left"
              size={30}
              style={{fontWeight: 'bold'}}
            />
            <Text className="text-lg font-semibold" style={{}}>
              Back
            </Text>
          </TouchableOpacity>
          <View className="mr-3">
            <TouchableOpacity
              onPress={() => {
                // refRBSheet.current?.open()
                bottomSheetRef.current?.open();
              }}>
              {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
              <Text className="text-lg font-semibold" style={{}}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className=" ">
          {memberEducationDatas != null ? (
            memberEducationDatas.map((item: Education, index: number) => {
              return (
                <React.Fragment key={index}>
                  <MemberEducationItem
                    data={item}
                    onPress={() => {
                      navigation.navigate('EducationDetail', {
                        id_education_progress: item.id_education_progress,
                        id_family: route.params.id_family,
                      });
                    }}
                  />
                </React.Fragment>
              );
            })
          ) : (
            <ActivityIndicator size={'small'} />
          )}
        </ScrollView>
        <AddMemberEducationSheet
          bottomSheetRef={bottomSheetRef}
          setMemberEducationDatas={setMemberEducationDatas}
          members={filteredMembers}
        />
      </View>
    </SafeAreaView>
  );
};

export default EducationScreen;
