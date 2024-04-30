import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { COLORS } from 'src/constants'
import SubjectSheet from '../SubjectSheet/SubjectSheet'
import { ComponentScore, Subject } from 'src/interface/education/education'

const SubjectItem = ({ isGraded, subjectComponentData, setSubjectDetailData, index }: { isGraded: boolean, subjectComponentData: ComponentScore, setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>, index: number }) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [isGradded, setIsGradded] = React.useState(isGraded)
    // const [expected, setExpected] = React.useState<number | null>(subjectComponentData.expected_score)
    // const [score, setScore] = React.useState<number | null>(subjectComponentData.score)

    const bottomSheetRef = React.useRef<RBSheet>(null)
    React.useEffect(() => {
        if (subjectComponentData.score !== 0) setIsGradded(true)
        else setIsGradded(false)
    }, [subjectComponentData])

    return (
        <TouchableOpacity className='flex-row items-center  border-b-[1px] border-gray-200 bg-white' onPress={() => {
            bottomSheetRef.current?.open()
        }}>
            <View className='flex-1 py-6 ml-4 bg-[FFFFFE]'>
                <Text className='text-2xl font-light'>{subjectComponentData.component_name}</Text>
            </View>
            <View className=' w-36 items-center border-l-[1px] border-gray-200 py-6 px-5 bg-[#f8f7fd]'>

                {
                    isGradded ?
                        <><Text className='  text-base opacity-40' style={{ color: COLORS.primary }}>score</Text><Text className=' text-[#918D92] text-xl mt-1 opacity-40'>{subjectComponentData.score} / 10</Text></> :

                        <><Text className='  text-base' style={{ color: COLORS.primary }}>need</Text><Text className='  text-xl mt-1'>{subjectComponentData.expected_score}</Text></>
                }

            </View>

            <SubjectSheet bottomSheetRef={bottomSheetRef} subjectComponentData={subjectComponentData} index={index} setSubjectDetailData={setSubjectDetailData} />
        </TouchableOpacity>
    )
}

export default SubjectItem