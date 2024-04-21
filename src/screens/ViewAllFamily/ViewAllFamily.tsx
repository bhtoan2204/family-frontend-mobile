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
  const RBEdit = useRef<RBSheet>(null);
  const RBDetail = useRef<RBSheet>(null);
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
              const result = await FamilyServices.deleteFamily({id_family});
              Alert.alert('Success', 'Successfully deleted family');
              handleGetAllFamily();
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error: any) {
      Alert.alert('Fail', 'Failed to delete family');
      console.log('Error deleting family:', error);
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
      {/* <Animated.View style={[styles.header]}>
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
      </Animated.View> */}
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
            <TouchableOpacity onPress={() => {}}>
              {/* <View style={styles.card}>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{family.name}</Text>
                  <Text style={styles.cardDescription}>
                    {family.description}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ViewFamily', {
                          id_user,
                          id_family: family.id_family,
                        })
                      }>
                      <View style={styles.viewButton}>
                        <Text style={styles.btnText}>View details</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.editDeleteContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ViewFamily', {
                            id_user,
                            id_family: family.id_family,
                          })
                        }>
                        <View style={styles.iconWrapper}>
                          <FeatherIcon name="edit-2" size={20} color="blue" />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteFamily(family.id_family)}>
                        <View style={styles.iconWrapper}>
                          <FeatherIcon name="trash" size={20} color="red" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View> */}

              {/* <View style={styles.row}>
                <Image
                  source={require('../../assets/images/menu-icon1.png')}
                  resizeMode="contain"
                  style={styles.image}
                />

                <View style={styles.description}>
                  <Text style={styles.cardTitle}> Ten gia dinh</Text>
                  <View style={styles.ColorAndDescription}>
                    <TouchableOpacity style={styles.color}>
                      <Material
                        name="home-plus-outline"
                        size={25}
                        //color="#56409e"
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardDescription}>Mo ta</Text>
                  </View>
                  <View style={styles.buttonPos}>
                    <View style={styles.column}>
                      <LinearGradient
                        // Array of colors for gradient
                        colors={['#724DC9', '#5E4ABE', '#4748B2']}
                        // Gradient style
                        style={[styles.button, {marginLeft: 0}]}
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}>
                        <TouchableOpacity>
                          <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>

                    <View style={styles.column}>
                      <LinearGradient
                        // Array of colors for gradient
                        colors={['#724DC9', '#5E4ABE', '#4748B2']}
                        // Gradient style
                        style={[styles.button, {marginRight: 0}]}
                        // Gradient direction
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}>
                        <TouchableOpacity>
                          <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
                <MaterialIcons name="more-vert" size={30} color="#fff" />
              </View> */}

              <View style={styles.card}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/menu-icon1.png')}
                    resizeMode="contain"
                    style={styles.image}
                  />
                </TouchableOpacity>
                <View style={styles.column}>
                  <Text style={styles.cardTitle}>Ten gia dinh</Text>
                  <View style={styles.ColorAndDescription}>
                    <TouchableOpacity style={styles.color}>
                      <Material
                        name="home-plus-outline"
                        size={25}
                        //color="#56409e"
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardDescription}>Mo ta</Text>
                  </View>
                  <View style={styles.buttonPos}>
                    <LinearGradient
                      // Array of colors for gradient
                      colors={['#724DC9', '#5E4ABE', '#4748B2']}
                      // Gradient style
                      style={[styles.button, {marginLeft: 0}]}
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}>
                      <TouchableOpacity>
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient
                      // Array of colors for gradient
                      colors={['#724DC9', '#5E4ABE', '#4748B2']}
                      // Gradient style
                      style={[styles.button, {marginLeft: 0}]}
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}>
                      <TouchableOpacity>
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
                <MaterialIcons name="more-vert" size={30} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ViewAllFamilyScreen;
