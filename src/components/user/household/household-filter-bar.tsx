import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS } from 'src/constants';
interface HouseHoldFilterBarProps {
    householdCategory: HouseHoldCategoryInterface[];
    choosenCategoryId: number;
    choosenCategoryIndex: number;
    setChoosenCategoryId: React.Dispatch<React.SetStateAction<number>>;
    setChoosenCategoryIndex: React.Dispatch<React.SetStateAction<number>>;

}

const HouseHoldFilterBar = ({ householdCategory, choosenCategoryId, choosenCategoryIndex, setChoosenCategoryId, setChoosenCategoryIndex }: HouseHoldFilterBarProps) => {
    const categoryRefScroll = React.useRef<any>(null);
    return <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={categoryRefScroll}>
            {householdCategory.map((category, index) => (
                <TouchableOpacity
                    key={category.id_category}
                    onPress={() => {
                        setChoosenCategoryIndex(index)
                        setChoosenCategoryId(category.id_category)
                        if (categoryRefScroll.current) {
                            categoryRefScroll.current.scrollTo({
                                x: index * 100, // Adjust this value as needed based on your item width
                                animated: true,
                            });
                        }
                    }}
                    style={{ paddingHorizontal: 20, paddingVertical: 10, borderBottomColor: COLORS.AliceBlue }}
                    className={`${choosenCategoryIndex === index ? 'border-b-2 border-[#56409e]' : ''}`}
                >
                    <Text style={choosenCategoryIndex == index ? { fontSize: 16, fontWeight: '600', color: COLORS.AuroMetalSaurus } : {
                        fontSize: 16, fontWeight: '600', color: COLORS.gray
                    }}>{category.category_name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
}

export default HouseHoldFilterBar