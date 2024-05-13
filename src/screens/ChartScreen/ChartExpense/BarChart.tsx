import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import styles from "./styles"; 

const BarChartScreen = () => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

  const barChartData = [
    { category: "Food", amount: 4000, color: "gray" },
    { category: "Transportation", amount: 2000, color: "blue" },
    { category: "Housing", amount: 3000, color: "green" },
  ];

  const totalCategories = barChartData.length;

  const data = {
    labels: barChartData.map((item) => item.category), 
    datasets: [
      {
        data: barChartData.map((item) => item.amount),
      },
    ],
  };

  return (
    <View>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={400}
          height={220}
       
          fromZero={true} 
          chartConfig={{
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 0, 
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
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
                  <View  style={styles.ContainerCategory}> 

          {barChartData.map((expense, index) => (
                <View key={index} style={styles.expenseItem}>
                <Text style={styles.expenseText}>{expense.category}</Text>

                <View style={styles.expenseDetails}>
                    <Text style={styles.expenseAmount}>-{expense.amount} VNĐ</Text>
                </View>
                </View>
          ))}
                        </View>

        </ScrollView>
      )}

    </View>
  );
};

export default BarChartScreen;
