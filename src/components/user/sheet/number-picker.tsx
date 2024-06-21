import { Picker } from '@react-native-picker/picker';
import React, { useEffect } from 'react'
import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import { COLORS } from 'src/constants';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';


interface NumberPickerSheetProps {
    refRBSheet: React.RefObject<any>;
    initialNumber: number;
    onSetNumber: (number: number) => void
    shouldReset?: boolean;
}

const isNumber = (numberString: string) => {
    const number = parseInt(numberString);
    if (isNaN(number)) {
        return false;
    }
    else return true;
};

const NumberPickerSheet = ({
    refRBSheet, initialNumber, onSetNumber, shouldReset
}: NumberPickerSheetProps) => {
    const [input, setInput] = React.useState<string>(initialNumber == 0 ? "0" : initialNumber.toString())
    const [isValid, setIsValid] = React.useState<boolean>(isNumber(input))
    useEffect(() => {
        setIsValid(isNumber(input))
    }, [input])
    const showText = (numberString: string) => {
        const number = parseInt(numberString);
        if (!isNaN(number)) {
            return `Quantity ${number}`;
        } else {
            return "Invalid input";
        }
    };
    return (
        <RBSheet
            ref={refRBSheet}
            onClose={() => {
                if (shouldReset) {
                    setInput("0")
                }
            }}
            customStyles={{
                container: {
                    borderTopLeftRadius: 10,
                    // height: Dimensions.get('window').height * 0.45,
                    borderTopRightRadius: 10,

                },
                // draggableIcon: {
                //     display: "none",
                // }
            }}

        >
            <View>
                <View className='w-full  flex-row justify-between  items-center py-3 bg-white px-4 z-10'>
                    <TouchableOpacity onPress={() => {

                        refRBSheet.current?.close()
                    }} className=' flex-row items-center ' >
                        <Text className='text-base font-medium' style={{ color: COLORS.red }}>Cancel</Text>
                    </TouchableOpacity>
                    <View className=' '>
                        <Text className='text-base font-medium text-center' >Input Quantity</Text>
                    </View>
                    <TouchableOpacity className=' ' onPress={() => {
                        // handleSave()
                        onSetNumber(parseInt(input))
                        refRBSheet.current?.close()
                    }}>
                        <Text className='text-base font-medium ' style={{
                            textAlign: "right",
                            color: COLORS.AuroMetalSaurus
                        }}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        keyboardType='numeric'
                        returnKeyType={isValid ? "done" : 'next'}
                        placeholder='Enter quantity'
                        autoFocus
                        value={input}
                        onChangeText={(text) => {
                            // onSetNumber(parseInt(text))
                            setInput(text)
                        }}
                        onSubmitEditing={() => {
                            if (isValid) {
                                onSetNumber(parseInt(input))
                                refRBSheet.current?.close()
                            }

                        }}
                        className='mx-4 px-4 border-[1.2px] mt-4 my-4 py-4'
                        style={{
                            borderColor: iOSColors.systemBlue.defaultLight,
                            borderRadius: 5
                        }}
                    />
                    <View className='mx-4'>
                        <Text style={{
                            color: iOSGrayColors.systemGray3.defaultDark,
                            fontWeight: '500',
                            marginBottom: 10,
                            marginLeft: 5,
                            fontSize: 15
                        }}>
                            <Text style={{
                                color: !isValid ? iOSColors.systemRed.defaultDark : iOSColors.systemBlue.defaultLight
                            }}>{showText(input)}</Text>
                        </Text>
                    </View>
                </View>
            </View>

        </RBSheet>

    )
}

export default NumberPickerSheet