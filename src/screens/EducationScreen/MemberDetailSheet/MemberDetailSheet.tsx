import React, { useEffect } from 'react'
import { Dimensions, View, Text, TouchableOpacity, Image } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Education } from 'src/interface/education/education'
import Img2 from 'src/assets/images/default_ava.png'
import { COLORS } from 'src/constants'
import CircularProgress from '../CircularProgress'
const MemberDetailSheet = ({ detailSheetRef, data }: { detailSheetRef: React.RefObject<RBSheet>, data: Education | undefined }) => {

    return (
        <RBSheet
            ref={detailSheetRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
                container: {
                    backgroundColor: "white",
                    height: Dimensions.get("window").height * 0.8,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                draggableIcon: {
                    display: "none",
                }
            }}
        >
            <View className='flex-col p-6 h-full bg-[#fafafa] '>
                {
                    data && <View>
                        <View className='flex-row items-center '>
                            <Image source={data?.avatar ? { uri: data.avatar } : Img2} width={100} height={100} className='h-20 w-20' />
                            <View className='ml-4 flex-1 '>
                                <Text className='text-lg font-bold' style={{ color: COLORS.primary }}>{data.firstname} {data.lastname}</Text>
                                <Text style={{ color: 'gray' }} className='text-sm overflow-hidden flex-wrap'>{data.school_info}</Text>
                            </View>

                        </View>
                        <View className="mb-4">
                            <Text className="text-xl font-bold mb-2">{data?.title}</Text>
                            <Text className="text-base mb-2">{data?.progress_notes}</Text>
                            <View className="flex flex-row flex-wrap mb-2">
                                <Text className="font-bold">Subjects:</Text>
                                {data?.subjects.map((subject, index) => (
                                    <Text key={index} className="text-primary mr-2">{subject.subject_name}</Text>
                                ))}
                            </View>
                        </View>
                        <View className="flex items-center">
                            <Text className="font-bold mr-2">Progress:</Text>
                            <CircularProgress
                                size={60}
                                progress={50}
                                strokeWidth={5}
                                backgroundColor="#e0e0e0"
                                progressColor={COLORS.primary}
                            />
                        </View>
                    </View>


                }
            </View>
        </RBSheet >
    )
}

export default MemberDetailSheet