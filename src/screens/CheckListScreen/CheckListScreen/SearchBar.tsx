import React from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = ({ searchString, setSearchString }: any) => {
    const inputRef = React.useRef<TextInput>(null)
    return (
        <TouchableOpacity className='bg-[#EEEFF2] py-4 pl-4 mx-2 mb-3 rounded-lg flex-row items-center' onPress={() => {
            inputRef.current?.focus()
        }}>
            <View className='mr-2'>
                <Material name="magnify" size={24} style={{ color: '#8B949F' }} />

            </View>
            <TextInput
                placeholder="Search"
                onChangeText={setSearchString}
                value={searchString}
                className='text-[#8B949F]  font-medium text-base flex-1'
                textAlignVertical='center'
                ref={inputRef}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
})

export default SearchBar