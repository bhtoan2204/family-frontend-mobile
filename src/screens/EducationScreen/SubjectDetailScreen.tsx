import React from 'react'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import { SubjectDetailScreenProps } from 'src/navigation/NavigationTypes';
import SubjectItem from './SubjectItem/SubjectItem';
const data = {
    "message": "Success",
    "data": [
        {
            "id_subject": 6,
            "subject_name": "Introduction to Statistics",
            "description": "Stanford's \"Introduction to Statistics\" teaches you statistical thinking concepts that are essential for learning from data and communicating insights.",
            "component_scores": {},
            "midterm_score": 0,
            "final_score": 0,
            "bonus_score": 0,
            "status": "in_progress"
        }
    ]
}
const SubjectDetailScreen: React.FC<SubjectDetailScreenProps> = ({ navigation, route }) => {
    const { id_education_progress, id_family, id_subject } = route.params
    // console.log({ id_education_progress, id_family, id_subject })
    const getFirstLetterSubject = (subject: string) => {
        var str = subject.split(" ");
        return str[0]
    }
    return (
        <View className="flex-1 bg-[#F7F7F7]">
            <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View>
                    <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>{getFirstLetterSubject(data.data[0].subject_name)}</Text>
                </View>
                <View className='mr-3'>
                    <TouchableOpacity onPress={() => {
                        // refRBSheet.current?.open()
                    }} >
                        {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                        <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='h-28 bg-white border-b-[1px] border-gray-200'>
                <View className='flex-row h-full p-2 bg-[#FFFFFE]'>
                    <View className='flex-1 border-r-[1px] border-gray-200  flex-col  items-center'>
                        <Text className='text-base  text-opacity-0 font-medium' style={{ color: COLORS.primary }}  >Current grades</Text>
                        <View className='mt-2'>
                            <Text className='text-4xl font-light' style={{ color: COLORS.primary }} >91.6</Text>
                        </View>
                    </View>
                    <View className='flex-1   flex-col  items-center'>
                        <Text className='text-base  font-medium'  >Target grades</Text>
                        <View className='border-b-[1px] mt-2 border-[#56409e]'>
                            <Text className='text-4xl font-light' >90</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView className=' '>
                <View className='my-3'>
                    <Text className='ml-4 mb-3 text-lg font-medium'>Final & Mid</Text>
                    <SubjectItem isGraded={false} title={"Final"} />
                    <SubjectItem isGraded={false} title={"Mid term"} />
                </View>
                
                <View className='mb-3'>
                    <Text className='ml-4 mb-3 text-lg font-medium'>Others</Text>
                    <SubjectItem isGraded={true} title='Homework 1' />
                    <SubjectItem isGraded={true} title='Homework 2' />
                    <SubjectItem isGraded={false} title='Homework 3' />
                </View>



            </ScrollView>

        </View>
    )
}

export default SubjectDetailScreen