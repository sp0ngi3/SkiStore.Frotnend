import { Product } from "./product";

export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
  product: Product;
}

export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
}
