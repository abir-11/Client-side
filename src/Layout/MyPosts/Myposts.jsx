import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { use } from "react";
import Swal from "sweetalert2";

const Myposts = () => {
  const loadedData = useLoaderData();
  const { user, loading } = use(AuthContext);
  const [crops, setCrops] = useState(loadedData); 
  const modalRef = useRef(null);
  const [editingCrop, setEditingCrop] = useState(null);

  if (loading) {
    return <p className="text-center text-lg text-green-600">Loading...</p>;
  }

  // open modal with selected data
  const handleModelRef = (crop) => {
    setEditingCrop(crop);
    modalRef.current.showModal();
  };

  // submit handler for edit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCrop = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: form.pricePerUnit.value,
      quantity: form.quantity.value,
      description: form.description.value,
      image: form.image.value,
    };

    fetch(`http://localhost:3000/my_krishi_card/${editingCrop._id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCrop),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0 || result.acknowledged) {
        //   update
          const updatedCrops = crops.map((item) =>
            item._id === editingCrop._id ? { ...item, ...updatedCrop } : item
          );
          setCrops(updatedCrops);

          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Your crop information has been updated successfully.",
          });

          modalRef.current.close(); 
        } else {
          Swal.fire({
            icon: "error",
            title: "Not Updated!",
            text: "Something went wrong. Try again.",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update crop.",
        });
      });
  };
   // Delete handler
  const handleDelete = (cropId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/my_krishi_card/${cropId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // Remove 
              const updatedCrops = crops.filter((c) => c._id !== cropId);
              setCrops(updatedCrops);

              Swal.fire("Deleted!", "Your crop has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Crop could not be deleted.", "error");
            }
          })
          .catch(() => Swal.fire("Error!", "Failed to delete.", "error"));
      }
    });
  };


  return (
    <div className="min-h-screen mt-4 px-2 sm:px-4 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        My Posts
      </h1>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-green-200 text-sm md:text-base">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((datas, index) => (
              <tr key={datas._id || index}>
                <td>{index + 1}</td>
                <td>{datas.type}</td>
                <td className="flex items-center gap-3">
                  <img
                    src={datas.image}
                    alt={datas.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-bold">{datas.name}</p>
                    <p className="text-xs opacity-70">
                     pricePerUnit: {datas.pricePerUnit}/kg | Quantity: {datas.quantity}
                    </p>
                  </div>
                </td>
                <td className="break-all">{datas.owner?.ownerEmail}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleModelRef(datas)}
                      className="btn btn-outline btn-xs border-green-800 hover:bg-green-800 hover:text-white"
                    >
                      Edit
                    </button>
                    <button onClick={handleDelete} className="btn btn-outline btn-xs border-red-600 hover:bg-red-600 hover:text-white">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* small screen responsive cards */}
      <div className="md:hidden flex flex-col gap-3">
        {crops.map((datas, index) => (
          <div key={datas._id || index} className="bg-green-50 p-3 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <img
                src={datas.image}
                alt={datas.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <p className="font-bold">{datas.name}</p>
                <p className="text-sm opacity-70">
                  Type: {datas.type} | {datas.location}
                </p>
                <p className="text-xs">
                  pricePerUnit: {datas.pricePerUnit}/kg | Quantity: {datas.quantity}
                </p>
              </div>
            </div>
            <div className="mt-3 text-xs">
              <p>
                <span className="font-semibold">Owner:</span>{" "}
                {datas.owner?.ownerName}
              </p>
              <p className="break-all">{datas.owner?.ownerEmail}</p>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => handleModelRef(datas)}
                className="btn btn-outline btn-xs border-green-800 hover:bg-green-800 hover:text-white"
              >
                Edit
              </button>
              <button onClick={handleDelete} className="btn btn-xs btn-outline border-red-600 hover:bg-red-600 hover:text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Common Modal for both views */}
      <dialog ref={modalRef} className="modal modal-middle">
        <div className="modal-box max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Edit Crop</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              defaultValue={editingCrop?.name}
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <select
              name="type"
              defaultValue={editingCrop?.type}
              className="select select-bordered w-full"
            >
              <option disabled>Type</option>
              <option>Fruit</option>
              <option>Vegetable</option>
            </select>
            <input
              type="number"
              name="pricePerUnit"
              defaultValue={editingCrop?.pricePerUnit}
              placeholder="Price per Unit"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="quantity"
              defaultValue={editingCrop?.quantity}
              placeholder="Quantity"
              className="input input-bordered w-full"
            />
            <textarea
              name="description"
              defaultValue={editingCrop?.description}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
            />
            <input
              type="text"
              name="image"
              defaultValue={editingCrop?.image}
              placeholder="Image URL"
              className="input input-bordered w-full"
            />
            <button
              type="submit"
              className="btn w-full btn-outline border-green-800 hover:bg-green-800 hover:text-white"
            >
              Submit
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline btn-xs border-green-800 hover:bg-green-800 hover:text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Myposts;
