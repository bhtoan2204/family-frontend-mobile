import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
interface ToastProviderAppProps {
    children: React.ReactNode;
}

const ToastProviderApp = ({ children }: ToastProviderAppProps) => {
    return <ToastProvider
        renderToast={(toast) => {
            if (toast.type == "custom-add-edu") {
                return (
                    <TouchableOpacity className=' bg-red-200 w-[20%] flex-row items-center' style={{
                        flexDirection: 'row',
                        backgroundColor: 'black',
                        padding: 10,
                        borderRadius: 10,
                    }}
                        onPress={() => {
                            toast.onPress && toast.onPress('custom-add-edu');
                        }}
                    >
                        <Material name='plus' size={24} color='white' />
                        <Text className='text-white'>custom edu</Text>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <View style={{ backgroundColor: 'red', padding: 10 }}>
                        <Text>{toast.message}</Text>
                    </View>
                )
            }
        }}
    >{children}</ToastProvider>;
}

const styles = StyleSheet.create({
    educationToast: {

    }
})

export default ToastProviderApp;