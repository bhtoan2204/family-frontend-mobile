import baseUrl from './baseUrl';

const AuthUrl = {
  login: `${baseUrl}/api/v1/auth/local/login`,
  signup: `${baseUrl}/api/v1/user/register/createAccountForTest`,
  googleLogin: `${baseUrl}/api/v1/auth/google/login`,
  googleCallback: `${baseUrl}/api/v1/auth/google/callback`,
  refreshToken: `${baseUrl}/api/v1/auth/refresh`,
  forgotPassword: `${baseUrl}/api/v1/user/forgotPassword`,
};

export default AuthUrl;
