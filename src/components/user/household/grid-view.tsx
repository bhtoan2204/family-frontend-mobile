import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

type GridViewProps<T> = {
    data: T[];
    renderItem: ({ item, index }: { item: T, index: number }) => React.ReactElement;
    numColumns: number;
    keyExtractor: (item: T) => string;
};

const GridView = <T,>({ data, renderItem, numColumns, keyExtractor }: GridViewProps<T>) => {
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={numColumns}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    item: {
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: 100,
    },
});

export default GridView;