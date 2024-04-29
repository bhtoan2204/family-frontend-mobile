import React from 'react'
import { View, Text } from 'react-native'
import { HouseHoldCategoryScreenProps } from 'src/navigation/NavigationTypes'

const HouseHoldCategoryScreen: React.FC<HouseHoldCategoryScreenProps> = ({ navigation, route }) => {
    return (
        <View>
            <Text>
                HouseHoldCategoryScreen
            </Text>
        </View>
    )
}

export default HouseHoldCategoryScreen