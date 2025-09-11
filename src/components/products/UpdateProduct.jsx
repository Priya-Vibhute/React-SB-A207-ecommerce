import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function UpdateProduct({id,name,description,price,refreshProducts}) {

    const {handleSubmit,
        register,
        formState:{errors},  
    }=useForm({defaultValues:{name,description,price}})

    useEffect(()=>{},[])

    const onSubmit=(data)=>{

        fetch(`http://localhost:8080/product/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:data.name,
                description:data.description,
                price:data.price
            })
        }).then(res=>res.json())
        .then(p=>{

            alert(`${p.name} updated`);
            console.log(p);
            if(data.image?.[0])
            {
            let formData=new FormData();
            formData.append('product_image',data.image[0]);


            fetch(`http://localhost:8080/products/${id}/upload-image`,{
              method:"POST",
              body:formData
            }).then(res=>{
                res.text();
                refreshProducts();

            })
            .then(res=>{
              console.log(res);
              
            })
        }
        })
        

    }

    return (
        <div class="modal fade" id={`exampleModal${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">


                        <form className='p-4 '
                            onSubmit={handleSubmit(onSubmit)}>
                           

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Enter name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("name", { required: "Product name is required" })} />
                                {errors.name && <div id="emailHelp" className="form-text">{errors.name.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Enter description</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("description", { required: "Description is required" })} />
                                {errors.description && <div id="emailHelp" className="form-text">{errors.description.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Enter Price</label>
                                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("price", { required: "price is required" })} />
                                {errors.price && <div id="emailHelp" className="form-text">{errors.price.message}</div>}
                            </div>

                             <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Upload Product Image</label>
    <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    {...register('image')} />

  </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>





                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct