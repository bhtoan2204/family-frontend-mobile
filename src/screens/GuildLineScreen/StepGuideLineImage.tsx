import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, Platform, UIManager } from 'react-native'
import { GuildLineDetail, Step } from 'src/interface/guideline/guideline';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Img from 'src/assets/images/guildline.png';
import * as Animatable from 'react-native-animatable';
import Animated, { Easing } from 'react-native-reanimated';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface StepGuideLineImageProps {
    isAdding: boolean;
    isEditing: boolean;
    setAdding: React.Dispatch<React.SetStateAction<boolean>>;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    bottomSheetRef: React.RefObject<any>;
    guideLineStepData: Step;
    currentStep: number;
    isKeyboardVisible: boolean;
}


const StepGuideLineImage = ({
    isAdding,
    isEditing,
    setAdding,
    setEditing,
    bottomSheetRef,
    guideLineStepData,
    currentStep,
    isKeyboardVisible
}: StepGuideLineImageProps) => {
    const prevStepRef = React.useRef(currentStep);

    React.useEffect(() => {

        prevStepRef.current = currentStep;
    }, [currentStep]);

    return (
        <>
            <Animatable.View animation={currentStep > prevStepRef.current ? 'bounceInRight' : 'bounceInLeft'} key={currentStep} duration={700} className='h-[50%] w-[90%] flex-col justify-center items-center mb-10  rounded-full mx-4 ' style={{

            }}>
                <TouchableOpacity disabled={isKeyboardVisible == true} onPress={() => {
                    console.log(currentStep)
                    bottomSheetRef.current?.open()
                }} >
                    <Image source={guideLineStepData.imageUrl == null || guideLineStepData.imageUrl == "" || guideLineStepData.imageUrl == undefined
                        ? Img
                        : { uri: guideLineStepData.imageUrl }} resizeMode='cover' style={{ height: Dimensions.get("window").height * 0.5, width: Dimensions.get("window").width * 0.9 }} />
                </TouchableOpacity>

                {
                    guideLineStepData.imageUrl == null || guideLineStepData.imageUrl == ""
                    &&
                    <TouchableOpacity style={{ height: Dimensions.get("window").height * 0.5, width: Dimensions.get("window").width * 0.9 }} className='absolute' activeOpacity={1.0} disabled={isKeyboardVisible == true} onPress={() => {
                        console.log(currentStep)
                        bottomSheetRef.current?.open()
                    }}>
                        <View className='opacity-80 bg-white h-full w-full flex justify-center items-center rounded'>

                            <Material name="file-image-plus" size={30} style={{ color: "gray" }} className='' />
                        </View>
                    </TouchableOpacity>
                }
            </Animatable.View >


        </>
    )
}

export default StepGuideLineImage