import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-${color}-100 p-6 rounded-lg shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{value}</h2>
          <p className="text-gray-600">{title}</p>
        </div>
        <div className={`text-${color}-500 text-3xl`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;