import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hotels from './components/Hotels/Hotels';
import HotelDetail from './components/HotelDetail/HotelDetail';
import Booking from './components/Booking/Booking';
import Navbar from './Shared/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch hotel data
    const fetchHotels = async () => {
      try {
        const res = await fetch('/hotelData.json');
        if (!res.ok) {
          throw new Error('Failed to fetch hotel data');
        }
        const data = await res.json();
        setHotels(data.hotels);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <div>
       <div className='mb-10'>
       <Navbar />
       </div>
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Hotels hotels={filteredHotels} />} />
            <Route path="/hotel-detail/:hotelId" element={<HotelDetail hotels={hotels} />} />
            <Route path="/booking/:roomId" element={<Booking hotels={hotels} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
