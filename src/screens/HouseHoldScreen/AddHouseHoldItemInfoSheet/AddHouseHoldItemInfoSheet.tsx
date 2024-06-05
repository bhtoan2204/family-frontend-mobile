import React from 'react'
import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import { Guildline } from 'src/interface/guideline/guideline';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { iOSGrayColors } from 'src/constants/ios-color';
import StepIndicator from './StepIndicator';
interface AddHouseHoldItemInfoSheetProps {
    refRBSheet: React.RefObject<any>;
}

const step = [
    {
        title: "Step 0",
        description: "Intro"
    },
    {
        title: "Step 1",
        description: "Add item name and description"
    },
    {
        title: "Step 2",
        description: "Add item image"
    }

]

const AddHouseHoldItemInfoSheet = ({ refRBSheet }: AddHouseHoldItemInfoSheetProps) => {
    // const refRBSheet = React.useRef<RBSheet>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [step, setStep] = React.useState(0);
    const handleAddGuildLine = () => {
        console.log("add guildline")

        refRBSheet.current?.close();
    }
    return (
        <SafeAreaView>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <RBSheet
                ref={refRBSheet}
                closeOnPressMask={true}
                height={Dimensions.get('window').height * 1}
                onClose={() => {
                    setName("");
                    setDescription("");
                }}

                customStyles={{

                    container: {
                        // height: 'auto',
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,

                    }
                }}
            >

                <View className='bg-[#F9F6F2] p-[20px]  rounded-tl-xl rounded-tr-xl flex-1'>
                    <TouchableOpacity className='absolute top-10 right-2 p-1 rounded-full border-[1px] z-10' style={{
                        borderColor: iOSGrayColors.systemGray.accessibleDark,
                        backgroundColor: iOSGrayColors.systemGray.accessibleLight
                    }} onPress={() => {
                        refRBSheet.current?.close()
                        console.log(1)
                    }} >
                        <Material name="close" size={23} color={'white'} />
                    </TouchableOpacity>
                    <View className='flex-1'>
                        <View className='w-full items-center mt-5'>
                            <Material name="package-variant" size={35} style={{ color: iOSGrayColors.systemGray6.accessibleDark, fontWeight: "bold" }} />
                            <Text className='' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 20,
                                fontWeight: 'bold'

                            }}>Add more info</Text>
                        </View>
                        {/* <Text>3-Step indicator here</Text> */}
                        <View className='w-full justify-center items-center my-3'>
                            <StepIndicator currentStep={step} />
                        </View>

                    </View>
                </View>
            </RBSheet>
        </SafeAreaView>
    )
}

export default AddHouseHoldItemInfoSheet