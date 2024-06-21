import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AddShoppingListScreenProps } from 'src/navigation/NavigationTypes'

const AddShoppingListScreen = ({ navigation, route }: AddShoppingListScreenProps) => {
    return (
        <View>
            <Text>Add CheckList Screen</Text>
        </View>
    )
}

export default AddShoppingListScreen