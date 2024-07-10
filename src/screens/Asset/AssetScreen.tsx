import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AssetScreenProps } from 'src/navigation/NavigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseServices } from 'src/services/apiclient';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';
import { Asset } from 'src/interface/asset/asset';
import { addAsset, selectAsset, selectAssets, setAsset } from 'src/redux/slices/AssetSlice';
import Feather from 'react-native-vector-icons/Feather';

const AssetScreen = ({ navigation }: AssetScreenProps) => {
  const dispatch = useDispatch();
  const family = useSelector(selectSelectedFamily);
  const assets = useSelector(selectAssets);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await ExpenseServices.getAsset(family.id_family);
      dispatch(setAsset(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePressDetail = (item: Asset) => {
    dispatch(selectAsset(item));
    navigation.navigate('AssetDetailScreen');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressDetail(item)} style={styles.assetContainer}>
      <Image source={{ uri: item.image_url }} style={styles.assetImage} />
      <View style={styles.assetInfo}>
        <Text style={styles.assetName}>{item.name}</Text>
        <Text style={styles.assetDescription}>{item.description}</Text>
        <Text style={styles.assetValue}>{`Value: ${parseInt(item.value).toLocaleString()} VND`}</Text>
        <Text style={styles.assetDate}>{`Purchase Date: ${item.purchase_date}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Assets</Text>
      </View>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id_asset.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  list: {
    paddingBottom: 16,
  },
  assetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  assetImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 20,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  assetDescription: {
    fontSize: 14,
    color: '#666',
  },
  assetValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  assetDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    marginBottom: 30,
  },
  
});

export default AssetScreen;
