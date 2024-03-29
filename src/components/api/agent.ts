import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../routes/Routes";
import { PaginatedResponse } from "../../models/pagination.ts";

axios.defaults.baseURL = import.meta.env.VITE_APIURL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
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
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get("products", params),
  details: (id: number) => requests.get(`products/${id}`),
  getFilters: () => requests.get("products/filters"),
};

const TestErrors = {
  get400Error: () => requests.get("bad-request"),
  get401Error: () => requests.get("unauthorized"),
  get404Error: () => requests.get("not-found"),
  get500Error: () => requests.get("server-error"),
};

const Basket = {
  get: () => {
    const cookiesArray = document.cookie.split("; ");

    const buyerIdCookie = cookiesArray.find((cookie) =>
      cookie.startsWith("BuyerId=")
    );

    const extractedBuyerId = buyerIdCookie ? buyerIdCookie.split("=")[1] : null;

    return requests.get(`basket/${extractedBuyerId}`);
  },

  addItem: async (productId: number, quantity = 1) => {
    try {
      const cookiesArray = document.cookie.split("; ");

      const buyerIdCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("BuyerId=")
      );

      const extractedBuyerId = buyerIdCookie
        ? buyerIdCookie.split("=")[1]
        : null;

      const response = await requests.post(
        `basket/${extractedBuyerId}?productId=${productId}&quantity=${quantity}`,
        {}
      );

      const buyerId = response;

      if (buyerId !== undefined) {
        document.cookie = `BuyerId=${buyerId}; path=/`;
      }

      const secondResponse = Basket.get();

      return secondResponse;
    } catch (error) {
      console.error("Error adding item to basket : ", error);
    }
  },
  removeItem: (productId: number, quantity = 1) => {
    const cookiesArray = document.cookie.split("; ");

    const buyerIdCookie = cookiesArray.find((cookie) =>
      cookie.startsWith("BuyerId=")
    );

    const extractedBuyerId = buyerIdCookie ? buyerIdCookie.split("=")[1] : null;

    return requests.delete(
      `basket/${extractedBuyerId}?productId=${productId}&quantity=${quantity}`
    );
  },
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
};

export default agent;
