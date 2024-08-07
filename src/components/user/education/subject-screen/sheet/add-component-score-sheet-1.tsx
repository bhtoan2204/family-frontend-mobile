import React, { Fragment, useEffect, useRef } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';


import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';



import { addComponentScoreToSubject } from 'src/redux/slices/EducationSlice';
import AddComponentScoreImage from 'src/assets/images/education_assets/add_component_score_img.png';
import TargetImage from 'src/assets/images/education_assets/target.png';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { handleRestore } from 'src/utils/sheet/func';

interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_education_progress: number;
    id_family: number;
    onAddSuccess: () => void;
    onAddFailed: () => void;
    targetData: {
        id: number;
        title: string;
        color: string;
    }[];
    pickedTargets: string[];
    setPickedTargets: (data: string) => void;
    removePickedTargets: (data: string) => void;
    addComponentSheet2Ref: React.RefObject<BottomSheet>
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddComponentScoreSheet1 = ({
    bottomSheetRef,
    id_education_progress,
    id_family,
    onAddSuccess,
    onAddFailed,
    pickedTargets,
    targetData,
    addComponentSheet2Ref,
    removePickedTargets,
    setPickedTargets


}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    // const [inputName, setInputName] = React.useState('')
    const isDarkMode = useSelector(getIsDarkMode)
    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false)
                setErrorText('')
            }, 3000)
        }

    }, [showError])



    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehavior={
            loading ? 'none' : undefined
        } />,
        []
    );

    const findTargetById = React.useCallback((id: number) => {
        return targetData.find(target => target.id == id)
    }, [targetData])

    const checkIsPicked = React.useCallback((id: number) => {
        return pickedTargets.includes(id.toString())
    }, [pickedTargets])


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={true}
            enablePanDownToClose={loading ? false : true}
            enableDynamicSizing={true}
            // snapPoints={snapPoints}
            // handleComponent={null}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7',
            }}
            backdropComponent={renderBackdrop}
            keyboardBehavior='interactive'
            keyboardBlurBehavior='restore'
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(index)
                if (index == -1) {

                }
            }}
        // keyboardBehavior="extend"
        // keyboardBlurBehavior="restore"

        >
            <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets style={{}} keyboardShouldPersistTaps='handled'>

                    <View className='flex-1  mt-10'>
                        <View className='my-3 items-center'>
                            <Image source={TargetImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                        </View>
                        <View className=' items-center'>
                            <Text className='text-base font-semibold text-[#2A475E] dark:text-white' >Choose a targets</Text>
                            {/* <Text className='text-sm my-3 text-[#2A475E] dark:text-[#8D94A5]'>Give your new component score a name</Text> */}
                        </View>
                        <View className='items-center flex-1 justify-center  my-3'>
                            <View className=' flex-wrap flex-row justify-between items-stretch px-3 py-1'>
                                {
                                    targetData.map((target, index) => {
                                        if (index < 9) {
                                            return <Fragment key={index}>
                                                <TargetItem
                                                    data={findTargetById(target.id)!} onPress={() => {
                                                        if (checkIsPicked(target.id)) {
                                                            removePickedTargets(target.id.toString())
                                                        } else {
                                                            setPickedTargets(target.id.toString())
                                                        }

                                                    }}
                                                    isPicked={checkIsPicked(target.id)}
                                                    index={index}
                                                // setPickedTargets={() => {
                                                //     setPickedTargets(target.id.toString())
                                                // }}
                                                // removePickedTargets={() => {
                                                //     removePickedTargets(target.id.toString())
                                                // }}
                                                />
                                            </Fragment>
                                        }
                                    })
                                }

                            </View>
                            <View className=' flex-wrap flex-row  w-full  px-3'>
                                {
                                    targetData.map((target, index) => {
                                        if (index >= 9) {
                                            return <Fragment key={index}>
                                                <TargetItem
                                                    data={findTargetById(target.id)!} onPress={() => {
                                                        if (checkIsPicked(target.id)) {
                                                            removePickedTargets(target.id.toString())
                                                        } else {
                                                            setPickedTargets(target.id.toString())
                                                        }

                                                    }}
                                                    isPicked={checkIsPicked(target.id)}
                                                    index={index}
                                                // setPickedTargets={() => {
                                                //     setPickedTargets(target.id.toString())
                                                // }}
                                                // removePickedTargets={() => {
                                                //     removePickedTargets(target.id.toString())
                                                // }}
                                                />
                                            </Fragment>
                                        }
                                    })
                                }

                            </View>
                        </View>
                        <Text className='mb-10 mx-4 text-center underline underline-offset-3 text-[#2A475E] dark:text-white italic	' onPress={() => {
                            // console.log('ok')
                            // bottomSheetRef.current?.close()
                            addComponentSheet2Ref.current?.expand()
                        }}>Can't find the goal you're looking for? Let's create a new one! </Text>



                        <View>
                            {
                                showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
                            }
                        </View>


                    </View>
                </BottomSheetScrollView>
            </View>

        </BottomSheet>
    )
}

const TargetItem = ({ data, onPress, isPicked, index }: {
    data: {
        id: number;
        title: string;
        color: string;
    },
    onPress: () => void
    isPicked: boolean
    index: number

}) => {
    return (
        <TouchableOpacity className={`flex-row justify-between items-center ${index >= 9 ? "pr-8" : "px-1"} py-2`} onPress={onPress}>
            <View className='flex-row items-center'>
                <View className={`rounded-xl px-3 py-4 ${isPicked ? "" : "border-[1px]"} border-[#CCCCCC] dark:border-white`} style={{
                    backgroundColor: isPicked ? data.color : 'transparent',

                    // width: 20,
                    // height: 20
                }}>
                    <Text className={`px-3 ${isPicked ? 'text-white' : 'text-[#7C7C7C]'} text-sm `} style={{
                        fontSize: 15,
                        // fontWeight: 500

                    }}>{data.title}</Text>

                </View>

            </View>

        </TouchableOpacity>
    )
}
export default AddComponentScoreSheet1