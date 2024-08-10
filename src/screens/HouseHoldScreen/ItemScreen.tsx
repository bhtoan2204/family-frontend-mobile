import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image } from 'react-native'
import { ItemScreenProps } from 'src/navigation/NavigationTypes'
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';


import ItemComponent from 'src/components/user/household/item/items-component';
import { updateImageProp } from 'src/redux/slices/HouseHoldDetailSlice';




const ItemScreen: React.FC<ItemScreenProps> = ({ navigation, route, addItemRef, addRoomRef }) => {
    const { id_family } = route.params

    const householdItems = useSelector((state: RootState) => state.household).items
    const dispatch = useDispatch<AppDispatch>()


    return (
        <ItemComponent
            items={
                householdItems
            }
            id_family={id_family!}
            addItemSheetRef={addItemRef!}
            addRoomSheetRef={addRoomRef!}
            handleNavigateItemDetail={(id: number) => {
                // const img = householdItems.find(item => item.id_household_item === id)!.item_image!
                // console.log(img, id)
                // dispatch(updateImageProp(
                //     householdItems.find(item => item.id_household_item === id)!.item_image!
                // ))
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