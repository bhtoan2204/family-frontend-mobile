import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS } from 'src/constants';
import { Step } from 'src/interface/guideline/guideline';

interface AddHouseHoldInfoStepIndicatorProps {
    currentStep: number;
    // guildLineSteps: Step[];

}

const steps = [
    {
        title: "Step 0",
        description: "Intro"
    },
    {
        title: "Step 1",
        description: "Add item name and description"
    },
    {
        title: "Step 2",
        description: "Add item image"
    }
]

const AddHouseholdStepIndicator = ({
    currentStep
}: AddHouseHoldInfoStepIndicatorProps) => {
    return (
        <View className='flex-row'>
            {steps.map((step, index) => {
                return (
                    <TouchableOpacity style={{
                        ...styles.stepIndicator,
                        width: Dimensions.get('screen').width / steps.length - 80,
                        backgroundColor: currentStep === index ? COLORS.AuroMetalSaurus : "#d1d1d1"
                    }} key={index}></TouchableOpacity>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    stepIndicator: {
        height: 5,
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
export default AddHouseholdStepIndicator