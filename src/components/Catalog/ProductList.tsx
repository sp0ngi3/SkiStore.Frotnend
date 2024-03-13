import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "../ProductCard";
import { useAppSelector } from "../../configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((item) => (
        <Grid item xs={4} key={item.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={item} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
