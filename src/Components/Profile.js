import React, { useEffect, useState } from 'react';
import'../profile.css'
import axios from 'axios';

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (userId) => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/user/delete/${userId}`, {
        headers: {
          'auth-token': token,
        },
      });
      setIsDeleting(false);
      // If the deletion is successful, update the users state to remove the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setIsDeleting(false);
    }
  };
  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token retrieved from local storage:', token);
        if (token) {
          const response = await fetch('http://localhost:5000/api/user/getuser', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token,
            },
          });

          const userData = await response.json();
          setUsers(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='m-3 p-3'>
      <h1 className='text-center m-3 p-4 shadow-lg rounded-pill '>YOUR TICKETS</h1>
      <div className="card-container  ">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="user-card d-grid" key={user._id}>
            <div className="delete-icon">
            <i
              className={`fa fa-trash fa-2x ${isDeleting ? 'deleting' : ''}`}
              aria-hidden="true"
              onClick={() => handleDelete(user._id)} // Call handleDelete with the user's ID
            ></i>
          </div>
          
            {/* User Information */}
            <h3 className="text-center">{user.name}</h3>
            <p>Age: {user.age}</p>
            <p>From: {user.from}</p>
            <p>To: {user.to}</p>
            <p>Flight Number: {user.flightNumber}</p>
            <p>Departure Date: {user.departureDate}</p>
            <p>Sex: {user.sex}</p>
            <p>Phone Number: {user.phoneNumber}</p>
          </div>
          
          ))
        ) : (
          <p className='text-center m-5 p-4 shadow-lg rounded-pill '>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
