// components/Hotels.js

import React from 'react';
import { Link } from 'react-router-dom';

const Hotels = ({ hotels, onSelectHotel }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map(hotel => (
        <Link key={hotel.id} to={`/hotel-detail/${hotel.id}`}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
            <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.location}</p>
            </div>
            
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Hotels;
