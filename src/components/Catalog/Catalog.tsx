import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Product } from "../../models/product";
import ProductList from "./ProductList";

interface Props {
  products: Product[];
}
function Catalog({ products }: Props) {
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default Catalog;
