import {useState,useEffect} from 'react'
import './App.css'
import { Product } from './models/product'
import Catalog from './components/Catalog'

function App() {
  
  const [products,setProducts]=useState<Product[]>([])

  useEffect(()=>{
    fetch('http://localhost:12345/api/products')
    .then(response=>response.json())
    .then(data=>setProducts(data.data))
  },[])

  return (
    <div>
      <h1>SkiStore Frontend</h1>
     <Catalog products={products}/>
    </div>
  )
}

export default App
