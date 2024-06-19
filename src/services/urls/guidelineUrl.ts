const GuildlineUrl = {
  getGuideline: '/api/v1/guideline/getAllGuideline',
  getGuidelineDetail: '/api/v1/guideline/getGuideline', // /{id_family}/{id_guideline}
  addGuildLine: '/api/v1/guideline/createGuideline',
  addStepGuildLine: '/api/v1/guideline/addStep',
  updateStepGuildLine: '/api/v1/guideline/updateStep',
  deleteGuideline: '/api/v1/guideline/deleteGuideline',
};
export default GuildlineUrl;
