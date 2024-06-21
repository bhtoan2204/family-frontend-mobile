import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CheckListCategoryInterface } from "src/interface/checklist/checklist";
import { compareDates } from "src/utils/compareDate";
import CategoryTypeScrollList from "./CategoryTypeScrollList";
import SearchBar from "./SearchBar";
import RBSheet from "react-native-raw-bottom-sheet";
import { AppDispatch } from "src/redux/store";
import { useDispatch } from "react-redux";
import { COLORS } from "src/constants";
import { shoppingListItemColor, shoppingListItemColorInside } from "../constant/color";
import CircularProgress from "src/components/user/education/circular-progress";
import ShoppingListItem from "./ShoppingListItem";
import AccordionItem from "src/components/AccordionItem/accordion-item";
import { iOSGrayColors } from "src/constants/ios-color";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from 'react-native-animatable';

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));

interface ChecklistSectionsProps {
    checklist: CheckListCategoryInterface[];
    selectedCategory: number | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
    handleNavigateCheckListDetail: (id_checklist: number) => void;
    searchString: string;
    setSearchString: React.Dispatch<React.SetStateAction<string>>;
    bottomSheetRef: React.RefObject<any>;
    handleNavigateOpenAddShoppingList: () => void;
}

const ChecklistSections = ({ checklist, selectedCategory, setSelectedCategory, handleNavigateCheckListDetail, searchString, setSearchString, bottomSheetRef, handleNavigateOpenAddShoppingList }: ChecklistSectionsProps) => {
    // const [sections, setSections] = React.useState<{ title: string, data: CheckListCategoryInterface[], }[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    // React.useEffect(() => {
    //     const newSections: { title: string, data: CheckListCategoryInterface[] }[] = [];
    //     checklist.forEach(item => {
    //         let dueDate = new Date(item.createdAt || '');

    //         if (compareDates(dueDate, today) === 0) {
    //             const todayIndex = newSections.findIndex(section => section.title === 'Today');
    //             if (todayIndex === -1) {
    //                 newSections.push({ title: 'Today', data: [item] });
    //             } else {
    //                 newSections[todayIndex].data.push(item);
    //             }
    //         } else if (compareDates(dueDate, today) === -1) {
    //             const overdueIndex = newSections.findIndex(section => section.title === 'Overdue');
    //             if (overdueIndex === -1) {
    //                 newSections.push({ title: 'Overdue', data: [item] });
    //             } else {
    //                 newSections[overdueIndex].data.push(item);
    //             }
    //         } else {
    //             const date = dueDate.toDateString();
    //             const dateIndex = newSections.findIndex(section => section.title === date);
    //             if (dateIndex === -1) {
    //                 newSections.push({ title: date, data: [item] });
    //             } else {
    //                 newSections[dateIndex].data.push(item);
    //             }
    //         }
    //     });

    //     newSections.sort((a, b) => {
    //         if (a.title === "Overdue" && b.title !== "Overdue") {
    //             return -1;
    //         }
    //         if (a.title !== "Overdue" && b.title === "Overdue") {
    //             return 1;
    //         }
    //         if (a.title === "Today" && b.title !== "Today") {
    //             return -1;
    //         }
    //         if (a.title !== "Today" && b.title === "Today") {
    //             return 1;
    //         }
    //         const dateA = new Date(a.data[0].createdAt || "");
    //         const dateB = new Date(b.data[0].createdAt || "");
    //         return dateA.getTime() - dateB.getTime();
    //     });
    //     setSections(newSections);
    //     console.log("sections", newSections)
    // }, [checklist])

    const persistantComponentShoppingList = <View style={{
        paddingHorizontal: 10,
    }}>
        <TouchableOpacity onPress={() => {
            handleNavigateOpenAddShoppingList()
            // handleNavigateCheckListDetail(item.id_list)
        }}
        >
            <View className='px-4 py-4 my-2 rounded-xl' style={{
                backgroundColor: shoppingListItemColorInside[2],
                borderWidth: 1,
                borderColor: shoppingListItemColor[2],
                // backgroundColor: shoppingListItemColorInside[rand],
            }}>
                <View style={{
                    backgroundColor: shoppingListItemColor[2],
                    // backgroundColor: shoppingListItemColor[rand],
                    alignSelf: 'flex-start'
                }} className='w-auto px-2 py-1 rounded-2xl '>
                    <Text className='text-xs text-white font-medium '> New List</Text>
                </View>
                <View className="flex-row items-center justify">
                    <View>
                        <View className="p-1  mr-2 rounded-full" style={{
                            backgroundColor: shoppingListItemColor[2]
                        }}>
                            <Material name="plus" size={20} color={'white'} />
                        </View>
                    </View>
                    <Text className='text-xl font-bold  mt-2 mb-4' style={{
                        color: iOSGrayColors.systemGray2.defaultDark
                    }}>Add shopping list</Text>
                </View>


            </View>
        </TouchableOpacity>
        {
            checklist.length > 0 && <ShoppingListItem item={checklist[0]} handleNavigateCheckListDetail={handleNavigateCheckListDetail} index={0} />
        }
    </View>

    const persistantComponentTodoList = <View style={{
        paddingHorizontal: 10,
    }}>
        <TouchableOpacity onPress={() => {
            // handleNavigateCheckListDetail(item.id_list)
        }}>
            <View className='px-4 py-4 my-2 rounded-xl' style={{
                backgroundColor: shoppingListItemColorInside[3],
                borderWidth: 1,
                borderColor: shoppingListItemColor[3],
                // backgroundColor: shoppingListItemColorInside[rand],
            }}>
                <View style={{
                    backgroundColor: shoppingListItemColor[3],
                    // backgroundColor: shoppingListItemColor[rand],
                    alignSelf: 'flex-start'
                }} className='w-auto px-2 py-1 rounded-2xl '>
                    <Text className='text-xs text-white font-medium '> New todo</Text>
                </View>
                <View className="flex-row items-center justify">
                    <View>
                        <View className="p-1  mr-2 rounded-full" style={{
                            backgroundColor: shoppingListItemColor[3]
                        }}>
                            <Material name="plus" size={20} color={'white'} />
                        </View>
                    </View>
                    <Text className='text-xl font-bold  mt-2 mb-4' style={{
                        color: iOSGrayColors.systemGray2.defaultDark
                    }}>Add new todo list</Text>
                </View>


            </View>
        </TouchableOpacity>
        {
            checklist.length > 0 && <ShoppingListItem item={checklist[0]} handleNavigateCheckListDetail={handleNavigateCheckListDetail} index={0} />
        }
    </View>

    return <>

        <KeyboardAvoidingView className="flex-1 bg-white " behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <ScrollView className='flex-1' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                <SearchBar searchString={searchString} setSearchString={setSearchString} />
                <View className="py-3">

                </View>
                <AccordionItem title="Shopping"
                    persistComponent={persistantComponentShoppingList}
                >
                    <Animatable.View className="" style={{
                        paddingHorizontal: 10,
                    }}>
                        {
                            checklist.map((item, index) => {
                                if (index != 0) {
                                    return <ShoppingListItem index={index} key={index} item={item} handleNavigateCheckListDetail={handleNavigateCheckListDetail} />
                                }
                            })
                        }
                    </Animatable.View>
                </AccordionItem>
                <AccordionItem title="Todo"
                    persistComponent={persistantComponentTodoList}
                >
                    <Animatable.View className="" style={{
                        paddingHorizontal: 10,
                    }}>
                        {
                            checklist.map((item, index) => {
                                if (index != 0) {
                                    return <ShoppingListItem index={index} key={index} item={item} handleNavigateCheckListDetail={handleNavigateCheckListDetail} />
                                }
                            })
                        }
                    </Animatable.View>
                </AccordionItem>
                {/* <View className="" style={{
                    paddingHorizontal: 10,
                }}>
                    
                </View> */}


                {/* {
                    sections.map((section, index) => (
                        <CheckListSection key={index} title={section.title} data={section.data} handleNavigateCheckListDetail={handleNavigateCheckListDetail} />
                    ))
                } */}

            </ScrollView>
        </KeyboardAvoidingView>

    </>

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionContainer: {
        marginBottom: 20,
        padding: 10,
        paddingVertical: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checklistItem: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    circleButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    tickButton: {
        marginLeft: 'auto',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.AuroMetalSaurus,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
});

export default ChecklistSections;