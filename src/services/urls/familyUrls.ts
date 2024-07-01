import baseUrl from './baseUrl';

const FamilyUrl = {
  getAllFamily: `${baseUrl}/api/v1/family/getAllFamily`,
  getFamily: `${baseUrl}/api/v1/family/getFamily`,
  createFamily: `${baseUrl}/api/v1/family/createFamily`,
  updateFamily: `${baseUrl}/api/v1/family/updateFamily`,
  deleteFamily: `${baseUrl}/api/v1/family/deleteFamily`,
  getAllMembers: `${baseUrl}/api/v1/family/getAllMember`,
  getMember: `${baseUrl}/api/v1/family/getMember`,
  addMember: `${baseUrl}/api/v1/family/addMember`,
  kickMember: `${baseUrl}/api/v1/family/kickMember`,
  changeAvatar: `${baseUrl}/api/v1/family/changeAvatar`,
  inviteMember: `${baseUrl}/api/v1/invitation/generateInvitation`,

};

export default FamilyUrl;
