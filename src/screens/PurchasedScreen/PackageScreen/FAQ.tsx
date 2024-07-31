import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useThemeColors} from 'src/hooks/useThemeColor';
import Icon from 'react-native-vector-icons/Ionicons';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const color = useThemeColors();

  const faqs = [
    {
      question: 'What’s included in Package?',
      answer:
        'The package includes various features such as a fixed duration subscription, and offers two free functionalities: finance and guideline.',
      icon: 'information-circle',
    },
    {
      question: 'What’s included in Services?',
      answer:
        'The services include advanced features that are available indefinitely. Unlike the package, which has a fixed duration, the services offer a lifetime access to enhanced functionalities.',
      icon: 'star',
    },
    {
      question: 'Will my family members also get benefit?',
      answer:
        'Yes, your family members will also benefit from the package and services, as the subscription covers all members associated with the account.',
      icon: 'people',
    },
    {
      question: 'How do I cancel a subscription?',
      answer:
        'Currently, it is not possible to cancel a subscription once it has been activated. If you have any concerns or need assistance, please contact our support team.',
      icon: 'close-circle',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView style={{backgroundColor: color.background}}>
      <View style={styles.faqContainer}>
        <Text style={[styles.faqTitle, {color: color.text}]}>
          Frequently Asked Questions
        </Text>
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              onPress={() => handleToggle(index)}
              style={styles.faqHeader}>
              <View style={styles.faqHeaderContent}>
                <Icon
                  name={item.icon}
                  size={20}
                  color={color.text}
                  style={styles.faqIcon}
                />
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
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  faqItem: {
    marginBottom: 40,
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
    marginRight: 10,
  },
  faqQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 18,
    marginLeft: 30,
  },
});

export default FAQ;
