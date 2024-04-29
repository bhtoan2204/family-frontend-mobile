import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { COLORS } from 'src/constants'
import SubjectSheet from '../SubjectSheet/SubjectSheet'

const SubjectItem = ({ isGraded, title }: { isGraded: boolean, title: string }) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [isGradded, setIsGradded] = React.useState(isGraded)
    const [expected, setExpected] = React.useState(100)
    const [score, setScore] = React.useState(0)
    const bottomSheetRef = React.useRef<RBSheet>(null)
    React.useEffect(() => {
        if (score !== 0) setIsGradded(true)
        else setIsGradded(false)
    }, [score])
    return (
        <TouchableOpacity className='flex-row items-center  border-b-[1px] border-gray-200 bg-white' onPress={() => {
            bottomSheetRef.current?.open()
        }}>
            <View className='flex-1 py-6 ml-4 bg-[FFFFFE]'>
                <Text className='text-2xl font-light'>{title}</Text>
            </View>
            <View className=' w-36 items-center border-l-[1px] border-gray-200 py-6 px-5 bg-[#f8f7fd]'>

                {
                    isGradded ?
                        <><Text className='  text-base opacity-40' style={{ color: COLORS.primary }}>score</Text><Text className=' text-[#918D92] text-xl mt-1 opacity-40'>{score} / 100</Text></> :

                        <><Text className='  text-base' style={{ color: COLORS.primary }}>need</Text><Text className='  text-xl mt-1'>{expected}</Text></>
                }

            </View>

            <SubjectSheet bottomSheetRef={bottomSheetRef} setExpected={setExpected} setScore={setScore} expected={expected} score={score} />
        </TouchableOpacity>
    )
}

export default SubjectItem