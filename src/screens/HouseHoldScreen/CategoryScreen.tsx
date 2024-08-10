import React, { useEffect, useRef } from 'react'
import { CategoryScreenProps } from 'src/navigation/NavigationTypes'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import CategoryComponent from 'src/components/user/household/category/category-component';



const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route, addCategoryRef }) => {
    const { id_family } = route.params
    const houseHoldCategory = useSelector((state: RootState) => state.household).categories

    return (
        <CategoryComponent
            items={
                houseHoldCategory
            }
            id_family={id_family!}
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