import { Picker } from '@react-native-picker/picker';
import React, { useEffect } from 'react'
import { View, Text, Dimensions, TouchableOpacity, TextInput, InputAccessoryView } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import { COLORS } from 'src/constants';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import * as Animatable from 'react-native-animatable';
import { formatVietNamCurrencyNoDot, formatVietNamCurrencyToDot, fromVietNamCurrencyToText } from 'src/utils/formatCurrency';

interface PricePickerSheetProps {
    refRBSheet: React.RefObject<any>;
    initialNumber: number;
    onSetNumber: (number: number) => void
}

const isNumber = (numberString: string) => {
    const number = parseInt(numberString);
    if (isNaN(number)) {
        return false;
    }
    else return true;
};

const PricePickerSheet = ({
    refRBSheet, initialNumber, onSetNumber
}: PricePickerSheetProps) => {
    const [input, setInput] = React.useState<string>(initialNumber.toString() || "0")
    const [isValid, setIsValid] = React.useState<boolean>(isNumber(input))
    const inputAccessoryViewID = 'uniqueID';

    useEffect(() => {
        setIsValid(isNumber(input))
    }, [input])
    const showText = (numberString: string) => {
        const number = parseInt(numberString);
        if (!isNaN(number)) {
            // return `Quantity ${number}`;
            const text = fromVietNamCurrencyToText(numberString)
            return text
        } else {
            return "Invalid input";
        }
    };

    // const formatVietNamCurrency = (value: string) => {
    //     if (!value) return '';
    //     // Xóa tất cả các ký tự không phải số
    //     value = value.replace(/\D/g, '');
    //     // Đảo ngược chuỗi để dễ dàng thêm dấu chấm
    //     value = value.split('').reverse().join('');
    //     // Thêm dấu chấm sau mỗi ba chữ số
    //     value = value.replace(/(\d{3})(?=\d)/g, '$1.');
    //     // Đảo ngược lại chuỗi
    //     return value.split('').reverse().join('');
    // };


    return (
        <RBSheet
            ref={refRBSheet}
            onClose={() => {
                // setInput(initialNumber.toString())
                setInput("0")
            }}
            onOpen={() => {
                setInput(formatVietNamCurrencyToDot(initialNumber.toString()))
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
                        <Text className='text-base font-medium text-center' >Input Price</Text>
                    </View>
                    <TouchableOpacity className=' ' onPress={() => {
                        // handleSave()
                        onSetNumber(parseInt(formatVietNamCurrencyNoDot(input)))
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
                        inputAccessoryViewID={inputAccessoryViewID}
                        keyboardType='numeric'
                        returnKeyType={isValid ? "done" : 'next'}
                        placeholder='Enter quantity'
                        autoFocus
                        maxLength={14}
                        value={input}
                        onChangeText={(text) => {
                            // onSetNumber(parseInt(text))
                            // setInput(text)
                            const formattedText = formatVietNamCurrencyToDot(text);
                            // console.log(formatVietNamCurrencyNoDot(formattedText))
                            setInput(formattedText);
                        }}
                        onSubmitEditing={() => {
                            if (isValid) {
                                onSetNumber(parseInt(formatVietNamCurrencyNoDot(input)))
                                refRBSheet.current?.close()
                            }

                        }}
                        className='mx-4 px-4 border-[1.2px] mt-4 my-4 py-4'
                        style={{
                            borderColor: iOSColors.systemBlue.defaultLight,
                            borderRadius: 5,
                            fontSize: 16
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
                <InputAccessoryView nativeID={inputAccessoryViewID}>
                    {
                        isValid && <Animatable.View animation={""} duration={200} className='py-5 flex-1 flex-row' style={{
                            backgroundColor: iOSGrayColors.systemGray5.defaultLight,
                        }}>
                            <TouchableOpacity className='flex-1  items-center' onPress={() => {

                            }}>
                                <Text>hi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-1 items-center '>
                                <Text>hi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-1 items-center '>
                                <Text>hi</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    }

                </InputAccessoryView>
            </View>

        </RBSheet>

    )
}

export default PricePickerSheet