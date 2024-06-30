import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { PackageServices } from 'src/services/apiclient';
import { PurchasedScreenProps } from 'src/navigation/NavigationTypes';
import { useSelector } from 'react-redux';
import { selectProfile } from 'src/redux/slices/ProfileSclice';

type Purchased = {
  id_order: number;
  id_package: number;
  package_name: string;
  package_price: number;
  package_description: string;
  order_family_id: number;
  order_expired_at: Date;
  family_name: string;
  family_quantity: number;
};

const PurchasedScreen = ({ navigation }: PurchasedScreenProps) => {
  const profile = useSelector(selectProfile);
  const [purchasedItems, setPurchasedItems] = useState<Purchased[]>([]);

  const handleViewAllPackage = () => {
    const id_family = undefined;
    navigation.navigate('PackStack', {
      screen: 'ViewAllPackage',
      params: { id_family: id_family },
    });
  };

  const handleViewService = () => {
    navigation.navigate('PackStack', { screen: 'ComboScreen' });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await PackageServices.getOrderSucessful();
  //       result.forEach(item => {
  //         item.order_expired_at = new Date(item.order_expired_at);
  //       });
  //       setPurchasedItems(result);
  //     } catch (error) {
  //       console.log('PackageServices.getPackage error:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} style={styles.backButton} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Purchased</Text>

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

          {purchasedItems.map((pkg, index) => (
            <TouchableOpacity
              key={pkg.id_package + index.toString()}
              onPress={() => {
                // handle item press if needed
              }}>
              <View style={styles.card}>
                <Text style={styles.packageName}>{pkg.package_name}</Text>

                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    Expiration Date: {pkg.order_expired_at.toLocaleString()}
                  </Text>

                  {pkg.family_name && pkg.family_quantity && (
                    <View>
                      <Text style={styles.infoText}>
                        Family's Name: {pkg.family_name}
                      </Text>
                      <Text style={styles.infoText}>
                        Quantity: {pkg.family_quantity}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.actions}>
                  {pkg.order_family_id ? (
                    <>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('FamilyStack', {
                            screen: 'ViewFamily',
                            params: { id_family: pkg.order_family_id },
                          })
                        }
                        style={styles.actionButton}>
                        <Text style={styles.actionText}>View Details</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('PackStack', {
                            screen: 'ViewAllPackage',
                            params: { id_family: pkg.order_family_id },
                          })
                        }
                        style={styles.actionButton}>
                        <Text style={styles.actionText}>Extend Family</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('FamilyStack', {
                          screen: 'CreateFamily',
                          params: { id_order: pkg.id_order },
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default PurchasedScreen;
