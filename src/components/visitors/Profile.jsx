import { useState, useEffect } from "react";
import { useProfile } from "../../hooks/ProfileContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { profile, loading, error, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    avatarUrl: "",
  });
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        avatarUrl: profile.avatarUrl || "",
      });
      setPreview(profile.avatarUrl || "");
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert file to data URL for preview and storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setPreview(dataUrl);
        setFormData((prev) => ({ ...prev, avatarUrl: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updatedData = {
        name: formData.fullName, // Use 'name' to match our user object structure
        phone: formData.phone,
        avatarUrl: formData.avatarUrl,
      };

      const result = await updateProfile(updatedData);

      if (result.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 text-sm">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          <p>Error loading profile: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-gray-600">No profile data available</p>
      </div>
    );
  }

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Preview */}
        <div className="flex flex-col items-center mb-6">
          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Avatar preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}

          {/* Upload New Avatar */}
          <div className="w-full max-w-xs">
            <label className="block font-medium mb-2 text-gray-700">
              Change Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={profile.email || ""}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            />
            <p className="text-sm text-gray-500 mt-1">
              Email cannot be changed.
            </p>
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">Role</label>
            <input
              type="text"
              value={profile.role}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            />
            <p className="text-sm text-gray-500 mt-1">
              Only admins can change your role.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center transition ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
