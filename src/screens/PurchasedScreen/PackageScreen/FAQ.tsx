import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useThemeColors} from 'src/hooks/useThemeColor';
import Icon from 'react-native-vector-icons/Ionicons';
import Question1 from '../../../assets/images/question1.png';
import Question2 from '../../../assets/images/question2.png';
import Question3 from '../../../assets/images/question3.png';
import Question4 from '../../../assets/images/question4.png';
import {getTranslate} from 'src/redux/slices/languageSlice';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const color = useThemeColors();
  const translate = useSelector(getTranslate);

  const faqs = [
    {
      question: 'What’s included in Package?',
      answer:
        'The package includes various features such as a fixed duration subscription, and offers two free functionalities: finance and guideline shared.',
      icon: Question1,
    },
    {
      question: 'What’s included in Services?',
      answer:
        'The services include advanced features that are available indefinitely. Unlike the package, which has a fixed duration, the services offer a lifetime access to enhanced functionalities.',
      icon: Question2,
    },
    {
      question: 'Will my family members also get benefit?',
      answer:
        'Yes, your family members will also benefit from the package and services, as the subscription covers all members associated with the account.',
      icon: Question3,
    },
    {
      question: 'How do I cancel a subscription?',
      answer:
        'Currently, it is not possible to cancel a subscription once it has been activated. If you have any concerns or need assistance, please contact our support team.',
      icon: Question4,
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView style={{backgroundColor: color.background}}>
      <View style={styles.faqContainer}>
        <Text style={[styles.faqTitle, {color: color.text}]}>
          {translate('FrequentlyAskedQuestions')}
        </Text>
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              onPress={() => handleToggle(index)}
              style={styles.faqHeader}>
              <View style={styles.faqHeaderContent}>
                <Image source={item.icon} style={styles.faqIcon} />
                <Text style={[styles.faqQuestion, {color: color.text}]}>
                  {item.question}
                </Text>
              </View>
              <Icon
                name={openIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={color.text}
              />
            </TouchableOpacity>
            {openIndex === index && (
              <Text style={[styles.faqAnswer, {color: color.textSubdued}]}>
                {item.answer}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  faqContainer: {
    padding: 20,
    marginTop: 20,
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  faqItem: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: '#D6D5D5',
    borderRadius: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  faqHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqIcon: {
    marginLeft: 7,
    marginRight: 15,
    width: 28,
    height: 28,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '80%',
  },
  faqAnswer: {
    fontSize: 18,
    marginLeft: 30,
  },
});

export default FAQ;
