import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  const {id}=useParams();

  const [product,setProduct]=useState(null);

  const fetchProductById=()=>{
      fetch(`http://localhost:8080/products/${id}`)
      .then(res=>res.json())
      .then(res=>setProduct(res))
  }

  useEffect(()=>{
    fetchProductById();
  },[])


  return (
    <div>
{ product && <>

 <p>{product.name}</p>
      <img src={`http://localhost:8080/products/${id}/image?${Date.now()}`} alt="" />
      <p>{product.description}</p>


</>}
     


      


    </div>
  )
}

export default ProductDetail