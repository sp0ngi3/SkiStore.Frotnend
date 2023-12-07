import { useState, useEffect } from "react";
import "./App.css";
import { Product } from "./models/product";
import Catalog from "./components/Catalog/Catalog";
import Header from "./layout/Header";
import { Container, CssBaseline } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:12345/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} />
      </Container>
    </>
  );
}

export default App;
