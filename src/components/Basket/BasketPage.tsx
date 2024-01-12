import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./BasketSlice";

function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket)
    return <Typography variant="h3"> Your basket is empty !</Typography>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.product.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${item.product.price.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.product.id,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </Button>
                  {item.quantity}
                  <Button
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.product.id })
                      )
                    }
                    color="error"
                  >
                    <Add />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.product.id,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="secondary"
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default BasketPage;
