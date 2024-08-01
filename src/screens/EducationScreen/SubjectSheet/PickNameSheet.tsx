import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native'
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import { Picker } from '@react-native-picker/picker';
import { ComponentScore, Subject } from 'src/interface/education/education';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { updateComponentScoreOfSubject, updateNameOfComponentScore } from 'src/redux/slices/EducationSlice';
interface PickScoreSheetProps {
    setNameSheetRef: React.RefObject<any>;
    // setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>;
    name: string;
    index: number;
    id_family: number;
    id_education_progress: number;
    id_subject: number;
    onSuccess: () => void;
    onFailed: () => void;
}

const isNumberInRange = (numberString: string) => {
    const number = parseFloat(numberString);
    if (isNaN(number)) {
        return false;
    }
    return number >= 0 && number <= 10;
};

const PickNameSheet = ({ setNameSheetRef, name, index, id_education_progress, id_family, id_subject, onFailed, onSuccess }: PickScoreSheetProps) => {


    const [inputValue, setInputValue] = React.useState<string>(name || '0')
    const [isFocus, setIsFocus] = React.useState<boolean>(false)
    const [isValid, setIsValid] = React.useState<boolean>(isNumberInRange(inputValue))
    const inputRef = React.useRef<TextInput>(null)
    const dispatch = useDispatch<AppDispatch>();

    const handleFocus = () => {
        setIsFocus(true)
    }

    const handleBlur = () => {
        setIsFocus(false)
    }

    React.useEffect(() => {
        setIsValid(isNumberInRange(inputValue))
    }, [inputValue])

    const showText = (numberString: string) => {
        const number = parseFloat(numberString);
        if (!isNaN(number)) {
            if (number >= 0 && number <= 10) {
                if (number % 1 === 0) {
                    return `Actual ${number}.0`;
                } else {
                    return `Actual ${number}`;
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
        dispatch(updateNameOfComponentScore({
            id_subject: id_subject!,
            id_education_progress: id_education_progress,
            name: inputValue,
            index: index
        }))
        setNameSheetRef.current?.close()
        onSuccess();
        if (index === -1) {
            // dispatch(updateComponentScoreOfSubject({

            // }))
            // setSubjectDetai  lData((prev) => {
            //     return {
            //         ...prev,
            //         final_score: {
            //             ...prev.final_score,
            //             score: parseFloat(inputValue)
            //         }
            //     }
            // })

        } else if (index === -2) {
            // setSubjectDetailData((prev) => {
            //     return {
            //         ...prev,
            //         midterm_score: {
            //             ...prev.midterm_score,
            //             score: parseFloat(inputValue)
            //         }
            //     }
            // })
        } else {
            // setSubjectDetailData((prev) => {
            //     return {
            //         ...prev,
            //         component_scores: prev.component_scores.map((item, i) => {
            //             if (i === index) {
            //                 return {
            //                     ...item,
            //                     score: parseFloat(inputValue)
            //                 }
            //             }
            //             return item
            //         })
            //     }
            // })

        }
    }

    return (
        <RBSheet
            ref={setNameSheetRef}
            closeOnPressBack
            closeOnPressMask
            // height={Dimensions.get("window").height / 3 + 75}
            // closeOnPressBack
            customStyles={{
                container: {
                    backgroundColor: "#F5F6F7",
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
                setInputValue(name || '')
            }}
        >

            <View className='flex-1 '>
                <View className='flex-row items-center justify-between top-[-10] mb-6  z-[100000] pt-6 px-6' >
                    <TouchableOpacity onPress={() => {
                        // setScoreSheetRef.current?.close()
                    }} >
                        {/* <Text className='text-base font-semibold' style={{
                            color: iOSColors.systemRed.defaultDark
                        }}>Cancel</Text> */}
                    </TouchableOpacity >
                    <Text className='text-base font-semibold '>Update name </Text>
                    <TouchableOpacity onPress={() => {
                        // if (isNumberInRange(inputValue)) {
                        //     handleSave()
                        //     setScoreSheetRef.current?.close()
                        // }
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
                            {/* <Text style={{
                                color: iOSColors.systemBlue.defaultLight,
                                fontWeight: '500',
                                marginBottom: 10,
                                marginLeft: 5,
                                fontSize: 16
                            }}>Score {'( 0 - 10 )'}</Text> */}
                            <TextInput
                                returnKeyType={inputValue != "" ? "done" : "done"}
                                keyboardType='default'
                                value={inputValue}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                autoFocus
                                editable
                                placeholder={`Update new name. Old name: ${name}`}
                                multiline={false}
                                onChangeText={(text) => {
                                    console.log(parseFloat(text) <= 10 && parseFloat(text) >= 0)
                                    setInputValue(text)
                                }}
                                onSubmitEditing={(event) => {
                                    if (inputValue != "") {
                                        handleSave()
                                    }
                                }}
                                style={{
                                    borderColor: isFocus ? iOSColors.systemBlue.defaultDark : iOSGrayColors.systemGray3.defaultLight,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginBottom: 15,
                                    fontSize: 17,
                                    padding: 17,
                                    backgroundColor: "#fff"

                                }}
                            />
                            {
                                inputValue == "" && <Text style={{
                                    color: iOSGrayColors.systemGray3.defaultDark,
                                    fontWeight: '500',
                                    marginBottom: 10,
                                    marginLeft: 5,
                                    fontSize: 15
                                }}>
                                    <Text style={{
                                        color: iOSColors.systemRed.defaultDark
                                    }}>Name cannot be empty</Text>
                                </Text>
                            }
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>


        </RBSheet>
    )
}

export default PickNameSheet