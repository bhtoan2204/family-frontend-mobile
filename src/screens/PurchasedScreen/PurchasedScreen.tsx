import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {FamilyServices, PackageServices} from 'src/services/apiclient';
import {PurchasedScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {Purchased} from 'src/interface/purchased/purchased';
import styles from './styles';
import {Family} from 'src/interface/family/family';
import {selectFamilies, setSelectedFamily} from 'src/redux/slices/FamilySlice';
import moment from 'moment';
import {AppDispatch} from 'src/redux/store';
import {COLORS} from 'src/constants';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const PurchasedScreen = ({navigation}: PurchasedScreenProps) => {
  const profile = useSelector(selectProfile);
  const [purchasedItems, setPurchasedItems] = useState<Purchased[]>([]);
  const [page, setPage] = useState<number>(1);
  const [family, setFamily] = useState<Family[]>([]);
  const itemsPerPage = 10;
  const families = useSelector(selectFamilies);
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleViewAllPackage = () => {
    const id_family = undefined;
    navigation.navigate('PackStack', {
      screen: 'ViewAllPackage',
      params: {id_family: id_family},
    });
  };

  const handleViewService = () => {
    navigation.navigate('PackStack', {screen: 'ViewAllService'});
  };
  const handleViewCombo = () => {
    navigation.navigate('PackStack', {screen: 'ComboScreen'});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await PackageServices.paymentHistory(itemsPerPage, page);

        if (result) {
          setPurchasedItems(result);
        }
      } catch (error) {
        console.log('PackageServices.getPackage error:', error);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleValue]);

  const onRenewPress = (family: Family) => {
    setModalVisible(false);
    navigation.navigate('PackStack', {
      screen: 'ViewAllPackage',
      params: {id_family: family.id_family},
    });
  };

  const NavigateFamily = (family: Family) => {
    dispatch(setSelectedFamily(family));

    navigation.navigate('FamilyStack', {
      screen: 'ViewFamily',
      params: {id_family: family.id_family},
    });
  };

  const handleCardPress = (family: Family) => {
    setSelectedFamily(family);
    setModalVisible(true);
  };

  const renderFamilyCards = () => {
    return families.map(family => (
      <TouchableOpacity
        key={family.id_family}
        onPress={() => handleCardPress(family)}
        style={[styles.familyCard, {backgroundColor: color.white}]}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.familyAvatarContainer}>
              {family.avatar ? (
                <Image
                  source={{uri: family.avatar}}
                  style={styles.familyAvatar}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.defaultAvatar} />
              )}
            </View>
            <View style={{flexDirection: 'column', gap: 5, marginLeft: 5}}>
              <Text style={[styles.familyName, {color: color.text}]}>
                {family.name}
              </Text>
              <View style={styles.expiredAtContainer}>
                <Text
                  style={[styles.familyQuantity, {color: color.textSubdued}]}>
                  {translate('EXPIRED_AT')}:{' '}
                </Text>
                <Text
                  style={[
                    styles.familyQuantity,
                    styles.expiredAtText,
                    {color: color.textSubdued},
                  ]}>
                  {moment(new Date(family.expired_at)).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={[styles.safeArea, {backgroundColor: color.background}]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="chevron-back" size={30} color={color.text} />
        </TouchableOpacity>

        <View style={styles.placeholder} />
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={handleViewAllPackage}
          style={styles.imageButton}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/image-purchase1.png')}
              style={styles.buttonImage}
            />
            <Animated.Image
              source={require('../../assets/images/plus-image.png')}
              style={[
                styles.buttonAddFamily,
                {transform: [{scale: scaleValue}]},
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={[styles.familyListTitle, {color: color.text}]}>
          {translate('YOUR_FAMILIES')}
        </Text>
        {families.length === 0 ? (
          <View style={styles.noFamilyContainer}>
            <Image
              source={require('../../assets/images/search-icon-family.png')}
              style={styles.imageSearch}
            />
            <Text style={[styles.noFamilyText, {color: color.text}]}>
              {translate('NO_FAMILY_MESSAGE')}
            </Text>
            <Text
              style={[
                styles.noFamilyTextDescription,
                {color: color.textSubdued},
              ]}>
              {translate('ADD_FAMILY_PROMPT')}
            </Text>
          </View>
        ) : (
          <ScrollView>{renderFamilyCards()}</ScrollView>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground1}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalContainer1,
                  {backgroundColor: color.background},
                ]}>
                {selectedFamily && (
                  <>
                    <Image
                      source={{uri: selectedFamily.avatar}}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                    <Text style={[styles.modalTitle, {color: color.text}]}>
                      {selectedFamily.name}
                    </Text>
                    <Text
                      style={[styles.modalText, {color: color.textSubdued}]}>
                      {translate('FAMILY_MEMBERS')}: {selectedFamily.quantity}
                    </Text>
                    <Text
                      style={[styles.modalText, {color: color.textSubdued}]}>
                      {translate('EXPIRED_AT')}:{' '}
                      {moment(new Date(selectedFamily.expired_at)).format(
                        'DD/MM/YYYY',
                      )}
                    </Text>
                    <View style={styles.modalButtonContainer}>
                      <TouchableOpacity
                        style={[styles.button2, {borderColor: color.button}]}
                        onPress={() => {
                          setModalVisible(false);
                          handleViewCombo();
                        }}>
                        <Text
                          style={[
                            styles.modalButtonText,
                            {color: color.button},
                          ]}>
                          {translate('BUY_SERVICE')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          {backgroundColor: color.button},
                        ]}
                        onPress={() => onRenewPress(selectedFamily)}>
                        <Text
                          style={[styles.modalButtonText, {color: 'white'}]}>
                          {translate('Renew Family')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default PurchasedScreen;
