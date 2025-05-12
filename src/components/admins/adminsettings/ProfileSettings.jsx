const ProfileSettings = ({
  profileData,
  handleInputChange,
  handleImageChange,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Profile Settings
      </h2>

      <div className="mb-6 flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center">
            <img
              src={
                profileData.profileImage || "https://i.pravatar.cc/150?img=1"
              }
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
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
    </div>
  );
};

export default ProfileSettings;
