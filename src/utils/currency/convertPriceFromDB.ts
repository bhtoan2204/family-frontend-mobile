export const convertToNumber = (currencyString: string): number => {
  // Loại bỏ ký tự '$' từ chuỗi
  const strippedString: string = currencyString.replace('$', '');

  // Chuyển đổi chuỗi thành số
  try {
    const number: number = parseFloat(strippedString);
    return Math.floor(number); // Lấy phần nguyên để có kết quả như mong đợi
  } catch (error) {
    return 0;
    // console.error('Không thể chuyển đổi thành số');
    // throw error;
  }
};

export const convertToNumberVND = (currencyString: string): number => {
  const numericString = currencyString.replace(/\D/g, '');

  // Chuyển chuỗi thành số
  const number = parseInt(numericString, 10);

  return number;
};
