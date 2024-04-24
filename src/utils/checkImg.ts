import instance from 'src/services/httpInterceptor';

export const checkImage = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Lỗi khi tải hình ảnh: ${response.statusText}`);
      }
      const imageType = await response.headers.get('content-type');
      if (!imageType?.startsWith('image/')) {
        throw new Error('Đường dẫn không phải là hình ảnh');
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
