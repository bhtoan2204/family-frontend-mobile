import baseUrl from './baseUrl';

const EducationUrls = {
  getAll: `${baseUrl}/api/v1/education/getAll`, //id_family
  getEducationDetail: `${baseUrl}/api/v1/education/getDetail`, ///{id_family}/{id_education_progress}
  createEducation: `${baseUrl}/api/v1/education/create`,
  updateEducation: `${baseUrl}/api/v1/education/update`, //id_education_progress
  deleteEducation: `${baseUrl}/api/v1/education/delete`, //id_education_progress/id_family
  createSubject: `${baseUrl}/api/v1/subject/create`,
  updateSubject: `${baseUrl}/api/v1/subject/update`,
  deleteSubject: `${baseUrl}/api/v1/subject/delete`, //id_family/id_education_progress/id_subject
  addComponentScore: `${baseUrl}/api/v1/subject/addComponentScore`,
  updateComponentScore: `${baseUrl}/api/v1/subject/updateComponentScore`,
  deleteComponentScore: `${baseUrl}/api/v1/subject/deleteComponentScore`, //id_component_score
  modifyScore: `${baseUrl}/api/v1/subject/modifyScore`, //id_component_score
};

export default EducationUrls;
