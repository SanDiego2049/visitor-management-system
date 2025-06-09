import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("access_token");
    const userRole = localStorage.getItem("user_role");

    if (token) {
      // Redirect based on role if already logged in
      redirectBasedOnRole(userRole);
    }
  }, [navigate]);

  // Function to handle role-based redirects
  const redirectBasedOnRole = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "visitor":
        navigate("/visitor");
        break;
      default:
        navigate("/visitor");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API loading time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get users from localStorage or initialize empty array if not exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find user with matching email
      const user = users.find((u) => u.email === email);

      if (!user) {
        throw new Error("User not found");
      }

      // Simple password verification (in real app, would use proper hashing)
      if (user.password !== password) {
        throw new Error("Invalid password");
      }

      // Create authentication token (simple random string for demo)
      const token = Math.random().toString(36).substring(2, 15);

      // Store authentication data
      localStorage.setItem("access_token", token);
      localStorage.setItem("full_name", user.name || "User");

      // Determine user role based on email
      let userRole = "visitor";
      if (email.includes("admin")) {
        userRole = "admin";
      }

      localStorage.setItem("user_role", userRole);
      localStorage.setItem("current_user_email", email);

      toast.success("Login successful!");
      redirectBasedOnRole(userRole);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md animate-fade-in-up border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Welcome Back
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
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
                Logging in...
              </div>
            ) : (
              <>
                <LogIn size={20} />
                Log In
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

        {/* Google Login Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-105"
        >
          <FcGoogle size={24} />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Log In with Google
          </span>
        </button>

        {/* Link to Signup */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center justify-center gap-1"
          >
            <UserPlus size={18} />
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
