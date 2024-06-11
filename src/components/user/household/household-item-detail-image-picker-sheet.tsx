import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import RBSheet from 'react-native-raw-bottom-sheet'

interface HouseHoldItemDetailImagePickerSheetProps {
    sheetRef: React.RefObject<any>
    onPickCamera: () => Promise<void>
    onPickGallery: () => Promise<void>
}

const HouseHoldItemDetailImagePickerSheet = ({ sheetRef, onPickCamera, onPickGallery }: HouseHoldItemDetailImagePickerSheetProps) => {
    return (
        <RBSheet
            ref={sheetRef}
            closeOnPressMask={true}
            customStyles={{
            container: {
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                draggableIcon: {
                    display: "none",
                }
            }}
        >
            <View className='flex-col p-6  h-full bg-[#fafafa] justify-center'>

                <TouchableOpacity className='h-16 mb-8 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={async () => {
                    await onPickCamera()

                }}>
                    <Text className='text-lg font-semibold'>Take a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-16 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={async () => {
                    await onPickGallery()
                }}>
                    <Text className='text-lg font-semibold'>Choose Image from Library</Text>
                </TouchableOpacity>
            </View>
        </RBSheet>
    )
}

export default HouseHoldItemDetailImagePickerSheet