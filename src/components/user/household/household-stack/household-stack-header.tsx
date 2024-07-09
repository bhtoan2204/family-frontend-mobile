import React from 'react';
import {HouseHoldItemDetailInterface} from 'src/interface/household/household_item_detail';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuOptionsCustomStyle,
} from 'react-native-popup-menu';
import {COLORS} from 'src/constants';
import {iOSColors, iOSGrayColors} from 'src/constants/ios-color';
import {BlurView} from 'expo-blur';
import ImageComponent from 'src/components/Image/Image';
import FamilyImage from 'src/assets/images/household_assets/add_room.png';
import {gradients_list} from 'src/assets/images/gradients';

interface HouseHoldStackHeaderProps {
  imageUrl?: string;
  idFamily: number;
  handleEditImage?: () => void;
  handleEditTitle?: () => void;
  handleDeleteItem?: () => void;
  navigationBack?: () => void;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Divider = () => {
  return (
    <View
      style={{borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3}}
    />
  );
};

const HouseHoldStackHeader = ({
  imageUrl,
  idFamily,
  handleEditImage,
  handleEditTitle,
  handleDeleteItem,
  navigationBack,
}: HouseHoldStackHeaderProps) => {
  return (
    <>
      <ImageBackground
        source={
          imageUrl
            ? {uri: imageUrl}
            : gradients_list[idFamily % gradients_list.length]
        }
        style={{width: screenWidth, height: screenHeight * 0.25}}>
        <View className="w-full absolute z-10 flex-row justify-between items-center py-3">
          <BlurView
            intensity={35}
            tint="dark"
            className=" ml-1 rounded-lg overflow-hidden">
            <TouchableOpacity
              onPress={navigationBack}
              className=" flex-row items-center">
              <Material
                name="chevron-left"
                size={30}
                style={{color: 'white', fontWeight: 'bold'}}
              />
              {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AliceBlue }}>Back</Text> */}
            </TouchableOpacity>
          </BlurView>

          <BlurView
            intensity={35}
            tint="dark"
            className="px-3 overflow-hidden rounded-lg ">
            <View>
              <Text className="text-lg font-semibold text-white">
                HouseHold
              </Text>
            </View>
          </BlurView>

          <BlurView
            intensity={35}
            tint="dark"
            className="flex-row items-center  mr-1 rounded-lg overflow-hidden">
            <Menu>
              <MenuTrigger>
                <View className="">
                  <Material
                    name="dots-horizontal"
                    size={29}
                    style={{color: 'white', fontWeight: 'bold'}}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyles}>
                <MenuOption
                  onSelect={() => {
                    // handleIsAddingStep()
                    // handleEditImage()
                  }}>
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-base"
                      style={{color: iOSGrayColors.systemGray.defaultLight}}>
                      Edit Image
                    </Text>
                    <Material
                      name="pencil"
                      size={20}
                      style={{
                        color: iOSGrayColors.systemGray.defaultLight,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                </MenuOption>
                <Divider />
                <MenuOption
                  onSelect={() => {
                    // setIsEditing(true)
                  }}>
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-base"
                      style={{color: iOSGrayColors.systemGray.defaultLight}}>
                      Edit title
                    </Text>
                    <Material
                      name="pencil"
                      size={20}
                      style={{
                        color: iOSGrayColors.systemGray.defaultLight,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                </MenuOption>

                <Divider />
                <MenuOption onSelect={async () => {}}>
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-base "
                      style={{color: iOSColors.systemRed.defaultLight}}>
                      Delete
                    </Text>
                    <Material
                      name="trash-can-outline"
                      size={20}
                      style={{
                        color: iOSColors.systemRed.defaultLight,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                </MenuOption>
                <Divider />
              </MenuOptions>
            </Menu>
          </BlurView>
        </View>
      </ImageBackground>
    </>
  );
};

const optionsStyles: MenuOptionsCustomStyle = {
  optionsContainer: {
    borderRadius: 10,
    marginTop: screenHeight * 0.04,
    // backgroundColor: 'white',
    // opacity: 0.9,
  },
  optionWrapper: {
    padding: 10,
  },
};

export default HouseHoldStackHeader;
