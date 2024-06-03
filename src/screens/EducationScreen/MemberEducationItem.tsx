import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from 'src/constants';
import CircularProgress from './CircularProgress';
import Img from 'src/assets/images/default_ava.png';
import Img2 from 'src/assets/images/default_ava2.png';
import {Education} from 'src/interface/education/education';
const MemberEducationItem = ({
  data,
  onPress,
}: {
  data: Education;
  onPress: () => void;
}) => {
  const getColor = (progress: number) => {
    if (progress < 30) return '#EA5E68';
    if (progress == 100) return '#27AB6D';
    return '#56409e';
  };

  return (
    <TouchableOpacity className=" h-auto  mt-4  " onPress={onPress}>
      <View className="flex-row items-center bg-white p-4">
        <View
          className="  w-2 h-full absolute"
          style={{backgroundColor: getColor(50)}}></View>
        <Image
          source={Img}
          width={50}
          height={50}
          className="w-16 h-16 mr-4  "
        />
        <View className="flex-1">
          <Text
            className="font-semibold text-lg"
            style={{color: COLORS.primary}}>
            {data.firstname} {data.lastname}
          </Text>
          <Text className="text-base text-gray-500">{data.progress_notes}</Text>
        </View>
        <View className="flex-row items-center  ">
          <CircularProgress
            size={60}
            progress={50}
            strokeWidth={5}
            backgroundColor="#e0e0e0"
            progressColor={getColor(50)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MemberEducationItem;
