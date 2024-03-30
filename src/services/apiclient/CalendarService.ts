import axios, {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import { CalendarUrls } from '../urls';
import instance from '../httpInterceptor';
import LocalStorage from 'src/store/localstorage';

const FamilyServices = {
    getCalendar: async (id_family: any) => {
        try {
          const response: AxiosResponse = await instance.get(CalendarUrls.getAllCalendar,
            {
                params: {
                    id_family,
                  },
            },
          );
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error(ERROR_TEXTS.FAMILY_NOT_FOUND);
          }
        } catch (error: any) {
          console.error('Error in getAllFamily:', error.message);
          throw new Error(ERROR_TEXTS.FAMILY_NOT_FOUND);
        }
      },
    
};
export default FamilyServices;