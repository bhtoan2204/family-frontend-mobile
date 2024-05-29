import axios, {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import { CalendarUrls } from '../urls';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';
import { date } from 'yup';

const CalendarServices = {
    getCalendar: async ({ id_family }: { id_family?: number }) => {
  try {
    let params = {};
    if (id_family !== undefined) {
      params = { id_family };
    }
    const response: AxiosResponse = await instance.get(`${baseUrl}/api/v1/calendar/getAllCalendar/${id_family}`, { 

    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error('Error in getCalendar');
    }
  } catch (error: any) {
    console.error('Error in getCalendar', error.message);
  }},

  getEventOnDate: async (id_family?: number, date?: String) => {
    try {
      const response: AxiosResponse = await instance.post(`${baseUrl}/api/v1/calendar/getEventOnDate`, 
        {
          id_family,
          date
        },
      );
      
      if (response) {
        if (response.status === 200) {
          console.log(response.data.data)
          return response.data.data;
        } else {
          console.error('Error in getEventOnDate');
        }
      } else {
        console.error('Error: No response received');
      }
    } catch (error: any) {
      console.error('Error in getEventOnDate', error.message);
    }
  },

  UpdateEvent: async (id_calendar: number, title: string, description: string, datetime: string) => {
    try {
      console.log(datetime);
      const response: AxiosResponse = await instance.put(CalendarUrls.updateCalender, 
        {
          id_calendar,
          title,
          description,
          datetime,
        },
      );
      
      if (response) {
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Error in getEventOnDate');
        }
      } else {
        console.error('Error: No response received');
      }
    } catch (error: any) {
      console.error('Error in getEventOnDate', error.message);
    }
  },

  DeleteEvent: async (id_calendar?: number) => {
    try {
      const response: AxiosResponse = await instance.delete(`${baseUrl}/api/v1/calendar/deleteCalendar/${id_calendar}`, {
        params: {
          id_calendar,
        }
      }
      );
      
      if (response) {
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Error in getEventOnDate');
        }
      } else {
        console.error('Error: No response received');
      }
    } catch (error: any) {
      console.error('Error in getEventOnDate', error.message);
    }
  },

  CreateEvent: async (id_family: number, title: string, description: string, datetime: string) => {
    try {
      const response: AxiosResponse = await instance.post(CalendarUrls.createCalendar, {

          title, description, id_family, datetime,
        
      }
      );
      
      if (response) {
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Error in getEventOnDate');
        }
      } else {
        console.error('Error: No response received');
      }
    } catch (error: any) {
      console.error('Error in getEventOnDate', error.message);
    }
  },
  
};

    

export default CalendarServices;