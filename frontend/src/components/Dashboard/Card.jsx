// Card.js
import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded shadow-md p-4">
      {children}
    </div>
  );
};

const CardHeader = ({ title }) => {
  return (
    <div className="border-b pb-2 mb-2">
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
};

const CardBody = ({ children }) => {
  return (
    <div className="pt-2">
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody };