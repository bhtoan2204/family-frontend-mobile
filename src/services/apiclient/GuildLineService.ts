import axios from 'axios';
import baseUrl from '../urls/baseUrl';
import {GuildlineUrl} from '../urls';
import instance from '../httpInterceptor';
import {
  Guildline,
  GuildLineDetail,
  Step,
} from 'src/interface/guideline/guideline';

const GuildLineService = {
  getAllGuideLine: async (id_family: number) => {
    try {
      const url =
        baseUrl + GuildlineUrl.getGuideline + '/' + id_family.toString();
      console.log('url get all guildline', url);
      const res = await instance.get(url);
      return res.data.data.items as Guildline[];
    } catch (error) {
      console.error('Error fetching guidelines:', error);
      throw error;
    }
  },
  getGuildLineDetail: async (id_family: number, id_item: number) => {
    try {
      const url =
        baseUrl +
        GuildlineUrl.getGuidelineDetail +
        '/' +
        id_family.toString() +
        '/' +
        id_item.toString();

      const res = await instance.get(url);
      console.log(url);
      const steps = res.data.data[0].step.steps as Step[];

      const dataDetail = res.data.data[0] as GuildLineDetail;
      dataDetail.steps = steps;
      delete dataDetail['step'];
      console.log('detail 1 guild line nè');
      console.log(dataDetail);
      return dataDetail;
    } catch (error) {
      console.log('Error fetching guildline detail:', error);
    }
  },
};

export default GuildLineService;
