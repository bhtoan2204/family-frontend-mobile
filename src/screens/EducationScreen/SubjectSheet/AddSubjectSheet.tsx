import React, { useEffect } from 'react'
import { Dimensions, KeyboardAvoidingView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FamilyImage from 'src/assets/images/household.png';
import ImageComponent from 'src/components/Image/Image';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
import * as ImagePicker from 'expo-image-picker';
import { Subject } from 'src/interface/education/education';
// import PickImageSheet from 'src/screens/GuildLineScreen/PickImageSheet/PickImageSheet';
const AddSubjectSheet = ({ refRBSheet, setSubjectDetailData, id_education_progress, id_family, id_subject }: { refRBSheet: React.RefObject<RBSheet>, setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>, id_education_progress: number, id_family: number, id_subject: number }) => {
    // const refRBSheet = React.useRef<RBSheet>(null);
    const pickImageSheetRef = React.useRef<RBSheet>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const isKeyboardVisible = useKeyboardVisible();
    const nameInputRef = React.useRef<TextInput>(null);
    const descriptionInputRef = React.useRef<TextInput>(null);

    const handleAddComponentScore = () => {
        setSubjectDetailData((prev) => {
            return {
                ...prev,
                component_scores: [
                    ...prev.component_scores,
                    {
                        component_name: name,
                        expected_score: null,
                        score: null,
                        id_family: id_family,
                        id_education_progress: id_education_progress,
                        id_subject: id_subject
                    }
                ]
            }

        })

        refRBSheet.current?.close()
    }




    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown
            closeOnPressBack
            dragFromTopOnly
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
                        handleAddComponentScore()
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