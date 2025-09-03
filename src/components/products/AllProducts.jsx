import React, { useEffect, useState } from 'react'
import Product from './Product'

function AllProducts() {

  const [products,setProducts]=useState(null);

  const fetchProducts=()=>{
    fetch("http://localhost:8080/products")
    .then(res=>res.json())
    .then(data=>setProducts(data))
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  return (
    <div className='container'>

      <div className="row">

        {products && products.map((p,i)=><Product key={i} 
          id={p.id} 
          name={p.name}
          description={p.description}
          price={p.price}
          />)}

      </div>

          
    </div>
  )
}

export default AllProducts