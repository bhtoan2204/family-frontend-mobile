import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';
import {FamilyServices} from 'src/services/apiclient';
import {Feather as FeatherIcon, MaterialIcons} from '@expo/vector-icons';
import {ViewAllFamilyScreenProps} from 'src/navigation/NavigationTypes';
import styles from './styles';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {LinearGradient} from 'expo-linear-gradient';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {useDispatch, useSelector} from 'react-redux';
import {Family} from 'src/interface/family/family';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Member} from 'src/interface/member/member';

type ButtonProps = {
  title: string;
  iconName: string;
  buttonStyle?: object;
};

const ViewAllFamilyScreen: React.FC<ViewAllFamilyScreenProps> = ({
  navigation,
  route,
}) => {
  const profile = useSelector(selectProfile);
  const [families, setFamilies] = useState<Family[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFamilies, setFilteredFamilies] = useState<Family[]>([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [isUp, setIsUp] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({x: 0, y: 0});
  const [membersMap, setMembersMap] = useState<{[key: number]: Member[]}>({});

  const Button = ({title, buttonStyle}: ButtonProps) => (
    <TouchableOpacity
      onPress={() => {
        if (selectedButton === title) {
          if (isUp) {
            setIsUp(false);
          } else {
            setSelectedButton('');
          }
        } else {
          setSelectedButton(title);
          setIsUp(true);
        }
      }}>
      {selectedButton === title ? (
        <LinearGradient
          colors={
            isUp ? ['#537895', '#09203F'] : ['#CCEAFB', '#CCEAFB', '#CCEAFB']
          }
          style={[styles.button1, buttonStyle]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <Text
              style={[
                styles.buttonTextChoosen,
                {color: isUp ? '#fff' : '#2a475e'},
                {fontSize: 16},
              ]}>
              {title}
            </Text>
            <MaterialIcons
              name={isUp ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={25}
              color={isUp ? '#fff' : '#2a475e'}
              style={styles.iconWrapper}
            />
          </View>
        </LinearGradient>
      ) : (
        <View
          style={[styles.button1, buttonStyle, {backgroundColor: '#CCEAFB'}]}>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <Text
              style={[styles.buttonText, {color: '#2a475e'}, {fontSize: 16}]}>
              {title}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={25}
              color="#2a475e"
              style={styles.iconWrapper}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const handleSearch = () => {
    const result = families.filter(family =>
      family.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredFamilies(result);
  };

  useEffect(() => {
    const handleGetAllFamily = async () => {
      try {
        const allFamilies = await FamilyServices.getAllFamily();
        console.log(allFamilies);
        const membersObject: {[key: number]: Member[]} = {};

        for (const family of allFamilies) {
          const members = await FamilyServices.getAllMembers({
            id_family: family.id_family,
          });
          membersObject[family.id_family] = members;
          console.log('member object ', membersObject);
        }
        setFamilies(allFamilies);
        setMembersMap(membersObject);
      } catch (error) {
        // console.log('Error fetching families or members:', error);
      }
    };
    handleGetAllFamily();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/view-all-family-2.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1}}>
        <View style={[{flex: 1}]}>
          <View style={styles.circleContainer}>
            <TouchableOpacity style={styles.circle}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={32}
                //color="#56409e"
                color="#2a475e"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle1}>Family Hub</Text>
            <TouchableOpacity style={styles.circle}>
              <Material
                name="home-plus-outline"
                size={25}
                //color="#56409e"
                color="#2a475e"
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.inputWrapper, {left: 20, marginBottom: 15}]}>
            <TextInput
              placeholder="Search Families"
              placeholderTextColor="#9C9AAF"
              style={styles.input}
              onChangeText={text => setSearchTerm(text)}
              value={searchTerm}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Material
                name="home-search-outline"
                size={25}
                //color="#56409e"
                color="#2a475e"
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>

          {/* <View style={[styles.row, {padding: 5}, {margin: 3}]}>
            <Button title="Name" buttonStyle={{left: 10}} iconName={''} />
            <Button
              title="Date"
              buttonStyle={{}} // Add an empty object or specify the desired style
              iconName={''}
            />
            <Button title="Recently" buttonStyle={{right: 10}} iconName={''} />
          </View> */}

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
              <View key={index} style={styles.familyBigCard}>
                <View style={styles.card}>
                  <TouchableOpacity>
                    <Image source={{uri: family.avatar}} style={styles.image} />
                  </TouchableOpacity>
                  <View style={[styles.row]}>
                    <View style={styles.cardContainer2}>
                      <Text style={styles.cardTitle}>{family.name}</Text>

                      <View style={styles.avatarsContainer}>
                        {membersMap[family.id_family] &&
                          Array.isArray(membersMap[family.id_family]) &&
                          membersMap[family.id_family]
                            .slice(0, 4)
                            .map((member, index) => (
                              <View key={index} style={styles.avatarContainer}>
                                <Image
                                  source={{uri: member.avatar}}
                                  style={styles.avatar}
                                />
                              </View>
                            ))}
                        {membersMap[family.id_family] &&
                          Array.isArray(membersMap[family.id_family]) &&
                          membersMap[family.id_family].length > 4 && (
                            <View style={styles.moreAvatarContainer}>
                              <Text style={styles.moreAvatarText}>
                                +{membersMap[family.id_family].length - 4}
                              </Text>
                            </View>
                          )}
                      </View>

                      {/* <View style={styles.ColorAndDescription}>
                        <TouchableOpacity style={styles.color}>
                          <Material
                            name="alien-outline"
                            size={25}
                            color="#fff"
                          />
                        </TouchableOpacity>
                        <Text
                          style={[styles.cardDescription, {marginLeft: 10}]}>
                          {family.description}
                        </Text>
                      </View> */}

                      <View style={styles.buttonPos}>
                        <LinearGradient
                          colors={['#09203F', '#537895']}
                          style={[styles.button, styles.detailButton]}
                          start={{x: 0, y: 1}}
                          end={{x: 0, y: 0}}>
                          <TouchableOpacity
                            style={{
                              shadowColor: '#000',
                              shadowOffset: {width: 0, height: 6},
                              shadowOpacity: 0.25,
                            }}
                            onPress={() =>
                              navigation.navigate('FamilyTab', {
                                screen: 'Family',
                                params: {id_family: family.id_family},
                              })
                            }>
                            <Text
                              style={[
                                styles.buttonText,
                                {color: '#fff'},
                                {fontWeight: '600'},
                              ]}>
                              View Detail
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{right: 60}}
                      onPressIn={event => {
                        const locationX = event.nativeEvent.pageX;
                        const locationY = event.nativeEvent.pageY;
                        setButtonPosition({
                          x: locationX,
                          y: locationY,
                        });
                        setModalVisible(true);
                      }}>
                      <MaterialIcons
                        name="more-vert"
                        size={30}
                        color="#1b2838"
                      />
                    </TouchableOpacity>

                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <View
                        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <TouchableOpacity
                          style={{flex: 1}}
                          activeOpacity={1}
                          onPressOut={() => setModalVisible(false)}>
                          <View
                            style={{
                              position: 'absolute',
                              top: buttonPosition.y + 15, // add 10 to y position
                              left: buttonPosition.x - 108, // add 10 to x position
                            }}>
                            <View
                              style={{
                                backgroundColor: '#f6f6f6',
                                padding: 15,
                                borderRadius: 10,
                                width: 130,
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  setModalVisible(false);
                                  alert('Da bam Edit');
                                }}>
                                <View
                                  style={[styles.row, {alignItems: 'center'}]}>
                                  <Text
                                    style={[
                                      {color: '#2a475e'},
                                      {fontWeight: '700'},
                                      {fontSize: 16},
                                    ]}>
                                    Edit
                                  </Text>
                                  <Material
                                    name="pencil-outline"
                                    size={30}
                                    color="#2a475e"
                                  />
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setModalVisible(false);
                                  alert('Da bam Delete');
                                }}>
                                <View
                                  style={[styles.row, {alignItems: 'center'}]}>
                                  <Text
                                    // style={[
                                    //   {color: '#724DC9'},
                                    //   {fontWeight: '700'},
                                    //   {fontSize: 16},
                                    // ]}
                                    style={styles.text}>
                                    Delete
                                  </Text>
                                  <MaterialIcons
                                    name="delete-outline"
                                    size={30}
                                    color="#2a475e"
                                    style={styles.icon}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </View>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default ViewAllFamilyScreen;
