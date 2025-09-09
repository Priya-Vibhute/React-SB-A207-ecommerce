import React, { useEffect, useState } from 'react'
import Product from './Product'

function AllProducts() {

  const [products, setProducts] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [categories,setCategories]=useState(null)

  useEffect(()=>{},[products])

  const fetchProducts = () => {    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }



  const fetchCategories=()=>{
    fetch("http://127.0.0.1:8080/categories")
    .then(response=>response.json())
    .then(data=>setCategories(data["_embedded"]["categories"]))
  }

  const searchByPrice = (startPrice, endPrice) => {
    const url = endPrice ? 
    `http://127.0.0.1:8080/product/search/findBypriceBetween?startPrice=${startPrice}&endPrice=${endPrice}` : `http://127.0.0.1:8080/product/search/findBypriceGreaterThan?price=${startPrice}`
    
    fetch(url)
      .then(res => res.json())
      .then(data =>{
         setProducts(data["_embedded"]["products"])
        console.log(data);
        
      })
  }

  const fetchProductByCategory=(link)=>{
    fetch(`${link}/products`)
    .then(res=>res.json())
    .then(data=>setProducts(data["_embedded"]["products"]))
  }


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">

          <p>Search By name</p>
          <input type="text" className='mb-3' onChange={(e) => setKeyword(e.target.value)} />

          <ul class="list-group">
            <li class="list-group-item" onClick={()=>searchByPrice(100, 1000)}>100-1000</li>
            <li class="list-group-item" onClick={()=>searchByPrice(1000, 5000)}>1000-5000</li>
            <li class="list-group-item" onClick={()=>searchByPrice(5000)}>5000 & above</li>

          </ul>

          <br />

           <ul class="list-group">
            {categories && categories.map((c,i)=><li class="list-group-item"
             onClick={()=>fetchProductByCategory(c._links.self.href)}
             >{c.name}
             </li>)}

          </ul>



        </div>
        <div className="col">

          <div className='container'>

            <div className="row">

              {products && products
                .filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()))
                .map((p, i) => <Product key={i}
                  id={p.id}
                  name={p.name}
                  description={p.description}
                  price={p.price}
                  refreshProducts={fetchProducts}
                />)}

            </div>


          </div>


        </div>
      </div>
    </div>



  )
}

export default AllProducts