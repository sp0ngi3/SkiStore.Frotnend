import {useState,useEffect} from 'react'
import './App.css'

function App() {
  
  const [products,setProducts]=useState([
  {name:'product1',price:100.00},
  {name:'product2',price:200.00}
  ])

  useEffect(()=>{
    fetch('http://localhost:12345/api/products')
    .then(response=>response.json())
    .then(data=>setProducts(data.data))
  },[])

  return (
    <div>
      <h1>SkiStore Frontend</h1>
      <ul>
         {products.map((item,index)=>(
          <li key={index}>{item.name} - {item.price}</li>
         ))}
      </ul>
    </div>
  )
}

export default App
