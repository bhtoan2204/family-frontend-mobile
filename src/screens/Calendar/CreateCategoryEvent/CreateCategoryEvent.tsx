import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Alert } from 'react-native';
import { CreateCategoryEventScreenProps } from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import { CategoryEvent } from 'src/interface/calendar/CategoryEvent';
import { useSelector } from 'react-redux';
import { getFamily } from 'src/redux/slices/CalendarSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable } from 'react-native-gesture-handler';
import styles from './styles';

const colorPalette = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'];

const CreateCategoryEventScreen: React.FC<CreateCategoryEventScreenProps> = ({ route, navigation }) => {
  const [eventName, setEventName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [categoryEvents, setCategoryEvents] = useState<CategoryEvent[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState('');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const id_family = useSelector(getFamily);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [id_family]);

  const fetchData = async () => {
    try {
      const result = await CalendarServices.getAllCategoryEvent(id_family);
      setCategoryEvents(result);
    } catch (error) {
      console.log('Error fetching category events:', error);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleCreateCategoryEvent = async () => {
    try {
      await CalendarServices.createCategoryEvent(eventName, selectedColor, id_family);
      fetchData();
      setEventName('');
      setSelectedColor('');
      setIsModalVisible(false);
    } catch (error) {
      console.log('Error creating category event:', error);
    }
  };

  const handleUpdateCategoryEvent = async (id: number, title: string) => {
    setSelectedCategoryId(id);
    setSelectedEventName(title);
    setIsUpdateModalVisible(true);
  };

  const handleConfirmUpdateCategoryEvent = async () => {
    Alert.alert(
        'Confirm Update',
        'Are you sure you want to update this category event?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Update',
            onPress: async () => {
              try {
                await CalendarServices.updateCategoryEvent(selectedCategoryId, selectedEventName, selectedColor, id_family);
                fetchData();
                setIsUpdateModalVisible(false);
                setSelectedEventName('');
                Alert.alert('Success', 'Category event has been updated successfully.');
              } catch (error) {
                console.log('Error updating category event:', error);
                Alert.alert('Error', 'An error occurred while updating the category event.');
              }
            },
          },
        ],
        { cancelable: true }
      );
  };

  const handleDeleteCategoryEvent = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this category event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await CalendarServices.deleteCategoryEvent(id, id_family);
              fetchData();
              Alert.alert('Success', 'Category event has been deleted successfully.');
            } catch (error) {
              console.log('Error deleting category event:', error);
              Alert.alert('Error', 'An error occurred while deleting the category event.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const renderRightActions = (id: number, title: string) => (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={() => handleUpdateCategoryEvent(id, title)}>
        <Icon name="edit" size={24} color="#007BFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteCategoryEvent(id)}>
        <Icon name="trash" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id_category_event, item.title)}>
      <View style={[styles.categoryItem , { backgroundColor: item.color}]}>
        <Text style={styles.categoryName}># {item.title}</Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Category Events</Text>
      <FlatList
        data={categoryEvents}
        keyExtractor={(item) => item.id_category_event.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.plusIcon}>
        <Icon name="plus" size={18} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Category Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Event Name (Hashtag)"
              value={eventName}
              onChangeText={setEventName}
            />
            <Text style={styles.colorLabel}>Choose Color:</Text>
            <FlatList
              data={colorPalette}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.colorItem, { backgroundColor: item, borderColor: selectedColor === item ? '#000' : '#fff' }]}
                  onPress={() => handleColorSelect(item)}
                />
              )}
              contentContainerStyle={styles.colorList}
            />
            <TouchableOpacity
              style={[styles.createButton, { backgroundColor: selectedColor || '#ccc' }]}
              onPress={handleCreateCategoryEvent}
              disabled={!eventName || !selectedColor}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={isUpdateModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsUpdateModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setIsUpdateModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Category Event</Text>
            <TextInput
              style={styles.input}
              value={selectedEventName}
              onChangeText={setSelectedEventName}
            />
            <Text style={styles.colorLabel}>Choose Color:</Text>
            <FlatList
              data={colorPalette}
              horizontal
              keyExtractor={(item) => item}
             
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.colorItem, { backgroundColor: item, borderColor: selectedColor === item ? '#000' : '#fff' }]}
                  onPress={() => handleColorSelect(item)}
                />
              )}
              contentContainerStyle={styles.colorList}
            />
            <TouchableOpacity
              style={[styles.createButton, { backgroundColor: selectedColor || '#ccc' }]}
              onPress={handleConfirmUpdateCategoryEvent}
              disabled={!selectedEventName || !selectedColor}
            >
              <Text style={styles.createButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CreateCategoryEventScreen;
