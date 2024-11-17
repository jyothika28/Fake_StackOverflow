import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const REACT_APP_API_URL = "http://localhost:8000";

const handleRes = (res: AxiosResponse): AxiosResponse => {
  return res;
};

const handleErr = (err: AxiosError): Promise<never> => {
  console.error(err);
  return Promise.reject(err);
};

const api = axios.create({ withCredentials: true });

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
  (error: AxiosError): Promise<never> => handleErr(error)
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => handleRes(response),
  (error: AxiosError): Promise<never> => handleErr(error)
);

export { REACT_APP_API_URL, api };
