import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native'
import { AddHouseHoldItemDetailScreenProps, HouseHoldItemDetailScreenProps, HouseHoldItemScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import FamilyImage from 'src/assets/images/household.png';
import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
import { household_category_dat } from './const/data';
import HouseHoldFilterBar from 'src/components/user/household/household-filter-bar';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import useImageValid from 'src/hooks/useImageValid';
import BoxImage from 'src/assets/images/household_assets/box.png';
import InfoIcon from 'src/assets/images/household_assets/info.png';
import BillsIcon from 'src/assets/images/household_assets/bills.png';
import ReceiptImage from 'src/assets/images/household_assets/receipt.png';
import AddHouseHoldItemInfoSheet from './AddHouseHoldItemInfoSheet/AddHouseHoldItemInfoSheet';
import StepIndicator from './AddHouseHoldItemInfoSheet/StepIndicator';
import AddHouseholdStepIndicator from 'src/components/user/household/add-household-step-indicator';
const household_items = [
    {
        "id_household_item": 4,
        "id_family": 96,
        "item_name": "Máy giặt",
        "item_description": "máy giặt toshiba nhà tao",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451417048",
        "id_category": 1
    },
    {
        "id_household_item": 5,
        "id_family": 96,
        "item_name": "Hủ muối tiêu",
        "item_description": "ai mà ăn muối tiêu chanh này sẽ bị ám suốt đời",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451468168",
        "id_category": 1
    },

    {
        "id_household_item": 10,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454576319",
        "id_category": 1
    },
    {
        "id_household_item": 11,
        "id_family": 96,
        "item_name": "eulaaaaa",
        "item_description": "đây là bé eula dễ thương",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713502246879",
        "id_category": 1
    },
    {
        "id_household_item": 13,
        "id_family": 96,
        "item_name": "Adudu",
        "item_description": "lalala",
        "item_imageurl": null,
        "id_category": 2
    }
]

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

const screenWidth = Dimensions.get('screen').width
const screenHeigh = Dimensions.get('screen').height

const AddHouseHoldItemDetailScreen: React.FC<AddHouseHoldItemDetailScreenProps> = ({ navigation, route }) => {
    const { id_family, id_category, id_item } = route.params
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    const [step, setStep] = React.useState(0);


    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1]">
            <View className='bg-[#F9F6F2] p-[20px]  rounded-tl-xl rounded-tr-xl flex-1'>
                <TouchableOpacity className='absolute top-10 right-2 p-1 rounded-full border-[1px] z-10' style={{
                    borderColor: iOSGrayColors.systemGray.accessibleDark,
                    backgroundColor: iOSGrayColors.systemGray.accessibleLight
                }} onPress={() => {
                    navigation.goBack()
                }} >
                    <Material name="close" size={23} color={'white'} />
                </TouchableOpacity>
                <View className='flex-1'>
                    <View className='w-full items-center mt-5'>
                        <Material name="package-variant" size={35} style={{ color: iOSGrayColors.systemGray6.accessibleDark, fontWeight: "bold" }} />
                        <Text className='' style={{
                            color: iOSGrayColors.systemGray6.accessibleDark,
                            fontSize: 20,
                            fontWeight: 'bold'

                        }}>Add more info</Text>
                    </View>
                    {/* <Text>3-Step indicator here</Text> */}
                    <View className='w-full justify-center items-center my-3'>
                        <AddHouseholdStepIndicator currentStep={step} steps={steps}/>
                    </View>


                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddHouseHoldItemDetailScreen