import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Image, SafeAreaView } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Feather as FeatherIcon } from '@expo/vector-icons';
import { ViewAllFamilyScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import { Family } from 'src/interface/family/family';
import FamilyImage from 'src/assets/images/diversity.png';
import { COLORS } from 'src/constants';


const ViewAllFamilyScreen: React.FC<ViewAllFamilyScreenProps> = ({ navigation, route }) => {
  const { id_user } = route.params || {};
  const RBEdit = useRef<RBSheet>(null);
  const RBDetail = useRef<RBSheet>(null);
  const [families, setFamilies] = useState<Family[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState('');


  const handleDeleteFamily = async (id_family?: number) => {
    try {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this family?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const result = await FamilyServices.deleteFamily({ id_family });
              Alert.alert(
                'Success',
                'Successfully deleted family'
              );
              // handleGetAllFamily();
              setFamilies(families.filter((family) => family.id_family !== id_family));
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error: any) {
      Alert.alert(
        'Fail',
        'Failed to delete family'
      );
      console.log('Error deleting family:', error);
    }
  };

  useEffect(() => {
    const handleGetAllFamily = async () => {
      try {
        const result = await FamilyServices.getAllFamily();
        setFamilies(result);
      } catch (error: any) {
        console.log('FamilyServices.getAllFamily error:', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetAllFamily();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <View className='h-full'>
        <ScrollView className='flex-1  pt-4'>
          <View className='mb-3 py-4 px-3 mx-3 rounded-lg border-[1px] border-[#FAFAFA] bg-[#FAFAFA] '>
            <TextInput
              style={{ backgroundColor: '#FAFAFA', fontSize: 18, paddingLeft: 5 }}
              placeholder="Search Family"
              placeholderTextColor="#9A9A9A"

              onChangeText={(text) => setSearch(text)} />

          </View>
          {
            families.map((family, index) => {
              return <TouchableOpacity key={index} onPress={() => navigation.navigate('ViewFamily', { id_user, id_family: family.id_family })}>
                <View key={index} className=' mb-3 py-4 px-3 mx-3 rounded-lg border-[1px] border-[#d5d5d5] bg-[#FAFAFA] '>
                  <View className='flex flex-row w-full'>
                    <Image source={family.avatar != null && family.avatar != "" ? { uri: family.avatar } : FamilyImage} style={{ width: 75, height: 75 }} className='rounded-lg' />
                    <View className='ml-4 flex-col justify-evenly w-full' >
                      <Text className=' text-xl font-bold' style={{ color: COLORS.primary }}>{family.name}</Text>
                      <Text className='text-ellipsis text-sm text-gray-600'>Members: {family.quantity}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            })
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
{/* <View style={{ flex: 1 }}>
      <Animated.View style={[styles.header]}>
        <Text style={styles.headerTitle}>
          Family Hub
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Search Family"
              placeholderTextColor="#9A9A9A"
              style={styles.input}
            />
            <TouchableOpacity>
              <FeatherIcon
                color="#9A9A9A"
                name="search"
                size={16}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <FeatherIcon
              color="white"
              name="plus"
              size={25}
              style={styles.addButton}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        scrollEventThrottle={1}
      >
        {families.map((family, index) => (
          <View key={index} style={styles.familyCard}>
            <TouchableOpacity onPress={() => { }}>
              <View style={styles.card}>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{family.name}</Text>
                  <Text style={styles.cardDescription}>{family.description}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewFamily', { id_user, id_family: family.id_family })}>
                      <View style={styles.viewButton}>
                        <Text style={styles.btnText}>View details</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.editDeleteContainer}>
                      <TouchableOpacity onPress={() => navigation.navigate('ViewFamily', { id_user, id_family: family.id_family })}>
                        <View style={styles.iconWrapper}>
                          <FeatherIcon name="edit-2" size={20} color="blue" />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDeleteFamily(family.id_family)}>
                        <View style={styles.iconWrapper}>
                          <FeatherIcon name="trash" size={20} color="red" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    </View> */}
export default ViewAllFamilyScreen;
