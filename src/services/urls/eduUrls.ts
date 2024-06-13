import baseUrl from './baseUrl';

const EducationUrls = {
  getAll: `${baseUrl}/api/v1/education/getAll`, //id_family
  getAllEducationOfFamily: `${baseUrl}/api/v1/education/getDetail`, ///{id_family}/{id_education_progress}
  updateEducation: `${baseUrl}/api/v1/education/update`, //id_education_progress
};

export default EducationUrls;
