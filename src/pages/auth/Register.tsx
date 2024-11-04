import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Email, Mobile, Password, User } from '../../utils/svgIcons';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../slice/userSlice';
import { AuthRegisterService } from '../../services/authServices';

// Validation function
const validateForm = (formData: { email: string; name: string; mobilenumber: string; password: string }) => {
    const errors: { email?: string; name?: string; mobilenumber?: string; password?: string } = {};

    // Email validation
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email format is invalid';
    }

    // Name validation
    if (!formData.name) {
        errors.name = 'Name is required';
    }

    // Mobile number validation
    if (!formData.mobilenumber) {
        errors.mobilenumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobilenumber)) {
        errors.mobilenumber = 'Mobile number must be 10 digits';
    }

    // Password validation
    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
};

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        mobilenumber: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ email?: string; name?: string; mobilenumber?: string; password?: string }>({});
    const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null); // To track the timeout ID

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Clear any existing timeout
        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }

        // Validate form inputs
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        // If there are validation errors, set a timer to clear them after 10 seconds
        if (Object.keys(validationErrors).length > 0) {
            const timeout = setTimeout(() => {
                setErrors({});
            }, 10000); // 10 seconds

            setErrorTimeout(timeout); // Save the timeout ID to state
        }

        // Check if there are no validation errors
        if (Object.keys(validationErrors).length === 0) {
            console.log(JSON.stringify(formData)); // Handle server response

            await AuthRegisterService(formData, dispatch);
            // navigate('/');
        }
    };

    // Clean up timeout if the component unmounts
    useEffect(() => {
        return () => {
            if (errorTimeout) {
                clearTimeout(errorTimeout);
            }
        };
    }, [errorTimeout]);

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
                            name="email"
                            placeholder="Enter your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.email && <p className="error">*{errors.email}</p>} {/* Email error */}

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
                    {errors.name && <p className="error">*{errors.name}</p>} {/* Name error */}

                    <div className="flex-column">
                        <label>Mobile Number</label>
                    </div>
                    <div className="inputForm">
                        <Mobile />
                        <input
                            type="text"
                            className="input"
                            name="mobilenumber"
                            placeholder="Enter your Mobile number"
                            value={formData.mobilenumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.mobilenumber && <p className="error">*{errors.mobilenumber}</p>} {/* Mobile error */}

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
                    {errors.password && <p className="error">*{errors.password}</p>} {/* Password error */}

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
