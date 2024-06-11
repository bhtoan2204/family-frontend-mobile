import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from 'src/constants'
interface HouseHoldItemDetailHeaderProps {
    isEditing: boolean,
    navigationBack: () => void,
    onSave: () => void
    onCancelEdit?: () => void
}

const HouseHoldItemDetailHeader = (
    { isEditing, navigationBack, onSave, onCancelEdit }: HouseHoldItemDetailHeaderProps
) => {
    return <>
        {
            isEditing ? <>
                <View className='w-full  flex-row justify-between items-center py-3 '>
                    <TouchableOpacity onPress={() => {
                        onCancelEdit && onCancelEdit()
                    }} className=' flex-row items-center'>
                        {/* <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} /> */}
                        <Text className='text-base font-semibold text-gray-600 pl-3' style={{ color: iOSColors.systemRed.accessibleDark }}>Cancel</Text>
                    </TouchableOpacity>
                    <View className='mr-3'>
                        <TouchableOpacity onPress={() => {
                            onSave()
                        }} >
                            <Text className='text-base font-semibold text-gray-600 pl-3' style={{ color: iOSColors.systemBlue.accessibleDark }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </> : <>
                <View className='w-full  flex-row justify-between items-center py-3 '>
                    <TouchableOpacity onPress={() => {
                        navigationBack()
                    }} className=' flex-row items-center'>
                        <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
                        {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AliceBlue }}>Back</Text> */}
                    </TouchableOpacity>
                    <View className='mr-3'>
                        <TouchableOpacity onPress={() => {
                        }} >
                            <Material name="dots-horizontal" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </>
        }
    </>
}

export default HouseHoldItemDetailHeader