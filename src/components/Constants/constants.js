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

export const TOAST = {
  options: {
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      duration: 3000,
      theme: {
        primary: 'var(--green)',
        secondary: 'var(--black)',
      },
    },
    error: {
      duration: 3000,
      theme: {
        primary: 'var(--red-error)',
        secondary: 'var(--black)',
      },
    },
  },
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

const CONSTANTS = {
  USERS_ENDPOINTS,
  AXIOS,
  WATER_ENDPOINTS,
  WATER_LIMITS,
  USER,
};

export default CONSTANTS;
