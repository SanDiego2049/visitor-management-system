import React, { useState, useEffect } from "react";
import { useProfile } from "../../hooks/ProfileContext";

const Profile = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    fullName: "",
    avatarUrl: "",
    role: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        avatarUrl: profile.avatarUrl || "",
        role: profile.role || "",
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
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, avatarFile: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Upload avatarFile to Supabase Storage and get new URL
    // Then update fullName and avatarUrl in your DB

    alert(
      "Profile updated:\n" +
        JSON.stringify(
          {
            fullName: formData.fullName,
            avatarUrl: "UPLOAD_TO_STORAGE_FIRST",
          },
          null,
          2
        )
    );
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 text-sm">Please wait...</p>
      </div>
    );
  }


  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {/* Image Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Avatar preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}

        {/* Upload New Avatar */}
        <div>
          <label className="block font-medium mb-1">Change Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
          />
          <p className="text-sm text-gray-500 mt-1">
            Only admins can change your role.
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default Profile;
