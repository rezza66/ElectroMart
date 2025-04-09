import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);

  // State untuk form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();

  // Ambil data user saat komponen pertama kali dirender
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    } else {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [dispatch, user]);

  // Handle perubahan file gambar
  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user || !user._id) {
      alert("User ID not found.");
      return;
    }
  
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    if (picture) {
      formData.append("picture", picture);
    }
  
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("No access token available");
      return;
    }
  
    try {
      await axios.put(`${BASE_URL}/user/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Ambil ulang data user setelah update
      await dispatch(fetchUserProfile());
  
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile.");
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available.</div>;

  return (
    <div className="max-w-2xl mx-auto py-24 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded-lg" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditUser;
