import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';
import toast from 'react-hot-toast';
import { logout, refresh } from 'src/redux/users/operations.js';

const AxiosWithCredentials = axios.create({
  baseURL: CONSTANTS.DOMAINS.SERVER_LOCALHOST,
  withCredentials: true,
});

AxiosWithCredentials.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = selectUserToken(state);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    toast.error(error.message);
    return Promise.reject(error);
  },
);

AxiosWithCredentials.interceptors.response.use(
  res => res,
  async err => {
    console.log('err.response in interceptors', err.response);
    const status = err?.response?.status || null;

    const originalRequest = err.config;

    // Проверка статуса ошибки и флага _retry
    if (status === 401 && !originalRequest._retry) {
      // Устанавливаем флаг _retry, чтобы предотвратить бесконечный цикл
      originalRequest._retry = true;
      console.log('Status 401 detected, attempting to refresh token...');
      try {
        const result = await store.dispatch(refresh()).unwrap();
        console.log('result in interceptors response', result);

        originalRequest.headers.Authorization = `Bearer ${result}`;

        // Повторяем оригинальный запрос
        return AxiosWithCredentials(originalRequest);
      } catch (refreshError) {
        console.log('Refresh failed:', refreshError);
        toast('Your session has expired. Please login');
        await store.dispatch(logout());
      }
    }

    // Возвращаем отклоненное обещание для других ошибок
    return Promise.reject(err);
  },
);

export default AxiosWithCredentials;
