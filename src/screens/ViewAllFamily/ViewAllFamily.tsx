import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Feather as FeatherIcon } from '@expo/vector-icons';
import { Formik, FormikHelpers } from 'formik';
import { ViewAllFamilyScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import { number } from 'yup';

type Family = {
  id_family: number;
  name: string;
  description: string;
};

type FamilyDetail = {
  id_family: number;
  quantity: number;
  description: string;
  name: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
};



const ViewAllFamilyScreen = ({ navigation, route }: ViewAllFamilyScreenProps) => {
  const { id_user } = route.params;
  const RBEdit = useRef<RBSheet>(null);
  const RBDetail = useRef<RBSheet>(null);
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);
  const [familyDetail, setFamilyDetail] = useState<FamilyDetail[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  const handleGetAllFamily = async () => {
    try {
      const result = await FamilyServices.getAllFamily();
      setFamilies(result);
      setFamilyDetail(result); // Set family detail to the same data for now
    } catch (error: any) {
      console.log('FamilyServices.getAllFamily error:', error);
    }
  };

  

  const handleDeleteFamily = async (id_family: number) => {
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
           
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error: any) {
      Alert.alert(
        'Fail',
        'Failed deleted family'
      );
      console.log('Error deleting family:', error);
    }
  };
  

  const handleUpdateFamily = async (id_family: number, name: string, description: string) => {
    try {
      console.log('Updating family with id:', id_family);
    } catch (error) {
      console.error('Error updating family:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetAllFamily();
    });
  
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
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
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.card}>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{family.name}</Text>
                  <Text style={styles.cardDescription}>{family.description}</Text>
                  <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('ViewFamily', { id_user, id_family: family?.id_family })}>
                    <View style={styles.viewButton}>
                      <Text style={styles.btnText}>View details</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.editDeleteContainer}>
                    <TouchableOpacity onPress={() => handleUpdateFamily(family.id_family, family.name, family.description)}>
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
    </View>
  );
};

export default ViewAllFamilyScreen;
