import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { EducationScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import EduImg from 'src/assets/images/education.png'
import CircularProgress from './CircularProgress';
import CourseItem from './CourseItem';
import MemberEducationItem from './MemberEducationItem';
import RBSheet from 'react-native-raw-bottom-sheet';
import MemberLongPressSheet from './MemberLongPressSheet/MemberLongPressSheet';
import MemberDetailSheet from './MemberDetailSheet/MemberDetailSheet';
import { Education } from 'src/interface/education/education';

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
        }
    ]
}

const EducationScreen: React.FC<EducationScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    const bottomSheetRef = React.useRef<RBSheet>(null);

    const [memberEducationData, setMemberEducationData] = React.useState<Education>()
    useEffect(() => {
        console.log('Education Screen')
    }, [])

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

                <MemberEducationItem data={data.data[0]} onPress={() => {
                    navigation.navigate('EducationDetail', {
                        id_education_progress: data.data[0].id_education_progress,
                        id_family: route.params.id_family,
                    })
                }} />
            </ScrollView>
            <MemberLongPressSheet bottomSheetRef={bottomSheetRef} memberEducationData={memberEducationData} />

        </View>
    )
}

export default EducationScreen