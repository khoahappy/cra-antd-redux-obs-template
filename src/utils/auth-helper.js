import { KJUR } from 'jsrsasign';
import { APP_STORAGE } from '../constants/app-consts';

/**
 * AccessToken interface
 */
export interface IAccessToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const getUserInfo = (): IAccessToken => JSON.parse(
  sessionStorage.getItem(APP_STORAGE.USER_INFO)
    || localStorage.getItem(APP_STORAGE.USER_INFO),
);
/**
 * Get token object from local/session storage
 */
export const getToken = (): IAccessToken => JSON.parse(sessionStorage.getItem(APP_STORAGE.TOKEN)
  || localStorage.getItem(APP_STORAGE.TOKEN));

/**
 * Get token object from local/session storage
 */
export const getGuestToken = (): any => sessionStorage.getItem(APP_STORAGE.GUEST_MODE)
  || localStorage.getItem(APP_STORAGE.GUEST_MODE);


// TODO: add jwt validator
/**
 * Check if token is valid
 */
export const isAuthenticated = () => {
  const token = getToken();
  return token && token !== null;
};
export const isGuestMode = () => {
  const guestToken = getGuestToken();
  return guestToken && getGuestToken() !== null;
};

/**
 * Save user token to local or session storage
 * @param token Token object (access_token, token_type, expires_in)
 * @param persist true = localstorage, false = sessionStorage
 */
export const saveToken = (token: any, persist: boolean = true) => (persist
  ? localStorage.setItem(APP_STORAGE.TOKEN, JSON.stringify(token))
  : sessionStorage.setItem(APP_STORAGE.TOKEN, JSON.stringify(token)));

/**
 *
 * @param guestVal Guest token object or string
 * @param persist true = localstorage, false = sessionStorage
 */
export const saveGuestToken = (guestVal: any, persist: boolean = true) => (persist
  ? localStorage.setItem(APP_STORAGE.GUEST_MODE, guestVal)
  : sessionStorage.setItem(APP_STORAGE.GUEST_MODE, guestVal));

export const saveUserInfo = (user: any, persist: boolean = true) => (persist
  ? localStorage.setItem(APP_STORAGE.USER_INFO, JSON.stringify(user))
  : sessionStorage.setItem(APP_STORAGE.USER_INFO, JSON.stringify(user)));

/**
 * Generate Auth Header from token provided
 */
export const authHeader = (): any => {
  // return authorization header with jwt token
  const user = getToken();

  if (user && user.access_token) {
    return { Authorization: `Bearer ${user.access_token}` };
  }
  return {};
};

const UNIX_DIV = 1000;
const getUNIXTimeStamp = (): number => Math.round(new Date().getTime() / UNIX_DIV);

/**
 * Verify access_token from the server, depent on the expire time of the token
 * @param token IAccessToken interface
 */
export const isTokenExpired = (token: IAccessToken): boolean => {
  let isValid = false;
  if (token) {
    // const intDate = KJUR.jws.IntDate;
    const tokenObj = KJUR.jws.JWS.parse(token.access_token, { alg: ['HS256'] });
    if (tokenObj.payloadObj) {
      const time = tokenObj.payloadObj.exp - getUNIXTimeStamp();
      isValid = time > 0;
    }
  }
  return !isValid;
};
