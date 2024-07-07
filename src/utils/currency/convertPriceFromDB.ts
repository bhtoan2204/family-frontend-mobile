export const convertToNumber = (currencyString: string): number => {
  // Loại bỏ ký tự '$' từ chuỗi
  const strippedString: string = currencyString.replace('$', '');

  // Chuyển đổi chuỗi thành số
  try {
    const number: number = parseFloat(strippedString);
    return Math.floor(number); // Lấy phần nguyên để có kết quả như mong đợi
  } catch (error) {
    console.error('Không thể chuyển đổi thành số');
    throw error;
  }
};
