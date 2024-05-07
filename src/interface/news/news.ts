const data = {
  title: 'Cần bao nhiêu trứng để thụ tinh ống nghiệm?',
  link: 'https://vnexpress.net/can-bao-nhieu-trung-de-thu-tinh-ong-nghiem-4742732.html',
  pubDate: 'Mon, 06 May 2024 19:00:00 +0700',
  enclosure: {
    type: 'image/jpeg',
    length: '1200',
    url: 'https://vcdn1-suckhoe.vnecdn.net/2024/05/06/dsc00514-1-1714991023-17149910-8728-2207-1714991082.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=69qKadG6F23PpJ6SzdoK7w',
  },
  content:
    '<a href="https://vnexpress.net/can-bao-nhieu-trung-de-thu-tinh-ong-nghiem-4742732.html"><img src="https://vcdn1-suckhoe.vnecdn.net/2024/05/06/dsc00514-1-1714991023-17149910-8728-2207-1714991082.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=69qKadG6F23PpJ6SzdoK7w"></a></br>Tôi 37 tuổi, dự trữ buồng trứng (AMH) thấp, còn 0.7 ng/ml, siêu âm đầu chu kỳ kinh nguyệt chỉ có ba trứng. Bác sĩ chỉ định phác đồ gom trứng tích lũy nhiều chu kỳ để có nhiều trứng hơn.',
  contentSnippet:
    'Tôi 37 tuổi, dự trữ buồng trứng (AMH) thấp, còn 0.7 ng/ml, siêu âm đầu chu kỳ kinh nguyệt chỉ có ba trứng. Bác sĩ chỉ định phác đồ gom trứng tích lũy nhiều chu kỳ để có nhiều trứng hơn.',
  guid: 'https://vnexpress.net/can-bao-nhieu-trung-de-thu-tinh-ong-nghiem-4742732.html',
  isoDate: '2024-05-06T12:00:00.000Z',
};

export interface NewsInterface {
  title: string;
  link: string;
  pubDate: string;
  enclosure?: {
    type: string;
    length: string;
    url: string;
  };
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  category?: NewsCategoryInterface;
}

export interface NewsCategoryInterface {
  id: number;
  title: string;
  category_name: string;
}
