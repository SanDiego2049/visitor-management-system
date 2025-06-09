import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      try {
        // Get token and email from localStorage
        const token = localStorage.getItem("access_token");
        const currentUserEmail = localStorage.getItem("current_user_email");

        if (!token || !currentUserEmail) {
          setError("No authentication data found");
          setLoading(false);
          return;
        }

        // Get users array from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Find the current user
        const currentUser = users.find(
          (user) => user.email === currentUserEmail
        );

        if (!currentUser) {
          setError("User profile not found");
          setLoading(false);
          return;
        }

        // Set profile data from the found user
        setProfile({
          id: currentUser.id,
          fullName:
            currentUser.name || localStorage.getItem("full_name") || "User",
          email: currentUser.email,
          phone: currentUser.phone || "",
          role: localStorage.getItem("user_role") || "visitor",
          avatarUrl:
            currentUser.avatarUrl ||
            "https://imgs.search.brave.com/Ct1Dk54ocPy1b73G5tu9_iO4caCYt2nl2s1E5a2J63I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/MjEwMDkxOS92ZWN0/b3IvbWFuLWljb24t/YmxhY2staWNvbi1w/ZXJzb24tc3ltYm9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1BVlZKa3Z4UVFD/dUJoYXdIclVoRFJU/Q2VOUTNKZ3QwSzF0/WGpKc0Z5MWVnPQ",
          createdAt: currentUser.createdAt,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update profile function that modifies the users array in localStorage
  const updateProfile = async (updatedData) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const currentUserEmail = localStorage.getItem("current_user_email");

      if (!currentUserEmail) {
        return { success: false, error: "Not authenticated" };
      }

      // Get current users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find current user in the array
      const userIndex = users.findIndex(
        (user) => user.email === currentUserEmail
      );

      if (userIndex === -1) {
        return { success: false, error: "User not found" };
      }

      // Update user data in the array
      const updatedUser = { ...users[userIndex], ...updatedData };
      users[userIndex] = updatedUser;

      // Save updated users array back to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Update the full_name in localStorage if it was changed
      if (updatedData.name || updatedData.fullName) {
        localStorage.setItem(
          "full_name",
          updatedData.name || updatedData.fullName
        );
      }

      // Update the context state
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...updatedData,
      }));

      return { success: true };
    } catch (err) {
      console.error("Error updating profile:", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, loading, error, updateProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
