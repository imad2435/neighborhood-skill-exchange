import React from "react";

const PortfolioGrid = ({ portfolio }) => (
  <div className="mt-5">
    <h3 className="font-semibold text-purple-700 mb-3">Portfolio</h3>
    {portfolio.length ? (
      <div className="grid grid-cols-3 gap-3">
        {portfolio.map((item) => (
          <img
            key={item.id}
            src={item.url}
            alt="Portfolio item"
            className="rounded-lg h-24 w-full object-cover border border-purple-100 hover:scale-105 transition-transform"
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm">No portfolio items yet.</p>
    )}
  </div>
);

export default PortfolioGrid;
