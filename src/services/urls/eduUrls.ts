import baseUrl from './baseUrl';

const EducationUrls = {
  getAllShoppingListType: `${baseUrl}/api/v1/shopping/getShoppingItemType`,
  getAllEducationOfFamily: `${baseUrl}/api/v1/education/getAll`,
  getDetailEducation: `${baseUrl}/api/v1/education/getDetail`, //{id_family}/{id_education_progress}
};

export default EducationUrls;
