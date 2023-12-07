import { List } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "../ProductCard";

interface Props {
  products: Product[];
}

function ProductList({ products }: Props) {
  return (
    <List>
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </List>
  );
}

export default ProductList;
