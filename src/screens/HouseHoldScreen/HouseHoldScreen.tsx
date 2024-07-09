import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image } from 'react-native'
import { HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';

// import AccordionItem from 'src/components/AccordionItem/accordion-item';

import RoomComponent from 'src/components/user/household/room/room-component';



const HouseHoldScreen: React.FC<HouseHoldScreenProps> = ({ navigation, route, addRoomRef }) => {
  const { id_family } = route.params
  const refRBSheet = React.useRef<any>(null);

  const roomItems = useSelector((state: RootState) => state.room)
  const [choosenCategoryIndex, setChoosenCategoryIndex] = React.useState<number>(0)
  const [searchText, setSearchText] = React.useState<string>('')
  const [choosenTab, setChoosenTab] = React.useState<number>(0)
  const dispatch = useDispatch<AppDispatch>()



  if (!roomItems) {
    return <ActivityIndicator size="large" color={COLORS.AuroMetalSaurus} />
  }

  return (
    <RoomComponent
      data={
        roomItems
      }
      handleNavigateRoomDetail={(id_room: number) => {
        navigation.navigate('RoomDetail', {
          id_room: id_room,
          id_family: id_family
        })
      }}
      addRoomSheetRef={addRoomRef!}
    />
  )
}


export default HouseHoldScreen