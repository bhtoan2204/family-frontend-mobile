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
      return res.data.data as Guildline[];
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
      // const steps = res.data.data[0].step.steps as Step[];

      const dataDetail = res.data.data as GuildLineDetail;
      // dataDetail.steps = steps;
      // delete dataDetail['step'];
      console.log('detail 1 guild line nè');
      console.log(dataDetail);
      return dataDetail;
    } catch (error) {
      console.log('Error fetching guildline detail:', error);
    }
  },
  addGuildLine: async (
    id_family: number,
    name: string,
    description: string,
  ) => {
    const url = baseUrl + GuildlineUrl.addGuildLine;
    const data = {
      id_family: id_family,
      name: name,
      description: description,
    };
    try {
      const res = await instance.post(url, data);
      const dataRes = res.data.data as Guildline;
      return dataRes;
    } catch (error) {
      console.log('Error adding guildline:', error);
    }
  },
  addStepGuildLine: async (
    id_guideline: number,
    id_family: number,
    step: Step,
  ) => {
    const url = baseUrl + GuildlineUrl.addStepGuildLine;
    const createFormData = (uri: string): FormData => {
      let formData = new FormData();
      if (uri != null && uri != '') {
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('stepImage', file);
      }
      formData.append('id_family', id_family.toString());
      formData.append('id_guideline', id_guideline.toString());
      formData.append('name', step.name);
      formData.append('description', step.description);
      return formData;
    };
    try {
      const res = await instance.post(
        url,
        createFormData(step.imageUrl || ''),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
        },
      );
      return res.data;
    } catch (error) {
      console.log('Error adding step guildline:', error);
    }
  },
  updateGuildLineDetail: async (
    fileUri: string,
    id_family: number,
    id_guideline: number,
    step: Step,
    index: number,
  ) => {
    const url = baseUrl + GuildlineUrl.updateStepGuildLine;
    const createFormData = (uri: string): FormData => {
      let formData = new FormData();
      if (uri != null && uri != '') {
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('stepImage', file);
      }
      formData.append('id_family', id_family.toString());
      formData.append('id_guideline', id_guideline.toString());
      formData.append('name', step.name);
      formData.append('description', step.description);
      formData.append('index', index.toString());
      return formData;
    };
    try {
      const res = await instance.put(url, createFormData(fileUri), {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
      });
      console.log('result from update api');
      console.log(res.data);
    } catch (error) {
      console.log('Error updating step guildline:', error);
    }
  },
  updateTitleAndDescriptionStepGuildLine: async (
    id_family: number,
    id_guideline: number,
    step: Step,
    index: number,
  ) => {
    const url = baseUrl + GuildlineUrl.updateStepGuildLine;
    const createFormData = (): FormData => {
      let formData = new FormData();
      formData.append('id_family', id_family.toString());
      formData.append('id_guideline', id_guideline.toString());
      formData.append('name', step.name);
      formData.append('description', step.description);
      formData.append('index', index.toString());
      return formData;
    };
    try {
      const res = await instance.put(url, createFormData(), {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
      });
      console.log('result from update api');
      console.log(res.data);
    } catch (error) {
      console.log('Error updating step guildline:', error);
    }
  },
  deleteGuideline: async (id_family: number, id_guide_item: number) => {
    const url =
      baseUrl +
      GuildlineUrl.deleteGuideline +
      '/' +
      id_family.toString() +
      '/' +
      id_guide_item.toString();
    console.log(url);
    try {
      const res = await instance.delete(url);
      console.log('result from delete api');
      console.log(res.data);
    } catch (error) {
      console.log('Error deleting guildline:', error);
    }
  },
  deleteStepGuildLine: async (
    id_family: number,
    id_guideline: number,
    index: number,
  ) => {
    const url =
      baseUrl +
      GuildlineUrl.deleteGuideline +
      '/' +
      id_family.toString() +
      '/' +
      id_guideline.toString() +
      index.toString();
    try {
      const res = await instance.delete(url);
      console.log('result from delete api');
      console.log(res.data);
    } catch (error) {
      console.log('Error deleting guildline:', error);
    }
  },
};

export default GuildLineService;
