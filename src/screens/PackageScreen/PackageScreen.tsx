import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {package_info} from './data';
import {TEXTS} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {PackageServices} from 'src/services/apiclient';
import {SwipeListView} from 'react-native-swipe-list-view';
import { PurchasedScreenProps } from 'src/navigation/NavigationTypes';
import {
  OrderDetailScreenProps,
  ViewAllPackageScreenProps,
} from 'src/navigation/NavigationTypes';
import {RouteProp} from '@react-navigation/native';
type Package = {
  id_package: number;
  name: string;
  price: number;
  description: string;
  expired: number;
};

const PackageScreen = ({navigation, route}: PurchasedScreenProps) => {
  const [value, setValue] = React.useState(0);
  const {id_user, id_family} = route.params;
  // const [keyPackage, setIdPackage] = useState(1);
  // const [keyAmount, setAmountPackage] = useState(1); // Giả sử ban đầu id_package là 1
  const [selectedPackage, setSelectedPackage] = useState<null | Package>(null);
  const [selectedMount, setSelectedMount] = useState<number>(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const handleSelectPackage = (
    id_user: string,
    id_family: number,
    id_package: number,
    amount: number,
  ) => {
    navigation.navigate('OrderDetailScreen', {
      id_user,
      id_family,
      id_package,
      amount,
    });
  };

  const handleGetPackages = async () => {
    try {
      //console.log('Hello World');
      const result = await PackageServices.getAllPackage();
      //console.log('PackageServices.getPackage result:', result);
      setPackages(result);
    } catch (error: any) {
      console.log('PackageServices.getPackage error:', error);
    }
  };

  useEffect(() => {
    handleGetPackages();
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
          <Text style={styles.title}>{TEXTS.PACKAGE_TITLE}</Text>
          {packages.map((pkg, index) => {
            const isActive = value === index;
            return (
              <TouchableOpacity
                key={pkg.id_package}
                onPress={() => {
                  setValue(index);
                  setSelectedPackage(pkg); // Cập nhật selectedPackage
                  setSelectedMount(pkg.price); // Cập nhật selectedMount
                }}>
                <View style={[styles.radio, isActive && styles.radioActive]}>
                  <Text style={styles.radioLabel}>{pkg.name}</Text>

                  <Text style={styles.radioPrice}>{pkg.price} VNĐ</Text>

                  <View style={styles.radioBadge}>
                    <Text style={styles.radioBadgeText}>
                      {pkg.expired} month(s)
                    </Text>
                  </View>

                  <Text style={styles.radioDescription}>{pkg.description}</Text>

                  <View
                    style={[
                      styles.radioInput,
                      isActive && styles.radioInputActive,
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              selectedPackage &&
              handleSelectPackage(
                id_user,
                id_family,
                selectedPackage.id_package,
                selectedMount,
              )
            }>
            <Text style={styles.btnText}>{TEXTS.PACKAGE_REGISTER}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageScreen;
