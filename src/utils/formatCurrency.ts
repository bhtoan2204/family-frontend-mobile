export const formatVietNamCurrencyToDot = (value: string) => {
  if (!value) return '';
  // Xóa tất cả các ký tự không phải số
  value = value.replace(/\D/g, '');
  // Đảo ngược chuỗi để dễ dàng thêm dấu chấm
  value = value.split('').reverse().join('');
  // Thêm dấu chấm sau mỗi ba chữ số
  value = value.replace(/(\d{3})(?=\d)/g, '$1.');
  // Đảo ngược lại chuỗi
  return value.split('').reverse().join('');
};

export const formatVietNamCurrencyNoDot = (value: string) => {
  if (!value) return '';
  // Xóa tất cả các ký tự không phải số
  value = value.replace(/\D/g, '');
  return value;
};

export const fromVietNamCurrencyToText = (amountStr: string) => {
  const units = ['', 'nghìn', 'triệu', 'tỷ'];

  // Các từ số từ 0 đến 19
  const words0to19 = [
    '',
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín',
    'mười',
    'mười một',
    'mười hai',
    'mười ba',
    'mười bốn',
    'mười lăm',
    'mười sáu',
    'mười bảy',
    'mười tám',
    'mười chín',
  ];

  // Các từ số hàng chục
  const tens = [
    '',
    'mười',
    'hai mươi',
    'ba mươi',
    'bốn mươi',
    'năm mươi',
    'sáu mươi',
    'bảy mươi',
    'tám mươi',
    'chín mươi',
  ];

  // Hàm chuyển số thành chữ
  function numberToWords(num: number): string {
    if (num === 0) return 'không';

    let words = '';
    let unitIndex = 0;

    do {
      const numPart = num % 1000;
      if (numPart !== 0) {
        const hundreds = Math.floor(numPart / 100);
        const tensAndUnits = numPart % 100;

        if (hundreds !== 0) {
          words = words0to19[hundreds] + ' trăm ' + words;
        }

        if (tensAndUnits !== 0) {
          if (tensAndUnits < 20) {
            words =
              words0to19[tensAndUnits] + ' ' + units[unitIndex] + ' ' + words;
          } else {
            const tensPart = Math.floor(tensAndUnits / 10);
            const unitsPart = tensAndUnits % 10;
            words =
              tens[tensPart] +
              ' ' +
              words0to19[unitsPart] +
              ' ' +
              units[unitIndex] +
              ' ' +
              words;
          }
        }
      }

      unitIndex++;
      num = Math.floor(num / 1000);
    } while (num > 0);

    return words.trim();
  }

  // Chuyển đổi chuỗi thành số nguyên
  const amount = parseInt(amountStr.replace(/\./g, ''), 10);

  // Chuyển đổi số thành chữ và thêm từ "đồng"
  const words = numberToWords(amount);
  return words.trim() + ' đồng';
};
