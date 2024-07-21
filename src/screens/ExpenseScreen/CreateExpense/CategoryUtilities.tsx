import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import { UtilitiesType } from 'src/interface/income/getIncome';
import { IncomeServices } from 'src/services/apiclient';



const CategoryUtilities =({widthOfYourPage, utilitiesSelect, handleUtilitieTypePress, scrollX}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [utilities, setUtilities] = useState<UtilitiesType[]>([])
    const scrollViewRef = useRef(null);

    const urlCatetory = 'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg';

    const fetchCategoryUtilities = async () => {
        try{
            const data = await IncomeServices.getUtilityTypes();
            setUtilities(data);
        }
        catch (error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchCategoryUtilities();
    },[])
    return(
    <View style={styles.ContainerCategory}>
        <View style={styles.selectedItemContainer}>
          <Image source={{ uri: urlCatetory }} style={styles.avatar} />
          <Text
            style={[
              styles.inputAmount,
              { textAlign: 'left' },
              { fontSize: 18 },
              { color: '#1b2838' },
            ]}
          >
            {utilitiesSelect?.name_vn || 'Select category'}
          </Text>
  
     
        </View>
        <View
          style={{ height: 1, backgroundColor: '#F4F4F4', bottom: 5 }}
        />

  
          <>
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                  listener: (
                    event: NativeSyntheticEvent<NativeScrollEvent>
                  ) => {
                    const pageIndex = Math.round(
                      event.nativeEvent.contentOffset.x /
                        widthOfYourPage,
                    );
                    setCurrentPage(pageIndex);
                  },
                },
              )}
            >
              <FlatList
                data={utilities}
                numColumns={7}
                keyExtractor={item => item.id_utilities_type.toString()}
                contentContainerStyle={{ marginLeft: 10 }}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleUtilitieTypePress(item)}
                  >
                    <View
                      style={[
                        styles.categoryContainer,
                        { width: 125, height: 80 },
                      ]}
                    >
                      <Image
                        source={{ uri: urlCatetory }}
                        style={styles.avatar}
                      />
                      <Text
                        style={styles.expenseItem}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name_en}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </Animated.ScrollView>
     
          </>
        
      </View>
    );
}

export default CategoryUtilities;
