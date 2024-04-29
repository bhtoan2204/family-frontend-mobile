import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import styles from './styles';

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  filled?: boolean;
  style?: object;
  color?: string;
  outlinedColor?: string;
};

const ConfirmButton = (props: ButtonProps) => {
  const filledBackgroundColor = props.color ?? COLORS.primary;
  const outlinedBackgroundColor = props.outlinedColor ?? COLORS.white;
  const backgroundColor = props.filled
    ? filledBackgroundColor
    : outlinedBackgroundColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
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

export default ConfirmButton;
