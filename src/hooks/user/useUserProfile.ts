import React from 'react';
import {ProfileServices} from 'src/services/apiclient';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await ProfileServices.profile();
        setUserProfile(profile);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);
  return {userProfile, loading, error};
};

export default useUserProfile;
