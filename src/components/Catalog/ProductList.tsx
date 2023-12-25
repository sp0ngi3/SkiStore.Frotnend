import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "../ProductCard";

interface Props {
  products: Product[];
}

function ProductList({ products }: Props) {
  return (
    <Grid container spacing={3}>
      {products.map((item) => (
        <Grid item xs={4} key={item.id}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
