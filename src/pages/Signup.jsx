import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loadingToastId = toast.loading("Creating account...");

    try {
      // Simulate API loading time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get existing users or initialize with empty array
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if email already exists
      if (existingUsers.some((user) => user.email === email)) {
        setError("User already exists. Please log in.");
        toast.error("User already exists. Please log in.", {
          id: loadingToastId,
        });
        setLoading(false);
        return;
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        name: fullName,
        email,
        phone,
        password, // In a real app, you'd hash this password
        createdAt: new Date().toISOString(),
      };

      // Add user to the existing users array
      existingUsers.push(newUser);

      // Save updated user array back to localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Set current user info in localStorage
      localStorage.setItem(
        "access_token",
        Math.random().toString(36).substring(2, 15)
      );
      localStorage.setItem("full_name", fullName);
      localStorage.setItem("user_role", "visitor");
      localStorage.setItem("current_user_email", email);

      toast.success("Account created! Redirecting...", { id: loadingToastId });

      setTimeout(() => {
        navigate("/visitor");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");

      toast.error("Signup failed. Please try again.", { id: loadingToastId });

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md animate-fade-in-up border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Create Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="555-1234"
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-11 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-2 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 dark:bg-blue-700 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-transform ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing up...
              </div>
            ) : (
              <>
                <UserPlus size={20} />
                Sign Up
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          <span className="mx-4 text-gray-500 dark:text-gray-400 font-semibold">
            OR
          </span>
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Signup Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-105"
        >
          <FcGoogle size={24} />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Sign Up with Google
          </span>
        </button>

        {/* Link to Login */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center justify-center gap-1"
          >
            <LogIn size={18} />
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
