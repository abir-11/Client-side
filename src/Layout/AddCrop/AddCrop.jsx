import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCrop = () => {
  const { user, loading } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);

  if (loading) {
    return <p className='text-center text-lg text-green-600'>Loading...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const pricePerUnit = parseFloat(form.pricePerUnit.value);
    const quantity = parseInt(form.quantity.value);
    const description = form.description.value;
    const image = form.image.value;
    const location=form.location.value;

    const cropData = {
      name: name,
      type: type,
      pricePerUnit: pricePerUnit,
      unit: "kg",
      quantity: quantity,
      description: description,
      location: location,
      image: image,
      status: "pending",
      owner: {
        ownerEmail: user?.email,
        ownerName: user?.displayName || "User"
      },
      interests: [],
      createAt:new Date()
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this crop?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://my-krishilink.vercel.app/krishiCard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cropData),
        })
          .then((res) => res.json())
          .then((data) => {
           // console.log("Server response:", data);

            if (data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Your crop has been added successfully.",
                icon: "success",
              });

              
              cropData._id = data.insertedId;
              const newCrops = [...crops, cropData];
              newCrops.sort((a, b) => b.quantity - a.quantity);
              setCrops(newCrops);
              form.reset();
            } else {
              toast("Crop not saved!");
            }
          })
          .catch((error) => {
           
            toast("An error occurred while adding the crop!",error);
          });
      }
    });
  };

  return (
    <div className='min-h-screen rounded-2xl m-5 bg-green-50'>
      <div>
        <h1 className='text-3xl text-center pt-4 text-green-800 font-bold'>Add Crops</h1>
        <div className='mt-4 flex justify-center'>
          <fieldset className="fieldset border-base-300 rounded-box w-full max-w-md border p-4 bg-green-100">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="label">Crop Name</label>
                <input
                  type="text"
                  className="input bg-transparent border-gray-400 input-bordered w-full"
                  name='name'
                  placeholder='Enter crop name'
                  required
                />
              </div>
                 <div className="mb-4">
                <label className="label">Location</label>
                <input
                  type="text"
                  className="input bg-transparent border-gray-400 input-bordered w-full"
                  name='location'
                  placeholder='Enter your crop location'
                  required
                />
              </div>
              <div className="mb-4">
                <label className="label">Type</label>
                <select
                  name='type'
                  className="select bg-transparent border-gray-400 select-bordered w-full"
                  required
                  defaultValue=""
                >
                 <div className='bg-green-100 p-5 rounded-2xl'>
                   <option value="" className='bg-white mb-1' disabled>Select crop type</option>
                  <option value="Fruit" className='bg-white'>Fruit</option>
                  <option value="Vegetable" className='bg-white mt-1'>Vegetable</option>
                 </div>

                </select>
              </div>

              <div className="mb-4">
                <label className="label">Price Per Unit ($)</label>
                <input
                  type="number"
                  className="input bg-transparent border-gray-400 input-bordered w-full"
                  name='pricePerUnit'
                  placeholder='Enter price per kg'
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label">Quantity (kg)</label>
                <input
                  type="number"
                  className="input bg-transparent border-gray-400 input-bordered w-full"
                  name='quantity'
                  placeholder='Enter quantity in kg'
                  min="1"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label">Description</label>
                <textarea
                  className="textarea bg-transparent border-gray-400 textarea-bordered w-full"
                  name='description'
                  placeholder="Enter crop description"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="label">Image URL</label>
                <input
                  type="url"
                  name='image'
                  className="input bg-transparent border-gray-400 input-bordered w-full"
                  placeholder="Enter image URL"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-full btn-outline border-green-800 hover:bg-green-800 hover:text-white mt-4"
              >
                Add Crop
              </button>
            </form>
          </fieldset>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCrop;