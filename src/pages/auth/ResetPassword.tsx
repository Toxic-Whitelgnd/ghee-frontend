import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserLogin } from '../../types/userTypes';
import { useDispatch } from 'react-redux';
import { AuthLoginService } from '../../services/authServices';
import { Email, Password } from '../../utils/svgIcons';

// Validation function for login
const validateLogin = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email format is invalid';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
};

export default function ResetPassword() {
    const location = useLocation();

    const [password, setPassword] = useState('');

    // Function to get query parameters from the URL
    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            email: params.get('email'), // Get the email parameter
        };
    };
    const { email } = getQueryParams();

    const [restemail, setEmail] = useState(email);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null); // To track timeout

    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear any existing timeout
        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }

        // Validate the inputs
        const validationErrors = validateLogin(restemail!, password);
        setErrors(validationErrors);

        // Set timeout to clear errors after 10 seconds
        if (Object.keys(validationErrors).length > 0) {
            const timeout = setTimeout(() => {
                setErrors({});
            }, 10000); // 10 seconds

            setErrorTimeout(timeout); // Save the timeout ID
        }

        // If no validation errors, proceed with login
        if (Object.keys(validationErrors).length === 0) {
            const userDetails: UserLogin = {
                email: restemail!,
                password: password,
            };
            await AuthLoginService(userDetails, dispatch);
        }
    };


    return (
        <div className='common-container'>
            <h1>Password Reset</h1>
            {email ? (

                <div className='resetform'>
                    <form className="form m-4" onSubmit={handleSubmit}>
                        <div className="flex-column">
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="inputForm">
                            <Email />
                            <input
                                type="email"
                                className="input"
                                id="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={true}
                            />
                        </div>
                        {errors.email && <p className="error">{errors.email}</p>} {/* Email error */}

                        <div className="flex-column">
                            <label htmlFor="password">New Password</label>
                        </div>
                        <div className="inputForm">
                            <Password />
                            <input
                                type="password"
                                className="input"
                                id="password"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errors.password && <p className="error">{errors.password}</p>} {/* Password error */}



                        <button className="button-submit" type="submit">Sign In</button>

                        <p className="p">
                            Don't have an account?{' '}
                            <Link to='/register'><span className="span">Sign Up</span></Link>
                        </p>
                    </form>
                </div>
            ) : (
                <p>No email address provided.</p>
            )}
        </div>
    )
}
