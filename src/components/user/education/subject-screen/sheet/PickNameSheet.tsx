import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native'
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import { Picker } from '@react-native-picker/picker';
import { ComponentScore, Subject } from 'src/interface/education/education';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AppDispatch } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateComponentScoreOfSubject, updateNameOfComponentScore } from 'src/redux/slices/EducationSlice';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import EducationServices from 'src/services/apiclient/EducationService';
import { getTranslate } from 'src/redux/slices/languageSlice';
interface PickScoreSheetProps {
    setNameSheetRef: React.RefObject<any>;
    // setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>;
    name: string;
    targetScore: number | null;
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

const PickNameSheet = ({ setNameSheetRef, name, targetScore, index, id_education_progress, id_family, id_subject, onFailed, onSuccess }: PickScoreSheetProps) => {


    const [inputValue, setInputValue] = React.useState<string>(name || '0')
    const [isFocus, setIsFocus] = React.useState<boolean>(false)
    const [isValid, setIsValid] = React.useState<boolean>(isNumberInRange(inputValue))
    const inputRef = React.useRef<TextInput>(null)
    const dispatch = useDispatch<AppDispatch>();
    const isDarkMode = useSelector(getIsDarkMode)
    const translate = useSelector(getTranslate)
    const handleFocus = () => {
        setIsFocus(true)
    }

    const handleBlur = () => {
        setIsFocus(false)
    }

    React.useEffect(() => {
        setIsValid(isNumberInRange(inputValue))
    }, [inputValue])

    const handleSaveApi = React.useCallback(async ({
        id_subject,
        id_education_progress,
        name,
        index
    }: {
        id_subject: number,
        id_education_progress: number,
        name: string,
        index: number
    }) => {
        const res = await EducationServices.updateComponentScoreData({
            id_subject: id_subject,
            id_education_progress: id_education_progress,
            id_family: id_family,
            component_name: name,
            target_score: targetScore !== null ? targetScore : 0,
            // target_score: 
            index: index
        })
        if (res) {
            onSuccess()
        } else {
            onFailed()
        }
    }, [])

    const handleSave = React.useCallback(async ({
        id_subject,
        id_education_progress,
        name,
        index
    }: {
        id_subject: number,
        id_education_progress: number,
        name: string,
        index: number
    }) => {
        dispatch(updateNameOfComponentScore({
            id_subject: id_subject!,
            id_education_progress: id_education_progress,
            name: name,
            index: index
        }))
        setNameSheetRef.current?.close()
        await handleSaveApi({
            id_subject: id_subject!,
            id_education_progress: id_education_progress,
            name: name,
            index: index
        })
    }, [])

    return (
        <RBSheet
            ref={setNameSheetRef}
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
                setInputValue(name || '')
            }}
        >

            <View className='flex-1 '>
                <View className='flex-row items-center justify-between top-[-10] mb-6  z-[100000] pt-6 px-6 ' >
                    <TouchableOpacity onPress={() => {
                        // setScoreSheetRef.current?.close()
                    }} >
                        {/* <Text className='text-base font-semibold' style={{
                            color: iOSColors.systemRed.defaultDark
                        }}>Cancel</Text> */}
                    </TouchableOpacity >
                    <Text className='text-base font-semibold text-black dark:text-white'>{
                        translate("subject_screen_update_name")
                    }</Text>
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
                                placeholderTextColor={!isDarkMode ? '#b0b0b0' : '#A6A6A6'}
                                placeholder={`${translate('subject_screen_update_name_placeholder')} ${name}`}
                                multiline={false}
                                onChangeText={(text) => {
                                    console.log(parseFloat(text) <= 10 && parseFloat(text) >= 0)
                                    setInputValue(text)
                                }}
                                onSubmitEditing={async (event) => {
                                    if (inputValue != "") {
                                        await handleSave({
                                            id_subject,
                                            id_education_progress,
                                            index,
                                            name: inputValue

                                        })
                                    }
                                }}
                                style={{
                                    borderColor: isFocus ? iOSColors.systemBlue.defaultDark : iOSGrayColors.systemGray3.defaultLight,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginBottom: 15,
                                    fontSize: 17,
                                    padding: 17,
                                    backgroundColor: isDarkMode ? "#171A21" : "#F7F7F7",
                                    color: !isDarkMode ? '#b0b0b0' : '#A6A6A6'

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
                                    }}>{
                                            translate("subject_screen_invalid_name")

                                        }</Text>
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