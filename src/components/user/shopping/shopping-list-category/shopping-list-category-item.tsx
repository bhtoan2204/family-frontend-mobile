import { ScreenWidth } from "@rneui/base";
import { ListItem } from "@rneui/themed";
import { useState } from "react";
import { View, Image, Text } from "react-native";
import { ShoppingListItem, ShoppingListItemType } from "src/interface/shopping/shopping_list";
import GamingIcon from 'src/assets/images/shoppinglist_assets/gaming_icon.png'
import ShoppingListCategoryItemContent from "./shopping-list-category-item-content";
import { useSelector } from "react-redux";
import { getIsDarkMode } from "src/redux/slices/DarkModeSlice";
import React from "react";

interface ShoppingListCategoryItemProps {
    item_type: ShoppingListItemType,
    items: ShoppingListItem[],
    handleNavigateItemDetail: (id_item: number, id_list: number) => void
    handleCompleteItem: (id_item: number, id_list: number) => void
    onPurchase: () => void
    onUnpurchase: () => void
}

const ShoppingListCategoryItem = ({ item_type, items, handleNavigateItemDetail, handleCompleteItem, onPurchase, onUnpurchase }: ShoppingListCategoryItemProps) => {
    // console.log(item.listType.icon_url)
    const [expanded, setExpanded] = useState(true);
    const isDarkMode = useSelector(getIsDarkMode)
    const buildTotal = (total_items: number) => {
        if (total_items > 1) {
            return `${total_items} items`
        } else if (total_items === 1) {
            return `${total_items} item`
        } else if (total_items === 0) {
            return `No item`
        }
    }


    return (
        <ListItem.Accordion className='border-[1px]   overflow-hidden mt-10  ' style={{
            borderWidth: 2,
            borderColor: isDarkMode ? '#232A3D' : '#CFCFCF',
            marginHorizontal: ScreenWidth * 0.05,
            // paddingVertical: 1,
            // overflow: 'hidden',
            borderRadius: 15,
            // backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7'

        }}
            containerStyle={{
                backgroundColor: 'transparent'
            }}
            content={
                <>
                    {/* <Icon name="place" size={30} /> */}
                    <ListItem.Content className='  ' style={{
                        // backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7'

                    }}>
                        {/* <ListItem.Title>List Accordion</ListItem.Title> */}
                        <View className='flex-row items-center' >
                            <View className='mr-6'>
                                <View className='items-center justify-center overflow-hidden ' style={{
                                    height: ScreenWidth * 0.2,
                                    width: ScreenWidth * 0.2,
                                    backgroundColor: '#EAEAEA',
                                    borderRadius: 15,
                                }}>
                                    <Image source={item_type.icon_url != "" ? { uri: item_type.icon_url } : GamingIcon} style={{
                                        height: ScreenWidth * 0.1,
                                        width: ScreenWidth * 0.1,
                                    }} />
                                </View>
                            </View>
                            <View className=''>
                                <Text className='text-xl font-semibold mb-2 text-[#2F2F34] dark:text-white'>{item_type.item_type_name_en}</Text>
                                <Text className='text-sm text-[#5C5C5C] dark:text-[#8D94A5] '>{buildTotal(items.length)}</Text>
                            </View>
                        </View>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
        >
            <View style={{
                borderWidth: 1,
                borderColor: isDarkMode ? '#232A3D' : '#CFCFCF',
                marginHorizontal: ScreenWidth * 0.05,
                // padding: 0,
                // paddingVertical: 5,
                marginTop: 10,
                overflow: 'hidden',
                borderRadius: 15,

            }}>
                {/* <ShoppingListCategoryItemContent index={0} isLast={false} handleNavigateItemDetail={handleNavigateItemDetail} />
                <ShoppingListCategoryItemContent index={1} isLast={false} handleNavigateItemDetail={handleNavigateItemDetail} />
                <ShoppingListCategoryItemContent index={2} isLast={true} handleNavigateItemDetail={handleNavigateItemDetail} /> */}
                {
                    items.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ShoppingListCategoryItemContent item={item} index={index} isLast={index === items.length - 1}
                                    handleNavigateItemDetail={handleNavigateItemDetail}
                                    handleCompleteItem={handleCompleteItem}
                                    onPurchase={onPurchase}
                                    onUnpurchase={onUnpurchase}

                                />
                            </React.Fragment>
                        )
                    })
                }
            </View>
        </ListItem.Accordion>
    )
}

export default ShoppingListCategoryItem