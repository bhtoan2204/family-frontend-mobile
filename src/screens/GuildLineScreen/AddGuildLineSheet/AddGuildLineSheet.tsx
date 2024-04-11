import React from 'react'
import { Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import { Guildline } from 'src/interface/guideline/guideline';

const AddGuildLineSheet = ({ refRBSheet, setGuidelines }: { refRBSheet: React.RefObject<RBSheet>, setGuidelines: React.Dispatch<React.SetStateAction<Guildline[]>> }) => {
    // const refRBSheet = React.useRef<RBSheet>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const handleAddGuildLine = () => {
        console.log("add guildline")
        setGuidelines((prev: Guildline[]) => {
            return [...prev, {
                id_item: Math.floor(Math.random()) * 100,
                name: name,
                description: description,
                created_at: "",
                updated_at: ""
            }];
        });
        refRBSheet.current?.close();
    }
    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            onClose={() => {
                setName("");
                setDescription("");
            }}
            
            customStyles={{
                container: {
                    backgroundColor: "#F6F7F9",
                    padding: 20,
                    height: "auto",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                draggableIcon: {
                    // borderBlockColor: "#0000",
                    display: "none",
                }
            }}
        >
            <Text className='text-xl  font-bold' style={{ color: COLORS.primary, marginBottom: 20, }}>Add New Guildline</Text>
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
                    backgroundColor: COLORS.primary,
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
        </RBSheet>
    )
}

export default AddGuildLineSheet