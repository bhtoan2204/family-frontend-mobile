import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS } from 'src/constants';
import { Step } from 'src/interface/guideline/guideline';

interface StepIndicatorProps {
    currentStep: number;
    guildLineSteps: Step[];

}

const StepIndicator = ({
    currentStep, guildLineSteps
}: StepIndicatorProps) => {
    return (
        <View className='flex-row'>
            {guildLineSteps.map((step, index) => {
                return (
                    <TouchableOpacity style={{
                        ...styles.stepIndicator,
                        width: currentStep === index ? Dimensions.get('screen').width / guildLineSteps.length - 5 : Dimensions.get('screen').width / guildLineSteps.length - 12,
                        backgroundColor: currentStep === index ? COLORS.AuroMetalSaurus : "#d1d1d1"
                    }} key={index}></TouchableOpacity>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    stepIndicator: {
        height: 10,
        marginHorizontal: 5,
        borderRadius: 10
    },
    navigationView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingTop: 30,
    },
    navigationBtn: {
        backgroundColor: COLORS.AuroMetalSaurus,
        height: "auto",
        width: 80,
        alignItems: "center"
    },
    navigationBtnTxt: {
        color: "white",
        fontWeight: "bold"
    }

});
export default StepIndicator