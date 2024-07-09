import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image } from 'react-native'
import { HouseHoldScreenProps, ItemScreenProps } from 'src/navigation/NavigationTypes'
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';

// import AccordionItem from 'src/components/AccordionItem/accordion-item';

import ItemComponent from 'src/components/user/household/item/items-component';
import { updateImageProp } from 'src/redux/slices/HouseHoldDetailSlice';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')



const ItemScreen: React.FC<ItemScreenProps> = ({ navigation, route, addItemRef, addRoomRef }) => {
    const { id_family } = route.params
    const refRBSheet = React.useRef<any>(null);
    // const [householdCategory, setHouseholdCategory] = React.useState<HouseHoldCategoryInterface[]>(household_category_dat)
    // const [householdItems, setHouseholdItems] = React.useState<HouseHoldItemInterface[]>(household_items)
    const householdItems = useSelector((state: RootState) => state.householdItems)
    const [choosenCategoryIndex, setChoosenCategoryIndex] = React.useState<number>(0)
    // const [choosenCategoryId, setChoosenCategoryId] = React.useState<number>(householdCategory[0].id_household_item_category)
    const [searchText, setSearchText] = React.useState<string>('')
    const [choosenTab, setChoosenTab] = React.useState<number>(0)
    const dispatch = useDispatch<AppDispatch>()




    useEffect(() => {
        console.log(searchText)
    }, [searchText])



    if (!householdItems) {
        return <ActivityIndicator size="large" color={COLORS.AuroMetalSaurus} />
    }

    return (
        <ItemComponent
            items={
                householdItems
            }
            addItemSheetRef={addItemRef!}
            addRoomSheetRef={addRoomRef!}
            handleNavigateItemDetail={(id: number) => {
                const img = householdItems.find(item => item.id_household_item === id)!.item_image!
                console.log(img, id)
                dispatch(updateImageProp(
                    householdItems.find(item => item.id_household_item === id)!.item_image!
                ))
                navigation.navigate('HouseHoldItemStack', {
                    screen: 'HouseHoldItem',
                    params: {
                        id_family: id_family,
                        id_item: id
                    },
                });
            }}
        />
    )
}


export default ItemScreen