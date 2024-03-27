import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TEXTS } from 'src/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { PackageServices, FamilyServices } from 'src/services/apiclient';
import { PurchasedScreenProps, HomeScreenProps } from 'src/navigation/NavigationTypes';

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

const PurchasedScreen = ({ navigation, route }: HomeScreenProps) => {
  const { id_user } = route.params;
  const [value, setValue] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState<Purchased[]>([]);

  const handleGetPurchased = async () => {
    try {
      const result = await PackageServices.getOrderSucessful();
      result.forEach((item: { order_expired_at: string | number | Date; }) => {
        item.order_expired_at = new Date(item.order_expired_at); // Convert order_expired_at to Date object
      });
      setPurchasedItems(result);
    } catch (error: any) {
      console.log('PackageServices.getPackage error:', error);
    }
  };

  const handleViewAllPackage = () => {
    navigation.navigate('PackStack', { screen: 'ViewAllPackage', params: { id_user, id_family: 0 } });
  };

  const handleExtendFamily = (pkg: Purchased) => {
    console.log('Extend family for package:', pkg);
  };

  useEffect(() => {
    handleGetPurchased();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerfile}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} style={styles.backButton} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>{TEXTS.PURCHASED_TITLE}</Text>
          <TouchableOpacity
            onPress={handleViewAllPackage}
            style={{
              backgroundColor: '#4884D3',
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Buy package</Text>
          </TouchableOpacity>

          {purchasedItems.map((pkg, index) => {
            const isActive = value === index;
            return (
              <TouchableOpacity
                key={pkg.id_package + index.toString()}
                onPress={() => {
                  setValue(index);
                }}>
                <View style={[styles.radio, isActive && styles.radioActive]}>
                  <Text style={styles.radioLabel}>{pkg.package_name}</Text>

                  <View style={styles.radioBadge}>
                    <Text style={styles.radioBadgeText}>
                      Expiration date: {pkg.order_expired_at.toLocaleString()}
                    </Text>
                  </View>
                  
                  {pkg.family_name && pkg.family_quantity && (
                    <View>
                      <Text style={styles.smallText}>
                        Family's name: {pkg.family_name}
                      </Text>
                      <Text style={styles.smallText}>
                        Quantity: {pkg.family_quantity}
                      </Text>
                      
                    </View>
                  )}

                  {pkg.order_family_id ? (
                    <>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('FamilyStack', { screen: 'ViewFamily', params: { id_user: id_user, id_family: pkg.order_family_id}})}>
                        <Text style={styles.viewfamilybtn}>View details</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('PackStack', { screen: 'ViewAllPackage', params: { id_user: id_user, id_family: pkg.order_family_id}})}>
                        <Text style={styles.Extendbtn}>Extend Family</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('FamilyStack', {  screen: 'CreateFamily', params: { id_user: id_user, id_order: pkg.id_order }})}>
                      <Text style={styles.radioBadgeText}>Create Family</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PurchasedScreen;
