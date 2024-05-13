import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./styles";

const LineChartScreen = () => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedLegend, setSelectedLegend] = useState<number | null>(null);

    const lineChartData = [
        { name: "Food", data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], color: "red" },
        { name: "Transportation", data: [20, 30, 25, 35, 45, 50, 55, 60, 70, 65, 75, 80], color: "blue" },
        { name: "Housing", data: [15, 25, 20, 30, 35, 40, 45, 50, 55, 60, 65, 70], color: "green" },
    ];

    const toggleLegend = (index: number) => {
        setSelectedLegend(index === selectedLegend ? null : index);
    };

    const legendItemStyle = (index: number) => [
        styles.legendItem,
        selectedLegend === index && styles.selectedLegendItem
    ];

    return (
        <View>
            <View style={styles.chartContainer}>
                <LineChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: lineChartData.map((line, index) => ({
                            data: line.data,
                            color: () => (selectedLegend === null || selectedLegend === index ? line.color : "rgba(0, 0, 0, 0)"),
                        })),
                    }}
                    width={400}
                    height={220}
                    chartConfig={{
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientTo: "#FFFFFF",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: {
                            r: "3",
                            strokeWidth: "2",
                            stroke: "#ffa726",
                        },
                    }}
                    bezier
                    style={styles.linechart}
                />
            </View>
            <ScrollView contentContainerStyle={styles.legendContainer} showsVerticalScrollIndicator={true}>
                {lineChartData.map((line, index) => (
                    <TouchableOpacity
                        key={index}
                        style={legendItemStyle(index)}
                        onPress={() => toggleLegend(index)}
                    >
                        <View
                            style={[
                                styles.legendColor,
                                { backgroundColor: line.color },
                            ]}
                        />
                        <Text style={styles.legendText}>{line.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title={showDetails ? "Hide Details" : "View Details"}
                    onPress={() => setShowDetails(!showDetails)}
                />
            </View>
            {showDetails && (
            <ScrollView>
            {lineChartData.map((line, index) => (
                <View key={index} style={styles.expenseItem}>
                <View style={styles.expenseDetails}>
                    <Text style={styles.expenseText}>{line.name}</Text>
                    <Text style={styles.expenseAmount}>-{line.data} VNĐ</Text>
                </View>
                </View>
            ))}
            </ScrollView>
        )}
        </View>
    );
};

export default LineChartScreen;
