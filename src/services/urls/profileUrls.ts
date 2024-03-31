import baseUrl from './baseUrl';

const ProfileUrl = {
  profile: `${baseUrl}/api/v1/user/profile`,
  updateProfile: `${baseUrl}/api/v1/user/updateProfile`,
  changePassword: `${baseUrl}/api/v1/user/changePassword`,
  changeAvatar: `${baseUrl}/api/v1/user/changeAvatar`
};

export default ProfileUrl;
