import React from 'react';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
  View,
} from 'react-native';
import {COLORS} from 'src/constants';
import styles from './styles';

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  filled?: boolean;
  style?: object;
  color?: string;
  outlinedColor?: string;
  className?: string;
  backgroundImage?: any;
};

const CustomButton = (props: ButtonProps) => {
  const filledBackgroundColor = props.color ?? '#2A475E';
  const outlinedBackgroundColor = props.outlinedColor ?? '#2A475E';
  const backgroundColor = props.filled
    ? filledBackgroundColor
    : outlinedBackgroundColor;
  const textColor = props.filled ? COLORS.white : '#2A475E';
  const absoluteFillObject: ViewStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  return (
    <TouchableOpacity
      className={props.className}
      style={{
        ...styles.touchable,
        ...props.style,
        overflow: 'hidden', // Add this line
      }}
      onPress={props.onPress}>
      <View
        style={{
          ...absoluteFillObject,
          overflow: 'hidden',
          borderRadius: styles.touchable.borderRadius,
        }}>
        <ImageBackground
          source={props.backgroundImage}
          style={absoluteFillObject}>
          <Text
            style={{
              fontSize: 18,
              color: textColor,
              fontWeight: 'bold',
              textAlign: 'center',
              top: 15,
            }}>
            {props.title}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
