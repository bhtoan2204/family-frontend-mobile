import baseUrl from './baseUrl';

const ProfileUrl = {
  profile: `user/profile`,
  updateProfile: `${baseUrl}/api/v1/user/updateProfile`,
  changePassword: `${baseUrl}/api/v1/user/changePassword`,
  changeAvatar: `${baseUrl}/api/v1/user/changeAvatar`,
  getNotification: `${baseUrl}/api/v1/notification/getNotifications`,
  markRead: `${baseUrl}/api/v1/notification/markRead`

};

export default ProfileUrl;
