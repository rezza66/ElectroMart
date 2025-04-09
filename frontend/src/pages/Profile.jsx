import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/userSlice";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Profile = () => {
  const dispatch = useDispatch();

  // Ambil data user dan status loading dari Redux
  const { user, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();

  // Ambil data user saat komponen dimuat
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Redirect ke halaman edit profile
  };

  // Loading state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available.</div>;

  return (
    <div className="max-w-4xl mx-auto py-20 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Profile Image */}
      <div
        className="flex items-center justify-center h-48"
        style={{
          backgroundImage: `url(${assets.backgroundImg})`, 
          backgroundRepeat: "no-repeat", 
          backgroundSize: "cover", 
          backgroundPosition: "center",
        }}
      >
        <img
          className="w-32 h-32 rounded-full border-4 border-white"
          src={`${BASE_URL}/${user.picture}`}
          alt="User Avatar"
        />
      </div>

      {/* User Details */}
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold">{user.fullName}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">
          {user.address || "No address provided."}
        </p>
        <p className="text-gray-600">
          {user.phone || "No phone number provided."}
        </p>
      </div>

      {/* Order History */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4">Order History</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Example Product</td>
              <td className="py-2 px-4 border-b">2023-10-01</td>
              <td className="py-2 px-4 border-b">Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
