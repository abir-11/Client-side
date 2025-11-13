import React from 'react';
import { use } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const CropsDetails = () => {
    const Crops=useLoaderData();
    const [quantity, setQuantity] = useState(0);
    const [bids,setBids]=useState([]);
    const [message, setMessage] = useState('');
    const {pricePerUnit}=Crops;
    const totalPrice = quantity * pricePerUnit;
    console.log(Crops);
    const {_id:CropId}=Crops;
    const {user,loading}=use(AuthContext);
   
   
  if (loading) {
    return <p className='text-center text-lg text-green-600'>Loading...</p>;
  }



const handleBidSubmit=(e)=>{
       e.preventDefault();
        const name=e.target.name.value;
         const email=e.target.email.value;
         const message = e.target.message.value;
         const newBid={
            CropId:CropId,
            userEmail:email,
            userName:name,
            quantity:quantity,
            message:message,
            totalPrice: totalPrice,
            status:"pending"

         }
         fetch('http://localhost:3000/bids',{
            method:'POST',
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify(newBid)
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
       newBid._id=data.insertedId;
       const newBids =[...bids,newBid]
       newBids.sort((a,b)=>b.quantity-a.quantity)
       setBids(newBids)
       e.target.reset();
        setQuantity(0);
        setMessage("");
            }
            else{
              toast.error("Bid not saved!");  
            }
            console.log('after placing bid',data)
         })
    }

  return (
    <div className='max-w-11/12 mx-auto my-5 sm:my-10'>
      <div className='flex gap-10 flex-col sm:flex-row justify-center sm:items-center border-b border-gray-300 pb-10'>
        <div>
          <img
            src={Crops.image}
            alt={Crops.name}
            className='w-[316px] mx-auto h-[316px] overflow-hidden object-cover rounded-2xl bg-[#F1F5E8]'
          />
        </div>

        <div>
          <div className='border-b border-gray-300'>
            <h1 className='font-bold text-2xl sm:text-3xl text-[#001931]'>{Crops.name}</h1>
          </div>

          <div className='my-4 sm:my-7 flex gap-10 items-center'>
            <div>
              <ul>
                <li className='text-[#001931]'>pricePerUnit</li>
                <li className='font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931] '>{Crops.pricePerUnit}kg</li>
              </ul>
            </div>

            <div>
              <ul>
                <li className='text-[#001931]'>Quantity</li>
                <li className='font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931]'>{Crops.quantity}</li>
              </ul>
            </div>

            <div>
              <ul>
                <li className='text-[#001931]'>Type</li>
                <li className='font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931]'>{Crops.type}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='my-5'>
        <h3 className='text-xl sm:text-2xl font-semibold text-[#001931] mb-4'>Description</h3>
        <p className='text-base sm:text-xl sm:leading-8 text-[#627382] py-4'>{Crops.description}</p>
      </div>

      <div>
        <div>
            <h1 className=' text-3xl text-center mt-4 font-bold'>Crops Consulation</h1>
            <div className='mt-4 flex justify-center'>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  
  <form onSubmit={handleBidSubmit}>
  <label className="label">Name</label>
  <input type="text" className="input" name='name' defaultValue={user.displayName} />

  <label className="label">Email</label>
  <input type="email" className="input" name='email' defaultValue={user.email} />
  <label className="label">Quantity</label>
  <input type="number" className="input" name='quantity' placeholder='Quantity Number' value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))} />

    <label className="label">Message</label>
      <input
        type="text"
        className="input"
        placeholder="Enter your Message" name='message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

  <label className="label">Total Price</label>
  <input type="number" className="input" value={totalPrice} readOnly/>

  <button  className="btn w-full btn-outline border-green-800 hover:bg-green-800 hover:text-white mt-4">Submit</button>
  </form>

</fieldset>
            </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
    );
};

export default CropsDetails;