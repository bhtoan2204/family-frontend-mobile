import { ListItem } from "@rneui/themed"
import { TouchableOpacity, View, Text } from "react-native"
import { ShoppingListItem } from "src/interface/shopping/shopping_list"

interface ShoppingListCategoryItemContentProps {
    item: ShoppingListItem,
    index: number,
    isLast: boolean,
    handleNavigateItemDetail: (id_item: number, id_list: number) => void
}

const ShoppingListCategoryItemContent = ({ item, index, isLast, handleNavigateItemDetail }: ShoppingListCategoryItemContentProps) => {
    return (
        <ListItem onPress={() => { }} className='' style={{
            // borderWidth: 1,
            borderColor: '#CFCFCF',
            borderBottomWidth: isLast ? 0 : 1,
        }}  >
            <ListItem.Content style={{
                padding: 0,
                margin: 0
            }}>
                <TouchableOpacity className='flex-row justify-between items-center  w-full  py-2 '
                    onPress={() => {
                        // console.log(item.id_item, item.id_list)
                        handleNavigateItemDetail(item.id_list, item.id_item)
                    }}
                >
                    <View className=' flex-row mr-2 items-center'>

                        <View className='border-2 p-3 rounded-full mr-2' style={{
                            borderColor: '#CBCBCB'
                        }}>
                        </View>
                        <Text className='text-base text-[#2F2F34]'>{item.item_name}</Text>
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