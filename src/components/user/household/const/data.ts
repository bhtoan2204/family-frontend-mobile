import {iOSColors, iOSGrayColors} from 'src/constants/ios-color';

export const household_category_dat = [
  {
    id_category: 1,
    category_name: 'Kitchen',
  },
  {
    id_category: 2,
    category_name: 'Living Room',
  },
  {
    id_category: 3,
    category_name: 'Bedroom',
  },
  {
    id_category: 4,
    category_name: 'Bathroom',
  },
  {
    id_category: 5,
    category_name: 'Home Office',
  },
  {
    id_category: 6,
    category_name: 'Garage/Utility',
  },
  {
    id_category: 7,
    category_name: 'Laundry Room',
  },
  {
    id_category: 8,
    category_name: 'Outdoor and Garden',
  },
];

export const category_colors = [
  {
    background_color: iOSColors.systemTeal.accessibleLight, // Màu xanh lá cây
    border_color: iOSColors.systemTeal.accessibleDark, // Màu cam
  },
  {
    background_color: iOSColors.systemYellow.defaultLight, // Màu xám
    border_color: iOSColors.systemYellow.accessibleDark, // Màu nâu
  },
  {
    background_color: iOSColors.systemPink.defaultLight, // Màu hồng nhạt
    border_color: iOSColors.systemPink.defaultLight, // Màu tím nhạt
  },
  {
    background_color: iOSColors.systemBlue.accessibleDark, // Màu xanh dương
    border_color: iOSColors.systemBlue.defaultLight, // Màu xanh dương
  },
  {
    background_color: iOSColors.systemIndigo.defaultLight, // Màu xanh đậm
    border_color: iOSColors.systemIndigo.defaultDark, // Màu đỏ gạch
  },
  {
    background_color: iOSGrayColors.systemGray.defaultLight, // Màu xám
    border_color: '#8b4513', // Màu nâu
  },
  {
    background_color: iOSColors.systemPurple.accessibleLight, // Màu xanh lam
    border_color: iOSColors.systemPurple.defaultLight, // Màu hồng nhạt
  },
  {
    background_color: iOSColors.systemGreen.accessibleLight, // Màu xanh lá cây
    border_color: iOSColors.systemGreen.accessibleDark, // Màu nâu đất
  },
];
