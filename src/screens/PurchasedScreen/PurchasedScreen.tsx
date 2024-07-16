import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { FamilyServices, PackageServices } from 'src/services/apiclient';
import { PurchasedScreenProps } from 'src/navigation/NavigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { Purchased } from 'src/interface/purchased/purchased';
import styles from './styles';
import { Family } from 'src/interface/family/family';
import { selectFamilies, setSelectedFamily } from 'src/redux/slices/FamilySlice';
import moment from 'moment';
import { AppDispatch } from 'src/redux/store';
import { COLORS } from 'src/constants';

const PurchasedScreen = ({ navigation }: PurchasedScreenProps) => {
  const profile = useSelector(selectProfile);
  const [purchasedItems, setPurchasedItems] = useState<Purchased[]>([]);
  const [page, setPage] = useState<number>(1);
  const [family, setFamily] = useState<Family[]>([]);
  const itemsPerPage = 10;
  const families = useSelector(selectFamilies);
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false); // State để điều khiển hiển thị của modal

  const handleViewAllPackage = () => {
    const id_family = undefined;
    navigation.navigate('PackStack', {
      screen: 'ViewAllPackage',
      params: { id_family: id_family },
    });
  };

  const handleViewService = () => {
    navigation.navigate('PackStack', { screen: 'ViewAllService' });
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
      params: { id_family: family.id_family },
    });
  };

  const NavigateFamily = (family: Family) => {
    dispatch(setSelectedFamily(family));

    navigation.navigate('FamilyStack', {
      screen: 'ViewFamily',
      params: { id_family: family.id_family },
    });
  };

  const renderFamilyCards = () => {
    return families.map((family) => (
      <TouchableOpacity
        key={family.id_family}
        onPress={() => NavigateFamily(family)}
        style={styles.familyCard}>
        <TouchableOpacity 
          style={styles.settingsIconContainer}
          onPress={() => setModalVisible(true)}>
          <Icon name="ellipsis-vertical" size={24} style={styles.settingsIcon} />
        </TouchableOpacity>
        <View style={styles.familyAvatarContainer}>
          {family.avatar ? (
            <Image source={{ uri: family.avatar }} style={styles.familyAvatar} />
          ) : (
            <View style={styles.defaultAvatar} />
          )}
        </View>
        <View style={styles.familyInfo}>
          <Text style={styles.familyName}>{family.name}</Text>
          <Text style={styles.familyQuantity}>Members: {family.quantity}</Text>
          <View style={styles.expiredAtContainer}>
            <Text style={styles.familyQuantity}>Expired at: </Text>
            <Text style={[styles.familyQuantity, styles.expiredAtText]}>
              {moment(new Date(family.expired_at)).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={styles.buttonContainerFamily}>
            {/* <TouchableOpacity
              style={[styles.renewButton, styles.button]}
              onPress={() => onRenewPress(family)}>
              <Text style={styles.renewButtonText}>Renew</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.buyServiceButton, styles.button]}
              onPress={() => handleViewService()}>
              <Text style={styles.buyServiceButtonText}>Buy Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Family Management</Text>
          <View style={{ flex: 1 }} />
        </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleViewAllPackage} style={styles.button}>
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
          <View style={styles.container}>

          <Text style={styles.familyListTitle}>Your Families</Text>
          {renderFamilyCards()}
        </View>
      </ScrollView>

      <Modal
        animationType="slide" // Slide từ dưới lên
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity // TouchableOpacity xung quanh modal để tắt modal khi bấm vào nền
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                // Thực hiện hành động khi chọn option trong modal
                setModalVisible(false);
              }}>
              <Text style={styles.modalOptionText}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                // Thực hiện hành động khi chọn option trong modal
                setModalVisible(false);
              }}>
              <Text style={styles.modalOptionText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                // Thực hiện hành động khi chọn option trong modal
                setModalVisible(false);
              }}>
              <Text style={styles.modalOptionText}>Option 3</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PurchasedScreen;


