import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login, register } from "../../redux/authSlice"; // Sesuaikan path file authSlice
import { fetchCart } from "../../redux/cartSlice";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("user");
  const [picture, setPicture] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    if (picture) {
      formData.append("picture", picture);
    }

    if (currState === "Login") {
      dispatch(login({ email, password })).then((response) => {
        if (response.type === "auth/login/fulfilled") {
          Swal.fire({
            icon: "success",
            title: "Login Berhasil",
            text: `Selamat datang, ${response.payload.user.fullName}!`,
            timer: 2000,
            showConfirmButton: false,
          });
          setShowLogin(false);
          navigate("/");
          dispatch(fetchCart(response.payload.user.id));
;
        }
      });
    } else {
      dispatch(register(formData)).then((response) => {
        if (response.type === "auth/register/fulfilled") {
          Swal.fire({
            icon: "success",
            title: "Registrasi Berhasil",
            text: "Akun Anda berhasil dibuat! Silakan login.",
            timer: 2000,
            showConfirmButton: false,
          });
          setCurrState("Login");
        }
      });
    }
  };

  useEffect(() => {
    if (user) {
      setShowLogin(false);
      navigate("/");
    }
  }, [user, navigate, setShowLogin]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center py-28 justify-center bg-black/50">
  <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-[50vw] min-w-[700px]">
    {/* Gambar di Samping */}
    <div
      className={`hidden md:flex justify-center items-center ${
        currState === "Sign Up" ? "w-[40%] p-4" : "w-1/2"
      }`}
    >
      <img
        src={currState === "Login" ? assets.loginImage : assets.registerImage}
        alt="Authentication Illustration"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>

    {/* Form Login/Register */}
    <form
      onSubmit={handleSubmit}
      className={`w-full md:w-1/2 text-gray-500 flex flex-col gap-6 p-6 text-sm ${
        currState === "Sign Up" ? "mt-8" : "mt-0"
      }`}
    >
      <div className="flex justify-between items-center text-black">
        <h2 className="text-lg font-bold">{currState}</h2>
        <img
          onClick={() => setShowLogin(false)}
          src={assets.crossIcon}
          alt=""
          className="w-4 cursor-pointer"
        />
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-5">
        {currState !== "Login" && (
          <input
            type="text"
            placeholder="Your name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="outline-none border border-gray-300 p-2 rounded-md"
          />
        )}
        <input
          type="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border border-gray-300 p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none border border-gray-300 p-2 rounded-md"
        />
        {currState !== "Login" && (
          <>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="outline-none border border-gray-300 p-2 rounded-md opacity-80"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPicture(e.target.files[0])}
              className="outline-none border border-gray-300 p-2 rounded-md opacity-80"
            />
          </>
        )}
      </div>

      <button
        type="submit"
        className="border-none p-2 rounded-md text-white bg-blue-500 text-base cursor-pointer 
        hover:bg-blue-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {currState === "Sign Up" ? "Create account" : "Login"}
      </button>

      <div className="flex items-start gap-2 mt-[-15px]">
        <input type="checkbox" required className="mt-[5px]" />
        <p>
          By continuing, I agree to the{" "}
          <span className="text-tomato font-medium cursor-pointer">
            terms of use & privacy policy
          </span>
          .
        </p>
      </div>

      {currState === "Login" ? (
        <p>
          Create a new account?{" "}
          <span
            onClick={() => setCurrState("Sign Up")}
            className="text-tomato font-medium cursor-pointer"
          >
            Click here
          </span>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <span
            onClick={() => setCurrState("Login")}
            className="text-tomato font-medium cursor-pointer"
          >
            Login here
          </span>
        </p>
      )}
    </form>
  </div>
</div>

  );
};

export default LoginPopup;
