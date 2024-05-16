import React, { useEffect } from 'react'
import { Alert, Dimensions, KeyboardAvoidingView, Linking, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FamilyImage from 'src/assets/images/household.png';
import ImageComponent from 'src/components/Image/Image';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
import * as ImagePicker from 'expo-image-picker';
// import PickImageSheet from 'src/screens/GuildLineScreen/PickImageSheet/PickImageSheet';
const EditHouseHoldItemSheet = ({ refRBSheet, setHouseHoldItem, id_category, id_family, item, index }: { refRBSheet: React.RefObject<any>, setHouseHoldItem: React.Dispatch<React.SetStateAction<HouseHoldItemInterface[]>>, id_category: number, id_family: number, item: HouseHoldItemInterface, index: number }) => {
    // const refRBSheet = React.useRef<RBSheet>(null);
    const pickImageSheetRef = React.useRef<any>(null);
    const [name, setName] = React.useState(item.item_name);
    const [description, setDescription] = React.useState(item.item_description);
    const [image, setImage] = React.useState(item.item_imageurl);
    const isKeyboardVisible = useKeyboardVisible();
    const nameInputRef = React.useRef<TextInput>(null);
    const descriptionInputRef = React.useRef<TextInput>(null);

    const handleDelete = () => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {

                    },
                    style: 'cancel',
                    isPreferred: true
                },
                {
                    text: 'Delete',
                    onPress: () => {

                    },
                    style: 'destructive',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => { }

            },
        );

    }

    const handleUpdateHouseHold = () => {
        if (name === "" || image === "") {
            alert("Please fill all the fields")
            return
        }
        const newHouseHoldItem = {
            id_household_item: item.id_household_item,
            id_family: item.id_family,
            item_name: name,
            item_description: description,
            item_imageurl: image,
            id_category: id_category
        }

        setHouseHoldItem((prev) =>
            prev.map((houseHoldItem) => {
                if (houseHoldItem.id_household_item === item.id_household_item) {
                    return newHouseHoldItem
                }
                return houseHoldItem
            })
        )

        refRBSheet.current?.close()
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
                setImage(result.assets[0].uri)
                pickImageSheetRef.current?.close()

            }
        } else {
            Alert.alert(
                'Denied',
                'Give Access To This App By Going To Settings -> App -> Permissions -> Camera',
                [
                    {
                        text: 'Redirect',
                        onPress: () => {
                            Linking.openURL('app-settings:')
                        },
                        style: 'default',
                        isPreferred: true
                    },
                    {
                        text: 'Cancel',
                        onPress: () => {

                        },
                        style: 'destructive',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => { }

                },
            );
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
                console.log(result.assets[0].uri);
                setImage(result.assets[0].uri)
                pickImageSheetRef.current?.close()
            }
        }
        else {
            Alert.alert(
                'Denied',
                'Give Access To This App By Going To Settings -> App -> Permissions -> Camera',
                [
                    {
                        text: 'Redirect',
                        onPress: () => {
                            Linking.openURL('app-settings:')
                        },
                        style: 'default',
                        isPreferred: true
                    },
                    {
                        text: 'Cancel',
                        onPress: () => {

                        },
                        style: 'destructive',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => { }

                },
            );
        }
    }


    return (
        <RBSheet
            ref={refRBSheet}
            closeOnPressBack
            closeOnPressMask
            // useNativeDriver
            customStyles={{
                container: {
                    backgroundColor: "#F6F7F9",
                    height: Dimensions.get("window").height * 0.6,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                },
                draggableIcon: {
                    // borderBlockColor: "#0000",
                    display: "none",
                }
            }}
            customModalProps={{
                animationType: "slide",
            }}
            customAvoidingViewProps={{
                enabled: true
            }
            }
            onClose={() => { }}
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
                        <Text className='text-base font-semibold'>Edit</Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        handleUpdateHouseHold()
                    }} className='pr-4 disabled:text-gray-600 text-blue-600' disabled={
                        name === "" || image === ""
                    }>
                        <Text className=' text-base font-semibold'>Save</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView className="flex-1 " behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
                    <ScrollView showsVerticalScrollIndicator={true} className='flex-1 ' keyboardShouldPersistTaps="handled"  >
                        <View className='p-4'>
                            <TouchableOpacity onPress={() => {
                                pickImageSheetRef.current?.open()
                            }}>
                                <View className='flex-col justify-center items-center' >
                                    <View className='bg-white' style={{
                                        borderWidth: 1,
                                        borderColor: "#ccc",
                                        borderRadius: 5,
                                        marginBottom: 20,
                                        padding: 17,
                                    }}>

                                        <ImageComponent imageUrl={image || ""} style={{ width: 110, height: 110 }} defaultImage={FamilyImage} className='rounded-lg ' />
                                    </View>
                                </View>
                            </TouchableOpacity>

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
                                placeholder="Input household appliance name"
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
                                ref={descriptionInputRef}
                                placeholder="Input household description (optional)"
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                numberOfLines={4}
                                className='bg-white'
                            />
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 5,
                                marginBottom: 20,
                                padding: 17,
                            }} className='bg-red-600' onPress={() => {
                                handleDelete()
                            }}>
                                <Text className='text-base font-semibold text-center text-white'>Delete this</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>

            </View>
            <PickImageSheet bottomSheetRef={pickImageSheetRef} handleTakePhoto={handleTakePhoto} handlePickImage={handlePickImage} />

        </RBSheet>
    )
}

const PickImageSheet = ({ bottomSheetRef, handleTakePhoto, handlePickImage }: { bottomSheetRef: React.RefObject<any>, handleTakePhoto: () => Promise<void>, handlePickImage: () => Promise<void> }) => {
    return (
        <RBSheet
            ref={bottomSheetRef}
            closeOnPressMask={true}
            useNativeDriver
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
            customModalProps={{
                animationType: "slide",
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
    )
}
export default EditHouseHoldItemSheet