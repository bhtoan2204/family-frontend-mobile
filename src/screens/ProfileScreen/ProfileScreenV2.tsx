import { MaterialIcons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from 'src/constants';
import { EditProfileScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import { useEffect, useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getHeight } from 'src/utils/device/screen';
import LocalStorage from 'src/store/localstorage';
import useUserProfile from 'src/hooks/user/useUserProfile';

const ProfileScreen2 = ({ navigation }: EditProfileScreenProps) => {
    const sheetRef = useRef<RBSheet>(null);
    const { userProfile, loading, error } = useUserProfile();

    useEffect(() => {
        console.log("cout<<")
        console.log(userProfile)
    }, [userProfile])
    const openRBSheet = () => {
        sheetRef.current?.open();
    };

    const handleSignOut = () => {
        // Sign out logic
    };
    return (
        <ScrollView className='flex-1 bg-white'>
            <SafeAreaView style={styles.safeView}>
                <View className=''>
                    <View className='fixed bg-orange-200'>
                        <View className='flex-row justify-between items-center bg-gray-800 py-4 px-6'>
                            <Text className='text-white text-lg font-bold'>X</Text>
                            <Text className='text-white text-lg font-bold'>You</Text>
                        </View>

                    </View>
                    
                </View>

            </SafeAreaView>
        </ScrollView>
    );
};

export default ProfileScreen2;
