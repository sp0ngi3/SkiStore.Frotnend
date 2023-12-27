import { useEffect, useState } from "react";
import { Product } from "../../models/product";
import ProductList from "./ProductList";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  const API_URL = import.meta.env.VITE_APIURL;
  useEffect(() => {
    fetch(API_URL + "products")
      .then((response) => response.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default Catalog;
