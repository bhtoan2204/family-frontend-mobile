import React from 'react'
import { Dimensions, View, Text, TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useSelector } from 'react-redux'
import { getTranslate } from 'src/redux/slices/languageSlice'

const PickImageSheet = ({ bottomSheetRef, handleTakePhoto, handlePickImage }: { bottomSheetRef: React.RefObject<any>, handleTakePhoto: () => Promise<void>, handlePickImage: () => Promise<void> }) => {
    const translate = useSelector(getTranslate)
    return (
        <RBSheet
            ref={bottomSheetRef}
            closeOnPressMask={true}
            customStyles={{
                container: {
                    // backgroundColor: "white",
                    // height: Dimensions.get("window").height / 3,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                draggableIcon: {
                    display: "none",
                }
            }}
        >
            <View className='flex-col p-6  h-full bg-[#fafafa] dark:bg-[#0A1220] justify-center'>

                <TouchableOpacity className='h-16 mb-8 flex-row items-center justify-center border-[1px] border-[#d1d1d1] dark:border-[#8D94A5]  rounded-lg shadow-sm bg-white dark:bg-[#171A21]' onPress={async () => {
                    await handleTakePhoto()

                }}>
                    <Text className='text-lg font-semibold dark:text-white'>{
                        translate('Take a photo')
                    }</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-16 flex-row items-center justify-center border-[1px] border-[#d1d1d1] dark:border-[#8D94A5] rounded-lg shadow-sm bg-white dark:bg-[#171A21]' onPress={async () => {
                    await handlePickImage()
                }}>
                    <Text className='text-lg font-semibold dark:text-white'>{
                        translate('Choose from library')
                    }</Text>
                </TouchableOpacity>
            </View>
        </RBSheet>
    )
}

export default PickImageSheet