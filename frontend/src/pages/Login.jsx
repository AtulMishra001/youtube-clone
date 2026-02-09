import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { FaYoutube } from "react-icons/fa";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      // Adjusted Payload: We are creating a User, not a Channel yet.
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const { data } = await api.post(endpoint, payload);

      if (data.token) {
        // Login successful
        login(data.user, data.token);
        navigate("/");
      } else {
        // Registration successful
        alert("Account created successfully! Please sign in.");
        setIsLogin(true); // Switch to login view
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)] bg-yt-black">
      <div className="bg-yt-light-gray p-8 rounded-xl w-full max-w-md border border-yt-border shadow-2xl">
        {/* LOGO & HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-yt-red p-2 rounded-full mb-2">
            <FaYoutube size={32} className="text-white" />
          </div>
          <h2 className="text-xl font-bold">
            {isLogin ? "Sign in" : "Create an account"}
          </h2>
          <p className="text-yt-text-secondary text-sm mt-1">
            to continue to YouTube Clone
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* USERNAME Field (For User Profile, NOT Channel Name) */}
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold ml-1 text-yt-text-secondary">
                NAME
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                className="bg-yt-black border border-yt-border rounded px-3 py-2 focus:border-blue-500 outline-none transition-colors text-white"
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold ml-1 text-yt-text-secondary">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              className="bg-yt-black border border-yt-border rounded px-3 py-2 focus:border-blue-500 outline-none transition-colors text-white"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold ml-1 text-yt-text-secondary">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="bg-yt-black border border-yt-border rounded px-3 py-2 focus:border-blue-500 outline-none transition-colors text-white"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mt-2 transition-colors uppercase text-sm tracking-wide"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* TOGGLE LINK */}
        <div className="mt-6 text-center text-sm">
          <span className="text-yt-text-secondary">
            {isLogin ? "New here? " : "Already have an account? "}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-blue-400 hover:text-blue-300 font-bold ml-1"
          >
            {isLogin ? "Create an account" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
