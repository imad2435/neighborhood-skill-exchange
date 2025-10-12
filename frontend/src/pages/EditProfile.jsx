import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../features/profile/components/ProfileForm";

import { saveProfile, uploadPortfolio } from "../redux/profileSlice";


const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = (updatedData) => {
  const token = localStorage.getItem("token");
  dispatch(saveProfile({ profileData: updatedData, token }));
  navigate("/profile");
};

  const handlePortfolioUpload = (fileData) => {
  dispatch(uploadPortfolio(fileData));
};

  return (
    <motion.main
      className="min-h-screen py-10 px-4 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-3xl mx-auto">
        <ProfileForm
          user={user}
          onSave={handleSave}
          onUploadPortfolio={handlePortfolioUpload}
        />
      </div>
    </motion.main>
  );
};

export default EditProfile;
