import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
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
};

const CustomButton = (props: ButtonProps) => {
  const filledBackgroundColor = props.color ?? '#2A475E';
  const outlinedBackgroundColor = props.outlinedColor ?? '#2A475E';
  const backgroundColor = props.filled
    ? filledBackgroundColor
    : outlinedBackgroundColor;
  const textColor = props.filled ? COLORS.white : '#2A475E';

  return (
    <TouchableOpacity
      className={props.className}
      style={{
        ...styles.touchable,
        backgroundColor: backgroundColor,
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text
        style={{
          fontSize: 18,
          color: textColor,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
