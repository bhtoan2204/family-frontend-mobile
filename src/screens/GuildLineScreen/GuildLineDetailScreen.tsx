import React, { useEffect, useState } from 'react'
import { View, Text, Animated, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { COLORS } from 'src/constants';
import Img from 'src/assets/images/guildline.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { GuildLineDetail, Step } from 'src/interface/guideline/guideline';
import GuildLineService from 'src/services/apiclient/GuildLineService';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
const screenWidth = Dimensions.get('window').width;
const GuildLineDetailScreen = ({ navigation, route }: any) => {
    const { id_item, id_family } = route.params
    const [currentStep, setCurrentStep] = useState(0)
    const [guildLineDetail, setGuildLineDetail] = useState<GuildLineDetail>()
    const [guildLineSteps, setGuildLineSteps] = useState<Step[]>()
    const [loading, setLoading] = useState(true)
    const [previousStep, setPreviousStep] = useState(0)
    const [isAdding, setIsAdding] = useState(false)
    const bottomSheetRef = React.useRef<RBSheet>(null);
    useEffect(() => {
        const fetchGuildLineDetail = async () => {
            try {
                const response = await GuildLineService.getGuildLineDetail(id_family, id_item); // API call to fetch guildline detail
                setGuildLineDetail(response);
                if (response && response.steps) {
                    setGuildLineSteps(response.steps)
                }
                console.log(response)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching guildline detail:', error);
            }
        };
        fetchGuildLineDetail();
    }, [])
    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }
    const prevStep = () => {
        setCurrentStep(currentStep <= 0 ? 0 : currentStep - 1)
    }
    const handleIsAddingGuildLine = async () => {
        // Thêm bước mới vào mảng
        const newStep: Step = {
            name: "",
            description: "",
            imageUrl: ""
        }
        setGuildLineSteps([...(guildLineSteps || []), newStep]);
        console.log([...(guildLineSteps || []), newStep]);

        setPreviousStep(currentStep);

        setCurrentStep(guildLineSteps ? guildLineSteps.length : 0);

        setIsAdding(true);
    };

    const handleCancelAddStep = () => {
        console.log(guildLineSteps?.filter((step, index) => index !== guildLineSteps.length - 1));
        setGuildLineSteps(guildLineSteps?.filter((step, index) => index !== guildLineSteps.length - 1));
        setCurrentStep(previousStep);
        setIsAdding(false);
    };

    const handleSaveAddStep = async () => {
        setIsAdding(false);
        setCurrentStep(previousStep);
        const newStep = guildLineSteps?.filter((step, index) => index === guildLineSteps.length - 1)[0];
        if (newStep) {
            await GuildLineService.addStepGuildLine(id_family, id_item, newStep);
        }
        console.log(newStep)
    }
    if (loading) {
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="small" />;
    }

    const handleTakePhoto = async () => {
        console.log("Take photo")
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                console.log(result.assets[0].uri);
                setGuildLineSteps((prev) => {
                    return prev?.map((step, index) => {
                        if (index === currentStep) {
                            return {
                                ...step,
                                imageUrl: result.assets[0].uri
                            }
                        }
                        return step
                    })

                })
            }
            bottomSheetRef.current?.close()
        } else {
            alert('Permission to access camera was denied');
        }
    }

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                console.log(currentStep - 1)
                setGuildLineSteps((prev) => {
                    return prev?.map((step, index) => {
                        if (index === currentStep) {
                            return {
                                ...step,
                                imageUrl: result.assets[0].uri
                            }
                        }
                        return step
                    })

                })
                console.log(result.assets[0].uri);
            }
            bottomSheetRef.current?.close()
        }
        else {
            alert('Permission to access camera was denied');
        }
    }

    return (
        <View className='flex-1 bg-[#fff] items-center '>
            <View className='w-full  flex-row justify-between items-center py-3 z-10' >
                {
                    isAdding ? <TouchableOpacity
                        onPress={() => {
                            handleCancelAddStep()
                        }}
                    ><Text className='text-red-600 text-lg ml-3'>Cancel</Text></TouchableOpacity> : <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                        <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                        <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text>
                    </TouchableOpacity>
                }
                <View className='mr-3'>
                    {
                        isAdding ? <TouchableOpacity onPress={() => {
                            handleSaveAddStep()
                        }}>
                            <Text className=' text-lg ' style={{ color: COLORS.primary }}>Save</Text>
                        </TouchableOpacity> : <TouchableOpacity onPress={() => {
                            handleIsAddingGuildLine()
                        }}>
                            <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <KeyboardAvoidingView className=' h-full flex flex-col items-center mt-3 ' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {
                    guildLineSteps && <>
                        <View className='h-[50%] w-[90%] flex-col justify-center items-center mb-10  rounded-full mx-4 '>
                            <TouchableOpacity onPress={() => {
                                console.log(currentStep)
                                bottomSheetRef.current?.open()
                            }} >
                                <Image source={guildLineSteps[currentStep].imageUrl == null || guildLineSteps[currentStep].imageUrl == "" ? Img : { uri: guildLineSteps[currentStep].imageUrl }} resizeMode='contain' style={{ height: Dimensions.get("window").height * 0.5, width: Dimensions.get("window").width * 0.9 }} />
                            </TouchableOpacity>


                            {
                                guildLineSteps[currentStep].imageUrl == null || guildLineSteps[currentStep].imageUrl == "" && <TouchableOpacity style={{ height: Dimensions.get("window").height * 0.5, width: Dimensions.get("window").width * 0.9 }} className='absolute bg-white opacity-80 flex justify-center items-center rounded' onPress={() => {
                                    console.log("handle change photo here")
                                    bottomSheetRef.current?.open()
                                }} activeOpacity={1}>
                                    <Material name="file-image-plus" size={30} style={{ color: "gray" }} className='' />
                                </TouchableOpacity>
                            }
                        </View>
                        <View className='flex-row'>
                            {guildLineSteps.map((step, index) => {
                                return (
                                    <View style={{
                                        ...styles.stepIndicator,
                                        width: currentStep === index ? screenWidth / guildLineSteps.length - 5 : screenWidth / guildLineSteps.length - 12,
                                        backgroundColor: currentStep === index ? COLORS.primary : "#d1d1d1"
                                    }} key={index}></View>
                                )
                            })}
                        </View>
                        {
                            !isAdding ? <Text className='text-center px-4 text-2xl font-bold mt-5 ' style={{ color: COLORS.primary }}>Step {currentStep + 1}: {guildLineSteps[currentStep].name != "" && guildLineSteps[currentStep].name != null ? guildLineSteps[currentStep].name : "Add name"}</Text> : <TextInput className='text-center px-4 text-2xl font-bold mt-5 ' style={{ color: COLORS.primary }} placeholder='Enter name of step' onChangeText={(text) => {
                                setGuildLineSteps((prev) => {
                                    return prev?.map((step, index) => {
                                        if (index === guildLineSteps.length - 1) {
                                            return {
                                                ...step,
                                                name: text
                                            }
                                        }
                                        return step
                                    })

                                })
                                // guildLineSteps[currentStep].name = e.nativeEvent.text

                            }} />
                        }
                        {
                            !isAdding ? <Text className='text-center px-4 text-lg mt-5 text-[#a1a1a1]' >{guildLineSteps[currentStep].description != "" && guildLineSteps[currentStep].description != null ? guildLineSteps[currentStep].description : "Add description"}</Text> : <TextInput className='text-center px-4 text-lg mt-5' placeholder='enter' onChangeText={(text) => {
                                setGuildLineSteps((prev) => {
                                    return prev?.map((step, index) => {
                                        if (index === guildLineSteps.length - 1) {
                                            return {
                                                ...step,
                                                description: text
                                            }
                                        }
                                        return step
                                    })

                                })
                            }}

                            />
                        }

                    </>
                }
                {
                    guildLineSteps && !isAdding && <>
                        <View style={styles.navigationView}>
                            {
                                currentStep > 0 ?
                                    <TouchableOpacity
                                        onPress={() => prevStep()}
                                        style={{ ...styles.navigationBtn, borderTopEndRadius: 20, borderBottomEndRadius: 20, }} className='flex-row items-center py-2'>
                                        <Material name="chevron-left" size={20} color={"white"} />
                                        <Text className='text-white text-base font-semibold'>Back</Text>
                                    </TouchableOpacity>
                                    :
                                    <View></View>
                            }

                            {
                                currentStep < guildLineSteps.length - 1 ? <TouchableOpacity
                                    onPress={() => nextStep()}
                                    style={{
                                        backgroundColor: COLORS.primary,
                                        height: "auto",
                                        width: 80,

                                        borderTopStartRadius: 20, borderBottomStartRadius: 20
                                    }}
                                    className='flex-row items-center py-2 justify-end'
                                >
                                    <Text className='text-white text-base font-semibold ml-2'>Next</Text>
                                    <Material name="chevron-right" size={20} color={"white"} />
                                </TouchableOpacity> : <View></View>
                            }
                        </View>
                    </>
                }
            </KeyboardAvoidingView>
            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container: {
                        backgroundColor: "white",

                        height: Dimensions.get("window").height / 3,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        display: "none",
                    }
                }}
            >
                <View className='flex-col p-6 h-full bg-[#fafafa] justify-center'>
                    <TouchableOpacity className='h-16 mb-6 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={async () => {
                        await handleTakePhoto()

                    }}>
                        <Text className='text-lg font-semibold'>Take a photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='h-16 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={async () => {
                        await handlePickImage()

                    }}>
                        <Text className='text-lg font-semibold'>Choose Image from Library</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepImage: {
        width: "90%",
        height: "40%",
        marginVertical: 30
    },
    stepIndicatorView: {
        flexDirection: "row",
        width: Dimensions.get("window").width,
    },
    stepIndicator: {

        height: 10,
        marginHorizontal: 5,
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 20,
    },
    description: {
        textAlign: "center",
        paddingHorizontal: 10
    },
    navigationView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingTop: 30,
    },
    navigationBtn: {
        backgroundColor: COLORS.primary,
        height: "auto",
        width: 80,
        alignItems: "center"
    },
    navigationBtnTxt: {
        color: "white",
        fontWeight: "bold"
    }

});
export default GuildLineDetailScreen