

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
