// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hotels from './components/Hotels/Hotels';
import HotelDetail from './components/HotelDetail/HotelDetail';
import Booking from './components/Booking/Booking';
import Navbar from './Shared/Navbar/Navbar';

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch hotel data
    async function fetchHotels() {
      try {
        const res = await fetch('/hotelData.json');
        const data = await res.json();
        setHotels(data.hotels);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    }

    fetchHotels();
  }, []);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleConfirmBooking = () => {
    // Implement booking logic
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="container mx-auto px-4 ">
      <div className='mb-10'>
      <Navbar/>

      </div>
        <Routes>
          <Route path="/" element={<Hotels hotels={filteredHotels} onSelectHotel={handleSelectHotel} />} />
          <Route path="/hotel-detail/:hotelId" element={<HotelDetail />} />
          <Route path="/booking/:roomId" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
