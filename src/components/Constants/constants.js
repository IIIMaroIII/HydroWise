import firstUserMob1x from '../../assets/pictures/HomePage/user-first-mob.webp';
import firstUserMob2x from '../../assets/pictures/HomePage/user-first-mob@2x.webp';
import secondUserMob1x from '../../assets/pictures/HomePage/user-second-mob.webp';
import secondUserMob2x from '../../assets/pictures/HomePage/user-second-mob@2x.webp';
import thirdUserMob1x from '../../assets/pictures/HomePage/user-third-mob.webp';
import thirdUserMob2x from '../../assets/pictures/HomePage/user-third-mob@2x.webp';
import firstUser1x from '../../assets/pictures/HomePage/user-first.webp';
import firstUser2x from '../../assets/pictures/HomePage/user-first@2x.webp';
import secondUser1x from '../../assets/pictures/HomePage/user-second.webp';
import secondUser2x from '../../assets/pictures/HomePage/user-second@2x.webp';
import thirdUser1x from '../../assets/pictures/HomePage/user-third.webp';
import thirdUser2x from '../../assets/pictures/HomePage/user-third@2x.webp';

const USERS_ENDPOINTS = {
  signUp: '/v1/users/register',
  signIn: '/v1/users/login',
  logout: '/v1/users/logout',
  refresh: '/v1/users/refresh',
  requestResetPassword: '/request-reset-password',
  resetPassword: '/reset-pwd',
  getGoogleUrl: '/get-oauth-url',
  confirmGoogleAuhorization: '/confirm-oauth',
};

const AXIOS = {
  baseURL: 'https://waterwise-backend.onrender.com',
};

const WATER_ENDPOINTS = {
  water: '/v1/water/',
  daily: '/v1/water/daily',
  monthly: '/v1/water/monthly',
};

const WATER_LIMITS = {
  MIN_WATER_LIMIT: 10,
  MAX_WATER_LIMIT: 5000,
};

const USER = {
  DEFAULT_USER_IMAGE:
    'https://img.icons8.com/?size=100&id=8VXh2TzKXNG8&format=png&color=000000',
};

export const IMAGES = {
  firstUserMob1x: firstUserMob1x,
  firstUserMob2x: firstUserMob2x,
  firstUser1x: firstUser1x,
  firstUser2x: firstUser2x,
  secondUserMob1x: secondUserMob1x,
  secondUserMob2x: secondUserMob2x,
  secondUser1x: secondUser1x,
  secondUser2x: secondUser2x,
  thirdUserMob1x: thirdUserMob1x,
  thirdUserMob2x: thirdUserMob2x,
  thirdUser1x: thirdUser1x,
  thirdUser2x: thirdUser2x,
};

const CONSTANTS = {
  USERS_ENDPOINTS,
  AXIOS,
  WATER_ENDPOINTS,
  WATER_LIMITS,
  USER,
};

export default CONSTANTS;
