import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "/src/redux/profileSlice";

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.profile.user.role);
  const roles = ["provider", "seeker", "admin"];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
      <span className="text-sm font-medium text-gray-600">Preview as:</span>
      <div className="flex gap-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => dispatch(setRole(role))}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition ${
              currentRole === role
                ? "bg-purple-700 text-white shadow-sm"
                : "border border-purple-300 text-purple-700 hover:bg-purple-100"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitcher;
