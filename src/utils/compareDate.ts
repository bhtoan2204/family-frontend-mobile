export const compareDates = (date1: Date, date2: Date) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Set giờ, phút, giây, mili giống nhau để so sánh chỉ ngày
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  if (d1.getTime() === d2.getTime()) {
    return 0; // Hai ngày bằng nhau
  } else if (d1 < d2) {
    return -1; // Ngày thứ nhất nhỏ hơn ngày thứ hai
  } else {
    return 1; // Ngày thứ nhất lớn hơn ngày thứ hai
  }
};
