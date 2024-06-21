
export const calculateContrast = (rgb1: any, rgb2: any) => {
  const luminance = (r: any, g: any, b: any) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const luminance1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const luminance2 = luminance(rgb2[0], rgb2[1], rgb2[2]);

  return (
    (Math.max(luminance1, luminance2) + 0.05) /
    (Math.min(luminance1, luminance2) + 0.05)
  );
};

export const rgbFromHex = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};

export const isWhiteTextReadable = (backgroundColor: any) => {
  const white = [255, 255, 255];
  const bgColor = rgbFromHex(backgroundColor);
  const contrast = calculateContrast(white, bgColor);

  return contrast >= 4.5; // Mức contrast theo tiêu chuẩn WCAG AA cho văn bản thông thường
};


