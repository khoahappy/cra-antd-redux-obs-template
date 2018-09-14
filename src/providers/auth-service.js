import HTTP_STATUS_CODES from 'http-status-codes';
import axios, { AxiosResponse } from 'axios';
import { saveToken, authHeader, saveGuestToken } from '../utils/auth-helper';
import * as config from '../constants/app-consts';

const { OTP_STATUS } = config;
const AUTH_URL = `${config.API_URL}${config.API_PATH.AUTH}`;
const OTP_URL = `${config.API_URL}${config.API_PATH.OTP}`;


/**
 * Check the header status of the http response and return the data object
 * @param response HttpResponse
 */
const handleAxiosResponse = (response: AxiosResponse): Promise<any> => {
  const { data } = response;
  if (response.status !== HTTP_STATUS_CODES.OK) {
    if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
      // auto logout if 401 response returned from api
      logout();
      // todo: change to action dispatcher
      window.location.reload(true);
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
};

/**
 * Refresh access_token and return it in the form of raw data
 */
export const refreshToken = (): Promise<any> => axios({
  url: `${AUTH_URL}/refresh`,
  method: 'post',
  headers: authHeader(),
})
  .then(handleAxiosResponse)
  .then((response: any) => {
    // login successful if there's a jwt token in the response
    if (response.access_token) {
      // store user details and jwt token in local storage to
      // keep user logged in between page refreshes
      saveToken(response);
    }
    return response;
  });
const loginAsGuest = (): Promise<any> => {
  const formData = new window.FormData();
  formData.set('username', process.env.GUEST_USN);
  formData.set('password', process.env.GUEST_PWD);

  return axios({
    method: 'post',
    url: `${AUTH_URL}/login`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  })
    .then(handleAxiosResponse)
    .then((response: any) => {
      // login successful if there's a jwt token in the response
      if (response.access_token) {
        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        saveToken(response);
        saveGuestToken('true');
      }
      return response;
    });
};

/**
 * Login using provided username and password
 * @param username username
 * @param password password
 */
const login = (username, password): Promise<any> => {
  const formData = new window.FormData();
  formData.set('username', username);
  formData.set('password', password);

  return axios({
    method: 'post',
    url: `${AUTH_URL}/login`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  })
    .then(handleAxiosResponse)
    .then((response: any) => {
      // login successful if there's a jwt token in the response
      if (response.access_token) {
        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        saveToken(response);
        saveGuestToken('');
      }
      return response;
    });
};

/**
 * Logout of the application
 */
const logout = (): void => {
  // remove user from local storage to log user out
  saveToken('');
};

/**
 * Get user information
 */
const getUser = (): Promise<any> => axios({
  url: `${AUTH_URL}/me`,
  method: 'post',
  headers: authHeader(),
}).then(handleAxiosResponse);

/**
 * Login using OTP token
 */
const loginOTP = (): Promise<any> => axios({
  url: `${OTP_URL}/sendOTP`,
  method: 'post',
  headers: authHeader(),
})
  .then(handleAxiosResponse)
  .then(handleOTPResponse);

/**
 * Send OTP token to the server to verify user credential
 * @param otp string get from manager SMS
 */
const verifyOTP = (otp: string): Promise<any> => axios({
  url: `${OTP_URL}/sendOTP`,
  method: 'post',
  headers: authHeader(),
  data: { otp },
})
  .then(handleAxiosResponse)
  .then(handleOTPResponse);

/**
 * Change user's Phone Number
 * @param phoneNumber an phone number string with regional string included (ex: +84 ...)
 */
const updatePhoneNumber = (phoneNumber: string) => axios({
  url: `${OTP_URL}/updatePhoneNumber`,
  method: 'post',
  headers: authHeader(),
  data: { phone: phoneNumber },
})
  .then(handleAxiosResponse)
  .then(handleOTPResponse);

interface IOTPResponse {
  status: string;
  message: string;
}

const handleOTPResponse = (response: IOTPResponse): Promise<any> => {
  if (response.status !== OTP_STATUS.SUCCESS) {
    return Promise.reject(response.message);
  }
  return Promise.resolve(response);
};


export const authService = {
  login,
  logout,
  getUser,
  refreshToken,
  updatePhoneNumber,
  verifyOTP,
  loginOTP,
  loginAsGuest,
};
