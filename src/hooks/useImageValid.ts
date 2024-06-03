import React from 'react';

const useImageValid = ({imageUrl}: {imageUrl: string}) => {
  const [loading, setLoading] = React.useState(true);
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    fetch(imageUrl)
      .then(res => {
        setIsValid(res.status === 200);
        setLoading(false);
      })
      .catch(() => {
        // Xử lý lỗi nếu có
        setIsValid(false);
        setLoading(false);
      });
  }, [imageUrl]);

  if (loading || isValid === false) {
    return false;
  }

  return true;
};

export default useImageValid;
