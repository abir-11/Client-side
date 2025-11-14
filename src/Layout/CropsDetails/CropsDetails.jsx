import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "./../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CropsDetails = () => {
  const crop = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isAlreadyInterested, setIsAlreadyInterested] = useState(false);
  const [interests, setInterests] = useState([]);

  const isOwner = user?.email === crop.owner?.ownerEmail;

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/interests/${crop._id}`)
        .then((res) => res.json())
        .then((data) => {
          const userInterest = data.find(
            (interest) => interest.userEmail === user.email
          );
          setIsAlreadyInterested(!!userInterest);
          if (isOwner) {
            setInterests(data);
          }
        })
        .catch(() => toast.error("Failed to load interests"));
    }
  }, [crop._id, user?.email, isOwner]);

  if (loading) {
    return <p className="text-center text-lg text-green-600">Loading...</p>;
  }

  const handleQuantity = (e) => {
    const quantity = parseInt(e.target.value) || 0;
    const totalPrice = crop.pricePerUnit * quantity;
    setCalculatedPrice(totalPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isOwner) {
      toast.error("You cannot express interest in your own crop!");
      return;
    }

    if (isAlreadyInterested) {
      toast.error("You have already submitted an interest for this crop!");
      return;
    }

    const form = e.target;
    const quantity = parseInt(form.quantity.value);
    const message = form.description.value;

    if (quantity <= 0) {
      toast.error("Please enter a valid quantity!");
      return;
    }

    if (quantity > crop.quantity) {
      toast.error(
        `Requested quantity exceeds available stock (${crop.quantity} kg)`
      );
      return;
    }

    const totalPrice = crop.pricePerUnit * quantity;

    const interest = {
      cropId: crop._id,
      cropName:crop.name,
      userEmail: user?.email,
      userName: user?.displayName || "User",
      quantity: quantity,
      message: message,
      totalPrice: totalPrice,
      status: "pending",
      owner:{
        ownerName:crop?.owner?.ownerName,
        ownerEmail:crop?.owner?.ownerEmail

      }
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to submit this interest?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/interests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interest),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Server response:", data);

            if (data.insertedId) {
              Swal.fire({
                title: "Submitted!",
                text: "Your interest has been submitted successfully.",
                icon: "success",
              });

              setIsAlreadyInterested(true);
              form.reset();
              setCalculatedPrice(0);
            } else if (data.message) {
              toast.error(data.message);
            } else {
              toast.error("Failed to submit interest!");
            }
          })
          .catch((error) => {
            console.error("Error submitting interest:", error);
            toast.error("An error occurred while submitting!");
          });
      }
    });
  };

  const handleInterest = (interestId, action) => {
    fetch(`http://localhost:3000/interests/${interestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: action }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(`Interest ${action} successfully!`);
        setInterests(
          interests.map((interest) =>
            interest._id === interestId
              ? { ...interest, status: action }
              : interest
          )
        );
      })
      .catch(() => toast.error("Failed to update interest"));
  };

  return (
    <div className="max-w-11/12 mx-auto my-5 sm:my-10">
      <div className="flex gap-10 flex-col sm:flex-row justify-center sm:items-center border-b border-gray-300 pb-10">
        <div>
          <img
            src={crop.image}
            alt={crop.name}
            className="w-[316px] mx-auto h-[316px] overflow-hidden object-cover rounded-2xl bg-[#F1F5E8]"
          />
        </div>

        <div>
          <div className="border-b border-gray-300">
            <h1 className="font-bold text-2xl sm:text-3xl text-[#001931]">
              {crop.name}
            </h1>
            {isOwner ? (
              <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded mt-2">
                Your Crop
              </span>
            ):<span  className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded mt-2">
              {crop?.owner?.ownerName ||  "Unknown Owner" } <br />
              {crop?.owner?.ownerEmail || "No Email Available"}
              </span>}
              
          </div>

          <div className="my-4 sm:my-7 flex gap-10 items-center">
            <div>
              <ul>
                <li className="text-[#001931]">Price Per Unit</li>
                <li className="font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931]">
                  {crop.pricePerUnit} tk
                </li>
              </ul>
            </div>

            <div>
              <ul>
                <li className="text-[#001931]">Available Quantity</li>
                <li className="font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931]">
                  {crop.quantity} kg
                </li>
              </ul>
            </div>

            <div>
              <ul>
                <li className="text-[#001931]">Type</li>
                <li className="font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931]">
                  {crop.type}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#001931] mb-4">
          Description
        </h3>
        <p className="text-base sm:text-xl sm:leading-8 text-[#627382] py-4">
          {crop.description}
        </p>
      </div>
      {!isOwner && !isAlreadyInterested && (
        <div>
          <h1 className="text-3xl text-center mt-4 font-bold">Interest Form</h1>
          <div className="mt-4 flex justify-center">
            <fieldset className="fieldset border-base-300 rounded-box w-full max-w-md border p-4 bg-base-200">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="label">Your Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-gray-100"
                    name="name"
                    placeholder="Enter your name"
                    defaultValue={user?.displayName || ""}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="label">Your Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full bg-gray-100"
                    name="email"
                    placeholder="Your email"
                    defaultValue={user?.email || ""}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="label">Crop Type</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-gray-100"
                    value={crop.type}
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label className="label">Price Per Unit</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-gray-100"
                    value={`${crop.pricePerUnit} tk`}
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label className="label">Quantity (kg)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    name="quantity"
                    placeholder="Enter quantity in kg"
                    min="1"
                    max={crop.quantity}
                    onChange={handleQuantity}
                    required
                  />
                
                </div>

                <div className="mb-4">
                  <label className="label">Total Price</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-green-50 font-bold"
                    value={`${calculatedPrice} tk`}
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label className="label">Message</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    name="description"
                    placeholder="Enter your message"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-full btn-outline border-green-800 hover:bg-green-800 hover:text-white mt-4"
                >
                  Submit Interest
                </button>
              </form>
            </fieldset>
          </div>
        </div>
      )}

      {!isOwner && isAlreadyInterested && (
        <div className="text-center my-8 p-4 bg-yellow-100 rounded-lg">
          <p className="text-lg text-yellow-800 font-semibold">
            You've already sent an interest for this crop!
          </p>
        </div>
      )}

      {isOwner && (
        <div className="my-8">
          <h2 className="text-2xl font-bold text-center mb-6">Received Interests</h2>
          {interests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Buyer Name</th>
                    <th>Quantity</th>
                    <th>Message</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interests.map((interest) => (
                    <tr key={interest._id}>
                      <td>{interest.userName}</td>
                      <td>{interest.quantity} kg</td>
                      <td>{interest.message}</td>
                      <td>${interest.totalPrice}</td>
                      <td>
                        <span
                          className={`badge ${
                            interest.status === "accepted"
                              ? "badge-success"
                              : interest.status === "rejected"
                              ? "badge-error"
                              : "badge-warning"
                          }`}
                        >
                          {interest.status}
                        </span>
                      </td>
                      <td>
                        {interest.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleInterest(interest._id, "accepted")}
                              className="btn btn-sm btn-success"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleInterest(interest._id, "rejected")}
                              className="btn btn-sm btn-error"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-100 rounded-lg">
              <p className="text-gray-600">No interests received yet.</p>
            </div>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CropsDetails;