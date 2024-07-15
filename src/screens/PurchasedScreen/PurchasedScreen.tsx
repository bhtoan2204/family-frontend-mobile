import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image
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
import { selectFamilies, setSelectedFamily } from 'src/redux/slices/FamilySlice';
import moment from 'moment';
import { AppDispatch } from 'src/redux/store';
import { COLORS } from 'src/constants';

const PurchasedScreen = ({navigation}: PurchasedScreenProps) => {
  const profile = useSelector(selectProfile);
  const [purchasedItems, setPurchasedItems] = useState<Purchased[]>([]);
  const [page, setPage] = useState<number>(1);
  const [family, setFamily] = useState<Family[]>([]);
  const itemsPerPage = 10;
  const families = useSelector(selectFamilies);
  const dispatch = useDispatch<AppDispatch>();

  const handleViewAllPackage = () => {
    const id_family = undefined;
    navigation.navigate('PackStack', {
      screen: 'ViewAllPackage',
      params: {id_family: id_family},
    });
  };

  const handleViewService = () => {
    // navigation.navigate('PackStack', { screen: 'ComboScreen' });
    navigation.navigate('PackStack', {screen: 'ViewAllService'});
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

  const onRenewPress = (family: Family) => {
    navigation.navigate('PackStack', {
      screen: 'ViewAllPackage',
      params: {id_family: family.id_family},
    });
  }
  const NavigateFamily = (family: Family) => {
    dispatch(setSelectedFamily(family));

    navigation.navigate('FamilyStack', {screen: 'ViewFamily', params: {id_family: family.id_family} })
  }

  const renderFamilyCards = () => {
    return families.map((family) => (
      <TouchableOpacity key={family.id_family} onPress={ ()=> NavigateFamily(family)} style={styles.familyCard}>
        {family.avatar ? (
          <Image source={{ uri: family.avatar }} style={styles.familyAvatar} />
        ) : (
          <View style={styles.defaultAvatar} />
        )}
        <View style={styles.familyInfo}>
          <Text style={styles.familyName}>{family.name}</Text>
          <Text style={styles.familyDescription}>{family.description}</Text>
          <Text style={styles.familyQuantity}>Members: {family.quantity}</Text>
          <View style={{flexDirection: 'row'}}> 
            <Text style={styles.familyQuantity}>Expired at: </Text>
            <Text style={[styles.familyQuantity, {color: COLORS.DenimBlue}]}>
              {moment(new Date(family.expired_at)).format('DD/MM/YYYY')}
            </Text>
          </View>
        
          <TouchableOpacity style={styles.renewButton} onPress={() => onRenewPress(family)}>
            <Text style={styles.renewButtonText}>Renew</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ));
  };
  
  return (
    <View style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} style={styles.backButton} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleViewAllPackage}
              style={styles.button}>
              <Image
                  source={require('../../assets/images/image-purchase.png')}
                  style={styles.buttonImage}
                />
              <Image
                  source={require('../../assets/images/new-family-button.png')}
                  style={styles.buttonAddFamily}
                />
            </TouchableOpacity>

           
          </View>

          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, marginRight: 8}}>
              <Text style={styles.sectionTitle}>Packages</Text>
              {purchasedItems
                .filter(item => item.type === 'package')
                .map((pkg, index) => (
                  <TouchableOpacity
                    key={pkg.orders.id_package_main + index.toString()}
                    onPress={() => {}}>
                    <View style={styles.card}>
                      <Text style={styles.packageName}>
                        {pkg.orders.id_package_main}
                      </Text>

                      <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                          Expiration Date:{' '}
                          {new Date(pkg.orders.created_at).toLocaleDateString()}
                        </Text>
                      </View>

                      <View style={styles.actions}>
                        {pkg.orders.id_family ? (
                          <>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('FamilyStack', {
                                  screen: 'ViewFamily',
                                  params: {id_family: pkg.orders.id_family},
                                })
                              }
                              style={styles.actionButton}>
                              <Text style={styles.actionText}>
                                View Details
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('PackStack', {
                                  screen: 'ViewAllPackage',
                                  params: {id_family: pkg.orders.id_family},
                                })
                              }
                              style={styles.actionButton}>
                              <Text style={styles.actionText}>
                                Extend Family
                              </Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('FamilyStack', {
                                screen: 'CreateFamily',
                                params: {id_order: pkg.id_order},
                              })
                            }
                            style={styles.actionButton}>
                            <Text style={styles.actionText}>Create Family</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>

            <View style={{flex: 1, marginLeft: 8}}>
              <Text style={styles.sectionTitle}>Services</Text>
              {purchasedItems
                .filter(item => item.type === 'service')
                .map((service, index) => (
                  <TouchableOpacity
                    key={service.orders.id_package_main + index.toString()}
                    onPress={() => {
                      // handle item press if needed
                    }}>
                    <View style={styles.card}>
                      <Text style={styles.packageName}>
                        {service.orders.id_package_main}
                      </Text>

                      <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                          Expiration Date:{' '}
                          {new Date(
                            service.orders.created_at,
                          ).toLocaleDateString()}
                        </Text>
                      </View>

                      <View style={styles.actions}>
                        {service.orders.id_family ? (
                          <>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('FamilyStack', {
                                  screen: 'ViewFamily',
                                  params: {id_family: service.orders.id_family},
                                })
                              }
                              style={styles.actionButton}>
                              <Text style={styles.actionText}>
                                View Details
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('PackStack', {
                                  screen: 'ViewAllPackage',
                                  params: {id_family: service.orders.id_family},
                                })
                              }
                              style={styles.actionButton}>
                              <Text style={styles.actionText}>
                                Extend Family
                              </Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('FamilyStack', {
                                screen: 'CreateFamily',
                                params: {id_order: service.id_order},
                              })
                            }
                            style={styles.actionButton}>
                            <Text style={styles.actionText}>Create Family</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View> */}
          {/* </View> */}

          <Text style={styles.familyListTitle}>Your Families</Text>
          {renderFamilyCards()}

          
        </View>
      </ScrollView>
    </View>
  );
};

export default PurchasedScreen;
