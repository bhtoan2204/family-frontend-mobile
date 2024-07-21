import React, { useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import { Picker } from '@react-native-picker/picker';
import { ComponentScore, Subject } from 'src/interface/education/education';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { updateComponentScoreOfSubject, updateExpectedScoreOfSubject } from 'src/redux/slices/EducationSlice';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';

interface PickExpectedScoreSheetProps {
    id_family: number;
    id_education_progress: number;
    id_subject: number;
    setExpectedSheetRef: React.RefObject<any>;
    // setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>;
    score: number | null;
    index: number;
}
const isNumberInRange = (numberString: string) => {
    const number = parseFloat(numberString);
    if (isNaN(number)) {
        return false;
    }
    return number >= 0 && number <= 10;
};



const PickExpectedScoreSheet = ({ setExpectedSheetRef, score, index, id_family, id_education_progress, id_subject }: PickExpectedScoreSheetProps) => {

    const [inputValue, setInputValue] = React.useState<string>(score?.toString() || '0')
    const [isFocus, setIsFocus] = React.useState<boolean>(false)
    const [isValid, setIsValid] = React.useState<boolean>(isNumberInRange(inputValue))
    const inputRef = React.useRef<TextInput>(null)
    const dispatch = useDispatch<AppDispatch>();
    const isDarkMode = useSelector(getIsDarkMode)


    useEffect(() => {
        setIsValid(isNumberInRange(inputValue))
    }, [inputValue])

    const handleFocus = () => {
        setIsFocus(true)
    }

    const handleBlur = () => {
        setIsFocus(false)
    }



    const showText = (numberString: string) => {
        const number = parseFloat(numberString);
        if (!isNaN(number)) {
            if (number >= 0 && number <= 10) {
                if (number % 1 === 0) {
                    return `Expected ${number}.0`;
                } else {
                    return `Expected ${number}`;
                }
            }
            else {
                return "Invalid input";
            }
        } else {
            return "Invalid input";
        }
    };
    const handleSave = () => {
        dispatch(updateExpectedScoreOfSubject({
            id_subject: id_subject!,
            id_education_progress: id_education_progress,
            score: parseFloat(inputValue),
            index: index
        }))
        // if (index === -1) {
        //     dispatch(updateComponentScoreOfSubject({
        //         id_subject: id_subject!,
        //         id_education_progress: id_education_progress,
        //         score: parseFloat(inputValue),
        //         index: index
        //     }))
        //     setSubjectDetailData((prev) => {
        //         return {
        //             ...prev,
        //             final_score: {
        //                 ...prev.final_score,
        //                 expected_score: parseFloat(inputValue)
        //             }
        //         }
        //     })
        // } else if (index === -2) {
        //     setSubjectDetailData((prev) => {
        //         return {
        //             ...prev,
        //             midterm_score: {
        //                 ...prev.midterm_score,
        //                 expected_score: parseFloat(inputValue)
        //             }
        //         }
        //     })
        // } else {
        //     setSubjectDetailData((prev) => {
        //         return {
        //             ...prev,
        //             component_scores: prev.component_scores.map((item, i) => {
        //                 if (i === index) {
        //                     return {
        //                         ...item,
        //                         expected_score: parseFloat(inputValue)
        //                     }
        //                 }
        //                 return item
        //             })
        //         }
        //     })

        // }
    }


    return (


        <RBSheet
            ref={setExpectedSheetRef}
            closeOnPressBack
            closeOnPressMask
            // height={Dimensions.get("window").height / 3 + 75}
            // closeOnPressBack
            customStyles={{
                container: {
                    backgroundColor: isDarkMode ? "#0A1220" : "#F7F7F7",
                    borderTopRightRadius: Dimensions.get("window").width * 0.03,
                    borderTopLeftRadius: Dimensions.get("window").width * 0.03
                    ,
                },
                draggableIcon: {
                    // borderBlockColor: "#0000",
                    display: "none",
                }
                // draggableIcon: {
                //     display: "none",
                // }
            }}
            onClose={() => {
                setInputValue(score?.toString() || '0')
            }}
        >

            <View className='flex-1 '>
                <View className='flex-row items-center justify-between top-[-10] mb-6  z-[100000] pt-6 px-6' >
                    <TouchableOpacity onPress={() => {
                        setExpectedSheetRef.current?.close()
                    }} >
                        {/* <Text className='text-base font-semibold' style={{
                            color: iOSColors.systemRed.defaultDark
                        }}>Cancel</Text> */}
                    </TouchableOpacity >
                    <Text className='text-base font-semibold '>Set expected score </Text>
                    <TouchableOpacity onPress={() => {
                        if (isNumberInRange(inputValue)) {
                            handleSave()
                            setExpectedSheetRef.current?.close()
                        }
                    }}>
                        {/* <Text className='text-base font-semibold'
                            style={{
                                color: iOSColors.systemBlue.defaultDark
                            }}
                        >Save</Text> */}
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView className="flex-1  " behavior={
                    Platform.OS === "ios" ? "padding" : "height"
                }>
                    <ScrollView showsVerticalScrollIndicator={true} className='flex-1 ' keyboardShouldPersistTaps="handled">
                        <View className='px-6'>
                            <Text style={{
                                color: iOSColors.systemBlue.defaultLight,
                                fontWeight: '500',
                                marginBottom: 10,
                                marginLeft: 5,
                                fontSize: 16
                            }}>Expected Score {'( 0 - 10 )'}</Text>
                            <TextInput
                                returnKeyType={isValid ? "done" : 'next'}
                                keyboardType='numeric'
                                value={inputValue}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                autoFocus
                                editable
                                placeholder="Input expectation score"
                                multiline={false}
                                onChangeText={(text) => {
                                    // console.log(parseFloat(text) <= 10 && parseFloat(text) >= 0)
                                    console.log(isValid)
                                    setInputValue(text)
                                }}
                                onSubmitEditing={(event) => {
                                    if (isNumberInRange(event.nativeEvent.text)) {
                                        handleSave()
                                        setExpectedSheetRef.current?.close()
                                    }
                                }}
                                placeholderTextColor={!isDarkMode ? '#b0b0b0' : '#A6A6A6'}
                                style={{
                                    borderColor: isFocus ? iOSColors.systemBlue.defaultDark : iOSColors.systemBlue.defaultDark,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginBottom: 15,
                                    fontSize: 17,
                                    padding: 17,
                                    backgroundColor: isDarkMode ? "#171A21" : "#F7F7F7",
                                    color: !isDarkMode ? '#b0b0b0' : '#A6A6A6'
                                }}
                            />
                            <Text style={{
                                color: iOSGrayColors.systemGray3.defaultDark,
                                fontWeight: '500',
                                marginBottom: 10,
                                marginLeft: 5,
                                fontSize: 15
                            }}>
                                <Text style={{
                                    color: !isValid ? iOSColors.systemRed.defaultDark : (isDarkMode ? 'white' : 'black')
                                }}>{showText(inputValue)}</Text>
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>


        </RBSheet>

    )
}

export default PickExpectedScoreSheet