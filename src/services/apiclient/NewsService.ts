import axios from 'axios';
import baseUrl from '../urls/baseUrl';
import {GuildlineUrl} from '../urls';
import instance from '../httpInterceptor';
import {NewsInterface} from 'src/interface/news/news';
import RssUrl from '../urls/rssUrl';

const NewsService = {
  getNewsByCategory: async (
    type: string,
    page: number | null,
    itemsPerPage: number | null,
  ) => {
    try {
      const url =
        RssUrl.news + `?type=${type}&page=${page}&itemsPerPage=${itemsPerPage}`;
      console.log('url get all guildline', url);
      const res = await instance.get(url);
      const data = res.data.items;
      return data as NewsInterface[];
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },
};

export default NewsService;
