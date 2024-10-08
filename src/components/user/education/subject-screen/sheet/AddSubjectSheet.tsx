import React, { useEffect } from 'react'
import { Dimensions, KeyboardAvoidingView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FamilyImage from 'src/assets/images/household.png';
import ImageComponent from 'src/components/Image/Image';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
import * as ImagePicker from 'expo-image-picker';
import { EducationDetail, Subject } from 'src/interface/education/education';
// import PickImageSheet from 'src/screens/GuildLineScreen/PickImageSheet/PickImageSheet';
const AddSubjectSheet = ({ refRBSheet, setEducationDetailData, id_education_progress, id_family }: { refRBSheet: React.RefObject<any>, setEducationDetailData: React.Dispatch<React.SetStateAction<EducationDetail>>, id_education_progress: number, id_family: number }) => {
    // const refRBSheet = React.useRef<RBSheet>(null);
    const pickImageSheetRef = React.useRef<any>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const isKeyboardVisible = useKeyboardVisible();
    const nameInputRef = React.useRef<TextInput>(null);
    const descriptionInputRef = React.useRef<TextInput>(null);

    const handleAddSubject = () => {
        setEducationDetailData((prev: EducationDetail) => {
            return {
                ...prev,
                subjects_info: [
                    ...prev.subjects_info,
                    {
                        id_subject: 0,
                        subject_name: name,
                        description: "",
                        status: "in_progress",
                    },
                ],
            };
        });

        refRBSheet.current?.close()
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
                    ><Text className='text-blue-600 text-base pl-4'>Cancel</Text>
                    </TouchableOpacity>

                    <View>
                        <Text className='text-base font-semibold'>Add Subject</Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        handleAddSubject()
                    }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={
                        name === ""
                    }>
                        <Text className=' text-base font-semibold ' >Add</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={true} className='flex-1 ' keyboardShouldPersistTaps="handled" >
                        <View className='p-4'>

                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ccc",
                                    borderRadius: 5,
                                    marginBottom: 20,
                                    fontSize: 17,
                                    padding: 17,
                                }}
                                ref={nameInputRef}
                                editable
                                placeholder="Input subject name"
                                value={name}
                                onChangeText={(text) => setName(text)}
                                className='bg-white'
                                autoFocus
                            />


                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>

            </View>


        </RBSheet>
    )
}


export default AddSubjectSheet