import {
  Box,
  Button,
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
import { useStoreContext } from "../../context/StoreContextValue";
import { useState } from "react";
import agent from "../api/agent";

function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function handleRemoveItem(productId: number, quantity = 1) {
    setLoading(true);
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  if (!basket)
    return <Typography variant="h3"> Your basket is empty !</Typography>;
  return (
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
                  onClick={() => handleRemoveItem(item.product.id)}
                  color="error"
                >
                  <Remove />
                </Button>
                {item.quantity}
                <Button
                  onClick={() => handleAddItem(item.product.id)}
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
                    handleRemoveItem(item.product.id, item.quantity)
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
  );
}

export default BasketPage;
