import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../errors/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default Catalog;
