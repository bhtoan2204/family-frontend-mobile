import {Dimensions} from 'react-native';

export const getHeight = (size: number) => {
  const {height} = Dimensions.get('window');
  return height * size;
};
export const getWidth = (size: number) => {
  const {width} = Dimensions.get('window');
  return width * size;
};
