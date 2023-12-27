import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../routes/Routes";

axios.defaults.baseURL = import.meta.env.VITE_APIURL;

const responseBody = (response: AxiosResponse) => response.data.data;

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { status, data } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error("Bad Request !");
        break;
      case 401:
        toast.error("Unauthorized !");
        break;
      case 404:
        toast.error("Not Found ! ");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
  }
);

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

const TestErrors = {
  get400Error: () => requests.get("bad-request"),
  get401Error: () => requests.get("unauthorized"),
  get404Error: () => requests.get("not-found"),
  get500Error: () => requests.get("server-error"),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
