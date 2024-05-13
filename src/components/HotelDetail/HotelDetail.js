// components/HotelDetail.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FaStar } from 'react-icons/fa';

// Function to generate star rating
const generateStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-400" />);
    }
  }
  return stars;
};


const HotelDetail = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotelDetails() {
      try {
        const response = await fetch('/hotelData.json');
        const data = await response.json();
        const hotelData = data.hotels.find(hotel => hotel.id === parseInt(hotelId));
        if (hotelData) {
          setHotel(hotelData);
          setLoading(false);
        } else {
          console.error('Hotel not found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setLoading(false);
      }
    }

    fetchHotelDetails();
  }, [hotelId]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!hotel) {
    return <div className="text-center mt-8">Hotel not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover rounded-t-lg" />
        <div className="p-8">
          <h2 className="text-3xl font-semibold mb-4">{hotel.name}</h2>
          <div className="flex items-center mb-6">
            <div className="mr-2 flex items-center">
              {generateStars(hotel.rating)}
              <span className="ml-2 text-yellow-500">{hotel.rating}</span>
            </div>
            <span className="text-gray-600">{hotel.reviews} Reviews</span>
          </div>
          <p className="text-gray-600 mb-6">{hotel.description}</p>
          <h3 className="text-xl font-semibold mb-4">Amenities</h3>
          <ul className="flex flex-wrap">
            {hotel.amenities.map((amenity, index) => (
              <li key={index} className="mr-4 mb-2 text-gray-600">{amenity}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mt-8 mb-4">Rooms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hotel.rooms.map(room => (
              <Link key={room.id} to={`/booking/${room.id}`} className="text-black">
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer">
                  <img src={room.image} alt={room.type} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2">{room.type}</h4>
                    <p className="text-gray-600 mb-2">{room.description}</p>
                    <p className="text-gray-600">Price: ${room.price}</p>
                    <p className="text-gray-600">Availability: {room.availability} rooms</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
