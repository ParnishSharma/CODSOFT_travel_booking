import React,{useEffect} from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../form.css'


function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login')
        } else {
          navigate("/")
        }// eslint-disable-next-line
      }, []); 

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        flightNumber: '',
        from: '',
        to: '',
        departureDate: '',
        sex: 'male',
        phoneNumber: '',
    });

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          console.log(decodedToken); // Log the decoded token
          return decodedToken.user.id;
        }
        return null;
      };
      

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevformData) => ({ ...prevformData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (const value of Object.values(formData)) {
      if (value === '') {
        alert('Please fill in all the fields before submitting.');
        return; 
      }
    }

        try {
             // Extract the user_id from the decoded token
      const user_id = getUserIdFromToken();

      const formDataWithUserId = { ...formData, user_id };
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:5000/api/user/createticket', formDataWithUserId, {
        headers: {
          "auth-token": token,
        },

      });
      console.log(token);
      console.log(response.data);
            navigate('/success');


        } catch (error) {
            console.error('Error saving user data:', error);

        }
    }

    return (
        <div className='p-4 m-5 '>
            <form onSubmit={handleSubmit}>
                <label className='B'>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label className='B'>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </label>
                <label className='A'>
                    Flight Number:
                    <input
                        type="text"
                        name="flightNumber"
                        value={formData.flightNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className='A'>
                    From:
                    <input type="text" name="from" value={formData.from} onChange={handleChange} required />
                </label>
                <label className='A'>
                    To:
                    <input type="text" name="to" value={formData.to} onChange={handleChange} required />
                </label>
                <label className='A'>
                    Departure Date:
                    <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className='B'>
                    Sex:
                    <select name="sex" value={formData.sex} onChange={handleChange} required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <label className='C'>
                    Phone Number:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    /><br />
                </label>

                
                <div className='button-container'>
            <button type='submit' >SUBMIT</button>
          </div>
            </form>
        </div>
    )
}

export default Home
