import axios, { AxiosInstance, AxiosResponse, HttpStatusCode } from "axios";
import { KeycloakService as keycloak } from "services";
import { RedirectUtil } from "utils";

const SERVER_URL = process.env.REACT_APP_BE_URL;

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 50000,
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      switch (error?.response?.status) {
        case HttpStatusCode.Unauthorized: {
          RedirectUtil.redirectToLoginPage();

          break;
        }

        default:
          return Promise.reject(error);
      }
    }
  );

  instance.interceptors.request.use(
    (config) => {
      const { token } = keycloak;
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const getFileNameFromResponse = (res: AxiosResponse): string => {
  const disposition = res.headers["content-disposition"];

  let filename = "360_feedback_report.xlsx"; // Default filename
  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }

  return filename;
};

export const http: AxiosInstance = createAxiosInstance();
