import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';

type AccordionItemPros = PropsWithChildren<{
    title: string;
    persistComponent?: React.ReactNode;
}>;

function AccordionItem({ children, title, persistComponent }: AccordionItemPros): JSX.Element {
    const [expanded, setExpanded] = useState(false);

    function toggleItem() {
        setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{children}</View>;
    const persistantComponent = <View style={styles.accordBody}>{persistComponent}</View>;
    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
                <Text style={styles.accordTitle}>{title}</Text>
                <View style={{
                    marginRight: 10

                }}>
                    <Icon name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={18} color={iOSGrayColors.systemGray.defaultLight} />
                </View>
            </TouchableOpacity>
            {persistComponent && persistantComponent}
            {expanded && body}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    accordContainer: {
        // paddingBottom: 
    },
    accordHeader: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    accordTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    accordBody: {
        // padding: 12
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    }
});

export default AccordionItem;