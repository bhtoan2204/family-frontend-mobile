import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from 'src/constants';
// import CircularProgress from './CircularProgress';
import Img from 'src/assets/images/default_ava.png';
import Img2 from 'src/assets/images/default_ava2.png';
import { Education } from 'src/interface/education/education';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import ImageComponent from 'src/components/Image/Image';
import SchoolImage from 'src/assets/images/education_assets/school.png';
import ProgressNote from 'src/assets/images/education_assets/note.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionsCustomStyle,

} from 'react-native-popup-menu';
import { colors } from './const/color';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import EducationServices from 'src/services/apiclient/EducationService';
import { deleteEducation } from 'src/redux/slices/EducationSlice';
const Divider = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3 }} />
    )
}

interface MemberEducationItemProps {
    data: Education;
    onPress: () => void;
    index: number;
    handleNavigationEdit: () => void;
    handleDeleteEducation: () => Promise<void>;
}

const MemberEducationItem = ({ data, onPress, index, handleNavigationEdit, handleDeleteEducation }: MemberEducationItemProps) => {
    const dispatch = useDispatch<AppDispatch>()
    // const getColor = (progress: number) => {
    //     if (progress < 30) return iOSColors.systemRed.defaultLight;
    //     if (progress == 100) return iOSColors.systemGreen.defaultLight;
    //     return iOSColors.systemBlue.defaultLight;
    // }
    const handleDelete = async () => {
        await handleDeleteEducation()
        dispatch(deleteEducation(data.id_education_progress))
        // const res = await EducationServices.deleteEducation()
    }
    return (
        <TouchableOpacity activeOpacity={0.65} className=' h-auto  mt-4 mx-3 rounded-md border-[1px] overflow-hidden' onPress={onPress} style={{
            borderColor: iOSGrayColors.systemGray6.accessibleLight,
        }}>
            <View className='flex-row items-center bg-white py-3'>
                {/* <View className='  w-2 h-full absolute' style={{ backgroundColor: getColor(50) }}>

                </View> */}
                {/* <Image source={Img} width={50}
                    height={50}
                    className="w-16 h-16 mr-4  " /> */}
                <View className='flex-1'>
                    <View className='mb-3 flex-row items-center justify-between'>
                        <View className='flex-row items-center'>
                            <View className='mx-3'>
                                <ImageComponent defaultImage={Img} imageUrl={data.user.avatar || ""}
                                    style={{ height: 35, width: 35 }} className='rounded-full' />
                            </View>
                            <Text className='font-normal ' style={{ color: iOSGrayColors.systemGray5.defaultDark, fontSize: 17, textTransform: 'capitalize' }}>{data.user.lastname} {data.user.firstname}</Text>
                        </View>
                        <TouchableOpacity className='mr-2'>
                            {/* <Material name='dots-horizontal' size={25} color={iOSColors.systemOrange.defaultDark} /> */}
                            <View className='flex-row items-center'>
                                <Menu >
                                    <MenuTrigger>
                                        <Material name="dots-horizontal" size={24} style={{ color: iOSGrayColors.systemGray5.defaultDark, fontWeight: "bold" }} className='font-semibold' />
                                    </MenuTrigger>
                                    <MenuOptions customStyles={optionsStyles} >
                                        {/* <MenuOption onSelect={() => {
                                            // handleIsAddingStep()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base' style={{ color: iOSGrayColors.systemGray.defaultLight }}>Add</Text>
                                                <Material name="plus" size={20} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider /> */}
                                        <MenuOption onSelect={() => {
                                            // setIsEditing(true)
                                            // handleEditGuildline()
                                            handleNavigationEdit()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base' style={{ color: iOSGrayColors.systemGray.defaultLight }}>Update</Text>
                                                <Material name="pencil" size={20} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                        <MenuOption onSelect={async () => {
                                            // await handleShareGuideline()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base ' style={{ color: iOSColors.systemBlue.defaultLight }}>Share</Text>
                                                <Material name="share-all-outline" size={20} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                        {/* <MenuOption onSelect={async () => {
                                            // handleDeleteCurrentStep()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base ' style={{ color: iOSColors.systemRed.defaultLight }}>Delete this step</Text>
                                                <Material name="debug-step-over" size={20} style={{ color: iOSColors.systemRed.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider /> */}
                                        <MenuOption onSelect={async () => {
                                            // handleDeleteGuideline()
                                            await handleDelete()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base ' style={{ color: iOSColors.systemRed.defaultLight }}>Delete</Text>
                                                <Material name="trash-can-outline" size={20} style={{ color: iOSColors.systemRed.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                    </MenuOptions>
                                </Menu>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className='mx-3 mb-3  py-4 items-center justify-center'
                        style={{

                            backgroundColor: colors[index % colors.length].backgroundColor,
                            opacity: 0.9,
                        }}
                    >
                        <Text className='text-white ' style={{ fontSize: 16 }}>{data.title}</Text>
                    </View>
                    <View className='mb-3 flex-row items-center flex-1  '>
                        <View className='mx-3'>
                            {/* <ImageComponent defaultImage={SchoolImage} imageUrl={""}
                                style={{ height: 35, width: 35 }} /> */}
                            <Material name='school-outline' size={30} color={iOSGrayColors.systemGray5.defaultDark} />
                        </View>
                        <Text className='flex-1 mr-2 ' style={{ fontSize: 16, color: iOSGrayColors.systemGray5.defaultDark, textTransform: 'capitalize' }} numberOfLines={1} ellipsizeMode='tail'>{data.school_info}</Text>
                    </View>
                    <View className='mb-3 flex-row items-center '>
                        {/* <View className='mx-3'>
                            <ImageComponent defaultImage={ProgressNote} imageUrl={""}
                            style={{ height: 35, width: 35 }} />
                            </View> */}
                        {/* <Text className=' text-gray-500 mx-3' >{data.progress_notes}</Text> */}
                        <View className='mx-3'>
                            <Material name='note-text-outline' size={30} color={iOSGrayColors.systemGray5.defaultDark} />
                        </View>
                        <Text className=' ' style={{ fontSize: 16, color: iOSGrayColors.systemGray5.defaultDark }} >{data.progress_notes}</Text>
                    </View>
                </View>
                {/* <View className='flex-row items-center  '>
                    <CircularProgress
                        size={60}
                        progress={50}
                        strokeWidth={5}
                        backgroundColor="#e0e0e0"
                        progressColor={getColor(50)}
                    />

                </View> */}
            </View>
        </TouchableOpacity>
    );
}

const optionsStyles: MenuOptionsCustomStyle = {
    optionsContainer: {
        borderRadius: 10,
        marginTop: 24,
        backgroundColor: 'white',
        // opacity: 0.9,
    },
    optionWrapper: {
        padding: 10,
    },

};

export default MemberEducationItem;
