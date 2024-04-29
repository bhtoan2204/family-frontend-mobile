import React from 'react'
import { View, Text } from 'react-native'
import { HouseHoldCategoryDetailScreenProps } from 'src/navigation/NavigationTypes'

const HouseHoldCategoryDetailScreen: React.FC<HouseHoldCategoryDetailScreenProps> = ({ navigation, route }) => {
    return (
        <View>
            <Text>
                HouseHoldCategoryDetailScreen
            </Text>
        </View>
    )
}

export default HouseHoldCategoryDetailScreen