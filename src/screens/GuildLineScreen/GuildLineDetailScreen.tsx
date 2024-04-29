import React, { useEffect, useState } from 'react'
import { View, Text, Animated, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { COLORS } from 'src/constants';
import Img from 'src/assets/images/guildline.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { GuildLineDetail, Step } from 'src/interface/guideline/guideline';
import GuildLineService from 'src/services/apiclient/GuildLineService';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import PickImageSheet from './PickImageSheet/PickImageSheet';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
const screenWidth = Dimensions.get('window').width;
const GuildLineDetailScreen = ({ navigation, route }: any) => {
    const { id_item, id_family } = route.params
    const [currentStep, setCurrentStep] = useState(0)
    const [guildLineDetail, setGuildLineDetail] = useState<GuildLineDetail>()
    const [guildLineSteps, setGuildLineSteps] = useState<Step[]>()
    const [loading, setLoading] = useState(true)
    const [previousStep, setPreviousStep] = useState(0)
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const isKeyboardVisible = useKeyboardVisible();
    const bottomSheetRef = React.useRef<RBSheet>(null);
    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("");

    useEffect(() => {
        const fetchGuildLineDetail = async () => {
            try {
                const response = await GuildLineService.getGuildLineDetail(id_family, id_item); // API call to fetch guildline detail
                setGuildLineDetail(response);
                if (response && response.steps) {
                    setGuildLineSteps(response.steps)
                } else {
                    console.log("cc")
                    setGuildLineSteps(
                        [
                            {
                                name: "",
                                description: "",
                                imageUrl: ""
                            }
                        ]
                    )
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

    const handleIsAddingStep = async () => {
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
        setInputDescription("");
        setInputName("");
        setCurrentStep(previousStep);
        setIsAdding(false);
    };

    const handleSaveAddStep = async () => {
        setIsAdding(false);
        setCurrentStep(currentStep);
        const newStep = guildLineSteps?.filter((step, index) => index === currentStep)[0];
        if (newStep) {
            setGuildLineSteps((prev) => {
                return prev?.map((step, index) => {
                    if (index === currentStep) {
                        return {
                            imageUrl: newStep.imageUrl || "",
                            name: inputName,
                            description: inputDescription,
                        }
                    }
                    return step
                })
            })
        }
        setInputDescription("");
        setInputName("");
        console.log("cout<<")
        console.log(newStep)
    }

    const handleSaveEdit = async () => {
        setIsEditing(false);
        const newStep = guildLineSteps?.filter((step, index) => index === currentStep)[0];
        console.log(newStep)
        if (newStep) {
            setGuildLineSteps((prev) => {
                return prev?.map((step, index) => {
                    if (index === currentStep) {
                        return {
                            imageUrl: newStep.imageUrl,
                            name: inputName,
                            description: inputDescription,
                        }
                    }
                    return step
                })


            })
        }
        setInputDescription("");
        setInputName("");
    }
    const handleCancelEdit = () => {
        setIsEditing(false);
        setInputDescription("");
        setInputName("");
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
                console.log(currentStep)

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
        }
        else {
            alert('Permission to access camera was denied');
        }
    }

    return (
        <View className='flex-1 bg-[#fff] items-center '>
            <View className='w-full  flex-row justify-between items-center py-3 z-10 bg-white' >
                {
                    isAdding || isEditing ?
                        <TouchableOpacity
                            onPress={() => {
                                if (isAdding) {
                                    handleCancelAddStep()
                                } else {
                                    handleCancelEdit()
                                }
                            }}
                        ><Text className='text-red-600 text-lg ml-3'>Cancel</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                            <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                            <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text>
                        </TouchableOpacity>
                }
                <View className='mr-3'>
                    {
                        isAdding || isEditing
                            ? <TouchableOpacity onPress={() => {
                                if (isAdding) {
                                    handleSaveAddStep()
                                }
                                else {
                                    handleSaveEdit()
                                }
                            }}>
                                <Text className=' text-lg ' style={{ color: COLORS.primary }}>Save</Text>
                            </TouchableOpacity>

                            : <TouchableOpacity onPress={() => {
                                handleIsAddingStep()
                            }}>
                                <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' />
                            </TouchableOpacity>
                    }
                </View>
            </View>
            <KeyboardAvoidingView className=' h-full flex flex-col items-center mt-3  ' behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                {
                    guildLineSteps && <>
                        <View className='h-[50%] w-[90%] flex-col justify-center items-center mb-10  rounded-full mx-4 '>
                            <TouchableOpacity disabled={isKeyboardVisible == true} onPress={() => {
                                console.log(currentStep)
                                bottomSheetRef.current?.open()
                            }} >
                                <Image source={guildLineSteps[currentStep].imageUrl == null || guildLineSteps[currentStep].imageUrl == "" || guildLineSteps[currentStep].imageUrl == undefined
                                    ? Img
                                    : { uri: guildLineSteps[currentStep].imageUrl }} resizeMode='cover' style={{ height: Dimensions.get("window").height * 0.5, width: Dimensions.get("window").width * 0.9 }} />
                            </TouchableOpacity>

                            {
                                guildLineSteps[currentStep].imageUrl == null || guildLineSteps[currentStep].imageUrl == ""
                                &&
                                <TouchableOpacity style={{ height: Dimensions.get("window").height * 0.5, width: Dimensions.get("window").width * 0.9 }} className='absolute' activeOpacity={1.0} disabled={isKeyboardVisible == true} onPress={() => {
                                    console.log(currentStep)
                                    bottomSheetRef.current?.open()
                                }}>
                                    <View className='opacity-80 bg-white h-full w-full flex justify-center items-center rounded'>

                                        <Material name="file-image-plus" size={30} style={{ color: "gray" }} className='' />
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                        <View className='bg-white  w-full'>
                            <View className='flex-row'>
                                {guildLineSteps.map((step, index) => {
                                    return (
                                        <TouchableOpacity style={{
                                            ...styles.stepIndicator,
                                            width: currentStep === index ? screenWidth / guildLineSteps.length - 5 : screenWidth / guildLineSteps.length - 12,
                                            backgroundColor: currentStep === index ? COLORS.primary : "#d1d1d1"
                                        }} key={index}></TouchableOpacity>
                                    )
                                })}
                            </View>
                            {
                                !isAdding && !isEditing ?
                                    <TouchableOpacity onPress={() => {
                                        setIsEditing(true)
                                        setInputName(guildLineSteps[currentStep].name)
                                        setInputDescription(guildLineSteps[currentStep].description)
                                    }}>
                                        <Text className='text-center px-4 text-2xl font-bold mt-5 ' style={{ color: COLORS.primary }}>Step {currentStep + 1}: {guildLineSteps[currentStep].name != ""
                                            &&
                                            guildLineSteps[currentStep].name != null
                                            ? guildLineSteps[currentStep].name : "Add name"}</Text>
                                    </TouchableOpacity>
                                    : <TextInput className='text-center px-4 text-2xl font-bold mt-5 ' style={{ color: COLORS.primary }} placeholder='Enter name of step' autoFocus onChangeText={(text) => {
                                        // setGuildLineSteps((prev) => {
                                        //     return prev?.map((step, index) => {
                                        //         if (index === currentStep) {
                                        //             return {
                                        //                 ...step,
                                        //                 name: text
                                        //             }
                                        //         }
                                        //         return step
                                        //     })

                                        // })
                                        setInputName(text)
                                        // guildLineSteps[currentStep].name = e.nativeEvent.text

                                    }
                                    }
                                        value={inputName}
                                    />
                            }
                            {
                                !isAdding && !isEditing
                                    ?
                                    <TouchableOpacity onPress={() => {
                                        setIsEditing(true)
                                        setInputName(guildLineSteps[currentStep].name)
                                        setInputDescription(guildLineSteps[currentStep].description)
                                    }}>
                                        <Text className='text-center px-4 text-lg mt-5 text-[#a1a1a1]' >{guildLineSteps[currentStep].description != "" && guildLineSteps[currentStep].description != null ? guildLineSteps[currentStep].description : "Add description"}</Text>
                                    </TouchableOpacity>
                                    :
                                    <TextInput className='text-center px-4 text-lg mt-5' placeholder='Enter description (optional)' onChangeText={(text) => {
                                        setInputDescription(text)
                                        // setGuildLineSteps((prev) => {
                                        //     return prev?.map((step, index) => {
                                        //         if (index === currentStep) {
                                        //             return {
                                        //                 ...step,
                                        //                 description: text
                                        //             }
                                        //         }
                                        //         return step
                                        //     })

                                        // })
                                    }}
                                        value={inputDescription}
                                    />
                            }
                        </View>

                    </>
                }
                {
                    guildLineSteps && !isAdding && <>
                        <View style={styles.navigationView} className=''>
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
            <PickImageSheet bottomSheetRef={bottomSheetRef} handlePickImage={handlePickImage} handleTakePhoto={handleTakePhoto} />
        </View>
    );
}

const styles = StyleSheet.create({
    stepIndicator: {
        height: 10,
        marginHorizontal: 5,
        borderRadius: 10
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