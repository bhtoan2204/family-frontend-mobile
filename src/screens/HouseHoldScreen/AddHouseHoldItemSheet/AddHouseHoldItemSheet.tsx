import React from 'react'
import { Dimensions, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
const AddHouseHoldItemSheet = ({ refRBSheet, setHouseHoldItem }: { refRBSheet: React.RefObject<RBSheet>, setHouseHoldItem: React.Dispatch<React.SetStateAction<HouseHoldItemInterface[]>> }) => {
    // const refRBSheet = React.useRef<RBSheet>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const handleAddGuildLine = () => {
        console.log("add guildline")

        refRBSheet.current?.close();
    }
    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown
            closeOnPressBack
            dragFromTopOnly
            closeOnPressMask
            // minClosingHeight={Dimensions.get("window").height * 0.5}
            height={Dimensions.get("window").height * 0.95}
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
                        <Text className='text-base font-semibold'>HouseHold</Text>
                    </View>

                    <TouchableOpacity onPress={() => {

                    }} className='pr-4'>
                        <Text className=' text-base font-semibold' style={{ color: COLORS.primary }}>Add</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={true} className='flex-1 ' >
                    <View className='p-4'>
                        <View className='flex-col'>
                            <Text className='text-base font-semibold'>Name</Text>
                            <TextInput
                                style={{ borderBottomColor: COLORS.primary, borderBottomWidth: 1, color: COLORS.primary }}
                                placeholder="Enter name"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View className='flex-col mt-4'>
                            <Text className='text-base font-semibold'>Description</Text>
                            <TextInput
                                style={{ borderBottomColor: COLORS.primary, borderBottomWidth: 1, color: COLORS.primary }}
                                placeholder="Enter description"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>

        </RBSheet>
    )
}

export default AddHouseHoldItemSheet