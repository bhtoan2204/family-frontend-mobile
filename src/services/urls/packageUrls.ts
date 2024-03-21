import baseUrl from './baseUrl';

const PackageUrl = {
  getAllPackage: `${baseUrl}/api/v1/payment/getAllPackage`,
  getPackage: `${baseUrl}/api/v1/payment/getPackage`,
  getProfile: `${baseUrl}/api/v1/user/profile`,
  getPaymentMethod: `${baseUrl}/api/v1/payment/getMethod`,
  createPaymentURL: `${baseUrl}/api/v1/payment/createOrderVNPAY`,
  checkOrder: `${baseUrl}/api/v1/payment/checkOrder`,
  getOrderSucessful: `${baseUrl}/api/v1/payment/getOrder`,
  banksInfo: 'https://api.vietqr.io/v2/banks',
};

export default PackageUrl;
