import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/userSlice";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center mt-16 justify-center h-screen">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex items-center mt-16 justify-center h-screen">
        <div className="text-center text-gray-500">
          <h2 className="text-xl font-semibold">No user data available</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 mt-14 bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Cover Image and Profile Picture */}
      <div
        className="relative h-56 flex items-end justify-center"
        style={{
          backgroundImage: `url(${assets.backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute -bottom-16">
          <img
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
            src={`${BASE_URL}/${user.picture}`}
            alt={`${user.fullName}'s avatar`}
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-20 px-6 pb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{user.fullName}</h1>
          
          <div className="flex flex-col gap-1 my-4">
            <div className="flex items-center justify-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>{user.email}</span>
            </div>
            
            {user.phone && (
              <div className="flex items-center justify-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>{user.phone}</span>
              </div>
            )}
            
            {user.address && (
              <div className="flex items-center justify-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{user.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Information Cards */}
        <div className="bg-gray-300 p-6 rounded-xl mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Account Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium">{user.role || "Customer"}</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;