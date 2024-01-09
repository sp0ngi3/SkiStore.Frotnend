import { useEffect, useState } from "react";
import { Basket } from "../../models/basket";
import agent from "../api/agent";
import LoadingComponent from "../../errors/LoadingComponent";
import { Typography } from "@mui/material";

function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading basket..." />;
  if (!basket)
    return <Typography variant="h3"> Your basket is empty !</Typography>;
  return <h1>BuyerId : {basket.buyerId}</h1>;
}

export default BasketPage;
