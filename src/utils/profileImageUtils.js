export const getCurrentUserProfileImage = () => {
  const email = localStorage.getItem("current_user_email");
  if (!email) return null;

  // First try to get the image from the separate storage
  const profileImage = localStorage.getItem(`profileImage_${email}`);

  if (profileImage) {
    return profileImage;
  }

  // If not found in separate storage, try to get it from the users array as fallback
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.find((user) => user.email === email);
    return currentUser?.profileImage || null;
  } catch (error) {
    console.error("Error getting profile image from users:", error);
    return null;
  }
};

export const getUserProfileImage = (email) => {
  if (!email) return null;

  // First try to get the image from the separate storage
  const profileImage = localStorage.getItem(`profileImage_${email}`);

  if (profileImage) {
    return profileImage;
  }

  // If not found in separate storage, try to get it from the users array as fallback
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user) => user.email === email);
    return user?.profileImage || null;
  } catch (error) {
    console.error("Error getting profile image for user:", error);
    return null;
  }
};

export const saveCurrentUserProfileImage = (imageData) => {
  const email = localStorage.getItem("current_user_email");
  if (!email || !imageData) return false;

  try {
    // Store in separate storage for easy access
    localStorage.setItem(`profileImage_${email}`, imageData);

    // Also update in the users array for consistency
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        profileImage: imageData,
      };
      localStorage.setItem("users", JSON.stringify(users));
    }

    return true;
  } catch (error) {
    console.error("Error saving profile image:", error);
    return false;
  }
};

export const removeCurrentUserProfileImage = () => {
  const email = localStorage.getItem("current_user_email");
  if (!email) return false;

  try {
    // Remove from separate storage
    localStorage.removeItem(`profileImage_${email}`);

    // Also update in the users array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        profileImage: null,
      };
      localStorage.setItem("users", JSON.stringify(users));
    }

    return true;
  } catch (error) {
    console.error("Error removing profile image:", error);
    return false;
  }
};
