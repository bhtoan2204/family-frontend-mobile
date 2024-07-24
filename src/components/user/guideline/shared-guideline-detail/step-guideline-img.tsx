import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, Platform, UIManager } from 'react-native'
import { GuildLineDetail, Step } from 'src/interface/guideline/guideline';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Img from 'src/assets/images/guildline.png';
import * as Animatable from 'react-native-animatable';
import Animated, { Easing } from 'react-native-reanimated';
import ImageComponent from 'src/components/Image/Image';
import useImageValid from 'src/hooks/useImageValid';
import { Keyboard } from 'react-native';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';

// if (
//     Platform.OS === 'android' &&
//     UIManager.setLayoutAnimationEnabledExperimental
// ) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

interface StepGuideLineImageProps {
    isAdding: boolean;
    isEditing: boolean;
    setAdding: React.Dispatch<React.SetStateAction<boolean>>;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    bottomSheetRef: React.RefObject<any>;
    guideLineStepData: Step;
    currentStep: number;
    isKeyboardVisible: boolean;
    guildLineSteps: Step[];
    editable: boolean;
}


const StepSharedGuideLineImage = ({
    isAdding,
    isEditing,
    setAdding,
    setEditing,
    bottomSheetRef,
    guideLineStepData,
    currentStep,
    isKeyboardVisible,
    guildLineSteps,
    editable
}: StepGuideLineImageProps) => {
    const prevStepRef = React.useRef(currentStep);
    const isValid = useImageValid({ imageUrl: guideLineStepData.imageUrl || "" });
    React.useEffect(() => {
        console.log(prevStepRef.current, currentStep)
        prevStepRef.current = currentStep;
    }, [currentStep]);

    return (
        <>
            {
                guildLineSteps.map((step, index) => {
                    return <React.Fragment key={index}>
                        {
                            currentStep === index && <Animatable.View animation={prevStepRef.current <= index ? 'bounceInRight' : 'bounceInLeft'} key={index} duration={700} className='h-[50%] w-[90%] flex-col justify-center items-center mb-10  rounded-full mx-4 ' style={{

                            }}>
                                <TouchableOpacity disabled={editable == false} onPress={() => {
                                    if (isKeyboardVisible) {
                                        Keyboard.dismiss()
                                    } else {
                                        console.log(currentStep)
                                        bottomSheetRef.current?.open()
                                    }
                                }} activeOpacity={isKeyboardVisible ? 0.8 : 1}>
                                    <ImageComponent defaultImage={Img} imageUrl={step.imageUrl || ""} style={{ height: Dimensions.get("window").height * 0.5, width: Dimensions.get("window").width * 0.9 }} />
                                </TouchableOpacity>
                                {
                                    !isValid
                                    &&
                                    <TouchableOpacity disabled={editable == false} style={{ height: Dimensions.get("window").height * 0.5, width: Dimensions.get("window").width * 0.9 }} className='absolute' activeOpacity={isKeyboardVisible ? 0.8 : 1} onPress={() => {
                                        if (isKeyboardVisible) {
                                            Keyboard.dismiss()
                                        } else {
                                            console.log(currentStep)
                                            bottomSheetRef.current?.open()
                                        }
                                    }}>
                                        <View className='opacity-80 bg-[#f7f7f7] dark:bg-[#0A1220] h-full w-full flex justify-center items-center rounded'>

                                            <Material name="file-image-plus" size={30} style={{ color: "gray" }} />
                                        </View>
                                    </TouchableOpacity>
                                }

                            </Animatable.View >
                        }

                    </React.Fragment>
                })
            }


        </>
    )
}

export default StepSharedGuideLineImage