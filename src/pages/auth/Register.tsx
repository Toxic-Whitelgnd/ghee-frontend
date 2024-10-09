import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { Email, Mobile, Password, User } from '../../utils/svgIcons';

import { useDispatch } from 'react-redux';
import { updateUser } from '../../slice/userSlice';
import { AuthRegisterService } from '../../services/authServices';

const Register = () => {
    // State to manage form inputs
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        mobile: '',
        password: '',
    });

    // Handle input changes
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Dynamically update the state
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log(JSON.stringify(formData)); // Handle server response
        dispatch(updateUser({
            name: formData.name,
            password: formData.password,
            mobilenumber: formData.mobile,
            email: formData.email,
        }));
        await AuthRegisterService(formData);
        navigate('/');
    };

    return (
        <div>
            <div className='registerform'>
                <form className="form m-4" onSubmit={handleSubmit}>
                    <div className="flex-column">
                        <label>Email</label>
                    </div>
                    <div className="inputForm">
                        <Email />
                        <input
                            type="text"
                            className="input"
                            name="email" // Name matches state key
                            placeholder="Enter your Email"
                            value={formData.email}
                            onChange={handleInputChange} // Update state on change
                        />
                    </div>

                    <div className="flex-column">
                        <label>Name</label>
                    </div>
                    <div className="inputForm">
                        <User />
                        <input
                            type="text"
                            className="input"
                            name="name"
                            placeholder="Enter your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-column">
                        <label>Mobile Number</label>
                    </div>
                    <div className="inputForm">
                        <Mobile />
                        <input
                            type="text"
                            className="input"
                            name="mobile"
                            placeholder="Enter your Mobile number"
                            value={formData.mobile}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-column">
                        <label>Password</label>
                    </div>
                    <div className="inputForm">
                        <Password />
                        <input
                            type="password"
                            className="input"
                            name="password"
                            placeholder="Enter your Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <p className="p">
                        Already have an account?{' '}
                        <Link to='/login'>
                            <span className="span">Sign In</span>
                        </Link>
                    </p>

                    <button type="submit" className="button-submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
