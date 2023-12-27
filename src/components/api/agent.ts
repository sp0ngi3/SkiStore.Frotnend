import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APIURL;

const responseBody = (response: AxiosResponse) => response.data.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const agent = {
  Catalog,
};

export default agent;
