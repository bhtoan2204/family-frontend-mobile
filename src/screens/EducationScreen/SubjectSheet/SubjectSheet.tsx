import React from 'react'
import { Dimensions, TouchableOpacity, View, Text, TouchableWithoutFeedback } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Picker } from '@react-native-picker/picker';
import { ComponentScore, Subject } from 'src/interface/education/education';
import { iOSColors } from 'src/constants/ios-color';
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import PickExpectedScoreSheet from './PickExpectedScoreSheet';
import PickScoreSheet from './PickScoreSheet';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { clearScoreOfSubject, deleteComponentScoreOfSubject } from 'src/redux/slices/EducationSlice';
import PickNameSheet from './PickNameSheet';

interface SubjectSheetProps {
    bottomSheetRef: React.RefObject<any>,
    subjectComponentData: ComponentScore,
    index: number,
    id_family: number,
    id_education_progress: number,
    id_subject: number,
    // setSubjectDetailData: React.Dispatch<React.SetStateAction<Subject>>

}

const SubjectSheet = ({ bottomSheetRef, subjectComponentData, index, id_subject, id_education_progress, id_family }: SubjectSheetProps) => {
    const setExpectedSheetRef = React.useRef<any>(null);
    const setScoreSheetRef = React.useRef<any>(null);
    const setNameSheetRef = React.useRef<any>(null);
    const [selectedLanguage, setSelectedLanguage] = React.useState();
    const numbers = [];
    const dispatch = useDispatch<AppDispatch>();
    for (let i = 0; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            const number = i + j * 0.1;
            numbers.push(Math.round(number * 10) / 10);
        }
    }
    numbers.push(10);

    return (
        <AutoHeightRBSheet
            ref={bottomSheetRef}
            closeOnPressMask
            customStyles={{
                container: {
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                // draggableIcon: {
                //     display: "none",
                // }
            }}
        >
            <View className='flex-col px-6 py-6 bg-[#fafafa] justify-center'>
                <TouchableOpacity className='h-16 mb-6 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={() => {
                    // bottomSheetRef.current?.close()
                    setExpectedSheetRef.current?.open()
                    // await handleTakePhoto()
                }}>
                    <Text className='text-lg font-semibold'>Set expect score</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-16 mb-6 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={() => {
                    // bottomSheetRef.current?.close()
                    setScoreSheetRef.current?.open()
                    // await handleTakePhoto()

                }}>
                    <Text className='text-lg font-semibold'>Set score</Text>
                </TouchableOpacity>
                {
                    index !== -1 && index !== -2 && <TouchableOpacity className='h-16 mb-6 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={async () => {
                        // dispatch(clearScoreOfSubject({
                        //     id_subject,
                        //     id_education_progress,
                        //     index,
                        // }))
                        // bottomSheetRef.current?.close()
                        setNameSheetRef.current?.open()
                    }}>
                        <Text className='text-lg font-semibold' style={{
                            color: iOSColors.systemBlue.defaultLight
                        }}>Update name</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity className='h-16 mb-6 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={async () => {
                    dispatch(clearScoreOfSubject({
                        id_subject,
                        id_education_progress,
                        index,
                    }))
                    bottomSheetRef.current?.close()
                }}>
                    <Text className='text-lg font-semibold' style={{
                        color: iOSColors.systemRed.defaultDark
                    }}>Clear score data</Text>
                </TouchableOpacity>
                {
                    index !== -1 && index !== -2 && <TouchableOpacity className='h-16 flex-row items-center justify-center border-[1px] border-[#d1d1d1] rounded-lg shadow-sm bg-white' onPress={async () => {
                        dispatch(deleteComponentScoreOfSubject({
                            id_subject,
                            id_education_progress,
                            index,
                        }))
                        bottomSheetRef.current?.close()
                    }}>
                        <Text className='text-lg font-semibold' style={{
                            color: iOSColors.systemRed.defaultDark
                        }}>Delete component score</Text>
                    </TouchableOpacity>
                }
            </View>
            <PickExpectedScoreSheet
                id_education_progress={id_education_progress}
                id_family={id_family}
                id_subject={id_subject}
                setExpectedSheetRef={setExpectedSheetRef}
                index={index}
                score={subjectComponentData.expected_score!} />
            <PickScoreSheet
                id_education_progress={id_education_progress}
                id_family={id_family}
                id_subject={id_subject}
                setScoreSheetRef={setScoreSheetRef}
                index={index}
                score={subjectComponentData.score!}
            />
            {
                index !== -1 && index !== -2 && <PickNameSheet
                    id_education_progress={id_education_progress}
                    id_family={id_family}
                    id_subject={id_subject}
                    setNameSheetRef={setNameSheetRef}
                    index={index}
                    name={subjectComponentData.component_name || ""}
                />
            }

        </AutoHeightRBSheet>
    )
}

export default SubjectSheet