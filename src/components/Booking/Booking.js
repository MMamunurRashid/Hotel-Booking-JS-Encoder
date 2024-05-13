import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nid: '',
    numberOfDays: '',
    numberOfPersons: '',
    personDetails: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePersonDetailsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPersonDetails = [...formData.personDetails];
    updatedPersonDetails[index][name] = value;
    setFormData({
      ...formData,
      personDetails: updatedPersonDetails,
    });
  };

  const handleAddPerson = () => {
    setFormData({
      ...formData,
      personDetails: [...formData.personDetails, { name: '', email: '', phone: '', nid: '' }],
    });
  };

  
  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        const response = await fetch('/hotelData.json');
        const data = await response.json();
        const roomData = data.hotels.flatMap(hotel => hotel.rooms).find(room => room.id === parseInt(roomId));
        if (roomData) {
          setRoom(roomData);
        } else {
          console.error('Room not found');
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    }

    fetchRoomDetails();
  }, [roomId]);

  if (!room) {
    return <div className="text-center mt-8">Room not found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const newBooking = {
        id: Date.now(), 
        roomId,
        room,
        formData,
      };
      const updatedBookings = [...existingBookings, newBooking];
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      console.log('Booking successful');
      toast.success("Booking Successful!!!")
      setFormData({
        name: '',
        email: '',
        phone: '',
        nid: '',
        numberOfDays: '',
        numberOfPersons: '',
        personDetails: [],
      });
    } catch (error) {
      console.error('Error booking:', error);
      toast.error("Something was wrong!!")
    }
  };
  
  
  


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-semibold mb-4">Room Booking</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-8">
          <h2 className="text-3xl font-semibold mb-4">Room Details</h2>
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer">
            <img src={room.image} alt={room.type} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">{room.type}</h4>
              <p className="text-gray-600 mb-2">{room.description}</p>
              <p className="text-gray-600">Price: ${room.price}</p>
              <p className="text-gray-600">Availability: {room.availability} rooms</p>
              
            </div>
          </div>
          </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="h-[35px] input input-bordered mt-1 block w-full" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="h-[35px] input input-bordered mt-1 block w-full" required />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700">Phone:</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="h-[35px] input input-bordered mt-1 block w-full" required />
              </div>
              <div className="mb-4">
                <label htmlFor="nid" className="block text-gray-700">NID Number:</label>
                <input type="number" id="nid" name="nid" value={formData.nid} onChange={handleChange} className="h-[35px] input input-bordered mt-1 block w-full" required />
              </div>
              <div className="mb-4">
                <label htmlFor="numberOfDays" className="block text-gray-700">Number of Days:</label>
                <input type="number" id="numberOfDays" name="numberOfDays" value={formData.numberOfDays} onChange={handleChange} className="h-[35px] input input-bordered mt-1 block w-full" required />
              </div>
              <div className="mb-4">
                <label htmlFor="numberOfPersons" className="block text-gray-700">Number of Persons:</label>
                <input type="number" id="numberOfPersons" name="numberOfPersons" value={formData.numberOfPersons} onChange={handleChange} className="h-[35px] input input-bordered mt-1 block w-full" required />
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Person Details</h3>
                {formData.personDetails.map((person, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-gray-700 mb-2">Person {index + 1}</p>
                    <input type="text" name="name" value={person.name} onChange={(e) => handlePersonDetailsChange(index, e)} placeholder="Name" className="h-[35px] input input-bordered mt-1 block w-full" required />
                    <input type="email" name="email" value={person.email} onChange={(e) => handlePersonDetailsChange(index, e)} placeholder="Email" className="h-[35px] input input-bordered mt-1 block w-full" required />
                    <input type="text" name="phone" value={person.phone} onChange={(e) => handlePersonDetailsChange(index, e)} placeholder="Phone" className="h-[35px] input input-bordered mt-1 block w-full" required />
                    <input type="number" name="nid" value={person.nid} onChange={(e) => handlePersonDetailsChange(index, e)} placeholder="NID" className="h-[35px] input input-bordered mt-1 block w-full" required />
                  </div>
                ))}
                <button type="button" className="btn btn-outline btn-sm" onClick={handleAddPerson}>Add Person</button>
              </div>
              <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
