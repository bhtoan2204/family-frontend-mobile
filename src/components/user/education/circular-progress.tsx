import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';

const CircularProgress = ({ size, progress, strokeWidth, backgroundColor, progressColor, disableProgressText }: any) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressStrokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{ width: size, height: size }} >
            <Svg width={size} height={size}>

                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />

                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={progressColor}
                    strokeWidth={strokeWidth + 0.5}
                    strokeDasharray={circumference}
                    strokeDashoffset={progressStrokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    transform={`rotate(-90, ${size / 2}, ${size / 2})`} // Quay progress để bắt đầu từ 12 giờ
                />
                {
                    disableProgressText ?? <View className='h-full w-full flex-col justify-center items-center'>
                        <Text className='font-normal text-[#494848] dark:text-white' style={{
                        }}>{progress}%</Text>
                    </View>
                }

            </Svg>
        </View>
    );
};

export default CircularProgress;
