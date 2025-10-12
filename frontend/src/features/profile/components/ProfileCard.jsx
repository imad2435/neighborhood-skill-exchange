import React from "react";
import { Link } from "react-router-dom";
import PortfolioGrid from "./PortfolioGrid";

const ProfileCard = ({ user }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition hover:shadow-lg">
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-6">
      <img
        src={user.avatar}
        alt="Profile avatar"
        className="w-28 h-28 rounded-full object-cover border-4 border-purple-200"
      />
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        <div className="mt-2 flex gap-2 justify-center sm:justify-start">
          <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full capitalize">
            {user.role}
          </span>
          {user.verified && (
            <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>
    </div>

    <div className="mt-6 space-y-3 text-sm sm:text-base">
      {user.role === "provider" && (
        <>
          <p><strong>Hourly Rate:</strong> ${user.hourlyRate}/hr</p>
          <p><strong>Daily Rate:</strong> ${user.dailyRate}/day</p>
          <p><strong>Availability:</strong> {user.availability}</p>
          <PortfolioGrid portfolio={user.portfolio} />
        </>
      )}

      {user.role === "seeker" && (
        <p><strong>Contact Number:</strong> {user.phone}</p>
      )}

      {user.role === "admin" && (
        <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg">
          Go to Admin Dashboard
        </button>
      )}
    </div>

    <div className="flex flex-wrap gap-3 justify-end mt-8 pt-4 border-t">
      <Link to="/edit-profile">
        <button className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg transition">
          Edit Profile
        </button>
      </Link>
      <button className="border border-purple-700 text-purple-700 hover:bg-purple-50 px-5 py-2 rounded-lg transition">
        Change Password
      </button>
    </div>
  </div>
);

export default ProfileCard;
