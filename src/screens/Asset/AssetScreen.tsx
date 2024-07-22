import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AssetScreenProps } from 'src/navigation/NavigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseServices } from 'src/services/apiclient';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';
import { Asset } from 'src/interface/asset/asset';
import { selectAsset, setAsset } from 'src/redux/slices/AssetSlice';
import Feather from 'react-native-vector-icons/Feather';
import { RootState } from 'src/redux/store';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { useThemeColors } from 'src/hooks/useThemeColor';

const AssetScreen = ({ navigation }: AssetScreenProps) => {
  const dispatch = useDispatch();
  const family = useSelector(selectSelectedFamily);
  const assets = useSelector((state: RootState) => state.asset.assets);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await ExpenseServices.getAsset(family.id_family);
      console.log(data);
      dispatch(setAsset(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePressDetail = (item: Asset) => {
    dispatch(selectAsset(item))
    navigation.navigate('AssetDetailScreen', { asset: item });
  };

  const renderItem = ({ item }: { item: Asset }) => (
    <TouchableOpacity onPress={() => handlePressDetail(item)} 
    style={[styles.assetContainer, {backgroundColor: color.white }]}>
      <Image source={{ uri: item.image_url }} style={styles.assetImage} />
      <View style={styles.assetInfo}>
        <Text style={[styles.assetName, {color: color.text}]}>{item.name}</Text>
        <Text style={[styles.assetDescription, {color: color.text}]}>{item.description}</Text>
        <Text style={[styles.assetValue, {color: color.text}]}>{`{translate('Value')}: ${parseInt(item.value).toLocaleString()} VND`}</Text>
        <Text style={[styles.assetDate, {color: color.text}]}>{`{translate('Purchase Date')}: ${item.purchase_date}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: color.background}]}>
      <View style={[styles.header, {backgroundColor: color.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color={color.text}/>
        </TouchableOpacity>
        <Text style={[styles.title, {color: color.text}]}>{translate('Asset')}</Text>
      </View>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id_asset.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAssetScreen')}>
        <Feather name="plus-circle" size={50} color="#2196F3" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 10,
    color: '#111827',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  assetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assetImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  assetDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  assetValue: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  assetDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default AssetScreen;
