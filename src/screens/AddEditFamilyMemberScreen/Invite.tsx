import { Linking } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';

const Invite = async (id_family?: number, email: string, profile: { firstname: string, lastname: string }) => {
  try {
    const data = await FamilyServices.inviteMember(id_family);

    const link = `http://localhost:8080/invite/${id_family}/${data.code}`;
    const subject = 'Invitation to Join Family';
    const body = `Hello,

    I would like to invite you to join our family group on our app. Please follow the link below to join:

    ${link}

    Best regards,
    ${profile.firstname} ${profile.lastname}`;

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      const supported = await Linking.openURL(url);
      if (!supported) {
        console.log('Failed to open email client');
      } else {
        console.log('Email client opened');
      }
    } else {
      console.log('Unable to open email client');
    }
  } catch (error) {
    console.error(error);
  }
};

export default Invite;
