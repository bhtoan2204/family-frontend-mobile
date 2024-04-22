import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {FamilyServices} from 'src/services/apiclient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Feather as FeatherIcon, MaterialIcons} from '@expo/vector-icons';
import {ViewAllFamilyScreenProps} from 'src/navigation/NavigationTypes';
import styles from './styles';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {LinearGradient} from 'expo-linear-gradient';

type Family = {
  id_family?: number;
  name?: string;
  description?: string;
};

const ViewAllFamilyScreen: React.FC<ViewAllFamilyScreenProps> = ({
  navigation,
  route,
}) => {
  const {id_user} = route.params || {};
  const [families, setFamilies] = useState<Family[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleGetAllFamily = async () => {
    try {
      const result = await FamilyServices.getAllFamily();
      setFamilies(result);
    } catch (error: any) {
      console.log('FamilyServices.getAllFamily error:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetAllFamily();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[{flex: 1, backgroundColor: '#1D1441'}]}>
      <View style={styles.circleContainer}>
        <TouchableOpacity style={styles.circle}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            //color="#56409e"
            color="#fff"
          />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Search Families"
            placeholderTextColor="#9C9AAF"
            style={styles.input}
          />
          <TouchableOpacity>
            <Material
              name="home-search-outline"
              size={25}
              //color="#56409e"
              color="#fff"
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.circle}>
          <Material
            name="home-plus-outline"
            size={25}
            //color="#56409e"
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={1}>
        {families.map((family, index) => (
          <View key={index} style={styles.familyCard}>
            <View style={styles.card}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/far-cry-family.png')}
                  resizeMode="center"
                  style={styles.image}
                />
              </TouchableOpacity>
              <View style={styles.cardContainer2}>
                <Text style={styles.cardTitle}>{family.name}</Text>
                <View style={styles.ColorAndDescription}>
                  <TouchableOpacity style={styles.color}>
                    <Material name="alien-outline" size={25} color="#fff" />
                  </TouchableOpacity>
                  <Text style={[styles.cardDescription, {marginLeft: 10}]}>
                    {family.description}
                  </Text>
                </View>
                <View style={styles.buttonPos}>
                  <LinearGradient
                    colors={['#A388DB', '#9186D2', '#8385CB']}
                    style={[styles.button, styles.deleteButton]}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}>
                    <TouchableOpacity>
                      <Text style={[styles.buttonText, {color: '#272042'}]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  <LinearGradient
                    colors={['#724DC9', '#5E4ABE', '#4748B2']}
                    style={[styles.button, styles.editButton]}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}>
                    <TouchableOpacity>
                      <Text style={[styles.buttonText, {color: '#fff'}]}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewFamily', {
                    id_user,
                    id_family: family.id_family,
                  })
                }>
                <MaterialIcons name="more-vert" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ViewAllFamilyScreen;
