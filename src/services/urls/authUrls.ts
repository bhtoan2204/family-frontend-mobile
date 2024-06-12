import baseUrl from './baseUrl';

const AuthUrl = {
  login: `${baseUrl}/api/v1/auth/local/login`,
  signup: `${baseUrl}/api/v1/user/register/createAccountForTest`,
  googleLogin: `${baseUrl}/api/v1/auth/google/login`,
  googleCallback: `${baseUrl}/api/v1/auth/google/callback`,
  facebookLogin: `${baseUrl}/api/v1/auth/facebook/login`,
  facebookCallback: `${baseUrl}/api/v1/auth/facebook/callback`,
  refreshToken: `${baseUrl}/api/v1/auth/refresh`,
  forgotPassword: `${baseUrl}/api/v1/user/forgotPassword`,
  logout: `${baseUrl}/api/v1/auth/logout`,
  checkOTPForgotPassword: `${baseUrl}/api/v1/user/checkOTPForgotPassword`,
  resetPassword: `${baseUrl}/api/v1/user/resetPassword`,

};

export default AuthUrl;
