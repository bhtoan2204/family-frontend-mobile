import React, { useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import { COLORS } from 'src/constants'
import { NewsScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { news_category, categoryColors } from './data';
import { NewsCategoryInterface, NewsInterface } from 'src/interface/news/news';
import ImageComponent from 'src/components/Image/Image';
import NewsImage from 'src/assets/images/news.png';
import NewsService from 'src/services/apiclient/NewsService';
const news_data = {
    "items": [
        {
            "title": "Nga tuyên bố kiểm soát thêm hai làng tại Ukraine",
            "link": "https://vnexpress.net/nga-tuyen-bo-kiem-soat-them-hai-lang-tai-ukraine-4742747.html",
            "pubDate": "Mon, 06 May 2024 19:08:14 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-vnexpress.vnecdn.net/2024/05/06/123456-1714995244-2749-1714995308.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=Q8fz_7-bPqr6jk84X-tGYg"
            },
            "content": "<a href=\"https://vnexpress.net/nga-tuyen-bo-kiem-soat-them-hai-lang-tai-ukraine-4742747.html\"><img src=\"https://vcdn1-vnexpress.vnecdn.net/2024/05/06/123456-1714995244-2749-1714995308.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=Q8fz_7-bPqr6jk84X-tGYg\"></a></br>Bộ Quốc phòng Nga thông báo lực lượng nước này đã chiếm được hai làng ở tỉnh Donetsk và Kharkov, đánh dấu bước tiến mới trên chiến trường.",
            "contentSnippet": "Bộ Quốc phòng Nga thông báo lực lượng nước này đã chiếm được hai làng ở tỉnh Donetsk và Kharkov, đánh dấu bước tiến mới trên chiến trường.",
            "guid": "https://vnexpress.net/nga-tuyen-bo-kiem-soat-them-hai-lang-tai-ukraine-4742747.html",
            "isoDate": "2024-05-06T12:08:14.000Z"
        },
        {
            "title": "Gan cháy tỏi",
            "link": "https://vnexpress.net/gan-chay-toi-4742705.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-giadinh.vnecdn.net/2024/05/06/Thnhphm11-1714988417-5899-1714988422.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=7K8JPdgA20tzGJKi1InqYw"
            },
            "content": "<a href=\"https://vnexpress.net/gan-chay-toi-4742705.html\"><img src=\"https://vcdn1-giadinh.vnecdn.net/2024/05/06/Thnhphm11-1714988417-5899-1714988422.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=7K8JPdgA20tzGJKi1InqYw\"></a></br>Chỉ với 15.000 đồng bạn đã có đĩa gan cháy tỏi giòn thơm, vị đậm đà. Món này nhâm nhi cùng bạn bè khá hợp.",
            "contentSnippet": "Chỉ với 15.000 đồng bạn đã có đĩa gan cháy tỏi giòn thơm, vị đậm đà. Món này nhâm nhi cùng bạn bè khá hợp.",
            "guid": "https://vnexpress.net/gan-chay-toi-4742705.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        },
        {
            "title": "Cú trượt dài sau quyết định nghỉ hưu sớm khi lương 300 triệu",
            "link": "https://vnexpress.net/cu-truot-dai-sau-quyet-dinh-nghi-huu-som-khi-luong-300-trieu-4742692.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-vnexpress.vnecdn.net/2024/05/06/Cangthangvakietsucbovieccophai-2474-3821-1714987229.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=XqH2T-ind28IncELOCNLgw"
            },
            "content": "<a href=\"https://vnexpress.net/cu-truot-dai-sau-quyet-dinh-nghi-huu-som-khi-luong-300-trieu-4742692.html\"><img src=\"https://vcdn1-vnexpress.vnecdn.net/2024/05/06/Cangthangvakietsucbovieccophai-2474-3821-1714987229.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=XqH2T-ind28IncELOCNLgw\"></a></br>'Gap year', nghỉ hưu sớm để chữa lành, nhưng cả tôi và anh đồng nghiệp đều nhận những kết cục ê chề, 'lành' đâu không thấy, chỉ càng chua cay.",
            "contentSnippet": "'Gap year', nghỉ hưu sớm để chữa lành, nhưng cả tôi và anh đồng nghiệp đều nhận những kết cục ê chề, 'lành' đâu không thấy, chỉ càng chua cay.",
            "guid": "https://vnexpress.net/cu-truot-dai-sau-quyet-dinh-nghi-huu-som-khi-luong-300-trieu-4742692.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        },
        {
            "title": "'Đàn ông để vợ nuôi là không ổn'",
            "link": "https://vnexpress.net/dan-ong-de-vo-nuoi-la-khong-on-4742676.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-vnexpress.vnecdn.net/2024/05/06/DALLE20240506162659Awideformat-4359-8688-1714989122.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=dIUZPx1kpq3c-O4ZB8_pmw"
            },
            "content": "<a href=\"https://vnexpress.net/dan-ong-de-vo-nuoi-la-khong-on-4742676.html\"><img src=\"https://vcdn1-vnexpress.vnecdn.net/2024/05/06/DALLE20240506162659Awideformat-4359-8688-1714989122.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=dIUZPx1kpq3c-O4ZB8_pmw\"></a></br>\"Tôi định ở nhà chăm con đỡ tiền gửi trẻ nhưng cảm nhận không khí gia đình ngột ngạt nên kiếm việc gấp, dù phải xa nhà xa con\".",
            "contentSnippet": "\"Tôi định ở nhà chăm con đỡ tiền gửi trẻ nhưng cảm nhận không khí gia đình ngột ngạt nên kiếm việc gấp, dù phải xa nhà xa con\".",
            "guid": "https://vnexpress.net/dan-ong-de-vo-nuoi-la-khong-on-4742676.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        },
        {
            "title": "Trận hạn hán 100 năm xóa sổ thành phố Maya hùng mạnh nhất",
            "link": "https://vnexpress.net/tran-han-han-100-nam-xoa-so-thanh-pho-maya-hung-manh-nhat-4742642.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-vnexpress.vnecdn.net/2024/05/06/VNE-Maya.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=xMjk9lmIKZ8qnzniWc8fQQ"
            },
            "content": "<a href=\"https://vnexpress.net/tran-han-han-100-nam-xoa-so-thanh-pho-maya-hung-manh-nhat-4742642.html\"><img src=\"https://vcdn1-vnexpress.vnecdn.net/2024/05/06/VNE-Maya.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=xMjk9lmIKZ8qnzniWc8fQQ\"></a></br>Trận hạn hán năm 1020 biến thành phố Chichen Itza với 50.000 người suy tàn bất chấp những lợi thế tự nhiên và sự khéo léo của cư dân.",
            "contentSnippet": "Trận hạn hán năm 1020 biến thành phố Chichen Itza với 50.000 người suy tàn bất chấp những lợi thế tự nhiên và sự khéo léo của cư dân.",
            "guid": "https://vnexpress.net/tran-han-han-100-nam-xoa-so-thanh-pho-maya-hung-manh-nhat-4742642.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        },
        {
            "title": "Chồng giật bắn người khi thấy mặt vợ",
            "link": "https://vnexpress.net/chong-giat-ban-nguoi-khi-thay-mat-vo-4742559.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-vnexpress.vnecdn.net/2024/05/06/ezgif3a4f5531ce9-1714970725-6084-1714970760.gif?w=1200&h=0&q=100&dpr=1&fit=crop&s=nVbebU8lD5OqvEIu-w12Lg&t=image"
            },
            "content": "<a href=\"https://vnexpress.net/chong-giat-ban-nguoi-khi-thay-mat-vo-4742559.html\"><img src=\"https://vcdn1-vnexpress.vnecdn.net/2024/05/06/ezgif3a4f5531ce9-1714970725-6084-1714970760.gif?w=1200&h=0&q=100&dpr=1&fit=crop&s=nVbebU8lD5OqvEIu-w12Lg&t=image\"></a></br>Ma vẫn không đáng sợ bằng vợ.",
            "contentSnippet": "Ma vẫn không đáng sợ bằng vợ.",
            "guid": "https://vnexpress.net/chong-giat-ban-nguoi-khi-thay-mat-vo-4742559.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        },
        {
            "title": "Em hiền lành, chung thủy, yêu động vật",
            "link": "https://vnexpress.net/em-hien-lanh-chung-thuy-yeu-dong-vat-4742438.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "content": "Em tha thiết mong gặp anh, người đàn ông chung thủy, chân thành, biết trân quý gia đình mình.",
            "contentSnippet": "Em tha thiết mong gặp anh, người đàn ông chung thủy, chân thành, biết trân quý gia đình mình.",
            "guid": "https://vnexpress.net/em-hien-lanh-chung-thuy-yeu-dong-vat-4742438.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        },
        {
            "title": "Thách thức với ông Tập trong chuyến thăm châu Âu đầu tiên sau 5 năm",
            "link": "https://vnexpress.net/thach-thuc-voi-ong-tap-trong-chuyen-tham-chau-au-dau-tien-sau-5-nam-4742381.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-vnexpress.vnecdn.net/2024/05/06/2024-05-05t023350z-1897465466-7664-7194-1714987816.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=YURGXdJnl-zCSO28zYJ5qQ"
            },
            "content": "<a href=\"https://vnexpress.net/thach-thuc-voi-ong-tap-trong-chuyen-tham-chau-au-dau-tien-sau-5-nam-4742381.html\"><img src=\"https://vcdn1-vnexpress.vnecdn.net/2024/05/06/2024-05-05t023350z-1897465466-7664-7194-1714987816.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=YURGXdJnl-zCSO28zYJ5qQ\"></a></br>Khác với bầu không khí nồng nhiệt khi ông Tập công du các nước EU 5 năm trước, chuyến thăm lần này có thể đối mặt nhiều khó khăn, chỉ trích.",
            "contentSnippet": "Khác với bầu không khí nồng nhiệt khi ông Tập công du các nước EU 5 năm trước, chuyến thăm lần này có thể đối mặt nhiều khó khăn, chỉ trích.",
            "guid": "https://vnexpress.net/thach-thuc-voi-ong-tap-trong-chuyen-tham-chau-au-dau-tien-sau-5-nam-4742381.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        },
        {
            "title": "Apple sẽ ra mắt gì tại sự kiện Let Loose?",
            "link": "https://vnexpress.net/apple-se-ra-mat-gi-tai-su-kien-let-loose-4742246.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-sohoa.vnecdn.net/2024/05/06/screenshot20240423at21269-1714-2801-3961-1714990038.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=CqmGAuufbH5Pzf7ES8ZcpA"
            },
            "content": "<a href=\"https://vnexpress.net/apple-se-ra-mat-gi-tai-su-kien-let-loose-4742246.html\"><img src=\"https://vcdn1-sohoa.vnecdn.net/2024/05/06/screenshot20240423at21269-1714-2801-3961-1714990038.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=CqmGAuufbH5Pzf7ES8ZcpA\"></a></br>Let Loose, diễn ra ngày 7/5 tại Anh, là sự kiện đầu tiên trong năm của Apple và cũng đánh dấu lần đầu hãng tổ chức lễ ra mắt sản phẩm toàn cầu bên ngoài Mỹ.",
            "contentSnippet": "Let Loose, diễn ra ngày 7/5 tại Anh, là sự kiện đầu tiên trong năm của Apple và cũng đánh dấu lần đầu hãng tổ chức lễ ra mắt sản phẩm toàn cầu bên ngoài Mỹ.",
            "guid": "https://vnexpress.net/apple-se-ra-mat-gi-tai-su-kien-let-loose-4742246.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        },
        {
            "title": "Cần bao nhiêu trứng để thụ tinh ống nghiệm?",
            "link": "https://vnexpress.net/can-bao-nhieu-trung-de-thu-tinh-ong-nghiem-4742732.html",
            "pubDate": "Mon, 06 May 2024 19:00:00 +0700",
            "enclosure": {
                "type": "image/jpeg",
                "length": "1200",
                "url": "https://vcdn1-suckhoe.vnecdn.net/2024/05/06/dsc00514-1-1714991023-17149910-8728-2207-1714991082.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=69qKadG6F23PpJ6SzdoK7w"
            },
            "content": "<a href=\"https://vnexpress.net/can-bao-nhieu-trung-de-thu-tinh-ong-nghiem-4742732.html\"><img src=\"https://vcdn1-suckhoe.vnecdn.net/2024/05/06/dsc00514-1-1714991023-17149910-8728-2207-1714991082.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=69qKadG6F23PpJ6SzdoK7w\"></a></br>Tôi 37 tuổi, dự trữ buồng trứng (AMH) thấp, còn 0.7 ng/ml, siêu âm đầu chu kỳ kinh nguyệt chỉ có ba trứng. Bác sĩ chỉ định phác đồ gom trứng tích lũy nhiều chu kỳ để có nhiều trứng hơn.",
            "contentSnippet": "Tôi 37 tuổi, dự trữ buồng trứng (AMH) thấp, còn 0.7 ng/ml, siêu âm đầu chu kỳ kinh nguyệt chỉ có ba trứng. Bác sĩ chỉ định phác đồ gom trứng tích lũy nhiều chu kỳ để có nhiều trứng hơn.",
            "guid": "https://vnexpress.net/can-bao-nhieu-trung-de-thu-tinh-ong-nghiem-4742732.html",
            "isoDate": "2024-05-06T12:00:00.000Z"
        }
    ],
    "totalItems": 48
}



const NewsScreen: React.FC<NewsScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    const [newsCategory, setNewsCategory] = React.useState<NewsCategoryInterface[]>(news_category)
    const [newsItem, setNewsItem] = React.useState<NewsInterface[] | null>(null)
    const [choosenCategoryIndex, setChoosenCategoryIndex] = React.useState<number>(0)
    const [choosenNewsCategory, setChoosenNewsCategory] = React.useState<number>(news_category[0].id)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [refreshing, setRefreshing] = React.useState<boolean>(false)
    const categoryRefScroll = useRef<any>(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        const fetchNews = async () => {
            const type = news_category[choosenCategoryIndex].category_name
            try {
                // setLoading(true)
                setNewsItem(null)
                const data = await NewsService.getNewsByCategory(type, null, null)
                setRefreshing(false)
                setNewsItem(data)
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }
        fetchNews()
    }, []);

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

    }

    const buildReadTime = (length: number) => {
        const wordsPerMinute = 200;
        const minutes = length / wordsPerMinute;
        const readTime = Math.ceil(minutes);
        return readTime + ' minutes of reading'
    }

    React.useEffect(() => {
        const fetchNews = async () => {
            const type = news_category[choosenCategoryIndex].category_name
            try {
                // setLoading(true)
                setNewsItem(null)
                const data = await NewsService.getNewsByCategory(type, null, null)
                setNewsItem(data)
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }
        fetchNews()

    }, [choosenCategoryIndex])

    const showCategoryItems = () => {
        const categoryItems = newsItem;
        if (categoryItems === null) return (
            <View className='flex-1 flex-col mt-1/2 justify-center items-center'>
                <ActivityIndicator size="small" />
            </View>
        )
        else {
            categoryItems.forEach((item, index) => {
                item.category = {
                    id: choosenNewsCategory,
                    category_name: news_category[choosenCategoryIndex].category_name,
                    title: news_category[choosenCategoryIndex].title
                }
            })
        }
        return <View className='mt-2'>
            {
                categoryItems.map((item, index) => (
                    <TouchableOpacity key={index} className='mx-4 my-4 shadow-b shadow-sm bg-white  rounded-md'>
                        <View className='flex-row py-2 px-2'>
                            <ImageComponent imageUrl={item.enclosure?.url || ""} style={{ width: 110, height: 130 }} defaultImage={NewsImage} className='rounded-md ' />
                            <View className='ml-4 flex-1  '>
                                <Text className='text-[#A2ABBD] mb-2 ' numberOfLines={1} >{buildReadTime(parseInt(item.enclosure?.length || "0"))} - {buildDateDiff(item.pubDate)}</Text>
                                <Text className='text-base font-medium flex-1 ' numberOfLines={2}>{item.title}</Text>
                                <View className='flex-row align-top rounded-lg   '>
                                    <View className='p-3 ' style={{ backgroundColor: categoryColors[choosenCategoryIndex].backgroundColor }}>
                                        <Text className='font-semibold' style={{ color: categoryColors[choosenCategoryIndex].textColor }}>{item.category!.title}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    }

    return (
        <View className="flex-1 bg-white">
            <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View className='mr-3'>
                    <TouchableOpacity onPress={() => {

                    }} >
                        {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                        {/* <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Add</Text> */}
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={categoryRefScroll} className=''>
                    {newsCategory.map((category, index) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => {
                                setChoosenCategoryIndex(index)
                                setChoosenNewsCategory(category.id)
                                if (categoryRefScroll.current) {
                                    categoryRefScroll.current.scrollTo({
                                        x: index * 70,
                                        animated: true,
                                    });
                                }
                            }}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderBottomColor: COLORS.primary }}
                            className={`${choosenCategoryIndex === index ? 'border-b-2 border-[#56409e]' : ''}`}
                        >
                            <Text style={choosenCategoryIndex == index ? { fontSize: 16, fontWeight: '600', color: COLORS.primary } : {
                                fontSize: 16, fontWeight: '600', color: COLORS.gray
                            }}>{category.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
            } style={{ flex: 1 }}>
                <View >
                    {showCategoryItems()}
                </View>
            </ScrollView>

        </View>
    )
}

export default NewsScreen