import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

interface EducationScreenSearchBarProps {
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void

}

const EducationScreenSearchBar = ({ searchQuery, setSearchQuery }: EducationScreenSearchBarProps) => {
    return (
        <View className=' bg-[#8D8C8A] dark:bg-[#252D3B] w-[75%]  h-[100%] rounded-xl  text-base text-white flex-row items-center'>
            <View className='mx-3'>
                <Material name="magnify" size={20} style={{ color: "white", fontWeight: "bold" }} />

            </View>
            <TextInput className='flex-1  text-base text-white'
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                cursorColor={'#fff'}
                placeholder='Search....'
                placeholderTextColor={'#fff'}
            />
        </View>

    )
}

export default EducationScreenSearchBar