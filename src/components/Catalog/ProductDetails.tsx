import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../errors/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../Basket/BasketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

function ProductDetails() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.catalog);
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, parseInt(id!))
  );
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.product.id === product?.id);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    if (!product) dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, item, dispatch, product]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCard() {
    if (!product) return;

    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (status.includes("pending"))
    return <LoadingComponent message="Loading product ..." />;
  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${product.price.toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={item?.quantity === quantity}
              onClick={handleUpdateCard}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to cart"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
