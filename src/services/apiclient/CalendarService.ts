import axios, {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import {CalendarUrls} from '../urls';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';
import {date} from 'yup';

const CalendarServices = {
  getAllCategoryEvent: async (id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/calendar/getAllCategoryEvent`,
        {
          params: {
            id_family,
          },
        },
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.error('Error in getAllCategoryEvent');
      }
    } catch (error: any) {
      console.error('Error in getAllCategoryEvent', error.message);
    }
  },

  createCategoryEvent: async (
    title: string,
    color: string,
    id_family?: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/calendar/createCategoryEvent`,
        {
          title,
          color,
          id_family,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error in createCategoryEvent');
      }
    } catch (error: any) {
      console.error('Error in createCategoryEvent', error.message);
    }
  },

  deleteCategoryEvent: async (
    id_category_event: number,
    id_family?: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/calendar/deleteCategoryEvent/${id_family}`,
        {
          params: {
            id_family,
            id_category_event,
          },
        },
      );
      if (response.status === 204) {
        return true;
      } else {
        //console.error('Error in deleteCategoryEvent');
      }
    } catch (error: any) {
      //console.error('Error in deleteCategoryEvent', error.message);
    }
  },
  updateCategoryEvent: async (
    id_category_event: number,
    title: string,
    color: string,
    id_family?: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.put(
        `${baseUrl}/api/v1/calendar/updateCategoryEvent`,
        {
          id_category_event,
          title,
          color,
          id_family,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error in updateCategoryEvent');
      }
    } catch (error: any) {
      console.error('Error in updateCategoryEvent', error.message);
    }
  },

  getCalendar: async ({id_family}: {id_family?: number}) => {
    try {
      let params = {};
      if (id_family !== undefined) {
        params = {id_family};
      }
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/calendar/getAllCalendar/${id_family}`,
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.error('Error in getCalendar');
      }
    } catch (error: any) {
      console.error('Error in getCalendar', error.message);
    }
  },

  getCalendarDetail: async (id_calendar?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/calendar/getCalendarDetail/${id_calendar}`,
        {
          params: {
            id_calendar,
          },
        },
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.error('Error in getCalendarDetail');
      }
    } catch (error: any) {
      console.error('Error in getCalendarDetail', error.message);
    }
  },

  getEventOnDate: async (id_family?: number, date?: String) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/calendar/getEventOnDate`,
        {
          id_family,
          date,
        },
      );

      if (response) {
        if (response.status === 200) {
          console.log(response.data.data);
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

  DeleteEvent: async (id_family: number, id_calendar?: number) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/calendar/deleteCalendar/${id_family}/${id_calendar}`,
        {
          id_calendar,
          id_family,
        },
      );
      if (response.status === 204) {
        return 'Successfully deleted event';
      }
    } catch (error: any) {
      return 'Failed to delete event';
    }
  },

  CreateEvent: async (
    title: string,
    description: string,
    time_start: Date,
    time_end: Date,
    color: string,
    is_all_day: boolean,
    category: number,
    location: string,
    recurrence_exception: string,
    recurrence_id: number,
    recurrence_rule: string,
    start_timezone: string,
    end_timezone: string,
    id_family?: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        CalendarUrls.createCalendar,
        {
          title,
          description,
          id_family,
          time_start,
          time_end,
          color,
          is_all_day,
          category,
          location,
          recurrence_exception,
          recurrence_id,
          recurrence_rule,
          start_timezone,
          end_timezone,
        },
      );

      return 'Successfully created event';
    } catch (error: any) {
      return 'Failed to create event';
    }
  },
  UpdateEvent: async (
    id_calendar: number,
    id_family?: number,
    title: string,
    description: string,
    time_start: Date,
    time_end: Date,
    color: string,
    is_all_day: boolean,
    category: number,
    location?: string,
    recurrence_exception?: string,
    recurrence_id?: number,
    recurrence_rule?: string,
    start_timezone?: string,
    end_timezone?: string,
  ): Promise<string> => {
    try {
      const requestData = {
        id_calendar,
        id_family,
        title,
        description,
        time_start: time_start.toISOString(),
        time_end: time_end.toISOString(),
        color,
        is_all_day,
        category,
        location: location || null,
        recurrence_exception: recurrence_exception || null,
        recurrence_id: recurrence_id || null,
        recurrence_rule: recurrence_rule || '',
        start_timezone: start_timezone || null,
        end_timezone: end_timezone || null,
      };

      const response: AxiosResponse = await instance.put(
        CalendarUrls.updateCalender,
        requestData,
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Error in UpdateEvent:', error.message);
      throw new Error(`UpdateEvent failed: ${error.message}`);
    }
  },
};

export default CalendarServices;
