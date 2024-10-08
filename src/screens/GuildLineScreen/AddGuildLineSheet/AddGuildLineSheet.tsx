import React from 'react'
import { Dimensions, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch } from 'react-redux';
import { COLORS } from 'src/constants';
import { Guildline } from 'src/interface/guideline/guideline';
import { addGuideline } from 'src/redux/slices/GuidelineSlice';
import { AppDispatch } from 'src/redux/store';

const AddGuildLineSheet = ({ refRBSheet }: { refRBSheet: React.RefObject<any> }) => {
    // const refRBSheet = React.useRef<RBSheet>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const dispatch = useDispatch<AppDispatch>();
    const handleAddGuildLine = () => {
        console.log("add guildline")
        // setGuidelines((prev: Guildline[]) => {
        //     return [...prev, {
        //         id_item: Math.floor(Math.random()) * 100,
        //         name: name,
        //         description: description,
        //         created_at: "",
        //         updated_at: ""
        //     }];
        // });
        dispatch(addGuideline(
            {
                id_guide_item: Math.floor(Math.random()) * 100,
                id_family: 96,
                name: name,
                description: description,
                created_at: "",
                updated_at: ""
            }))
        refRBSheet.current?.close();
    }
    return (
        <RBSheet
            ref={refRBSheet}
            closeOnPressMask={true}
            onClose={() => {
                setName("");
                setDescription("");
            }}
            customStyles={{
                draggableIcon: {
                    display: "none",
                },
                container: {
                    height: 'auto',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,

                }
            }}
            customModalProps={{
                animationType: 'slide'
            }}
        >
            {/* <KeyboardAvoidingView className='flex-1'>
                <ScrollView className='bg-[#f6f7f9] flex-1 h-auto p-[20px]  rounded-tl-xl rounded-tr-xl'>
                    
                </ScrollView>
            </KeyboardAvoidingView> */}
            <View className='bg-[#f6f7f9] p-[20px]  rounded-tl-xl rounded-tr-xl'>
                <Text className='text-xl  font-bold' style={{ color: COLORS.AuroMetalSaurus, marginBottom: 20, }}>Add New Guildline</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 5,
                        marginBottom: 20,
                        fontSize: 17,
                        padding: 17,
                    }}
                    editable
                    placeholder="Input guidelines name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    className='bg-white'
                    autoFocus
                />
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 5,
                        marginBottom: 20,
                        fontSize: 17,
                        padding: 17,
                    }}
                    placeholder="Input guidelines description (optional)"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    numberOfLines={4}
                    className='bg-white'
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.AuroMetalSaurus,
                        padding: 17,
                        borderRadius: 5,

                        alignItems: "center",
                    }}
                    onPress={() => {
                        // Xử lý logic khi nhấn nút "Save"
                        handleAddGuildLine()
                        refRBSheet.current?.close();
                    }}
                    className='mb-2'
                >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }} className=''>Save</Text>
                </TouchableOpacity>
            </View>
        </RBSheet>
    )
}

export default AddGuildLineSheet