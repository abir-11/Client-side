import React, { useState } from 'react';
import { use } from 'react';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { AuthContext } from './../../Context/AuthContext/AuthContext';

const Profile = ({ children }) => {
    const { user, loading, setUser } = use(AuthContext);
    const [name, setName] = useState(user?.displayName || '');
    const [photo, setPhoto] = useState(user?.photoURL || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-3 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    const handleUpdate = async () => {
        if (!user) return;
        if (!name.trim()) {
            toast.error('Please enter a display name');
            return;
        }

        const updates = {
            ...(name && { displayName: name }),
            ...(photo && { photoURL: photo })
        };

        try {
            setIsUpdating(true);
            await updateProfile(user, updates);
            await user.reload();
            setUser({ ...user });
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(`Update failed: ${error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };

    if (user) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
                        <p className="text-gray-600">Manage your personal information</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Profile Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-8">
                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                                        <img 
                                            src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=10B981&color=fff`} 
                                            alt={user?.displayName} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">{user.displayName}</h2>
                                    <p className="text-gray-600 mb-6">{user.email}</p>
                                    
                                   
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2">
                            <div className="space-y-8">
                                {/* Edit Form */}
                                <div className="bg-white rounded-xl shadow-2xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">Edit Profile</h3>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Display Name
                                            </label>
                                            <input 
                                                type="text" 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Profile Photo URL
                                            </label>
                                            <input 
                                                type="url" 
                                                value={photo}
                                                onChange={(e) => setPhoto(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                                placeholder="https://example.com/photo.jpg"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Leave empty to use default avatar</p>
                                        </div>

                                        <div className="pt-4">
                                            <button 
                                                onClick={handleUpdate}
                                                disabled={isUpdating || !name.trim()}
                                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                            >
                                                {isUpdating ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Saving...
                                                    </>
                                                ) : 'Save Changes'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional content */}
                                {children && (
                                    <div>
                                        {children}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <Navigate state={location?.pathname} to='/login' />;
};

export default Profile;