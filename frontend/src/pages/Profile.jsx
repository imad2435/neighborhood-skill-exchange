import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import RoleSwitcher from "../features/profile/components/RoleSwitcher";

import { fetchProfile } from "../features/profile/profileSlice";

import { Camera } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const handleEditProfile = () => {
    navigate("/edit-profile");  
  };

  
useEffect(() => {
  dispatch(fetchProfile("currentUserId")); // replace with actual userId later
}, [dispatch]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(updateAvatar(imageUrl));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 py-10 px-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">My Profile</h1>

        {/* Role Switcher */}
        <div className="flex justify-end mb-4">
          <RoleSwitcher />
        </div>

        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Avatar */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt="Profile avatar"
                className="w-24 h-24 rounded-full border-4 border-purple-200 object-cover"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-md hover:bg-purple-700 transition"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex space-x-2 mt-2">
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
                {user.verified && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          {/* Role-based UI */}
          {user.role === "provider" && (
            <>
              <div className="space-y-2">
                <p>
                  <strong>Hourly Rate:</strong> {user.hourlyRate}
                </p>
                <p>
                  <strong>Daily Rate:</strong> {user.dailyRate}
                </p>
                <p>
                  <strong>Availability:</strong> {user.availability}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-purple-600 mb-2">Portfolio</h3>
                {user.portfolio.length === 0 ? (
                  <p className="text-gray-500 text-sm">No portfolio items yet.</p>
                ) : (
                  <ul className="list-disc pl-5 text-gray-700 text-sm">
                    {user.portfolio.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {user.role === "seeker" && (
            <div className="text-left my-4">
              <p className="text-gray-600">
                <strong>Contact Number:</strong>{" "}
                <span className="text-purple-700">+92 300 1234567</span>
              </p>
            </div>
          )}

          {user.role === "admin" && (
            <div className="text-center my-6">
              <p className="text-gray-600 mb-4">
                Access all system management features below.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow">
                Go to Admin Dashboard
              </button>
            </div>
          )}

          <hr className="my-6 border-gray-200" />

          {/* Buttons */}
          <div className="flex space-x-4">
            <button  onClick={handleEditProfile} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
              Edit Profile
            </button>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="border border-purple-600 text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg shadow"
            >
              Change Password
            </button>
          </div>

          {/* Inline Password Form */}
          {showPasswordForm && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-3">
                Change Password
              </h4>
              <form className="space-y-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
