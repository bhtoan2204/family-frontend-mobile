import axios, { AxiosResponse } from 'axios';
import baseUrl from '../urls/baseUrl';
import {GuildlineUrl} from '../urls';
import instance from '../httpInterceptor';
import RssUrl from '../urls/rssUrl';

const NewsService = {

  categories: async () => {
    try{
    const response: AxiosResponse = await instance.get(RssUrl.categories)
    if (response.status === 200) {
      return response.data.data;
    } 
    }catch (error: any){
      console.error('Error in categories:', error.message);

    }

  },
  getNewsByCategory: async (
    id_article_category : number,
    page: number | null,
    itemsPerPage: number | null,
  ) => {
    try {
      const url =
        RssUrl.news + `?id_article_category=${id_article_category }&page=${page}&itemsPerPage=${itemsPerPage}`;
      const res = await instance.get(url);
      const data = res.data;
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },
};

export default NewsService;
