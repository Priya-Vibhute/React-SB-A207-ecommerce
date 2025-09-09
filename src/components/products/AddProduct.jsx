import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import {ToastContainer,toast} from 'react-toastify'


function AddProduct() {

  const [categories,setCategories]=useState(null);

   const {
    handleSubmit,
    register,
    formState:{errors},
    reset}= useForm()


    const onSubmit=(data)=>{
        console.log(data);

        // Adding Product 
        fetch("http://localhost:8080/products",{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              id:data.id,
              name:data.name,
              description:data.description,
              price:data.price

            })
        }).then(res=>res.json())
        .then(res=>{
            console.log(res,data.category);

            fetch(`http://localhost:8080/product/${res.id}/category`,{
              method:"PUT",
              headers:{
                "Content-type":"text/uri-list"
              },
              body:data.category
            })

            let formData=new FormData();
            formData.append('product_image',data.image[0]);


            fetch(`http://localhost:8080/products/${res.id}/upload-image`,{
              method:"POST",
              body:formData
            }).then(res=>res.text())
            .then(res=>{
              console.log(res);
              
            })

            
            toast.success(`${res.name} added`,{autoClose:1000})
            reset();
        })
        .catch(error=>toast.error("failed to add product"))


        
    }

  const fetchCategories=()=>{
    fetch("http://127.0.0.1:8080/categories")
    .then(response=>response.json())
    .then(data=>setCategories(data["_embedded"]["categories"]))
  }

  useEffect(()=>{
    fetchCategories();
  },[])
 
  return (
    <form className='container m-3 p-4 border border-secondary ' 
    onSubmit={handleSubmit(onSubmit)} >
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Enter id</label>
    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("id",{required:"Id is required"})}/>
   {errors.id && <div id="emailHelp" className="form-text">{errors.id.message}</div>}
  </div>

  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Enter name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("name",{required:"Product name is required"})}/>
   {errors.name && <div id="emailHelp" className="form-text">{errors.name.message}</div>}
  </div>

  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Enter description</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("description",{required:"Description is required"})}/>
   {errors.description && <div id="emailHelp" className="form-text">{errors.description.message}</div>}
  </div>

  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Enter Price</label>
    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("price",{required:"price is required"})}/>
   {errors.price && <div id="emailHelp" className="form-text">{errors.price.message}</div>}
  </div>
  
  <div className="mb-3">
              

    <select class="form-select" aria-label="Default select example" {...register("category")}>

        {categories && categories.map((c,i)=>  <option value={c._links.self.href} key={i}>{c.name}</option>
)}

</select>

  </div>

  <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Upload Product Image</label>
    <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    {...register('image')} />

  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <ToastContainer/>
</form>
  )
}

export default AddProduct