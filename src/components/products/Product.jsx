import React from 'react'

function Product({ id, name, description, price }) {

  const deleteProduct=()=>{
    fetch(`http://localhost:8080/products/${id}`,{method:"DELETE"})
    .then(res=>res.json())
    .then(res=>alert("Product deleted"))
  }
  return (
    <div className='col'>
      <div class="card" style={{ width: 18 + "rem" }}>
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <p class="card-text">{name}</p>
          <p class="card-text">{description}</p>
          <p class="card-text">Price {price}</p>

          <button className='btn btn-success mx-2'>Update</button>
          <button className='btn btn-danger mx-2' onClick={deleteProduct}>Delete</button>

        </div>
      </div>
    </div>
  )
}

export default Product