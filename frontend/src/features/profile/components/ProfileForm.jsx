import React, { useState } from "react";

const ProfileForm = ({ user, onSave, onUploadPortfolio }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newItem = {
        id: Date.now(),
        url: URL.createObjectURL(file),
      };
      onUploadPortfolio(newItem);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 max-w-3xl mx-auto space-y-5"
    >
      <h2 className="text-xl font-semibold text-purple-700">Edit Profile</h2>

      {/* Basic Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
      </div>

      {/* Provider-specific Fields */}
      {user.role === "provider" && (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Hourly Rate
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Daily Rate
              </label>
              <input
                type="number"
                name="dailyRate"
                value={formData.dailyRate || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Availability
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Upload Portfolio
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
        </>
      )}

      {/* Seeker-specific Fields */}
      {user.role === "seeker" && (
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-6">
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 rounded-lg transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
