import { ListItem } from "@rneui/themed"
import { TouchableOpacity, View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { ShoppingListItem } from "src/interface/shopping/shopping_list"
import { getIsDarkMode } from "src/redux/slices/DarkModeSlice"
import { updatePurchasedItem } from "src/redux/slices/ShoppingListSlice"
import { AppDispatch } from "src/redux/store"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
interface ShoppingListCategoryItemContentProps {
    item: ShoppingListItem,
    index: number,
    isLast: boolean,
    handleNavigateItemDetail: (id_item: number, id_list: number) => void
    handleCompleteItem: (id_item: number, id_list: number) => void
    onPurchase: () => void
    onUnpurchase: () => void
}

const ShoppingListCategoryItemContent = ({ item, index, isLast, handleNavigateItemDetail, handleCompleteItem, onPurchase,onUnpurchase }: ShoppingListCategoryItemContentProps) => {
    const isDarkMode = useSelector(getIsDarkMode)
    return (
        <ListItem onPress={() => {

        }} className='' style={{
            // borderWidth: 1,
            borderColor: isDarkMode ? '#232A3D' : '#CFCFCF',
            borderBottomWidth: isLast ? 0 : 1,
        }}
            containerStyle={{
                backgroundColor: 'transparent'
            }}
        >
            <ListItem.Content style={{
                padding: 0,
                margin: 0,
            }}

            >
                <TouchableOpacity className='flex-row justify-between items-center  w-full  py-2 '
                    onPress={() => {
                        // console.log(item.id_item, item.id_list)
                        handleNavigateItemDetail(item.id_list, item.id_item)
                    }}
                >
                    <View className=' flex-row mr-2 items-center'>

                        <TouchableOpacity className='border-2 w-8 h-8 rounded-full mr-4 items-center justify-center' style={{
                            borderWidth: item?.is_purchased ? 0 : 2,
                            borderColor: item?.is_purchased ? 'transparent' : '#CBCBCB',
                            backgroundColor: item?.is_purchased ? '#00AE00' : undefined,
                        }}
                            onPress={() => {
                                console.log('hello')
                                handleCompleteItem(item.id_list, item.id_item)
                                if (item?.is_purchased) {
                                    onUnpurchase()
                                } else {
                                    onPurchase()
                                }
                                // handleUpdateComplete(item.id_checklist)

                                // dispatch(updatePurchasedItem({
                                //     id_item: id_item,
                                //     id_list: id_list,
                                // }))
                            }}
                        >
                            {
                                item?.is_purchased && <Material name='check' size={20} color={'white'} />
                            }
                        </TouchableOpacity>
                        <Text className='text-base text-[#2F2F34] dark:text-white'>{item.item_name}</Text>
                    </View>
                    <View className='justify-end '>
                        <Text className='text-sm text-[#B2B2B4]'>{item.price} VND</Text>
                    </View>
                </TouchableOpacity>
            </ListItem.Content>
            {/* <ListItem.Chevron /> */}
        </ListItem>
    )
}

export default ShoppingListCategoryItemContent