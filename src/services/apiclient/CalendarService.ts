import axios, {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import {CalendarUrls} from '../urls';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';
import {date} from 'yup';

const CalendarServices = {
  getAllChecklist: async (
    id_checklist_type?: number | null,
    id_family: number | null,
  ) => {
    try {
      const response: AxiosResponse = await instance.get(
        '/api/v1/checklist/getAllChecklist',
        {
          params: {
            page: 1,
            itemsPerPage: 10,
            sortBy: 'created_at',
            sortDirection: 'DESC',
            id_family,
            id_checklist_type,
          },
        },
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error: any) {
      return [];
    }
  },

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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
          return null;
        }
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
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
  getLocation: async (query: string) => {
    try {
      const response = await axios.get(
        `http://api.geonames.org/searchJSON?q=${encodeURIComponent(query)}&country=VN&username=thuhien2105`,
      );
      if (response.status === 200) {
        const locationNames = response.data.geonames.map(
          (location: {name: string}) => location.name,
        );
        return locationNames;
      }
    } catch (error) {
      return [];
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
      if (response.status === 201) {
        return response.data.data;
      }
    } catch (error: any) {
      return null;
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
  ) => {
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
        recurrence_rule: recurrence_rule || null,
      };
      const response: AxiosResponse = await instance.put(
        CalendarUrls.updateCalender,
        requestData,
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
};

export default CalendarServices;
