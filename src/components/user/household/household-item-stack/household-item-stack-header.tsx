import React from 'react'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { View, Text, Image, Dimensions, TouchableOpacity, ImageBackground, Keyboard } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionsCustomStyle,

} from 'react-native-popup-menu';
import { COLORS } from 'src/constants'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import { BlurView } from 'expo-blur'
import ImageComponent from 'src/components/Image/Image'
import FamilyImage from 'src/assets/images/household_assets/add_room.png'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
import { gradients_list } from 'src/assets/images/gradients'


interface HouseHoldItemStackHeaderProps {
    data: HouseHoldItemDetailInterface
    handleEditImage: () => void
    handleEditTitle?: () => void
    handleDeleteItem?: () => void
    navigationBack?: () => void
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Divider = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3 }} />
    )
}

const HouseHoldItemStackHeader = ({
    data, handleEditImage, handleEditTitle, handleDeleteItem, navigationBack
}: HouseHoldItemStackHeaderProps) => {
    const items = useSelector((state: RootState) => state.householdItems)
    console.log(data.id_household_item)
    const [key, setKey] = React.useState(false)
    const isDarkMode = useSelector(getIsDarkMode)

    const getIndex = React.useCallback(() => {
        if (data.id_household_item == -1) {
            return 0
        } else {
            // setKey(!key)
            const index = items.findIndex((item) => {
                return item.id_household_item == data.id_household_item
            })
            // console.log(index)
            return index
        }
    }, [items, data])
    React.useEffect(() => {
        setKey(!key)
    }, [data])

    return (
        <TouchableOpacity activeOpacity={1.0} onPress={() => {
            Keyboard.dismiss()
        }}>
            <ImageBackground
                key={key.toString()}
                source={data.item_imageurl ? { uri: data.item_imageurl } : gradients_list[getIndex() % gradients_list.length]}
                style={{ width: screenWidth, height: screenHeight * 0.3 }}
            >
                <View className='w-full absolute z-10 flex-row justify-between items-center py-3 mt-5' >
                    <BlurView intensity={35} tint='dark' className=' ml-1 rounded-lg overflow-hidden '>
                        <TouchableOpacity onPress={navigationBack} className=' flex-row items-center'>
                            <Material name="chevron-left" size={30} style={{ color: "white", fontWeight: "bold" }} />
                            {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AliceBlue }}>Back</Text> */}
                        </TouchableOpacity>

                    </BlurView>

                    <BlurView intensity={35} tint='dark' className='px-3 overflow-hidden rounded-lg max-w-10'>
                        <View >
                            <Text className='text-lg font-semibold text-white ' numberOfLines={1}
                                style={{
                                    maxWidth: screenWidth * 0.3,
                                }}
                            >
                                {data.item_name}
                            </Text>
                        </View>
                    </BlurView>

                    <BlurView intensity={35} tint='dark' className='flex-row items-center  mr-1 rounded-lg overflow-hidden'>
                        <Menu >
                            <MenuTrigger>
                                <View className=''>
                                    <Material name="dots-horizontal" size={29} style={{ color: 'white', fontWeight: "bold" }} />
                                </View>
                            </MenuTrigger>
                            <MenuOptions customStyles={{
                                optionsContainer: {
                                    borderRadius: 10,
                                    marginTop: screenHeight * 0.04,
                                    backgroundColor: isDarkMode ? '#252D3B' : 'white',
                                    // opacity: 0.9,
                                },
                                optionWrapper: {
                                    padding: 10,
                                },
                            }} >
                                <MenuOption onSelect={() => {
                                    // handleIsAddingStep()
                                    handleEditImage()
                                }} >

                                    <View className='flex-row items-center justify-between'>
                                        <Text className='text-base text-[#606060] dark:text-[#A6A6A6]' >Edit Image</Text>
                                        <Material name="image-auto-adjust" size={20} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} />
                                    </View>
                                </MenuOption>
                                <Divider />
                                <MenuOption onSelect={() => {
                                    // setIsEditing(true)
                                    handleEditTitle!()
                                }} >
                                    <View className='flex-row items-center justify-between'>
                                        <Text className='text-base text-[#606060] dark:text-[#A6A6A6]' >Edit title</Text>
                                        <Material name="pencil" size={20} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} />
                                    </View>
                                </MenuOption>

                                <Divider />
                                <MenuOption onSelect={async () => {
                                    handleDeleteItem!()
                                }} >

                                    <View className='flex-row items-center justify-between'>
                                        <Text className='text-base ' style={{ color: iOSColors.systemRed.defaultLight }}>Delete</Text>
                                        <Material name="trash-can-outline" size={20} style={{ color: iOSColors.systemRed.defaultLight, fontWeight: "bold" }} />
                                    </View>
                                </MenuOption>
                                <Divider />
                            </MenuOptions>
                        </Menu>

                    </BlurView>
                </View>
            </ImageBackground>


        </TouchableOpacity>

    )
}

const optionsStyles: MenuOptionsCustomStyle = {
    optionsContainer: {
        borderRadius: 10,
        marginTop: screenHeight * 0.04,
        // backgroundColor: 'white',
        // opacity: 0.9,
    },
    optionWrapper: {
        padding: 10,
    },

};

export default HouseHoldItemStackHeader