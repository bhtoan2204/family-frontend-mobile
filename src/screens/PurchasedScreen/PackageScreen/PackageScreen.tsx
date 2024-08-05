import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {PackageServices} from 'src/services/apiclient';
import {ViewAllPackageScreenProps} from 'src/navigation/NavigationTypes';
import {Package} from 'src/interface/package/mainPackage';
import {setOption, setPackage} from 'src/redux/slices/PackageSlice';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import styles from './styles';
import FAQ from './FAQ';

const PackageScreen = ({navigation, route}: ViewAllPackageScreenProps) => {
  const [value, setValue] = useState(0);
  const {id_family} = route.params;
  const [selectedPackage, setSelectedPackage] = useState<null | Package>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  const handleSelectPackage = (pkg: Package) => {
    dispatch(setOption('Package'));
    dispatch(setPackage(pkg));
    navigation.navigate('OrderDetailScreen', {id_family});
  };

  const handleGetPackages = async () => {
    try {
      const result = await PackageServices.getAllPackage();
      setPackages(result);
      setSelectedPackage(packages[0]);
    } catch (error: any) {
      console.log('PackageServices.getPackage error:', error);
    }
  };

  useEffect(() => {
    handleGetPackages();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: color.background, height: '100%'}}>
      <ScrollView>
        <View style={styles.headerfile}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <Icon name="close" size={30} color={color.text} />
          </TouchableOpacity>
          <Text style={[styles.title, {color: color.text}]}>
            {translate('PACKAGE_TITLE')}
          </Text>
        </View>

        <View style={styles.container}>
          {packages.map((pkg, index) => {
            const isActive = value === index;
            return (
              <TouchableOpacity
                key={pkg.id_main_package}
                onPress={() => {
                  setValue(index);
                  setSelectedPackage(pkg);
                }}>
                <View
                  style={[
                    styles.radio,
                    {backgroundColor: color.white},
                    isActive && styles.radioActive,
                  ]}>
                  <Text style={[styles.radioLabel]}>{pkg.name}</Text>

                  <Text style={[styles.radioPrice, {color: color.text}]}>
                    {pkg.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Text>

                  <View style={styles.radioBadge}>
                    <Text style={styles.radioBadgeText}>
                      {pkg.duration_months} month(s)
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.radioDescription,
                      {color: color.textSubdued},
                    ]}>
                    {pkg.description}
                  </Text>

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
            style={styles.registerButton}
            disabled={!selectedPackage}
            onPress={() =>
              selectedPackage && handleSelectPackage(selectedPackage)
            }>
            <Text style={styles.registerButtonText}>
              {translate('PACKAGE_REGISTER')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <FAQ />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageScreen;
