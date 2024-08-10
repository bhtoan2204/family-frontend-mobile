import React, { useCallback, useMemo } from 'react'
import { View, Text, Keyboard, TouchableOpacity } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { getTranslate } from 'src/redux/slices/languageSlice';

interface GuildlineDetailInfoProps {
    bottomSheetRef: React.RefObject<BottomSheet>;
    text: string;
    type: number; // 1 for step title, 2 for step description
    setText: (text: string) => void;
    handleEditGuildline: () => void;
}

const GuildlineDetailInfo = ({
    bottomSheetRef, text, type, setText, handleEditGuildline
}: GuildlineDetailInfoProps) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    const isDarkMode = useSelector(getIsDarkMode)
    const translate = useSelector(getTranslate)
    return (
        <BottomSheet
            ref={bottomSheetRef}

            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7',
            }}
            backdropComponent={renderBackdrop}

            // onClose={() => {
            //     Keyboard.dismiss()
            // }}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"

        >
            <View className='flex-1 items-center '>
                <View className='p-4'>
                    {
                        type == 1 ? <Text className='text-2xl font-bold text-black dark:text-white'>{
                            translate("title")
                        }</Text> : <Text className='text-2xl font-bold text-black dark:text-white'>{
                            translate("description")

                        }</Text>

                    }
                </View>
                <View className='px-4 mb-8 '>
                    <Text className='text-base text-center text-black dark:text-white'>{text}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.65} className='w-[50%] h-[13%] border-[1px] rounded-lg justify-center items-center' style={{
                    borderColor: iOSColors.systemBlue.defaultLight
                }} onPress={() => {
                    // setText(text)
                    bottomSheetRef.current?.close()
                    handleEditGuildline()

                }}>
                    {
                        text == '' ?
                            <Text className='text-base font-medium' style={{
                                color: iOSColors.systemBlue.defaultLight
                            }}>{
                                    translate('guideline_detail_add_step')

                                } {type == 1 ? "title" : "description"}</Text>
                            :
                            <Text className='text-base font-medium' style={{
                                color: iOSColors.systemBlue.defaultLight
                            }}>{
                                translate('update')
                            }</Text>
                    }
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

export default GuildlineDetailInfo