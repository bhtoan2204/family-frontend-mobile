import React from 'react'
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, TouchableWithoutFeedback, Animated } from 'react-native'

import RBSheet from 'react-native-raw-bottom-sheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHeight } from 'src/utils/device/screen';

const ProfileModal = ({ bottomSheetRef, sheetHeight, profile }: { bottomSheetRef: React.RefObject<RBSheet>, sheetHeight: number, profile: any }) => {
    const editProfileSheetRef = React.useRef<RBSheet>(null);
    return (
        <RBSheet
            ref={bottomSheetRef}
            height={sheetHeight}
            closeOnDragDown
            closeOnPressBack
            closeOnPressMask
            customStyles={{
                draggableIcon: {
                    display: 'none'
                },
                // wrapper: {
                //   backgroundColor: 'rgba(0,0,0,0.5)',
                // },   
                container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                },
            }}>
            <StatusBar barStyle="default" />
            <View className='flex-1'>
                <View className='h-14 bg-white flex-row items-center  '>
                    <TouchableOpacity className='text-black text-lg font-normal pl-4 absolute z-10 ' >
                        {/* <Ionicons name='close' size={24} className='font-normal' onPress={()=>{
                console.log("back to prev")
              }}  /> */}
                        <Icon name='close' size={24} onPress={() => {
                            console.log("op")
                        }} />

                    </TouchableOpacity>
                    <Text className='text-black text-base font-semibold w-full flex absolute text-center '>
                        You
                    </Text>
                </View>
                <ScrollView
                    alwaysBounceVertical
                    scrollEventThrottle={16}
                    removeClippedSubviews={true}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="never"
                >
                    <TouchableOpacity className='mx-4 flex-row items-center z-10' onPress={() => {
                        editProfileSheetRef.current?.open()
                    }}>
                        <Image source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} className='rounded-lg' style={{ height: 55, width: 55 }} />
                        <View className='ml-4'>
                            <Text className='text-black text-lg font-semibold'>
                                {profile?.firstname} {profile?.lastname}
                            </Text>
                            <Text className='text-black text-sm font-normal'>
                                {profile?.email}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View className='p-4 mx-4 flex-row mt-6 h-auto bg-blue-100 rounded-lg justify-start items-start'>
                        <View className='mt-1'>
                            <Icon name='camera' size={17} />
                        </View>
                        <View className='ml-3 text-lg'>
                            <Text className='font-semibold text-base'>Add a profile photo</Text>
                            <Text className='font-normal text-sm'>Help your family know they're talking to the right person</Text>
                        </View>
                    </View>

                    <View className=' mx-4 mt-6 flex-row items-center'>
                        <Icon name='bell-outline' size={17} />

                        <Text className='font-normal ml-3 text-base'>Notifications</Text>
                    </View>
                    <View className=' mx-4 mt-6 flex-row items-center'>
                        <Icon name='bell-outline' size={17} />

                        <Text className='font-normal ml-3 text-base'>Notifications</Text>
                    </View>
                    <View className=' mx-4 mt-6 flex-row items-center'>
                        <Icon name='bell-outline' size={17} />

                        <Text className='font-normal ml-3 text-base'>Notifications</Text>
                    </View>
                    <View className=' mx-4 mt-6 flex-row items-center'>
                        <Icon name='bell-outline' size={17} />

                        <Text className='font-normal ml-3 text-base'>Notifications</Text>
                    </View>
                </ScrollView>
            </View>
            <EditProfileModal editProfileSheetRef={editProfileSheetRef} sheetHeight={sheetHeight} profile={profile} />
        </RBSheet>
    )
}

const EditProfileModal = ({ editProfileSheetRef, sheetHeight, profile }: { editProfileSheetRef: React.RefObject<RBSheet>, sheetHeight: number, profile: any }) => {
    const [personalInfoCollapsed, setPersonalInfoCollapsed] = React.useState(true);
    const [contactInfoCollapsed, setContactInfoCollapsed] = React.useState(true);
    const togglePersonalInfoCollapse = () => {
        setPersonalInfoCollapsed(!personalInfoCollapsed);
    };

    const toggleContactInfoCollapse = () => {
        setContactInfoCollapsed(!contactInfoCollapsed);
    };
    return <RBSheet
        ref={editProfileSheetRef}
        height={sheetHeight}
        closeOnDragDown
        closeOnPressBack
        closeOnPressMask

        customStyles={{
            draggableIcon: {
                display: 'none'
            },
            container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            },
        }}
    >
        <View className='flex-1'>
            <View className='h-14 bg-white flex-row items-center border-b-[0.75px] border-[#d5d5d5] '>
                <View className=' pl-4 absolute z-11 bg-transparent  w-full flex justify-start items-start' >
                    <TouchableOpacity onPress={() => {
                        console.log("escape pressed")
                    }} >

                        <Icon name='close' size={24} onPress={() => {
                            console.log("op")
                        }} />

                    </TouchableOpacity>
                </View>
                <Text className='text-black text-base font-semibold w-full flex absolute text-center bg-transparent'>
                    Edit Profile
                </Text>
                <View className=' pr-4 absolute z-11 bg-transparent  w-full flex justify-end items-end' >
                    <TouchableOpacity onPress={() => {
                        console.log("save press")
                    }}>
                        <Text className='text-black text-base font-medium'>
                            Save
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView
                alwaysBounceVertical
                scrollEventThrottle={16}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                className=''
            >
                <View className='mt-4  z-11' >
                    <View className='flex justify-center items-center'>
                        <Image source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} className='rounded-lg' style={{ height: getHeight(0.2), width: getHeight(0.2) }} />
                        <TouchableOpacity className='m-0 p-0' onPress={() => {
                            console.log("handleChangePhoto")
                        }}>
                            <View className={`my-3 px-5 py-3 rounded-lg  border-[1px] border-gray-600 `} style={{ width: getHeight(0.2) }}>
                                <Text className='w-full text-center text-base font-bold'>Edit Photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <AccordionItem title="Personal Information" initialExpanded={true}>
                    <Text className='mb-2 text-base font-semibold'>Full Name</Text>
                    <TextInput value={"Tang Kim Long"} className='border-[1px] border-gray-600 py-2 px-2 rounded-lg mb-2' />
                    <Text className='mb-2 text-base font-semibold'>Display Name</Text>
                    <TextInput value={"Tang Kim Long"} className='border-[1px] border-gray-600 py-2 px-2 rounded-lg mb-2' />
                    <Text className='mb-2 text-base font-semibold'>Title Name</Text>
                    <TextInput value={""} className='border-[1px] border-gray-600 py-2 px-2 rounded-lg mb-2' />
                    <Text className='mb-2 text-base font-semibold'>Name Pronunciation</Text>
                    <TextInput value={""} className='border-[1px] border-gray-600 py-2 px-2 rounded-lg mb-2' />

                </AccordionItem>
                <AccordionItem title="Contact Information" initialExpanded={false}>
                    <Text className='mb-2 text-base font-semibold'>Email</Text>
                    <TextInput value={profile.email} className='border-[1px] border-gray-600 py-2 px-2 rounded-lg mb-2' />
                    <Text className='mb-2 text-base font-semibold'>Phone</Text>
                    <TextInput value={""} className='border-[1px] border-gray-600 py-2 px-2 rounded-lg mb-2' />


                </AccordionItem>
                <View className='h-32'></View>

            </ScrollView>
        </View>
    </RBSheet>
}
const AccordionItem = ({ children, title, initialExpanded }: { children: React.ReactNode, title: string, initialExpanded: boolean }) => {
    const [expanded, setExpanded] = React.useState(initialExpanded);

    const toggleItem = () => {
        setExpanded(!expanded);
    };

    const body = <View className="px-4">{children}</View>;

    return (
        <View className="mb-0">
            <TouchableOpacity className="flex flex-row justify-between items-center  p-4" onPress={toggleItem}>
                <Text className="text-black text-base font-semibold">{title}</Text>
                <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color="#bbb" />
            </TouchableOpacity>
            {expanded && body}
        </View>
    );
};
export default ProfileModal