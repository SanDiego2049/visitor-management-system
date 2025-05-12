import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulate fetching profile data
    setTimeout(() => {
      setProfile({
        fullName: localStorage.getItem("full_name") || "John Doe",
        role: "Registered Visitor",
        avatarUrl:
          "https://imgs.search.brave.com/Ct1Dk54ocPy1b73G5tu9_iO4caCYt2nl2s1E5a2J63I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/MjEwMDkxOS92ZWN0/b3IvbWFuLWljb24t/YmxhY2staWNvbi1w/ZXJzb24tc3ltYm9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1BVlZKa3Z4UVFD/dUJoYXdIclVoRFJU/Q2VOUTNKZ3QwSzF0/WGpKc0Z5MWVnPQ",
      });
    }, 1000);
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
