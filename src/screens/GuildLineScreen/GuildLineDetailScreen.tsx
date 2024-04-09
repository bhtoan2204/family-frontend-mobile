import React, { useEffect, useState } from 'react'
import { View, Text, Animated, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { COLORS } from 'src/constants';
import Img from 'src/assets/images/guildline.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { GuildLineDetail, Step } from 'src/interface/guideline/guideline';
import GuildLineService from 'src/services/apiclient/GuildLineService';
const GuildLineDetailScreen = ({ navigation, route }: any) => {
    const { id_item, id_family } = route.params
    console.log(id_item, id_family)
    const [currentStep, setCurrentStep] = useState(0)
    const [guildLineDetail, setGuildLineDetail] = useState<GuildLineDetail>()
    const [guildLineSteps, setGuildLineSteps] = useState<Step[]>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchGuildLineDetail = async () => {
            try {
                const response = await GuildLineService.getGuildLineDetail(id_family, id_item); // API call to fetch guildline detail
                setGuildLineDetail(response);
                if (response && response.steps) {
                    setGuildLineSteps(response.steps)
                }
                console.log(response)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching guildline detail:', error);
            }
        };
        fetchGuildLineDetail();
    }, [])

    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        setCurrentStep(currentStep <= 0 ? 0 : currentStep - 1)
    }
    if (loading) {
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="small" />;
    }
    return (
        <View className='flex-1 bg-[#fff] items-center '>
            <View className='w-full  flex-row justify-between items-center py-3'>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View className='mr-3'>
                    <TouchableOpacity >
                        <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' />

                    </TouchableOpacity>
                </View>
            </View>
            {
                guildLineSteps && <>
                    <Image source={Img} className='w-[90%] h-[50%] mb-5' resizeMode="cover" />
                    <View className='flex-row'>
                        {guildLineSteps.map((step, index) => {
                            return (
                                <View style={{
                                    ...styles.stepIndicator,
                                    width: currentStep === index ? 40 : 30,
                                    backgroundColor: currentStep === index ? COLORS.primary : "#d1d1d1"
                                }} key={index}></View>
                            )
                        })}
                    </View>
                    <Text className='text-center px-4 text-2xl font-bold mt-5 ' style={{ color: COLORS.primary }}>{guildLineSteps[currentStep].name != null ? guildLineSteps[currentStep].name : "Add name"}</Text>
                    <Text className='text-center px-4 text-base my-6'>{guildLineSteps[currentStep].description != null ? `Description: ${guildLineSteps[currentStep].description}` : "Add description"}</Text>
                </>
            }
            {
                guildLineSteps && <>
                    <View style={styles.navigationView}>
                        {
                            currentStep > 0 ?
                                <TouchableOpacity
                                    onPress={() => prevStep()}
                                    style={{ ...styles.navigationBtn, borderTopEndRadius: 20, borderBottomEndRadius: 20, }} className='flex-row items-center py-2'>
                                    <Material name="chevron-left" size={20} color={"white"} />
                                    <Text className='text-white text-base font-semibold'>Back</Text>
                                </TouchableOpacity>
                                :
                                <View></View>
                        }

                        {
                            currentStep < guildLineSteps.length ? <TouchableOpacity
                                onPress={() => nextStep()}
                                style={{
                                    backgroundColor: COLORS.primary,
                                    height: "auto",
                                    width: 80,

                                    borderTopStartRadius: 20, borderBottomStartRadius: 20
                                }}
                                className='flex-row items-center py-2 justify-end'
                            >
                                <Text className='text-white text-base font-semibold ml-2'>Next</Text>
                                <Material name="chevron-right" size={20} color={"white"} />
                            </TouchableOpacity> : <View></View>
                        }
                    </View>
                </>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepImage: {
        width: "90%",
        height: "40%",
        marginVertical: 30
    },
    stepIndicatorView: {
        flexDirection: "row"
    },
    stepIndicator: {
        height: 10,
        marginHorizontal: 5,
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 20,
    },
    description: {
        textAlign: "center",
        paddingHorizontal: 10
    },
    navigationView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    navigationBtn: {
        backgroundColor: COLORS.primary,
        height: "auto",
        width: 80,
        alignItems: "center"
    },
    navigationBtnTxt: {
        color: "white",
        fontWeight: "bold"
    }

});
export default GuildLineDetailScreen