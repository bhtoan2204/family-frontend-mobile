import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

const ImagePickerComponent = ({
  description,
  setDescription,
  date,
  handleDateChange,
  uriImage,
  setShowLargeImage,
  handleRemoveImage,
  handleOpenImageLibrary,
  handleTakePhoto,
  selectedMenu
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <View style={styles.itemContainer}>
          <Icon
            name="pencil"
            size={25}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.titleText}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      <View style={styles.datePickerContainer}>
        <View style={styles.itemContainer}>
          <Icon
            name="calendar"
            size={25}
            color="black"
            style={styles.icon}
          />
          <Text style={[styles.text, {marginRight: 90, right: 10}]}>
            Select Date
          </Text>
        </View>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      </View>
    {selectedMenu !='Income' && (
      <View style={styles.imageContainer}>
        <View style={styles.imageContainer1}>
          <TouchableOpacity onPress={() => setShowLargeImage(true)}>
            {uriImage && (
              <View>
                <Image source={{ uri: uriImage }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeIconContainer}
                  onPress={handleRemoveImage}>
                  <Icon name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer2}>
          <TouchableOpacity onPress={() => handleOpenImageLibrary()}>
            <Icon
              name="image"
              size={60}
              color="gray"
              style={styles.cameraButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTakePhoto()}>
            <Icon name="camera" size={60} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    )}

    </View>
  );
};



export default ImagePickerComponent;
