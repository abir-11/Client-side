import React, { useState } from 'react';
import { use } from 'react';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { AuthContext } from './../../Context/AuthContext/AuthContext';



const Profile = ({children}) => {
    const {user,loading,setUser}=use(AuthContext);
    const [name,setName]=useState(user?.displayName || '');
    const [photo,setPhoto]=useState(user?.photoURL || '');
    const location=useLocation();
    if(loading){
         return <p className='text-center text-lg text-green-600'>Loading...</p>;
    }
  const handleUpdate = async () => {
  if (!user) {
    console.log("No user logged in");
    return;
  }

  const updates = {
    ...(name && { displayName: name }),
    ...(photo && { photoURL: photo })
  };

  try {
    console.log("Updating profile...", updates);
    await updateProfile(user, updates);
    await user.reload(); 
    setUser({ ...user }); 
    toast.success('Profile updated successfully!');
  } catch (error) {
    console.error("Profile update error:", error.message);
    toast.error(`Update failed: ${error.message}`);
  }
};

    if(user){
        return(
            <div className='bg-green-50 min-h-screen'>
                <div className='pt-3 pb-10 w-11/12 mx-auto'>
                    <h1 className='text-3xl font-extrabold text-center '>My Profile</h1>
                </div>
                <div className='max-w-6xl mx-auto bg-green-200 flex items-center justify-center gap-3 sm:gap-20 py-10 rounded-full'>
                    <div>
                        <img src={user?.photoURL} alt="" referrerpolicy="no-referrer" className='w-[200px] sm:w-[250px] sm:h-[250px] rounded-full'/>
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold'>{user.displayName}</h1>
                        <p className=' text-xl font-medium '>{user.email}</p>
                    </div>
                </div>

                <div className='max-w-6xl mx-auto bg-green-200 flex items-center justify-center gap-3 sm:gap-20 py-10 rounded-full mt-5'>
                     <div className='flex flex-col gap-4 '>
                       <input type="text" placeholder="Display  name" value={name} className="input input-accent " onChange={(e)=>{setName(e.target.value)}} />

                      <input type="text" placeholder="PhotoURl" value={photo} className="input input-accent" onChange={(e)=>{setPhoto(e.target. value)}}/>
                     </div>
                    <div className=''>
                         <button onClick={handleUpdate} className="btn btn-accent w-full"> Update Profile</button>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        );
    }
    return <Navigate state={location?.pathname} to='/login'>
        
    </Navigate>
};

export default Profile;