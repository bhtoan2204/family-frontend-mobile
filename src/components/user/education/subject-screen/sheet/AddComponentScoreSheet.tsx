import React, { useEffect } from 'react'
import { Dimensions, KeyboardAvoidingView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FamilyImage from 'src/assets/images/household.png';
import ImageComponent from 'src/components/Image/Image';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
import * as ImagePicker from 'expo-image-picker';
import { Subject } from 'src/interface/education/education';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { addComponentScoreToSubject } from 'src/redux/slices/EducationSlice';
import { iOSColors } from 'src/constants/ios-color';
import EducationServices from 'src/services/apiclient/EducationService';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
// import PickImageSheet from 'src/screens/GuildLineScreen/PickImageSheet/PickImageSheet';

interface AddComponentScoreSheetProps {
    refRBSheet: React.RefObject<any>;
    // setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>;
    id_education_progress: number;
    id_family: number;
    id_subject: number;

}

const AddComponentScoreSheet = ({ refRBSheet, id_education_progress, id_family, id_subject }: AddComponentScoreSheetProps) => {
    // const refRBSheet = React.useRef<RBSheet>(null);
    const pickImageSheetRef = React.useRef<any>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const isKeyboardVisible = useKeyboardVisible();
    const nameInputRef = React.useRef<TextInput>(null);
    const descriptionInputRef = React.useRef<TextInput>(null);
    const dispatch = useDispatch<AppDispatch>();
    const isDarkMode = useSelector(getIsDarkMode)
    const handleAddComponentScore = async () => {
        // setSubjectDetailData((prev) => {
        //     return {
        //         ...prev,
        //         component_scores: [
        //             ...prev.component_scores,
        //             {
        //                 component_name: name,
        //                 expected_score: null,
        //                 score: null,
        //                 id_family: id_family,
        //                 id_education_progress: id_education_progress,
        //                 id_subject: id_subject
        //             }
        //         ]
        //     }

        // })
        console.log(id_subject
            , id_education_progress
            , id_family
            , name
            , 0)
        const res = await EducationServices.addComponentScore(
            id_subject
            , id_education_progress
            , id_family
            , name
            , 0
        )
        if (res) {
            dispatch(addComponentScoreToSubject({
                component_name: name,
                // expected_score: null,
                score: 0,
                id_subject: id_subject,
                id_family: id_family,
                id_education_progress: id_education_progress,

            }))
            refRBSheet.current?.close()
        }
        else {
            console.log("error")
            refRBSheet.current?.close()
        }
    }




    return (
        <RBSheet
            ref={refRBSheet}
            closeOnPressBack
            closeOnPressMask
            // minClosingHeight={Dimensions.get("window").height * 0.5}
            // height={Dimensions.get("window").height * 0.6}
            customStyles={{
                container: {
                    backgroundColor: "#F6F7F9",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                },
                draggableIcon: {
                    // borderBlockColor: "#0000",
                    display: "none",
                }
            }}
            onClose={() => {
                setName("")
                setDescription("")
            }}
        >
            <View className='flex-1 '>
                <View className='w-full  flex-row justify-between items-center py-4 z-10 ' >
                    <TouchableOpacity
                        onPress={() => {
                            refRBSheet.current?.close()
                        }}
                    ><Text className=' text-base pl-4'
                        style={{
                            color: iOSColors.systemRed.defaultLight
                        }}
                    >Cancel</Text>
                    </TouchableOpacity>

                    <View>
                        <Text className='text-base font-semibold'>Add Component Score</Text>
                    </View>

                    <TouchableOpacity onPress={async () => {
                        await handleAddComponentScore()
                    }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={
                        name === ""
                    }>
                        <Text className=' text-base font-semibold ' >Add</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={true} className='flex-1 ' keyboardShouldPersistTaps="handled" >
                        <View className='p-4'>

                            <TextInputPaper
                                outlineColor='transparent'
                                label={"Component Name"}

                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ccc",
                                    borderRadius: 5,
                                    marginBottom: 20,
                                    fontSize: 17,
                                    paddingLeft: 17,
                                    paddingVertical: 13,
                                }}
                                ref={nameInputRef}
                                editable
                                placeholder="Input subject name"
                                value={name}
                                onChangeText={(text) => setName(text)}
                                className='bg-white'
                                autoFocus
                                returnKeyLabel='done'
                                returnKeyType='done'
                                onSubmitEditing={async () => {
                                    await handleAddComponentScore()
                                    // refRBSheet.current?.close()
                                }}
                            />

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>

            </View>


        </RBSheet>
    )
}


export default AddComponentScoreSheet