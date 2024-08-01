import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AddProgressSuccessToast from 'src/components/user/toasts/education/addProgressToast';
interface ToastProviderAppProps {
    children: React.ReactNode;
}

const ToastProviderApp = ({ children }: ToastProviderAppProps) => {
    return <ToastProvider
        // renderToast={(toast) => {
        //     if (toast.type == "custom-add-edu") {
        //         return (
        //             <AddProgressSuccessToast toast={toast} />
        //         )
        //     } else {
        //         return (
        //             <View style={{ backgroundColor: 'red', padding: 10 }}>
        //                 <Text>{toast.message}</Text>
        //             </View>
        //         )
        //     }
        // }}
    >{children}</ToastProvider>;
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
})

export default ToastProviderApp;