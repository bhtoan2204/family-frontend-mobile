import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { CheckListCategoryInterface } from "src/interface/checklist/checklist";
import { compareDates } from "src/utils/compareDate";
import CategoryTypeScrollList from "./CategoryTypeScrollList";
import CheckListSection from "./CheckListSection";
import SearchBar from "./SearchBar";


const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));

const ChecklistSections: React.FC<{ checklist: CheckListCategoryInterface[], setChecklist: React.Dispatch<React.SetStateAction<CheckListCategoryInterface[]>>, selectedCategory: number | null, setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>, handleNavigateCheckListDetail: (id_checklist: number) => void, searchString: string, setSearchString: React.Dispatch<React.SetStateAction<string>> }> = ({ checklist, setChecklist, selectedCategory, setSelectedCategory, handleNavigateCheckListDetail, searchString, setSearchString }) => {
    const [sections, setSections] = React.useState<{ title: string, data: CheckListCategoryInterface[], }[]>([]);
    React.useEffect(() => {
        const newSections: { title: string, data: CheckListCategoryInterface[] }[] = [];
        checklist.forEach(item => {
            let dueDate = new Date(item.createdAt);

            if (compareDates(dueDate, today) === 0) {
                const todayIndex = newSections.findIndex(section => section.title === 'Today');
                if (todayIndex === -1) {
                    newSections.push({ title: 'Today', data: [item] });
                } else {
                    newSections[todayIndex].data.push(item);
                }
            } else if (compareDates(dueDate, today) === -1) {
                const overdueIndex = newSections.findIndex(section => section.title === 'Overdue');
                if (overdueIndex === -1) {
                    newSections.push({ title: 'Overdue', data: [item] });
                } else {
                    newSections[overdueIndex].data.push(item);
                }
            } else {
                const date = dueDate.toDateString();
                const dateIndex = newSections.findIndex(section => section.title === date);
                if (dateIndex === -1) {
                    newSections.push({ title: date, data: [item] });
                } else {
                    newSections[dateIndex].data.push(item);
                }
            }
        });

        newSections.sort((a, b) => {
            if (a.title === "Overdue" && b.title !== "Overdue") {
                return -1;
            }
            if (a.title !== "Overdue" && b.title === "Overdue") {
                return 1;
            }
            if (a.title === "Today" && b.title !== "Today") {
                return -1;
            }
            if (a.title !== "Today" && b.title === "Today") {
                return 1;
            }
            const dateA = new Date(a.data[0].createdAt);
            const dateB = new Date(b.data[0].createdAt);
            return dateA.getTime() - dateB.getTime();
        });
        setSections(newSections);
        console.log("sections", newSections)
    }, [checklist])



    return <>

        <KeyboardAvoidingView className="flex-1 bg-white " behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <ScrollView className='flex-1' showsVerticalScrollIndicator keyboardShouldPersistTaps="handled" >
                <SearchBar searchString={searchString} setSearchString={setSearchString} />
                <CategoryTypeScrollList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

                {
                    sections.map((section, index) => (
                        <CheckListSection key={index} title={section.title} data={section.data} setChecklist={setChecklist} handleNavigateCheckListDetail={handleNavigateCheckListDetail} />
                    ))
                }

            </ScrollView>
        </KeyboardAvoidingView>

    </>

};

export default ChecklistSections;