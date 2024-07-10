import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {FamilyServices, PackageServices} from 'src/services/apiclient';
import {PurchasedScreenProps} from 'src/navigation/NavigationTypes';
import {useSelector} from 'react-redux';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {Purchased} from 'src/interface/purchased/purchased';
import styles from './styles';
import {Family} from 'src/interface/family/family';

const PurchasedScreen = ({navigation}: PurchasedScreenProps) => {
  const profile = useSelector(selectProfile);
  const [purchasedItems, setPurchasedItems] = useState<Purchased[]>([]);
  const [page, setPage] = useState<number>(1);
  const [family, setFamily] = useState<Family[]>([]);
  const itemsPerPage = 10;

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.title}>Purchased</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleViewAllPackage}
              style={styles.button}>
              <Text style={styles.buttonText}>Buy Package</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleViewService}
              style={[styles.button, styles.serviceButton]}>
              <Text style={styles.buttonText}>Buy Service</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PurchasedScreen;
