import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { COLORS } from 'src/constants'
// import SubjectSheet from '../SubjectSheet/SubjectSheet'
import { ComponentScore, Subject } from 'src/interface/education/education'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'

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
        <TouchableOpacity className='flex-row items-center  border-b-[1px] border-t-[1px]  border-gray-200 dark:border-[#232A3D] bg-white dark:bg-[#0A1220]' onPress={() => {
            bottomSheetRef.current?.expand()
        }}>
            <View className='flex-1 py-6 ml-4 bg-[FFFFFE]'>
                <Text className='text-xl font-light text-[#2F2F34] dark:text-white'>
                    Add a component score
                </Text>
            </View>
            <View className=' w-36 items-center border-l-[1px] border-gray-200 dark:border-[#232A3D] py-6 px-5 bg-[#f8f7fd] dark:bg-[#252D3B]'>
                <Text className='  text-base text-[#2F2F34] dark:text-white' >
                    click</Text><Text className=' text-base mt-1 text-[#2F2F34] dark:text-white'>here</Text>

            </View>


        </TouchableOpacity>
    )
}

export default SubjectItemEmpty