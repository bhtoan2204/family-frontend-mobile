import React, { useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { PieChart } from "react-native-chart-kit";
import styles from "./styles";

const PieChartComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const fakeExpenses = [
    { category: "Food", amount: 4000, color: "gray" },
    { category: "Transportation", amount: 2000, color: "blue" },
    { category: "Housing", amount: 3000, color: "green" },
  ];

  const totalExpenseByCategory: { [key: string]: number } = {};
  fakeExpenses.forEach((expense) => {
    if (totalExpenseByCategory[expense.category]) {
      totalExpenseByCategory[expense.category] += expense.amount;
    } else {
      totalExpenseByCategory[expense.category] = expense.amount;
    }
  });

  const pieChartData = Object.keys(totalExpenseByCategory).map((category) => {
    return {
      name: category,
      color: fakeExpenses.find((expense) => expense.category === category)?.color,
      expense: totalExpenseByCategory[category],

    };
  });

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <View>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieChartData}
          width={400}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="expense"
          backgroundColor="white" 
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={showDetails ? "Hide Details" : "View Details"}
          onPress={() => setShowDetails(!showDetails)}
        />
      </View>

      {showDetails && (
        <ScrollView>
          {fakeExpenses.map((expense, index) => (
            <View key={index} style={styles.expenseItem}>
              <View style={styles.expenseDetails}>
                <Text style={styles.expenseText}>{expense.category}</Text>
                <Text style={styles.expenseAmount}>-{expense.amount} VNĐ</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PieChartComponent;
