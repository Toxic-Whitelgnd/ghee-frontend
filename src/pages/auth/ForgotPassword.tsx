import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import { Email, Password } from '../../utils/svgIcons';
import { UserLogin, UserPasswordReset } from '../../types/userTypes';
import { AuthLoginService, AuthPasswordRestService } from '../../services/authServices';
import { useDispatch } from 'react-redux';

// Validation function for login
const validateLogin = (email: string) => {
    const errors: { email?: string;} = {};

    // Email validation
    if (!email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email format is invalid';
    }

    return errors;
};

const Login = () => {
    const [email, setEmail] = useState('');
   
    const [errors, setErrors] = useState<{ email?: string; }>({});
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
        const validationErrors = validateLogin(email);
        setErrors(validationErrors);

        // Set timeout to clear errors after 10 seconds
        if (Object.keys(validationErrors).length > 0) {
            const timeout  = setTimeout(() => {
                setErrors({});
            }, 10000); // 10 seconds

            setErrorTimeout(timeout); // Save the timeout ID
        }

        // If no validation errors, proceed with login
        if (Object.keys(validationErrors).length === 0) {
            const userDetails: UserPasswordReset = {
                email: email
            };
            const res = await AuthPasswordRestService(userDetails, dispatch);
            if(res){
                setEmail('');
            }
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
        <div className='common-container'>


        <div className='loginform'>
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
                    />
                </div>
                {errors.email && <p className="error">{errors.email}</p>} {/* Email error */}

            
                <button className="button-submit" type="submit">Reset Password</button>

                <p className="p">
                    Don't have an account?{' '}
                    <Link to='/register'><span className="span">Sign Up</span></Link>
                </p>
            </form>
        </div>
        </div>
    );
};

export default Login;
