import {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import instance from '../httpInterceptor';
import {ProfileUrl, ShoppingListUrls, EducationUrls} from '../urls';

import {
  Education,
  EducationDetail,
  Subject,
} from 'src/interface/education/education';

const EducationServices = {
  createEducation: async (
    id_family: number,
    id_user: string,
    title: string,
    progress_notes: string,
    school_info: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        EducationUrls.createEducation,
        {
          id_family,
          id_user,
          title,
          progress_notes,
          school_info,
        },
      );

      if (response.status === 201) {
        return response.data.data;
        // {
        //   "message": "Success",
        //   "data": {
        //     "id_family": 96,
        //     "id_user": "db31bfb8-ec15-4cb1-9cbe-ebe3edaca323",
        //     "title": "string",
        //     "progress_notes": "string",
        //     "school_info": "string",
        //     "id_education_progress": 7,
        //     "created_at": "2024-06-22T06:02:39.745Z",
        //     "updated_at": "2024-06-22T06:02:39.745Z"
        //   }
        // }
      } else {
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },

  getAllEducation: async (
    id_family: number,
    page: number,
    itemPerPage: number,
  ) => {
    try {
      const url =
        EducationUrls.getAll +
        '?id_family=' +
        id_family +
        `&page=${page}&itemsPerPage=${itemPerPage}&sortBy=created_at&sortDirection=ASC`;
      console.log(url);
      const response: AxiosResponse = await instance.get(url);

      if (response.status === 200) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  getEducationDetail: async (
    id_family: number,
    id_education_progress: number,
  ) => {
    try {
      const url =
        EducationUrls.getEducationDetail +
        '/' +
        id_family +
        '/' +
        id_education_progress;
      const response: AxiosResponse = await instance.get(url);
      if (response.status === 200) {
        const data = response.data.data as EducationDetail;
        return data;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  updateEducation: async (
    id_education_progress: number,
    id_family: number,
    title: string,
    progress_notes: string,
    school_info: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.put(
        EducationUrls.updateEducation,
        {
          id_education_progress,
          id_family,
          title,
          progress_notes,
          school_info,
        },
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  deleteEducation: async (id_education_progress: number, id_family: number) => {
    try {
      const response: AxiosResponse = await instance.delete(
        EducationUrls.deleteEducation +
          '/' +
          id_education_progress +
          '/' +
          id_family,
      );

      if (response.status === 204) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  createSubject: async (
    id_education_progress: number,
    id_family: number,
    subject_name: string,
    description: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        EducationUrls.createSubject,
        {
          id_education_progress,
          id_family,
          subject_name,
          description,
        },
      );

      if (response.status === 201) {
        return response.data.data;
        // {
        //   "message": "Success",
        //   "data": {
        //     "id_education_progress": 1,
        //     "subject_name": "Math 1",
        //     "description": "Mathematics 2",
        //     "component_scores": null,
        //     "midterm_score": null,
        //     "final_score": null,
        //     "bonus_score": null,
        //     "status": "in_progress",
        //     "id_subject": 9
        //   }
        // }
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  createSubjectAndComponentScores: async (
    id_education_progress: number,
    id_family: number,
    subject_name: string,
    description: string,
    component_scores: {
      id: number;
      title: string;
      color: string;
    }[],
  ) => {
    try {
      const response = await EducationServices.createSubject(
        id_education_progress,
        id_family,
        subject_name,
        description,
      );
      if (response) {
        const id_subject = response.id_subject as number;
        const componentScores = component_scores.map((component, index) => {
          return {
            id_subject: id_subject,
            id_education_progress: id_education_progress,
            id_family: id_family,
            component_name: component.title,
            score: null,
            target_score: 10,
            maximum_score: 10,
          };
        });
        const res = await instance.post(EducationUrls.addComponentScore, {
          id_subject,
          id_education_progress,
          id_family,
          component_scores: componentScores,
        });
        if (res) {
          return res.data.data as Subject;
        } else {
          return null;
        }
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  updateSubject: async (
    id_subject: number,
    id_education_progress: number,
    id_family: number,
    subject_name: string,
    description: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.put(
        EducationUrls.updateSubject,
        {
          id_subject,
          id_education_progress,
          id_family,
          subject_name,
          description,
        },
      );

      if (response.status === 200) {
        return response.data.data as Subject;
      } else {
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  deleteSubject: async (
    id_subject: number,
    id_education_progress: number,
    id_family: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.delete(
        EducationUrls.deleteSubject +
          '/' +
          id_family +
          '/' +
          id_education_progress +
          '/' +
          id_subject,
      );

      if (response.status === 204) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  addComponentScore: async (
    id_subject: number,
    id_education_progress: number,
    id_family: number,
    component_name: string,
    score: number | null,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        EducationUrls.addComponentScore,
        {
          id_subject,
          id_education_progress,
          id_family,
          component_name,
          score,
        },
      );

      if (response.status === 201) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  updateComponentScore: async (
    id_subject: number,
    id_education_progress: number,
    id_family: number,
    index: number,
    score: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.put(
        EducationUrls.updateComponentScore,
        {
          id_subject,
          id_education_progress,
          id_family,
          index,
          score,
        },
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  deleteComponentScore: async (
    id_subject: number,
    id_education_progress: number,
    id_family: number,
    index: number,
  ) => {
    try {
      const response = await instance.delete(
        EducationUrls.deleteComponentScore,
        {
          data: {
            id_subject,
            id_education_progress,
            id_family,
            index,
          },
        },
      );
      if (response.status === 204) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  modifyScore: async (
    id_subject: number,
    id_family: number,
    id_education_progress: number,
    midterm_score: number | null,
    final_score: number | null,
    bonus_score: number | null,
  ) => {
    try {
      const response: AxiosResponse = await instance.put(
        EducationUrls.modifyScore,
        {
          id_subject,
          id_family,
          id_education_progress,
          midterm_score,
          final_score,
          bonus_score,
        },
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
};

export default EducationServices;
