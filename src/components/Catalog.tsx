import { Product } from "../models/product";

interface Props {
  products: Product[];
}
function Catalog(props: any) {
  return (
    <>
      <ul>
        {props.products.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Catalog;
