import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image } from 'react-native'
import { CategoryScreenProps, HouseHoldScreenProps, ItemScreenProps } from 'src/navigation/NavigationTypes'
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';


import CategoryComponent from 'src/components/user/household/category/category-component';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')


const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route, addCategoryRef }) => {
    const { id_family } = route.params
    const refRBSheet = React.useRef<any>(null);
    const houseHoldCategory = useSelector((state: RootState) => state.category)
   
    const dispatch = useDispatch<AppDispatch>()

    



    if (!houseHoldCategory) {
        return <ActivityIndicator size="large" color={COLORS.AuroMetalSaurus} />
    }

    return (
        <CategoryComponent
            items={
                houseHoldCategory
            }
            handleNavigateCategoryDetail={(id: number) => {
                navigation.navigate('CategoryDetail', {
                    id_family,
                    id_category: id
                })
                console.log(id)
            }}
            addCategorySheetRef={addCategoryRef}

        />
    )
}


export default CategoryScreen