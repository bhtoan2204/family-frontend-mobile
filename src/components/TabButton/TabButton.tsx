import {MouseEvent, useEffect, useRef, useState} from 'react';
import {
  AccessibilityState,
  Animated,
  GestureResponderEvent,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {selectunreadCount} from 'src/redux/slices/NotificationSlice';

interface TabButtonProps {
  item: {
    id: string;
    title: string;
    component: () => JSX.Element;
    screen: string;
    icon: string;
  };
  accessibilityState: AccessibilityState | undefined;
  onPress: ((e: MouseEvent<any> | GestureResponderEvent) => void) | undefined;
}

const TabButton = ({item, accessibilityState, onPress}: TabButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const translation = useSelector(getTranslate);
  const color = useThemeColors();
  const animatedValues = {
    translate: useRef(new Animated.Value(0)).current,
    scale: useRef(new Animated.Value(0)).current,
  };
  const {translate, scale} = animatedValues;
  const count = useSelector(selectunreadCount);

  useEffect(() => {
    handleAnimated();
    setIsPressed(!!accessibilityState?.selected);
  }, [accessibilityState?.selected]);

  const handleAnimated = () => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue: accessibilityState?.selected ? 1 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: accessibilityState?.selected ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const translateStyles = {
    transform: [
      {
        translateY: translate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const scaleStyles = {
    opacity: scale.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0.5, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        scale: scale,
      },
    ],
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: color.backgroundHomeTab}]}>
      <Animated.View
        style={[
          styles.button,
          translateStyles,
          {
            borderColor: color.TaButtonText,
          },
        ]}>
        <Animated.View
          style={[
            styles.animated,
            scaleStyles,
            {
              backgroundColor: isPressed
                ? color.backgroundTabChoose
                : 'transparent',
            },
          ]}
        />
        <Material
          name={item.icon}
          color={isPressed ? color.iconChoose : color.icon}
          size={30}
        />
        {item.id === 'Notification' && count > 0 && (
          <View style={styles.notificationContainer}>
            <Animated.Text style={styles.notificationText}>
              {count}
            </Animated.Text>
          </View>
        )}
      </Animated.View>

      <Animated.Text
        style={[styles.title, {opacity: scale, color: color.TaButtonText}]}>
        {translation(item.title)}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default TabButton;
