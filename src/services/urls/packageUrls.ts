import baseUrl from './baseUrl';

const PackageUrl = {
  getAllPackage: `${baseUrl}/api/v1/payment/getMainPackage`,
  getExtraPackage: `${baseUrl}/api/v1/payment/getExtraPackage`,
  getComboPackage: `${baseUrl}/api/v1/payment/getComboPackage`,
  getAvailableFunction: `${baseUrl}/api/v1/payment/getAvailableFunction`,

  getProfile: `${baseUrl}/api/v1/user/profile`,
  getPaymentMethod: `${baseUrl}/api/v1/payment/getMethod`,
  createPaymentURL: `${baseUrl}/api/v1/payment/placeOrder`,
  checkOrder: `${baseUrl}/api/v1/payment/checkOrder`,
  paymentHistory: `${baseUrl}/api/v1/payment/paymentHistory`,
  banksInfo: 'https://api.vietqr.io/v2/banks',
};

export default PackageUrl;
