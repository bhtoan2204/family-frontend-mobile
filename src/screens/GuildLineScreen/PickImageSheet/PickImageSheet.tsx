import React from 'react'
import { Dimensions, View, Text, TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'

const PickImageSheet = ({ bottomSheetRef, handleTakePhoto, handlePickImage }: { bottomSheetRef: React.RefObject<RBSheet>, handleTakePhoto: () => Promise<void>, handlePickImage: () => Promise<void> }) => {
    return (
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
    )
}

export default PickImageSheet