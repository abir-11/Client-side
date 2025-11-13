import React from 'react';
import { use } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AddCrop = () => {
    const {user,loading}=use(AuthContext);
    const [crop,setCrop]=useState([]);
    if (loading) {
    return <p className='text-center text-lg text-green-600'>Loading...</p>;
  }
    const handleSubmit=(e)=>{
         e.preventDefault();
        const name=e.target.name.value;
         const type=e.target.type.value;
         const pricePerUnit = e.target.pricePerUnit.value;
         const quantity=e.target.quantity.value;
         const description=e.target.description.value;
         const image=e.target.image.value;
         const cropsAdd={
            name:name,
            type:type,
            pricePerUnit:pricePerUnit,
            unit:"Kg",
            quantity:quantity,
            description:description,    
            location:"Bogura",
            image:image,
            owner:{
                ownerEmail:user?.email,
                ownerName:user?.displayName
            }

         }
         fetch('http://localhost:3000/my_krishi_card',{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(cropsAdd)
         })
         .then(res=>res.json())
         .then(data=>{
             if(data.insertedId){
                           Swal.fire({
              title: "Are you sure?",
              text: "You will be able to submit this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Submit it!"
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Submit!",
                  text: "Your file has been Sumbit.",
                  icon: "success"
                });
              }
            }); 
                   //add the new bid to the state
           cropsAdd._id = data.insertedId;
           const newCrops = [...crop, cropsAdd];
                   newCrops.sort((a,b)=>b.quantity-a.quantity)
                   setCrop(newCrops)
                   e.target.reset();
                   ;
                        }
                        else{
                          toast.error("Crops not saved!");  
                        }
                        console.log('after placing Crops',data)
                     })
         

              fetch('http://localhost:3000/krishiCard',{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(cropsAdd)
         })
         .then(res=>res.json())
         .then(data=>{
             if(data.insertedId){
                           Swal.fire({
              title: "Are you sure?",
              text: "You will be able to submit this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Submit it!"
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Submit!",
                  text: "Your file has been Sumbit.",
                  icon: "success"
                });
              }
            }); 
                   //add the new bid to the state
           cropsAdd._id = data.insertedId;
           const newCrops = [...crop, cropsAdd];
                   newCrops.sort((a,b)=>b.quantity-a.quantity)
                   setCrop(newCrops)
                   e.target.reset();
                   ;
                        }
                        else{
                          toast.error("Crops not saved!");  
                        }
                        console.log('after placing Crops',data)
                     })   
    }

    return (
        <div className='min-h-screen my-5'>
              <div>
            <h1 className=' text-3xl text-center mt-4 font-bold '>Add Crops</h1>
            <div className='mt-4 flex justify-center '>
                <fieldset className="fieldset  border-base-300 rounded-box w-xs border p-4 bg-base-200">
  
          <form onSubmit={handleSubmit} >
          <label className="label">Name</label>
         <input type="text" className="input" name='name' placeholder='Enter your name' />

        <label className="label">Type</label>
       <select defaultValue="Pick a color" name='type' className="select appearance-none">
      <option disabled={true}>type</option>
      <option>Fruit</option>
      <option>Vegetable</option>
      </select>
          <label className="label">pricePerUnit</label>
       <input type="number" className="input" name='pricePerUnit' placeholder='pricePerUnit'  />

      <label className="label">Quantity</label>
       <input type="number" className="input" name='quantity' placeholder='Quantity Number'  />

    <label className="label">Description</label>
      <textarea className="textarea" name='description' placeholder="description"></textarea>

       <label className="label">image</label>
          <input type="text" name='image' className="input" placeholder="image" />

  <button  className="btn w-full btn-outline border-green-800 hover:bg-green-800 hover:text-white mt-4">Submit</button>
  </form>

</fieldset>
            </div>
        </div>
        </div>
    );
};

export default AddCrop;