import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {CreateCategoryEventScreenProps} from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import {CategoryEvent} from 'src/interface/calendar/CategoryEvent';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Swipeable} from 'react-native-gesture-handler';
import styles from './styles';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Toast} from 'react-native-toast-notifications';

const colorPalette = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
];

const CreateCategoryEventScreen: React.FC<CreateCategoryEventScreenProps> = ({
  route,
  navigation,
}) => {
  const [eventName, setEventName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [categoryEvents, setCategoryEvents] = useState<CategoryEvent[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState('');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const family = useSelector(selectSelectedFamily);
  const t = useSelector(getTranslate);
  const color = useThemeColors();

  useEffect(() => {
    fetchData();
  }, [family.id_family]);

  const fetchData = async () => {
    try {
      const result = await CalendarServices.getAllCategoryEvent(
        family.id_family,
      );
      setCategoryEvents(result);
    } catch (error) {
      console.log('Error fetching category events:', error);
    }
  };

  const handleColorSelect = color => {
    setSelectedColor(color);
  };

  const handleCreateCategoryEvent = async () => {
    try {
      await CalendarServices.createCategoryEvent(
        eventName,
        selectedColor,
        family.id_family,
      );
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
      t('confirmUpdate'),
      t('confirmUpdateMessage'),
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: t('update'),
          onPress: async () => {
            try {
              await CalendarServices.updateCategoryEvent(
                selectedCategoryId,
                selectedEventName,
                selectedColor,
                family.id_family,
              );
              fetchData();
              setIsUpdateModalVisible(false);
              setSelectedEventName('');
              Toast.show(t('updateSuccessMessage'), {
                type: 'success',
              });
            } catch (error) {
              console.log('Error updating category event:', error);
              Alert.alert(t('errorUpdate'), t('updateErrorMessage'));
              Toast.show(t('updateErrorMessage'), {
                type: 'danger',
              });
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleDeleteCategoryEvent = async (id: number) => {
    Alert.alert(
      t('confirmDelete'),
      t('confirmDeleteMessage'),
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: t('Delete'),
          onPress: async () => {
            try {
              const respone = await CalendarServices.deleteCategoryEvent(
                id,
                family.id_family,
              );
              fetchData();
              //Alert.alert(t('successDelete'), t('deleteSuccessMessage'));
              if (respone) {
                Toast.show(t('deleteSuccessMessage'), {
                  type: 'success',
                });
              } else {
                Alert.alert(
                  t('errorDelete'),
                  t('deleteCategoryWithEventsErrorMessage'),
                );
                Toast.show(t('deleteErrorMessage'), {
                  type: 'danger',
                });
              }
            } catch (error) {
              //console.log('Error deleting category event:', error);
              Alert.alert(
                t('errorDelete'),
                t('deleteCategoryWithEventsErrorMessage'),
              );
              Toast.show(t('deleteErrorMessage'), {
                type: 'danger',
              });
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const renderRightActions = (id: number, title: string) => (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => handleUpdateCategoryEvent(id, title)}>
        <Icon name="edit" size={24} color="#007BFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => handleDeleteCategoryEvent(id)}>
        <Icon name="trash" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => (
    <Swipeable
      renderRightActions={() =>
        renderRightActions(item.id_category_event, item.title)
      }>
      <View style={[styles.categoryItem, {backgroundColor: item.color}]}>
        <Text style={[styles.categoryName, {color: color.text}]}>
          # {item.title}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={[styles.container, {backgroundColor: color.background}]}>
      <Text style={[styles.header, {color: color.text}]}>
        {t('Category Events')}
      </Text>
      <FlatList
        data={categoryEvents}
        keyExtractor={item => item.id_category_event.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.plusIcon}>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}>
          <View style={[styles.modalContent, {backgroundColor: color.white}]}>
            <Text style={[styles.modalTitle, {color: color.text}]}>
              {t('create')}
            </Text>
            <TextInput
              style={[styles.input, {color: color.text}]}
              placeholder={t('enterEventName')}
              value={eventName}
              onChangeText={setEventName}
            />
            <Text style={[styles.colorLabel, {color: color.text}]}>
              {t('chooseColor')}
            </Text>
            <FlatList
              data={colorPalette}
              horizontal
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.colorItem,
                    {
                      backgroundColor: item,
                      borderColor: selectedColor === item ? '#000' : '#fff',
                    },
                  ]}
                  onPress={() => handleColorSelect(item)}
                />
              )}
              contentContainerStyle={styles.colorList}
            />
            <TouchableOpacity
              style={[
                styles.createButton,
                {backgroundColor: selectedColor || '#ccc'},
              ]}
              onPress={handleCreateCategoryEvent}
              disabled={!eventName || !selectedColor}>
              <Text style={styles.createButtonText}>{t('create')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={isUpdateModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsUpdateModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setIsUpdateModalVisible(false)}>
          <View
            style={[styles.modalContent, {backgroundColor: color.background}]}>
            <Text style={[styles.modalTitle, {color: color.text}]}>
              {t('update')}
            </Text>
            <TextInput
              style={[styles.input, {color: color.text}]}
              value={selectedEventName}
              onChangeText={setSelectedEventName}
            />
            <Text style={[styles.colorLabel, {color: color.text}]}>
              {t('chooseColor')}
            </Text>
            <FlatList
              data={colorPalette}
              horizontal
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.colorItem,
                    {
                      backgroundColor: item,
                      borderColor: selectedColor === item ? '#000' : '#fff',
                    },
                  ]}
                  onPress={() => handleColorSelect(item)}
                />
              )}
              contentContainerStyle={styles.colorList}
            />
            <TouchableOpacity
              style={[
                styles.createButton,
                {backgroundColor: selectedColor || '#ccc'},
              ]}
              onPress={handleConfirmUpdateCategoryEvent}
              disabled={!selectedEventName || !selectedColor}>
              <Text style={styles.createButtonText}>{t('update')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CreateCategoryEventScreen;
