import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionsCustomStyle,

} from 'react-native-popup-menu';
import { iOSGrayColors, iOSColors } from 'src/constants/ios-color';
import { GuildLineDetail } from 'src/interface/guideline/guideline';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';

interface SharedGuildLineHeaderProps {
    isAdding: boolean;
    isEditing: boolean;
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    handleCancelAddStep: () => void;
    handleCancelEdit: () => void;
    handleSaveAddStep: () => void;
    handleSaveEdit: () => void;
    navigationBack: () => void;
    handleIsAddingStep: () => void;
    handleShareGuideline: () => Promise<void>
    handleDeleteCurrentStep: () => Promise<void>;
    handleDeleteGuideline: () => Promise<void>;
    handleEditGuildline: () => void;
    // bottomSheetRef: React.RefObject<any>;
    editable: boolean;
}

const Divider = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3 }} />
    )
}

const SharedGuildLineDetailHeader = ({
    isAdding,
    isEditing,
    setIsAdding,
    setIsEditing,
    handleCancelAddStep,
    handleCancelEdit,
    handleSaveAddStep,
    handleSaveEdit,
    navigationBack,
    handleIsAddingStep,
    handleShareGuideline,
    handleDeleteCurrentStep,
    handleDeleteGuideline,
    handleEditGuildline,
    editable
    // bottomSheetRef
}: SharedGuildLineHeaderProps
) => {
    const isDarkMode = useSelector(getIsDarkMode)
    return (
        <View className='w-full  flex-row justify-between items-center py-3 z-10 mt-7 bg-[#f7f7f7] dark:bg-[#0A1220]' >
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
                    : <TouchableOpacity onPress={navigationBack} className=' flex-row items-center'>
                        <Material name="chevron-left" size={30} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} />
                        {/* <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Back</Text> */}
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
                            <Text className=' text-lg ' style={{ color: iOSColors.systemBlue.accessibleLight }}>Save</Text>
                        </TouchableOpacity>

                        : <View className='flex-row items-center'>
                            {
                                editable ? <Menu >
                                    <MenuTrigger>
                                        <Material name="dots-horizontal" size={24} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} className='font-semibold' />
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{
                                        optionsContainer: {
                                            borderRadius: 10,
                                            marginTop: 24,
                                            backgroundColor: isDarkMode ? '#0A1220' : '#f7f7f7',
                                            // opacity: 0.9,
                                        },
                                        optionWrapper: {
                                            padding: 10,
                                        },
                                    }} >
                                        <MenuOption onSelect={() => {
                                            handleIsAddingStep()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base' style={{ color: iOSGrayColors.systemGray.defaultLight }}>Add</Text>
                                                <Material name="plus" size={20} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                        <MenuOption onSelect={() => {
                                            // setIsEditing(true)
                                            handleEditGuildline()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base' style={{ color: iOSGrayColors.systemGray.defaultLight }}>Update</Text>
                                                <Material name="pencil" size={20} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                        <MenuOption onSelect={async () => {
                                            await handleShareGuideline()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base ' style={{ color: iOSColors.systemBlue.defaultLight }}>Share</Text>
                                                <Material name="share-all-outline" size={20} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                        <MenuOption onSelect={async () => {
                                            handleDeleteCurrentStep()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base ' style={{ color: iOSColors.systemRed.defaultLight }}>Delete this step</Text>
                                                <Material name="debug-step-over" size={20} style={{ color: iOSColors.systemRed.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                        <MenuOption onSelect={async () => {
                                            handleDeleteGuideline()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base ' style={{ color: iOSColors.systemRed.defaultLight }}>Delete</Text>
                                                <Material name="trash-can-outline" size={20} style={{ color: iOSColors.systemRed.defaultLight, fontWeight: "bold" }} className='font-semibold' />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                    </MenuOptions>
                                </Menu> : <View
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                ></View>
                            }

                        </View>
                }
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#B7DAFF',
        // shadowOpacity: 0.3,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
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


export default SharedGuildLineDetailHeader