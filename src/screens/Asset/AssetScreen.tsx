import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AssetScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {ExpenseServices} from 'src/services/apiclient';
import {Asset} from 'src/interface/asset/asset';
import {selectAsset, selectAssets, setAsset} from 'src/redux/slices/AssetSlice';
import Feather from 'react-native-vector-icons/Feather';
import {RootState} from 'src/redux/store';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import styles from './styles';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';

const AssetScreen = ({navigation}: AssetScreenProps) => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssets);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const [page, setPage] = useState(1);
  const [keySearch, setKeySearch] = useState('created_at');
  const profile = useSelector(selectProfile);
  let family = useSelector(selectSelectedFamily);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await ExpenseServices.getAsset(
        family.id_family,
        page,
        10,
        'created_at',
        'DESC',
      );
      dispatch(setAsset(data));
    } catch (error) {
      console.log(error);
    }
  };
  const formatCurrency = (amount: string | number | bigint) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  const handlePressDetail = (item: Asset) => {
    dispatch(selectAsset(item));
    navigation.navigate('AssetDetailScreen', {asset: item});
  };

  const renderItem = ({item}: {item: Asset}) => (
    <TouchableOpacity
      onPress={() => handlePressDetail(item)}
      style={[styles.assetContainer, {backgroundColor: color.white}]}>
      <Image source={{uri: item.image_url}} style={styles.assetImage} />
      <View style={styles.assetInfo}>
        <View style={{justifyContent: 'space-between'}}>
          <Text style={[styles.assetName, {color: color.text}]}>
            {item.name}
          </Text>
          <Text style={[styles.assetDescription, {color: color.textSubdued}]}>
            {item.description}
          </Text>
        </View>
        <View style={{justifyContent: 'space-between'}}>
          <Text
            style={[
              styles.assetValue,
              {color: color.textSubdued},
            ]}>{`${translate('Value')}: ${formatCurrency(parseInt(item.value))}`}</Text>
          <Text style={[styles.assetDate, {color: color.textSubdued}]}>
            {`${translate('Purchase Date')}: ${item.purchase_date}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/asset-detail-bg.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButton}>
              <Icon name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerText}>{translate('Asset')}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddAssetScreen')}
              style={styles.headerButton}>
              <Feather name="plus" size={33} style={styles.backButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>
              {translate('Hello')}, {profile.firstname} {profile.lastname}
            </Text>
            <Text style={styles.welcomeTextDetail}>
              {translate('AssetDetail2')}
            </Text>
          </View>
          <View style={[styles.assetList, {backgroundColor: color.background}]}>
            <FlatList
              data={assets}
              keyExtractor={item => item.id_asset.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{height: 180}} />}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AssetScreen;
