import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styles from './styles';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    if (rating === 0 || feedback.trim() === '') {
      Alert.alert('Error', 'Please provide a rating and feedback.');
      return;
    }
    // Handle the feedback submission logic here
    Alert.alert('Success', 'Thank you for your feedback!');
    setRating(0);
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Feedback</Text>
      <Text style={styles.subtitle}>How was your experience?</Text>
      <View style={styles.ratingContainer}>
        {Array.from({length: 5}, (_, index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
            <Ionicons
              name={index < rating ? 'star' : 'star-outline'}
              size={32}
              color={index < rating ? '#FFD700' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.feedbackInput}
        placeholder="Write your feedback here..."
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;
