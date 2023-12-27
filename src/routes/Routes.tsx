import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import Catalog from "../components/Catalog/Catalog";
import ProductDetails from "../components/Catalog/ProductDetails";
import About from "../components/About/AboutPage";
import { ContactPage } from "@mui/icons-material";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);
