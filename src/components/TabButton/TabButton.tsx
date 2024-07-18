import { MouseEvent, useEffect, useRef } from 'react';
import {
  AccessibilityState,
  Animated,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { COLORS } from 'src/constants';
import { useSelector } from 'react-redux';
import { getTranslate } from 'src/redux/slices/languageSlice';

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

const TabButton = ({ item, accessibilityState, onPress }: TabButtonProps) => {
  const translation = useSelector(getTranslate);

  const animatedValues = {
    translate: useRef(new Animated.Value(0)).current,
    scale: useRef(new Animated.Value(0)).current,
  };

  const { translate, scale } = animatedValues;

  useEffect(() => {
    handleAnimated();
  }, [accessibilityState!.selected]);

  const handleAnimated = () => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue: accessibilityState!.selected ? 1 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: accessibilityState!.selected ? 1 : 0,
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
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Animated.View style={[styles.button, translateStyles]}>
        <Animated.View style={[styles.animated, scaleStyles]} />
        <Material
          name={item.icon}
          color={accessibilityState!.selected ? COLORS.white : '#2a475e'}
          size={30}
        />
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: scale }]}>
        {translation(item.title)}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default TabButton;
