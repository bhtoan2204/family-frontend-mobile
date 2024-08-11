import React, { useEffect, useState } from 'react'
import { View, Text, Animated, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator, Dimensions, TextInput, KeyboardAvoidingView, Platform, Share, StatusBar } from 'react-native'
import { COLORS } from 'src/constants';
import Img from 'src/assets/images/guildline.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { GuildLineDetail, Step } from 'src/interface/guideline/guideline';
import GuildLineService from 'src/services/apiclient/GuildLineService';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import PickImageSheet from './PickImageSheet/PickImageSheet';
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';
import StepGuideLineImage from './StepGuideLineImage';
import GuildLineHeader from './GuildLineHeader';
import StepIndicator from './StepIndicator';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGuideline, updateMarkShareGuideline } from 'src/redux/slices/GuidelineSlice';
import { GuildLineDetailScreenProps } from 'src/navigation/NavigationTypes';
import GuildlineDetailInfo from './GuildlineDetailDescriptionInfo';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { useToast } from 'react-native-toast-notifications';
import { getTranslate } from 'src/redux/slices/languageSlice';
const screenWidth = Dimensions.get('window').width;
const GuildLineDetailScreen = ({ navigation, route }: GuildLineDetailScreenProps) => {
  const { id_item, id_family } = route.params
  // console.log(id_item, id_family)
  const [currentStep, setCurrentStep] = useState(0)
  const [guildLineDetail, setGuildLineDetail] = useState<GuildLineDetail>()
  const [guildLineSteps, setGuildLineSteps] = useState<Step[]>()
  const [loading, setLoading] = useState(true)
  const [previousStep, setPreviousStep] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const isKeyboardVisible = useKeyboardVisible();
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const bottomSheetRef = React.useRef<any>(null);
  const detailSheetRef = React.useRef<any>(null);
  const isDarkMode = useSelector(getIsDarkMode)
  const toast = useToast()

  const [contentSheet, setContentSheet] = useState<{
    text: string;
    type: number;
  }>({
    text: "",
    type: 1
  });
  const dispatch = useDispatch<AppDispatch>();
  const translate = useSelector(getTranslate)
  useEffect(() => {
    const fetchGuildLineDetail = async () => {
      try {
        const response = await GuildLineService.getGuildLineDetail(id_family!, id_item); // API call to fetch guildline detail
        setGuildLineDetail(response);
        console.log(response)
        if (response && response.steps) {

          setGuildLineSteps(response.steps)
          setCurrentStep(0)
        } else {
          setGuildLineSteps(
            [
              {
                name: "",
                description: "",
                imageUrl: ""
              }
            ]
          )
          setCurrentStep(0)
        }
        console.log(response)
        setLoading(false);
      } catch (error) {

        //console.error('Error fetching guildline detail:', error);

      }
    };
    fetchGuildLineDetail();
  }, [])


  const nextStep = React.useCallback(() => {
    setCurrentStep((prev) => {
      return prev + 1
    })
  }, [])

  const prevStep = React.useCallback(() => {
    setCurrentStep((prev) => {
      if (prev <= 0) {
        return 0
      } else {
        return prev - 1
      }
    })
  }, [])

  const onSucess = React.useCallback(() => {
    toast.show("Update success", {
      type: "success",
      duration: 2000,
      icon: <Material name="check" size={24} color={"white"} />,
    });

  }, [])

  const onFailed = React.useCallback(() => {
    toast.show("Failed to update", {
      type: "error",
      duration: 2000,
      icon: <Material name="close" size={24} color={"white"} />,
    });
  }, [])

  const handleIsAddingStep = async () => {
    const newStep: Step = {
      name: "",
      description: "",
      imageUrl: ""
    }
    setGuildLineSteps([...(guildLineSteps || []), newStep]);
    console.log([...(guildLineSteps || []), newStep]);

    setPreviousStep(currentStep);

    setCurrentStep(guildLineSteps ? guildLineSteps.length : 0);

    setIsAdding(true);
  };

  const handleCancelAddStep = () => {
    console.log(guildLineSteps?.filter((step, index) => index !== guildLineSteps.length - 1));
    setGuildLineSteps(guildLineSteps?.filter((step, index) => index !== guildLineSteps.length - 1));
    setInputDescription("");
    setInputName("");
    setCurrentStep(previousStep);
    setIsAdding(false);
  };

  const handleSaveAddStep = async () => {
    const newStep = guildLineSteps?.find((step, index) => index === currentStep)
    console.log("input ", inputName, inputDescription)

    if (newStep) {
      const newStep2 = {
        imageUrl: newStep.imageUrl,
        name: inputName,
        description: inputDescription
      }
      console.log("new step nè" + newStep2)
      const a = await GuildLineService.addStepGuildLine(
        id_item!, id_family!, newStep2
      )

      if (a) {
        setGuildLineSteps((prev) => {
          return prev?.map((step, index) => {
            if (index === currentStep) {
              return newStep2
            }
            return step
          })
        })
        onSucess()
      } else {
        onFailed()
      }



      setIsAdding(false);
      setCurrentStep(currentStep);
      setInputDescription("");
      setInputName("");

    } else {
      setIsAdding(false);
      setCurrentStep(currentStep);
      setInputDescription("");
      setInputName("");
    }
  }

  const handleSaveEdit = async () => {
    setIsEditing(false);
    const newStep = guildLineSteps?.filter((step, index) => index === currentStep)[0];
    console.log(newStep)
    if (newStep) {
      const newStep2 = {
        ...newStep,
        name: inputName,
        description: inputDescription
      }
      let a;
      if (guildLineSteps) {
        if (guildLineSteps[0].name == "" && guildLineSteps[0].description == "" && guildLineSteps[0].imageUrl == "") {
          await GuildLineService.addStepGuildLine(
            id_item!, id_family!, newStep2
          )
          onSucess()
          setGuildLineSteps((prev) => {
            return prev?.map((step, index) => {
              if (index === currentStep) {
                return {
                  imageUrl: newStep.imageUrl,
                  name: inputName,
                  description: inputDescription,
                }
              }
              return step
            })
          })
        } else {
          await GuildLineService.updateGuildLineDetail(
            "",
            id_family!,
            id_item!,
            newStep2,
            currentStep
          )
          onSucess()
          setGuildLineSteps((prev) => {
            return prev?.map((step, index) => {
              if (index === currentStep) {
                return {
                  imageUrl: newStep.imageUrl,
                  name: inputName,
                  description: inputDescription,
                }
              }
              return step
            })
          })
        }

      }

    }
    setInputDescription("");
    setInputName("");
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setInputDescription("");
    setInputName("");
  }

  const handleDeleteCurrentStep = async () => {
    await GuildLineService.deleteStepGuildLine(id_family!, id_item!, currentStep)
    onSucess()
    const currStep = currentStep
    if (currStep > 0) {
      setCurrentStep(currStep - 1)
    } else {
      setCurrentStep(0)
    }
    setGuildLineSteps((prev) => {
      return prev?.filter((step, index) => index !== currStep)
    })

  }

  const handleDeleteGuideline = async () => {
    await GuildLineService.deleteGuideline(id_family!, id_item!)
    dispatch(deleteGuideline(id_item!))
    navigation.goBack()
  }



  const handleTakePhoto = async () => {
    console.log("Take photo")
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result.assets[0].uri);
        if (!isAdding) {
          if (guildLineSteps) {
            if (guildLineSteps[0].name == "" && guildLineSteps[0].description == "" && guildLineSteps[0].imageUrl == "") {
              const step = {
                imageUrl: result.assets[0].uri,
                name: inputName,
                description: inputDescription
              }
              await GuildLineService.addStepGuildLine(
                id_item!, id_family!, step
              )
            } else {
              await GuildLineService.updateGuildLineDetail(
                result.assets[0].uri,
                id_family!,
                id_item!,
                guildLineSteps![currentStep],
                currentStep
              )
            }
          }
        }
        setGuildLineSteps((prev) => {
          return prev?.map((step, index) => {
            if (index === currentStep) {
              return {
                ...step,
                imageUrl: result.assets[0].uri
              }
            }
            return step
          })

        })
      }
      bottomSheetRef.current?.close()
    } else {
      alert('Permission to access camera was denied');
    }
  }

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(currentStep)
        if (!isAdding) {
          if (guildLineSteps) {
            if (guildLineSteps[0].name == "" && guildLineSteps[0].description == "" && guildLineSteps[0].imageUrl == "") {
              const step = {
                imageUrl: result.assets[0].uri,
                name: inputName,
                description: inputDescription
              }
              await GuildLineService.addStepGuildLine(
                id_item!, id_family!, step
              )
            } else {
              await GuildLineService.updateGuildLineDetail(
                result.assets[0].uri,
                id_family!,
                id_item!,
                guildLineSteps![currentStep],
                currentStep
              )
            }
          }
          setGuildLineSteps((prev) => {
            return prev?.map((step, index) => {
              if (index === currentStep) {
                return {
                  ...step,
                  imageUrl: result.assets[0].uri
                }
              }
              return step
            })
          })
        }



      }
      bottomSheetRef.current?.close()
    }
    else {
      alert('Permission to access camera was denied');
    }
  }

  const handleShareGuideline = async () => {
    try {
      dispatch(updateMarkShareGuideline({
        id_guide_item: id_item!,
        is_share: !guildLineDetail?.is_shared
      }))
      setGuildLineDetail((prev) => {
        return {
          ...prev!,
          is_shared: !prev?.is_shared
        }
      })
      await GuildLineService.shareGuideline(id_family!, id_item!)
      if (guildLineDetail?.is_shared) {
        toast.show("Guideline unshared", {
          type: "success",
          duration: 2000,
          icon: <Material name="check" size={24} color={"white"} />,
        });
      } else {
        toast.show("Guideline shared", {
          type: "success",
          duration: 2000,
          icon: <Material name="check" size={24} color={"white"} />,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditGuildline = () => {
    setIsEditing(true)
    if (guildLineSteps) {
      setInputName(guildLineSteps[currentStep].name)
      setInputDescription(guildLineSteps[currentStep].description)
    }
  }
  if (loading) {
    return <View className='flex-1 bg-[#f7f7f7] dark:bg-[#0A1220] items-center justify-center'>
      <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="small" />

    </View>;
  }

  if (!guildLineDetail) {
    return <View className='flex-1 bg-[#f7f7f7] dark:bg-[#0A1220]  justify-center items-center'>
      <Text className='text-2xl font-bold mt-5 text-black dark:text-white'>No data found</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} className='mt-5 border-[1px] px-4 py-2 rounded-lg'>
        <Text className='text-base font-bold text-[#0A1220] dark:text-white'>Back</Text>
      </TouchableOpacity>
    </View>
  }
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className='flex-1 bg-[#f7f7f7] dark:bg-[#0A1220] items-center '>
        <GuildLineHeader
          isAdding={isAdding}
          isEditing={isEditing}
          setIsAdding={setIsAdding}
          setIsEditing={setIsEditing}
          handleCancelAddStep={handleCancelAddStep} handleCancelEdit={handleCancelEdit}
          handleSaveAddStep={handleSaveAddStep} handleSaveEdit={handleSaveEdit}
          navigationBack={() => navigation.goBack()} handleIsAddingStep={handleIsAddingStep}
          handleEditGuildline={handleEditGuildline}
          handleShareGuideline={handleShareGuideline}
          // bottomSheetRef={bottomSheetRef}
          handleDeleteCurrentStep={handleDeleteCurrentStep}
          handleDeleteGuideline={handleDeleteGuideline}
          item={guildLineDetail!}
          currentStep={currentStep}
        />
        <KeyboardAvoidingView className=' h-full flex flex-col items-center mt-3  ' behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
          {
            guildLineSteps && <>
              <StepGuideLineImage
                isAdding={isAdding}
                isEditing={isEditing}
                setAdding={setIsAdding}
                setEditing={setIsEditing}
                bottomSheetRef={bottomSheetRef}
                guideLineStepData={guildLineSteps[currentStep]}
                currentStep={currentStep}
                isKeyboardVisible={isKeyboardVisible}
                guildLineSteps={guildLineSteps}
              />
              <View className='bg-[#f7f7f7] dark:bg-[#0A1220]  w-full'>

                <StepIndicator currentStep={currentStep} guildLineSteps={guildLineSteps} />
                {
                  !isAdding && !isEditing ?
                    <TouchableOpacity onPress={() => {
                      // setIsEditing(true)
                      // setInputName(guildLineSteps[currentStep].name)
                      // setInputDescription(guildLineSteps[currentStep].description)
                      setContentSheet({
                        text: guildLineSteps[currentStep].name,
                        type: 1
                      })
                      detailSheetRef.current?.expand()


                    }}>
                      <Text className='text-center px-4 text-2xl font-bold mt-5 ' numberOfLines={2} style={{ color: COLORS.AuroMetalSaurus }}>{
                        translate("guideline_detail_step_text")
                      } {currentStep + 1}: {guildLineSteps[currentStep].name != ""
                        &&
                        guildLineSteps[currentStep].name != null
                        ? guildLineSteps[currentStep].name : translate("guideline_detail_empty_step_title_text")}</Text>
                    </TouchableOpacity>
                    : <TextInput className='text-center px-4 text-2xl font-bold mt-5 ' style={{ color: COLORS.AuroMetalSaurus }} placeholder='Enter name of step' autoFocus maxLength={50} onChangeText={(text) => {
                      setInputName(text)
                    }
                    }
                      value={inputName}
                    />
                }
                {
                  !isAdding && !isEditing
                    ?
                    <TouchableOpacity onPress={() => {
                      // setIsEditing(true)
                      // setInputName(guildLineSteps[currentStep].name)
                      // setInputDescription(guildLineSteps[currentStep].description)
                      setContentSheet({
                        text: guildLineSteps[currentStep].description,
                        type: 2
                      })
                      detailSheetRef.current?.expand()

                    }}>
                      <Text className='text-center px-4 text-lg mt-5 text-[#a1a1a1]' numberOfLines={2} >{guildLineSteps[currentStep].description != "" && guildLineSteps[currentStep].description != null ? guildLineSteps[currentStep].description : translate("guideline_detail_empty_step_description_text")}</Text>
                    </TouchableOpacity>
                    :
                    <TextInput className='text-center px-4 text-lg mt-5 ' maxLength={50} placeholder='Enter description (optional)' onChangeText={(text) => {
                      // console.log("desc step", text)
                      setInputDescription(text)
                    }}
                      value={inputDescription}
                    />
                }
              </View>

            </>
          }
          {
            guildLineSteps && !isAdding && !isEditing && <>
              <View style={styles.navigationView} className=''>
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
                  currentStep < guildLineSteps.length - 1 ? <TouchableOpacity
                    onPress={() => nextStep()}
                    style={{
                      backgroundColor: COLORS.AuroMetalSaurus,
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
        </KeyboardAvoidingView>
        <PickImageSheet bottomSheetRef={bottomSheetRef} handlePickImage={handlePickImage} handleTakePhoto={handleTakePhoto} />
      </View>
      <GuildlineDetailInfo bottomSheetRef={detailSheetRef}
        text={contentSheet.text}
        type={contentSheet.type}
        setText={(value) => {
          setContentSheet({
            ...contentSheet,
            text: value
          })

        }}
        handleEditGuildline={handleEditGuildline}

      />
    </>
  );
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
export default GuildLineDetailScreen