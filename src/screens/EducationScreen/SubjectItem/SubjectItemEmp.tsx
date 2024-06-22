import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { COLORS } from 'src/constants'
import SubjectSheet from '../SubjectSheet/SubjectSheet'
import { ComponentScore, Subject } from 'src/interface/education/education'

interface SubjectItemProps {
    id_education_progress: number,
    id_family: number,
    id_subject: number,
    // setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>,
    index: number,
    bottomSheetRef: React.RefObject<any>
}

const SubjectItemEmpty = ({ index, id_education_progress, id_family, id_subject, bottomSheetRef }: SubjectItemProps) => {
    return (
        <TouchableOpacity className='flex-row items-center  border-b-[1px] border-gray-200 bg-white' onPress={() => {
            bottomSheetRef.current?.open()
        }}>
            <View className='flex-1 py-6 ml-4 bg-[FFFFFE]'>
                <Text className='text-xl font-light'>
                    Add a component score
                </Text>
            </View>
            <View className=' w-36 items-center border-l-[1px] border-gray-200 py-6 px-5 bg-[#f8f7fd]'>
                <Text className='  text-base' style={{ color: COLORS.AuroMetalSaurus }}>
                    click</Text><Text className='  text-base mt-1'>here</Text>

            </View>


        </TouchableOpacity>
    )
}

export default SubjectItemEmpty