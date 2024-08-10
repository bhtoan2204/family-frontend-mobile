import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {COLORS} from 'src/constants';
import {ProfileServices} from 'src/services/apiclient';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const FeedbackScreen = () => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const navigation = useNavigation();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const handleRating = (rate: React.SetStateAction<number>) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please provide a rating.');
      return;
    }

    try {
      await ProfileServices.createFeedback(rating, feedback);
      Alert.alert('Success', 'Thank you for your feedback!');
      setRating(0);
      setFeedback('');
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while submitting your feedback. Please try again later.',
      );
      //console.error('Error submitting feedback:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: color.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeTab', {screen: 'HomeScreen'})}>
        <Ionicons
          name="close"
          size={32}
          color={color.text}
          style={{marginLeft: 10, marginTop: 20}}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{alignItems: 'center', bottom: 50}}>
          <Image
            source={require('../../assets/images/feedback-star.png')}
            resizeMode="stretch"
            style={{width: 250, height: 250, top: 100, zIndex: 1}}
          />
          <View
            style={{
              backgroundColor: color.card,
              width: 350,
              padding: 30,
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <View style={{backgroundColor: 'transparent', height: 50}}></View>
            <Text style={[styles.title, {color: color.text}]}>
              {translate('YourFeedback')}
            </Text>
            <Text style={[styles.subtitle, {color: color.textSubdued}]}>
              {translate('FeedbackQuestion')}
            </Text>
            <View style={styles.ratingContainer}>
              {Array.from({length: 5}, (_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRating(index + 1)}>
                  <Ionicons
                    name={index < rating ? 'star' : 'star-outline'}
                    size={32}
                    color={index < rating ? '#FFC727' : color.textSubdued}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={[
                styles.feedbackInput,
                {backgroundColor: color.white, color: color.text, height: 150},
              ]}
              placeholder={translate('FeedbackInput')}
              placeholderTextColor={color.textSubdued}
              multiline
              value={feedback}
              onChangeText={setFeedback}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                {translate('SubmitFeedback')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FeedbackScreen;
