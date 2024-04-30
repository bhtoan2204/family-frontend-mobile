import React from 'react'
import { Dimensions, TouchableOpacity, View, Text } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Picker } from '@react-native-picker/picker';
import { ComponentScore, Subject } from 'src/interface/education/education';
const SubjectSheet = ({ bottomSheetRef, subjectComponentData, index, setSubjectDetailData }: { bottomSheetRef: React.RefObject<RBSheet>, subjectComponentData: ComponentScore, index: number, setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>> }) => {
    const setExpectedSheetRef = React.useRef<RBSheet>(null);
    const setScoreSheetRef = React.useRef<RBSheet>(null);
    const [selectedLanguage, setSelectedLanguage] = React.useState();
    const numbers = [];

    for (let i = 0; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            const number = i + j * 0.1;
            numbers.push(Math.round(number * 10) / 10);
        }
    }
    numbers.push(10);

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

                    if (index === -1) {
                        setSubjectDetailData((prev) => {
                            return {
                                ...prev,
                                final_score: {
                                    ...prev.final_score,
                                    score: null,
                                    expected_score: null
                                }
                            }
                        })
                    } else if (index === -2) {
                        setSubjectDetailData((prev) => {
                            return {
                                ...prev,
                                midterm_score: {
                                    ...prev.midterm_score,
                                    score: null,
                                    expected_score: null
                                }
                            }
                        })
                    } else {
                        setSubjectDetailData((prev) => {
                            return {
                                ...prev,
                                component_scores: prev.component_scores.map((item, i) => {
                                    if (i === index) {
                                        return {
                                            ...item,
                                            score: null,
                                            expected_score: null
                                        }
                                    }
                                    return item
                                })
                            }
                        })

                    }
                    bottomSheetRef.current?.close()
                }}>
                    <Text className='text-lg font-semibold text-red-600'>Clear data</Text>
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
                    <Text className='text-lg font-semibold'>Set expected score</Text>
                    <Picker
                        selectedValue={subjectComponentData.expected_score}
                        onValueChange={(itemValue) =>
                        // setExpected(itemValue || 0)
                        {
                            if (index === -1) {
                                setSubjectDetailData((prev) => {
                                    return {
                                        ...prev,
                                        final_score: {
                                            ...prev.final_score,
                                            expected_score: itemValue
                                        }
                                    }
                                })
                            } else if (index === -2) {
                                setSubjectDetailData((prev) => {
                                    return {
                                        ...prev,
                                        midterm_score: {
                                            ...prev.midterm_score,
                                            expected_score: itemValue
                                        }
                                    }
                                })
                            } else {
                                setSubjectDetailData((prev) => {
                                    return {
                                        ...prev,
                                        component_scores: prev.component_scores.map((item, i) => {
                                            if (i === index) {
                                                return {
                                                    ...item,
                                                    expected_score: itemValue
                                                }
                                            }
                                            return item
                                        })
                                    }
                                })

                            }
                        }
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
                    <Text className='text-lg font-semibold'>Set  score</Text>
                    <Picker
                        selectedValue={subjectComponentData.score}
                        onValueChange={(itemValue) => {
                            if (index === -1) {
                                setSubjectDetailData((prev) => {
                                    return {
                                        ...prev,
                                        final_score: {
                                            ...prev.final_score,
                                            score: itemValue
                                        }
                                    }
                                })
                            } else if (index === -2) {
                                setSubjectDetailData((prev) => {
                                    return {
                                        ...prev,
                                        midterm_score: {
                                            ...prev.midterm_score,
                                            score: itemValue
                                        }
                                    }
                                })
                            } else {
                                setSubjectDetailData((prev) => {
                                    return {
                                        ...prev,
                                        component_scores: prev.component_scores.map((item, i) => {
                                            if (i === index) {
                                                return {
                                                    ...item,
                                                    score: itemValue
                                                }
                                            }
                                            return item
                                        })
                                    }
                                })

                            }
                        }
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