import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the profile from the backend
  const fetchProfileFromBackend = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setProfile(null);
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://phawaazvms.onrender.com/api/auth/me",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("full_name");
        localStorage.removeItem("user_role");
        localStorage.removeItem("current_user_email");
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Failed to fetch user profile. Session expired or invalid."
        );
      }

      const responseJson = await response.json();
      const userData = responseJson.data;

      const fullName = `${userData.firstName || ""} ${
        userData.lastName || ""
      }`.trim();

      localStorage.setItem("full_name", fullName || "User");
      localStorage.setItem("user_role", userData.role || "visitor");
      localStorage.setItem("current_user_email", userData.email || "");

      localStorage.setItem(
        "profile_data",
        JSON.stringify({
          id: userData._id || userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          fullName: fullName,
          email: userData.email,
          role: userData.role,
          phone: userData.phone || "",
          photo: userData.photo || "default-avatar.png",
          isActive: userData.isActive,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
        })
      );
      setProfile({
        id: userData._id || userData.id,
        fullName: fullName || "User",
        email: userData.email,
        phone: userData.phone || "",
        role: userData.role || "visitor",
        avatarUrl:
          userData.photo ||
          "https://imgs.search.brave.com/Ct1Dk54ocPy1b73G5tu9_iO4caCYt2nl2s1E5a2J63I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/MjEwMDkxOS92ZWN0/b3IvbWFuLWljb24t/YmxhY2staWNvbi1w/ZXJzb21wbi1zeW1i/b2wuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUFWVkprdnhR/UUN1Qmhhd0hyVWHE/UlRDZW5RM0pndDBL/MXRYSmpTZnkxZWd1PQ",
        createdAt: userData.createdAt,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isActive: userData.isActive,
        updatedAt: userData.updatedAt,
      });
    } catch (err) {
      console.error("Error fetching profile from backend:", err);
      setError(err.message);
      setProfile(null);
      toast.error(err.message || "Failed to load user profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileFromBackend();
  }, []);

  const updateProfile = async (updatedData) => {
    setLoading(true);
    const updateToastId = toast.loading("Updating profile...");

    try {
      const token = localStorage.getItem("access_token");
      const userId = profile.id;

      if (!token || !userId) {
        toast.error("Authentication required for profile update.", {
          id: updateToastId,
        });
        return {
          success: false,
          error: "Not authenticated or user ID missing.",
        };
      }

      const response = await fetch(
        `https://phawaazvms.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      await fetchProfileFromBackend();
      toast.success("Profile updated successfully!", { id: updateToastId });
      return { success: true };
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.message || "An error occurred during profile update.", {
        id: updateToastId,
      });
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        error,
        updateProfile,
        fetchProfileFromBackend,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
