import React from 'react'
import { View, Text, Dimensions } from 'react-native'

import { Skeleton } from '@rneui/themed'
import { ScreenHeight } from 'react-native-elements/dist/helpers'

const TodoListTypeSkeleton = () => {

    return (
        <View className='flex-row items-center mb-2  '>
            <View className='flex-1 w-full items-center flex-row my-2 justify-between '>
                <View className='ml-6 items-center flex-row justify-center '>
                    <View>
                        <Skeleton width={ScreenHeight * 0.067} height={ScreenHeight * 0.067} style={{
                            borderRadius: 1000,
                            margin: 4,
                            // padding: 10
                        }} />
                    </View>

                    <View className=' justify-center flex-1 ml-2 '>
                        <View className='mb-3 '>

                            <Skeleton width={'40%'} height={ScreenHeight * 0.02} style={{
                                borderRadius: 5
                            }} />
                        </View>

                        <View className=''>
                            <Skeleton width={'30%'} height={ScreenHeight * 0.01} style={{
                                borderRadius: 5
                            }} />
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )

}

export default TodoListTypeSkeleton