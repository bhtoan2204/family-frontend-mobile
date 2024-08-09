import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FamilyServices, PackageServices} from 'src/services/apiclient';
import {ViewAllServiceProps} from 'src/navigation/NavigationTypes';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCombos,
  setOption,
  setPackage,
  setServices,
} from 'src/redux/slices/PackageSlice';
import styles from './style';
import {Family} from 'src/interface/family/family';
import {Avatar} from 'react-native-elements';
import {Service, ComboPackage} from 'src/interface/package/mainPackage';
import {TEXTS} from 'src/constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {AppDispatch} from 'src/redux/store';

const ServiceScreen = ({navigation, route}: ViewAllServiceProps) => {
  const {families} = route.params;

  const [selectedService, setSelectedService] = useState<null | Service>(null);
  const [selectedMount, setSelectedMount] = useState<number>(0);
  const [service, setService] = useState<Service[]>([]);
  const profile = useSelector(selectProfile);
  const [family, setFamily] = useState<Family[]>([]);
  const [familySelected, setFamilySelected] = useState<Family | null>(families);
  const [purchasedServices, setPurchasedServices] = useState<number[]>([]);
  const [serviceFamily, setServiceFamily] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const dispatch = useDispatch<AppDispatch>();
  const [combo, setCombo] = useState<ComboPackage[]>([]);

  const handleGetService = async () => {
    try {
      setLoading(true);

      const result = await PackageServices.getExtraPackage();
      console.log(result);
      setService(result);
    } catch (error: any) {
      console.log('Services.getPackage error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFamily = async () => {
    try {
      setLoading(true);

      const data = await FamilyServices.getAllFamily();
      if (data && data.length > 0) {
        setFamily(data);
        if (familySelected === null) {
          setFamilySelected(data[0]);
        }
        fetchServiceOfFamily(familySelected?.id_family);
      }
    } catch (error) {
      console.log('Fetch family error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceOfFamily = async (id_family: number) => {
    try {
      setLoading(true);
      setServiceFamily([]);
      setPurchasedServices([]);

      const data = await PackageServices.getAvailableFunction(id_family);
      if (data) {
        setServiceFamily(data);
        const purchasedIds = data.map(
          (service: {id_extra_package: any}) => service.id_extra_package,
        );
        setPurchasedServices(purchasedIds);
      }
    } catch (error) {
      console.log('Fetch fetchServiceOfFamily error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCombo = async () => {
    try {
      setLoading(true);

      const data = await PackageServices.getComboPackage();
      if (data) {
        setCombo(data);
      }
    } catch (error) {
      console.log('Fetch fetchCombo error:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectFamily = (family: Family) => {
    setFamilySelected(family);
    fetchServiceOfFamily(family.id_family);
    setSelectedService(null);
  };

  useEffect(() => {
    fetchFamily();
    handleGetService();
    fetchCombo();
  }, []);

  const handleSelectService = (service: Service) => {
    setSelectedService(null);
    if (!purchasedServices.includes(service.id_extra_package)) {
      setSelectedService(service);
      setSelectedMount(service.price);
    }
  };
  const handleSelectCombo = (combo: ComboPackage) => {
    setSelectedService(null);
    if (!purchasedServices.includes(service.id_extra_package)) {
      setSelectedService(service);
      setSelectedMount(service.price);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: color.background}]}>
        <ActivityIndicator size="large" color={color.text} />
      </SafeAreaView>
    );
  }

  const handleBuyService = (pkg: Service) => {
    setSelectedService(pkg);
    dispatch(setOption('Service'));
    dispatch(setServices(pkg));
    navigation.navigate('OrderDetailService', {
      id_family: familySelected?.id_family,
    });
  };
  const handleBuyCombo = (pkg: ComboPackage) => {
    dispatch(setCombos(pkg));
    dispatch(setOption('Combo'));

    navigation.navigate('OrderDetailService', {
      id_family: familySelected?.id_family,
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewAllPurchased')}>
            <Icon name="arrow-back" size={24} color={color.text} />
          </TouchableOpacity>
        </View>
        <View style={[styles.searchContainer, {backgroundColor: color.white}]}>
          <Icon
            name="search"
            size={20}
            color={color.text}
            style={{marginRight: 5}}
          />
          <TextInput
            style={[styles.headerSearchInput]}
            placeholder={translate('SEARCH')}
            placeholderTextColor={color.text}
          />
        </View>

        <Text style={styles.yourFamily}>{translate('YOUR_FAMILIES')}</Text>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            horizontal
            data={family}
            renderItem={({item}) => (
              <View style={styles.familyContainer}>
                <TouchableOpacity
                  style={[
                    styles.familyCard,
                    familySelected?.id_family === item.id_family &&
                      styles.familyCardSelected,
                  ]}
                  onPress={() => selectFamily(item)}>
                  <Image
                    source={
                      item.avatar
                        ? {uri: item.avatar}
                        : require('../../../assets/images/big-family_4441180.png')
                    }
                    style={styles.avatar}
                  />
                  {familySelected?.id_family === item.id_family && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
                <Text style={styles.familyNameOutside}>{item.name}</Text>
              </View>
            )}
            keyExtractor={item => item.id_family.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          />
        </View>

        <View style={[styles.comboList]}>
          <Text style={styles.title}>{translate('COMBO_TITLE')}</Text>
          {combo.map((pkg, index) => (
            <TouchableOpacity
              key={pkg.id_combo_package}
              onPress={() => handleSelectService(pkg)}
              style={[styles.serviceItem, {backgroundColor: color.white}]}>
              <Text style={[styles.serviceName, {color: color.text}]}>
                {pkg.name}
              </Text>
              <Text style={styles.servicePrice}>
                {pkg.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
              {/* <Text
                style={[styles.serviceDescription, {color: color.textSubdued}]}>
                {pkg.description}
              </Text> */}

              <View style={styles.serviceActions}>
                <TouchableOpacity
                  style={styles.purchaseButton}
                  onPress={() => handleBuyCombo(pkg)}>
                  <Text style={styles.purchaseButtonText}>
                    {translate('BUY_NOW')}
                  </Text>
                  <FeatherIcon color="white" name="shopping-cart" size={17} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.serviceList]}>
          <Text style={styles.title}>{translate('SERVICE_TITLE')}</Text>
          {service.map((pkg, index) => (
            <TouchableOpacity
              key={pkg.id_extra_package}
              onPress={() => handleSelectService(pkg)}
              style={[
                styles.serviceItem,
                {backgroundColor: color.white},
                // selectedService?.id_extra_package === pkg.id_extra_package &&
                // styles.serviceItemActive,
              ]}>
              <Text
                style={[
                  purchasedServices.includes(pkg.id_extra_package) &&
                    styles.serviceNamePur,
                  styles.serviceName,
                  {color: color.text},
                ]}>
                {pkg.name}
              </Text>
              <Text style={styles.servicePrice}>
                {pkg.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
              <Text
                style={[styles.serviceDescription, {color: color.textSubdued}]}>
                {pkg.description}
              </Text>

              <View style={styles.serviceActions}>
                {purchasedServices &&
                purchasedServices.includes(pkg.id_extra_package) ? (
                  <TouchableOpacity
                    style={[
                      styles.purchaseButton,
                      {backgroundColor: color.white},
                    ]}>
                    <Text
                      style={[styles.purchaseButtonText, {color: color.text}]}>
                      {translate('purchased')}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={() => handleBuyService(pkg)}>
                    <Text style={styles.purchaseButtonText}>
                      {translate('BUY_NOW')}
                    </Text>
                    <FeatherIcon color="white" name="shopping-cart" size={17} />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceScreen;
