import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { COLORS } from 'src/constants'
import SubjectSheet from '../SubjectSheet/SubjectSheet'
import { ComponentScore, Subject } from 'src/interface/education/education'

interface SubjectItemProps {
    isGraded?: boolean,
    subjectComponentData: ComponentScore | null,
    id_education_progress: number,
    id_family: number,
    id_subject: number,
    // setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>,
    index: number
}

const SubjectItem = ({ isGraded, subjectComponentData, index, id_education_progress, id_family, id_subject }: SubjectItemProps) => {
    // const [isEditing, setIsEditing] = React.useState(false)
    const [isGradded, setIsGradded] = React.useState(subjectComponentData == null ? false : subjectComponentData.score !== null)
    // const [expected, setExpected] = React.useState<number | null>(subjectComponentData.expected_score)
    // const [score, setScore] = React.useState<number | null>(subjectComponentData.score)

    const bottomSheetRef = React.useRef<any>(null)
    React.useEffect(() => {
        if (subjectComponentData) {
            if (subjectComponentData.score !== null) setIsGradded(true)
            else setIsGradded(false)
        }
    }, [subjectComponentData])

    return (
        subjectComponentData ? <TouchableOpacity className='flex-row items-center  border-b-[1px] border-gray-200 dark:border-[#232A3D] bg-white dark:bg-[#0A1220]' onPress={() => {
            bottomSheetRef.current?.open()
        }}>
            <View className='flex-1 py-6 ml-4 '>
                <Text className='text-2xl font-light text-[#2F2F34] dark:text-white'>
                    {subjectComponentData.component_name}
                </Text>
            </View>
            <View className=' w-36 items-center border-l-[1px] border-gray-200 dark:border-[#232A3D] py-6 px-5 bg-[#f8f7fd] dark:bg-[#252D3B]'>
                {
                    isGradded ?
                        <><Text className='  text-base opacity-40 text-[#2F2F34] dark:text-white' >score</Text><Text className=' text-[#918D92] text-xl mt-1 opacity-40'>{subjectComponentData.score} / 10</Text></>
                        :
                        <><Text className='  text-base text-[#2F2F34] dark:text-white' >need</Text><Text className='text-[#2F2F34] dark:text-white  text-xl mt-1'>{subjectComponentData.expected_score || 0}</Text></>
                }

            </View>

            <SubjectSheet
                id_education_progress={id_education_progress}
                id_family={id_family}
                id_subject={id_subject}
                bottomSheetRef={bottomSheetRef}
                subjectComponentData={subjectComponentData}
                index={index} />
        </TouchableOpacity> : <TouchableOpacity className='flex-row items-center  border-b-[1px] border-gray-200 bg-white' onPress={() => {
            bottomSheetRef.current?.open()
        }}>
            <View className='flex-1 py-6 ml-4 bg-[FFFFFE]'>
                <Text className='text-2xl font-light text-[#2F2F34] dark:text-white'>
                    Error
                </Text>
            </View>
            <View className=' w-36 items-center border-l-[1px] border-gray-200 py-6 px-5 bg-[#f8f7fd]'>
                {
                    isGradded ?
                        <><Text className='  text-base opacity-40 text-[#2F2F34] dark:text-white' >score</Text><Text className=' text-[#918D92] text-xl mt-1 opacity-40'>0 / 10</Text></>
                        :
                        <><Text className='  text-base text-[#2F2F34] dark:text-white' >need</Text><Text className='  text-xl mt-1'>0</Text></>
                }

            </View>


        </TouchableOpacity>
    )
}

export default SubjectItem