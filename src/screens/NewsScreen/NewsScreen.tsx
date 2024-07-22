import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {COLORS} from 'src/constants';
import {NewsScreenProps} from 'src/navigation/NavigationTypes';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {news_category, categoryColors} from './data';
import ImageComponent from 'src/components/Image/Image';
import NewsImage from 'src/assets/images/news.png';
import NewsService from 'src/services/apiclient/NewsService';
import { Linking } from 'react-native';
import { Article, ArticleCategory } from 'src/interface/news/news';


const NewsScreen: React.FC<NewsScreenProps> = ({navigation, route}) => {
  const [newsCategory, setNewsCategory] = React.useState<ArticleCategory[]>([]);
  const [newsItem, setNewsItem] = React.useState<Article[] | null>(null);
  const [choosenCategoryIndex, setChoosenCategoryIndex] =React.useState<number>(0);
  const [choosenNewsCategory, setChoosenNewsCategory] = React.useState<number>(news_category[0].id,);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const categoryRefScroll = useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const ITEMS_PER_PAGE = 10;
  const [totalItems, setTotalItems] = React.useState<number>(0);

  useEffect(()=>{
    const fetchCategoryNews = async () => {
      try {
       
        const data = await NewsService.categories();
        setRefreshing(false);
        setNewsCategory(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchCategoryNews();

  },[])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    

    const fetchNews = async () => {
      const type = news_category[choosenCategoryIndex].id;
      try {
         setLoading(true)
        setNewsItem(null);
        const data = await NewsService.getNewsByCategory(type, currentPage, ITEMS_PER_PAGE);
        setRefreshing(false);
        setNewsItem(data.data);
        setTotalItems(data.count); 

      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const buildDateDiff = (pubDate: string) => {
    const today = new Date();
    const publishedDate = new Date(pubDate);

    const diffTime = Math.abs((today as any) - (publishedDate as any));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.ceil(diffDays / 7);
    const diffMonths = Math.ceil(diffDays / 30);
    const diffYears = Math.ceil(diffDays / 365);

    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffWeeks === 1) {
      return '1 week ago';
    } else if (diffWeeks < 4) {
      return `${diffWeeks} weeks ago`;
    } else if (diffMonths === 1) {
      return '1 month ago';
    } else if (diffMonths < 12) {
      return `${diffMonths} months ago`;
    } else if (diffYears === 1) {
      return '1 year ago';
    } else {
      return `${diffYears} years ago`;
    }
  };

  const buildReadTime = (length: number) => {
    const wordsPerMinute = 200;
    const minutes = length / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return readTime + ' minutes of reading';
  };

  React.useEffect(() => {
    const fetchNews = async () => {
      const type = news_category[choosenCategoryIndex].id;

      try {
        setLoading(true);
        setNewsItem(null);
        const data = await NewsService.getNewsByCategory(type, currentPage, ITEMS_PER_PAGE);
        setNewsItem(data.data);
        setTotalItems(data.count); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };
  
    fetchNews();
  }, [choosenCategoryIndex, currentPage, newsCategory]);
  
  
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  
  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  
  const showCategoryItems = () => {
    const categoryItems = newsItem || []; 
    
    if (categoryItems.length === 0) {
      return (
        <View className="flex-1 flex-col mt-1/2 justify-center items-center">
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      // const itemsToShow = categoryItems.slice(startIndex, endIndex);
  
      // itemsToShow.forEach((item, index) => {
      //   item.category = {
      //     id: choosenNewsCategory,
      //     category_name: news_category[choosenCategoryIndex].category_name,
      //     title: news_category[choosenCategoryIndex].title,
      //   };
      // });
  
    return (
      <View className="mt-2">
        {categoryItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="mx-4 my-4 shadow-b shadow-sm bg-white  rounded-md"
            onPress={() => Linking.openURL(item.link)}>
            <View className="flex-row py-2 px-2">
              <ImageComponent
                imageUrl={item.enclosure?.url || ''}
                style={{width: 110, height: 130}}
                defaultImage={NewsImage}
                className="rounded-md "
              />
              <View className="ml-4 flex-1  ">
                <Text className="text-[#A2ABBD] mb-2 " numberOfLines={1}>
                  {buildReadTime(parseInt(item.enclosure?.length || '0'))} -{' '}
                  {buildDateDiff(item.pubDate)}
                </Text>
                <Text
                  className="text-base font-medium flex-1 "
                  numberOfLines={2}>
                  {item.title}
                </Text>
                <View className="flex-row align-top rounded-lg   ">
                  <View
                    className="p-3 "
                    style={{
                      backgroundColor:
                        categoryColors[choosenCategoryIndex].backgroundColor,
                    }}>
                    <Text
                      className="font-semibold"
                      style={{
                        color: categoryColors[choosenCategoryIndex].textColor,
                      }}>
                      {item.category && item.category.name && (
                        <Text>{capitalizeFirstLetter(item.category.name)}</Text>
                      )}

                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  };
  const renderPagination = () => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <TouchableOpacity
          onPress={handlePrevPage}
          disabled={currentPage === 1}
          style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: currentPage === 1 ? COLORS.gray : COLORS.primary }}>Prev</Text>
        </TouchableOpacity>
        <Text>{currentPage} / {totalPages}</Text>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: currentPage === totalPages ? COLORS.gray : COLORS.primary }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View className="flex-1 bg-white">
        <View className="w-full  flex-row justify-between items-center py-3 bg-white">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" flex-row items-center">
            <Material
              name="chevron-left"
              size={30}
              style={{color: COLORS.primary, fontWeight: 'bold'}}
            />
            <Text
              className="text-lg font-semibold text-gray-600"
              style={{color: COLORS.primary}}>
              Back
            </Text>
          </TouchableOpacity>
          <View className="mr-3">
            <TouchableOpacity onPress={() => {}}>
              {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
              {/* <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Add</Text> */}
            </TouchableOpacity>
          </View>
        </View>
        <View>
        {newsCategory.length > 0 && (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    ref={categoryRefScroll}
    className="">
    {newsCategory.map((category, index) => (
      <TouchableOpacity
        key={category.id_article_category}
        onPress={() => {
          setChoosenCategoryIndex(index);
          setChoosenNewsCategory(category.id_article_category);
          if (categoryRefScroll.current) {
            categoryRefScroll.current.scrollTo({
              x: index * 70,
              animated: true,
            });
          }
          setCurrentPage(1);
        }}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomColor: COLORS.primary,
        }}
        className={`${choosenCategoryIndex === index ? 'border-b-2 border-[#56409e]' : ''}`}>
        <Text
          style={
            choosenCategoryIndex == index
              ? {fontSize: 16, fontWeight: '600', color: COLORS.primary}
              : {fontSize: 16, fontWeight: '600', color: COLORS.gray}
          }>
          {capitalizeFirstLetter(category.name)}

        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
)}

        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ flex: 1 }}>
          <View>{showCategoryItems()}</View>
          {renderPagination()}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
