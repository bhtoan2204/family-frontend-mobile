import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
interface AddProgressToastProps {
    toast: ToastProps;
}

const AddProgressSuccessToast = ({ toast }: AddProgressToastProps) => {
    return <TouchableOpacity className=' rounded-full bg-black'
        onPress={() => {
            toast.onPress && toast.onPress('custom-add-edu');
        }}
    >
        <View style={styles.educationIcon}>
            <Material name='check' size={24} color='#1E784A' />
        </View>
        <View style={styles.textContainer}>
            <Text style={[
                styles.educationText,
                { fontWeight: '500', fontSize: 18, marginBottom: 5 }
            ]}>Success</Text>
            <Text style={styles.educationText}>{
                "New progress added successfully"
            }</Text>
        </View>
    </TouchableOpacity>
}

const bgSuccessColor = '#D2FBDE'
const textSuccessColor = '#1E784A'

const styles = StyleSheet.create({
    educationToast: {
        width: '80%',
        // paddingVertical: '5%',
        // height: '100%',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgSuccessColor,
        padding: 10,
        borderRadius: 10,
    },
    textContainer: {
        marginVertical: 10,

    },
    educationIcon: {
        padding: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: textSuccessColor,
        marginHorizontal: 20,
    },
    educationText: {
        color: textSuccessColor,
        fontSize: 15,
        // marginLeft: 10,
    }
});

export default AddProgressSuccessToast;
