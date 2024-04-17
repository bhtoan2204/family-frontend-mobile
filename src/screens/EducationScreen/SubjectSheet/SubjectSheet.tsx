import React from 'react'
import { Dimensions, TouchableOpacity, View, Text } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Picker } from '@react-native-picker/picker';
const SubjectSheet = ({ bottomSheetRef, setExpected, setScore, expected, score }: { bottomSheetRef: React.RefObject<RBSheet>, setExpected: React.Dispatch<React.SetStateAction<number>>, setScore: React.Dispatch<React.SetStateAction<number>>, expected: number, score: number }) => {
    const setExpectedSheetRef = React.useRef<RBSheet>(null);
    const setScoreSheetRef = React.useRef<RBSheet>(null);
    const [selectedLanguage, setSelectedLanguage] = React.useState();
    const numbers = [];
    for (let i = 0; i <= 100; i++) {
        numbers.push(i);
    }

    return (
        <RBSheet
            ref={bottomSheetRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
                container: {
                    backgroundColor: "white",
                    height: Dimensions.get("window").height / 3 + 50,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                draggableIcon: {
                    display: "none",
                }
            }}
        >
            <View className='flex-col p-6 h-full bg-[#fafafa] justify-center'>
                <TouchableOpacity className='h-16 mb-6 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={() => {
                    // bottomSheetRef.current?.close()
                    setExpectedSheetRef.current?.open()
                    // await handleTakePhoto()

                }}>
                    <Text className='text-lg font-semibold'>Set expect score</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-16 mb-6 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={() => {
                    // bottomSheetRef.current?.close()
                    setScoreSheetRef.current?.open()    
                    // await handleTakePhoto()

                }}>
                    <Text className='text-lg font-semibold'>Set score</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-16 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={async () => {
                    // await handlePickImage()

                }}>
                    <Text className='text-lg font-semibold text-red-600'>Delete this</Text>
                </TouchableOpacity>
            </View>
            <RBSheet
                ref={setExpectedSheetRef}
                closeOnDragDown={false}
                // closeOnDragDown={true}
                // closeOnPressMask={true}
                customStyles={{
                    container: {
                        backgroundColor: "white",
                        height: Dimensions.get("window").height / 3 + 50,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        display: "none",
                    }
                }}>

                <View className='flex-col p-6 h-full bg-[#fafafa] justify-center'>
                    <Text className='text-lg font-semibold'>Set expect score</Text>
                    <Picker
                        selectedValue={expected}
                        onValueChange={(itemValue, itemIndex) =>
                            setExpected(itemValue || 0)
                        }>

                        {
                            numbers.map((item, index) => {
                                return <Picker.Item key={index} label={item.toString()} value={item} />

                            })
                        }
                    </Picker>
                </View>
            </RBSheet>
            <RBSheet
                ref={setScoreSheetRef}
                closeOnDragDown={false}
                // closeOnDragDown={true}
                // closeOnPressMask={true}
                customStyles={{
                    container: {
                        backgroundColor: "white",
                        height: Dimensions.get("window").height / 3 + 50,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        display: "none",
                    }
                }}>

                <View className='flex-col p-6 h-full bg-[#fafafa] justify-center'>
                    <Text className='text-lg font-semibold'>Set expect score</Text>
                    <Picker
                        selectedValue={score}
                        onValueChange={(itemValue, itemIndex) =>
                            setScore(itemValue || 0)
                        }>

                        {
                            numbers.map((item, index) => {
                                return <Picker.Item key={index} label={item.toString()} value={item} />

                            })
                        }
                    </Picker>
                </View>
            </RBSheet>
        </RBSheet>
    )
}

export default SubjectSheet