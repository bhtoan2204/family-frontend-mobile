const default_numbers: string = ' hai ba bốn năm sáu bảy tám chín';
const dict = {
  units: ('? một' + default_numbers).split(' '),
  tens: ('lẻ mười' + default_numbers).split(' '),
  hundreds: ('không một' + default_numbers).split(' '),
};
const tram: string = 'trăm';
const digits: string[] = 'x nghìn triệu tỉ nghìn'.split(' ');

function tenth(block_of_2: string): string {
  let sl1: string = dict.units[parseInt(block_of_2[1])];
  let result: string[] = [dict.tens[parseInt(block_of_2[0])]];
  if (parseInt(block_of_2[0]) > 0 && parseInt(block_of_2[1]) === 5) sl1 = 'lăm';
  if (parseInt(block_of_2[0]) > 1) {
    result.push('mươi');
    if (parseInt(block_of_2[1]) === 1) sl1 = 'mốt';
  }
  if (sl1 !== '?') result.push(sl1);
  return result.join(' ');
}

function block_of_three(block: string): string {
  switch (block.length) {
    case 1:
      return dict.units[parseInt(block)];
    case 2:
      return tenth(block);
    case 3:
      const result: string[] = [dict.hundreds[parseInt(block[0])], tram];
      if (block.slice(1, 3) !== '00') {
        const sl12: string = tenth(block.slice(1, 3));
        result.push(sl12);
      }
      return result.join(' ');
  }
  return '';
}

function formatnumber(nStr: string | number): string {
  nStr = nStr.toString();
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? '.' + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function digit_counting(i: number, digit_counter: number): string {
  return digits[i];
}

export function to_vietnamese(input: string | number, currency?: string): string {
  const str: string = parseInt(input.toString()).toString();
  let index: number = str.length;
  if (index === 0 || str === 'NaN') return '';

  let i = 0;
  const arr: string[] = [];
  const result: string[] = [];

  while (index >= 0) {
    arr.push(str.substring(index, Math.max(index - 3, 0)));
    index -= 3;
  }

  let digit_counter = 0;
  let digit: string;

  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === '000') {
      digit_counter += 1;
      if (i === 2 && digit_counter === 2) {
        result.push(digit_counting(i + 1, digit_counter));
      }
    } else if (arr[i] !== '') {
      digit_counter = 0;
      result.push(block_of_three(arr[i]));
      digit = digit_counting(i, digit_counter);
      if (digit && digit !== 'x') result.push(digit);
    }
  }

  if (currency) result.push(currency);

  return result.join(' ');
}
