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
import {Linking} from 'react-native';
import {Article, ArticleCategory} from 'src/interface/news/news';
import {useSelector} from 'react-redux';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
import {ScreenWidth} from '@rneui/base';

const NewsScreen: React.FC<NewsScreenProps> = ({navigation, route}) => {
  const [newsCategory, setNewsCategory] = React.useState<ArticleCategory[]>([]);
  const [newsItem, setNewsItem] = React.useState<Article[] | null>(null);
  const [choosenCategoryIndex, setChoosenCategoryIndex] =
    React.useState<number>(0);
  const [choosenNewsCategory, setChoosenNewsCategory] = React.useState<number>(
    news_category[0].id,
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const categoryRefScroll = useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const ITEMS_PER_PAGE = 10;
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const isDarkMode = useSelector(getIsDarkMode);

  useEffect(() => {
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
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNews();
  }, [choosenCategoryIndex, currentPage]);

  const fetchNews = async () => {
    const type = news_category[choosenCategoryIndex].id;
    try {
      setLoading(true);
      setNewsItem(null);
      const data = await NewsService.getNewsByCategory(
        type,
        currentPage,
        ITEMS_PER_PAGE,
      );
      setNewsItem(data.data);
      setTotalItems(data.count);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [choosenCategoryIndex, currentPage]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const buildDateDiff = (pubDate: string) => {
    const today = new Date();
    const publishedDate = new Date(pubDate);

    const diffTime = Math.abs(today.getTime() - publishedDate.getTime());
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
    return `${readTime} minutes of reading`;
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleScrollPosition = (index: number) => {
    const categoryName = newsCategory[index].id_article_category;
    let calc = 0;
    for (let i = 0; i <= index; i++) {
      if (news_category[i].id === categoryName) {
        break;
      } else {
        calc += news_category[i].title.length * ScreenWidth * 0.02 + 40;
      }
    }
    return calc;
  };

  const renderTab = () => {
    if (newsCategory.length === 0) {
      return <View />;
    } else {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={categoryRefScroll}>
          {newsCategory.map((category, index) => (
            <TouchableOpacity
              key={category.id_article_category}
              onPress={() => {
                setChoosenCategoryIndex(index);
                setChoosenNewsCategory(category.id_article_category);
                if (categoryRefScroll.current) {
                  categoryRefScroll.current.scrollTo({
                    x: handleScrollPosition(index),
                    animated: true,
                  });
                }
                setCurrentPage(1);
              }}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomColor: isDarkMode ? 'white' : 'black',
                borderBottomWidth: choosenCategoryIndex === index ? 2 : 0,
              }}>
              <Text
                style={
                  choosenCategoryIndex == index
                    ? {
                        fontSize: 16,
                        fontWeight: '600',
                        color: isDarkMode ? 'white' : 'black',
                      }
                    : {fontSize: 16, fontWeight: '600', color: COLORS.gray}
                }>
                {capitalizeFirstLetter(category.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
  };

  const showCategoryItems = () => {
    const categoryItems = newsItem || [];

    if (categoryItems.length === 0) {
      return (
        <View className="flex-1 flex-col justify-center items-center">
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return (
        <View className="mt-2">
          {categoryItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="mx-4 my-4 shadow-b shadow-sm bg-white dark:bg-[#252D3B] rounded-md"
              onPress={() => Linking.openURL(item.link)}>
              <View className="flex-row py-2 px-2">
                <ImageComponent
                  imageUrl={item.enclosure?.url || ''}
                  style={{width: 110, height: 130}}
                  defaultImage={NewsImage}
                  className="rounded-md"
                />
                <View className="ml-4 flex-1">
                  <Text className="text-[#A2ABBD] mb-2" numberOfLines={1}>
                    {buildReadTime(parseInt(item.enclosure?.length || '0'))} -{' '}
                    {buildDateDiff(item.pubDate)}
                  </Text>
                  <Text
                    className="text-base font-medium flex-1 text-[#232A3D] dark:text-white"
                    numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View className="flex-row align-top rounded-lg">
                    <View
                      className="p-3"
                      style={{
                        backgroundColor: isDarkMode
                          ? categoryColors[choosenCategoryIndex]
                              .backgroundDarkColor
                          : categoryColors[choosenCategoryIndex]
                              .backgroundColor,
                      }}>
                      <Text
                        className="font-semibold"
                        style={{
                          color: isDarkMode
                            ? categoryColors[choosenCategoryIndex].textDarkColor
                            : categoryColors[choosenCategoryIndex].textColor,
                        }}>
                        {item.category && item.category.name && (
                          <Text>
                            {capitalizeFirstLetter(item.category.name)}
                          </Text>
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
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={handlePrevPage}
          disabled={currentPage === 1}
          style={{paddingHorizontal: 10}}>
          <Text style={{color: currentPage === 1 ? COLORS.gray : 'black'}}>
            Prev
          </Text>
        </TouchableOpacity>
        <Text>
          {currentPage} / {totalPages}
        </Text>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
          style={{paddingHorizontal: 10}}>
          <Text
            style={{color: currentPage === totalPages ? COLORS.gray : 'black'}}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#f7f7f7] dark:bg-[#0A1220]">
      <View className="w-full flex-row justify-between items-center py-3 bg-[#f7f7f7] dark:bg-[#0A1220] mt-7">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center">
          <Material
            name="chevron-left"
            size={30}
            style={{
              fontWeight: 'bold',
              color: isDarkMode ? 'white' : 'black',
            }}
          />
        </TouchableOpacity>
        <View className="mr-3">
          <TouchableOpacity onPress={() => {}}>
            {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
            {/* <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Add</Text> */}
          </TouchableOpacity>
        </View>
      </View>
      <View>{renderTab()}</View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{flex: 1}}>
        <View>{showCategoryItems()}</View>
        {renderPagination()}
      </ScrollView>
    </View>
  );
};

export default NewsScreen;
