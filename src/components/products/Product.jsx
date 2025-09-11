import React from 'react'
import UpdateProduct from './UpdateProduct';
import { useNavigate } from 'react-router-dom';

function Product({ id, name, description, price,refreshProducts }) {

  const navigate=useNavigate();

  const deleteProduct=()=>{
    fetch(`http://localhost:8080/products/${id}`,{method:"DELETE"})
    .then(res=>{
      refreshProducts()
       return  res.json();
    })
    .then(res=>alert("Product deleted"))
  }
  return (
    <div className='col'>
      <div class="card" style={{ width: 18 + "rem" }}>
        {}
        
        <img src={`http://localhost:8080/products/${id}/image?${Date.now()}`} class="card-img-top" alt="..." />
        <div class="card-body">
          <p class="card-text">{name}</p>
          <p class="card-text">{description}</p>
          <p class="card-text">Price {price}</p>

<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#exampleModal${id}`}>
  Update
</button>

          <button className='btn btn-danger mx-2' onClick={deleteProduct}>Delete</button>
          <div class="d-grid gap-2 mt-2">
             <button class="btn btn-primary" type="button" onClick={()=>navigate(`/products/${id}`)}>View Detail</button>
          </div>


<UpdateProduct id={id} 
name={name} 
description={description} 
price={price} 
refreshProducts={refreshProducts}/>



        </div>
      </div>
    </div>
  )
}

export default Product