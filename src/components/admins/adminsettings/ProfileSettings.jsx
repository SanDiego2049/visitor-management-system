import { Save, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const ProfileSettings = () => {
  // Initialize profile data state
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    timeZone: "UTC+0",
    profileImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const email = localStorage.getItem("current_user_email");
    const fullName = localStorage.getItem("full_name");
    const userRole = localStorage.getItem("user_role");

    setIsAdmin(userRole === "admin");

    if (email) {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find the current user
      const currentUser = users.find((user) => user.email === email);

      if (currentUser) {
        // Update profile data with user information from localStorage
        setProfileData({
          fullName: fullName || currentUser.name || "",
          email: email || "",
          phone: currentUser.phone || "",
          jobTitle: currentUser.jobTitle || "",
          department: currentUser.department || "",
          timeZone: currentUser.timeZone || "UTC+0",
          profileImage: currentUser.profileImage || null,
        });
      }
    }
  }, []);

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a FileReader to convert the image to a data URL
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;

        // Store profile image separately in localStorage for easy access by other components
        const email = localStorage.getItem("current_user_email");
        if (email) {
          localStorage.setItem(`profileImage_${email}`, imageData);
        }

        setProfileData((prevData) => ({
          ...prevData,
          profileImage: imageData,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile data to localStorage
  const saveProfileData = () => {
    setLoading(true);
    setSaveStatus("saving");

    // Simulate API call to save settings
    setTimeout(() => {
      try {
        // Get current email from localStorage
        const email = localStorage.getItem("current_user_email");

        if (!email) {
          notifyUser("User not logged in", "error");
          setLoading(false);
          return;
        }

        // Get all users from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Find the current user index
        const userIndex = users.findIndex((user) => user.email === email);

        if (userIndex !== -1) {
          // Update the user's information
          const updatedUser = {
            ...users[userIndex],
            name: profileData.fullName,
            phone: profileData.phone,
            timeZone: profileData.timeZone,
            profileImage: profileData.profileImage,
          };

          // Only update job title and department if user is admin
          if (isAdmin) {
            updatedUser.jobTitle = profileData.jobTitle;
            updatedUser.department = profileData.department;
          }

          users[userIndex] = updatedUser;

          // Save the updated users array back to localStorage
          localStorage.setItem("users", JSON.stringify(users));

          // Store profile image separately for easy access by other components
          if (profileData.profileImage) {
            localStorage.setItem(
              `profileImage_${email}`,
              profileData.profileImage
            );
          }

          // Update the full_name in localStorage
          localStorage.setItem("full_name", profileData.fullName);

          notifyUser("Profile updated successfully");
          setSaveStatus("saved");

          // Reset the status after 3 seconds
          setTimeout(() => {
            setSaveStatus(null);
          }, 3000);
        } else {
          notifyUser("User not found", "error");
        }
      } catch (error) {
        console.error("Error saving profile data:", error);
        notifyUser("Failed to update profile", "error");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  // Simple notification function (replacement for toast since we removed the dependency)
  const notifyUser = (message, type = "success") => {
    console.log(`${type.toUpperCase()}: ${message}`);
    // In a real app, you'd implement proper notifications here
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Profile Settings
      </h2>

      <div className="mb-6 flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center">
            <img
              src={profileData.profileImage || "https://i.pravatar.cc/150?img=1"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-100 dark:border-gray-700"
            />
            <label className="cursor-pointer">
              <span className="text-blue-500 dark:text-blue-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-300">
                Change Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) =>
                handleInputChange("profile", "fullName", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                handleInputChange("profile", "email", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-500"
              disabled // Email should not be editable as it's used as the user identifier
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) =>
                handleInputChange("profile", "phone", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          {/* Job Title - Only visible to admins */}
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={profileData.jobTitle}
                onChange={(e) =>
                  handleInputChange("profile", "jobTitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
          )}

          {/* Department - Only visible to admins */}
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <input
                type="text"
                value={profileData.department}
                onChange={(e) =>
                  handleInputChange("profile", "department", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Zone
            </label>
            <select
              value={profileData.timeZone}
              onChange={(e) =>
                handleInputChange("profile", "timeZone", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="UTC-12">UTC-12</option>
              <option value="UTC-11">UTC-11</option>
              <option value="UTC-10">UTC-10</option>
              <option value="UTC-9">UTC-9</option>
              <option value="UTC-8">UTC-8 (Pacific Time)</option>
              <option value="UTC-7">UTC-7 (Mountain Time)</option>
              <option value="UTC-6">UTC-6 (Central Time)</option>
              <option value="UTC-5">UTC-5 (Eastern Time)</option>
              <option value="UTC-4">UTC-4</option>
              <option value="UTC-3">UTC-3</option>
              <option value="UTC-2">UTC-2</option>
              <option value="UTC-1">UTC-1</option>
              <option value="UTC+0">UTC+0</option>
              <option value="UTC+1">UTC+1</option>
              <option value="UTC+2">UTC+2</option>
              <option value="UTC+3">UTC+3</option>
              <option value="UTC+4">UTC+4</option>
              <option value="UTC+5">UTC+5</option>
              <option value="UTC+5:30">UTC+5:30 (India)</option>
              <option value="UTC+6">UTC+6</option>
              <option value="UTC+7">UTC+7</option>
              <option value="UTC+8">UTC+8</option>
              <option value="UTC+9">UTC+9</option>
              <option value="UTC+10">UTC+10</option>
              <option value="UTC+11">UTC+11</option>
              <option value="UTC+12">UTC+12</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex items-center justify-end">
        {saveStatus === "saved" && (
          <span className="mr-4 text-green-600 dark:text-green-400 flex items-center">
            <CheckCircle size={16} className="mr-1" />
            Settings saved successfully
          </span>
        )}
        <button
          onClick={saveProfileData}
          className={`flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400 transition-colors duration-200 ${
            saveStatus === "saving" ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={saveStatus === "saving"}
        >
          {saveStatus === "saving" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
