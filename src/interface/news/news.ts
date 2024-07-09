export interface Article {
  id_article: number;
  id_article_category: number;
  id_enclosure: number;
  title: string;
  link: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  pubDate: string;
  category: ArticleCategory;
  enclosure: Enclosure;
}

export interface ArticleCategory {
  id_article_category: number;
  name: string;
}

export interface Enclosure {
  id_enclosure: number;
  type: string;
  length: string;
  url: string;
}
