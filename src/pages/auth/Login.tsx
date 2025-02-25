import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import { Email, Password } from '../../utils/svgIcons';
import { UserLogin } from '../../types/userTypes';
import { AuthLoginService } from '../../services/authServices';
import { useDispatch } from 'react-redux';
import Loader from '../../components/cards/Loader';

// Validation function for login
const validateLogin = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email format is invalid';
    }

    // Password validation
    // if (!password) {
    //     errors.password = 'Password is required';
    // } else if (password.length < 6) {
    //     errors.password = 'Password must be at least 6 characters';
    // }

    return errors;
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null); // To track timeout
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear any existing timeout
        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }

        // Validate the inputs
        const validationErrors = validateLogin(email, password);
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
            setLoading(true);
            const userDetails: UserLogin = {
                email: email,
                password: password,
            };
            const res = await AuthLoginService(userDetails, dispatch);
            if (res) {
                setLoading(false);
            } else {
                setLoading(false);
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

    function handleForgotPassword(): void {
        window.location.href = "#/forgotpassword";
    }

    return (
        <>
            <div className='loginform'>
                {loading ? <div className='loader-cont'><Loader /></div> : <>
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

                        <div className="flex-column">
                            <label htmlFor="password">Password</label>
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

                        <div className="flex-row">
                            <div>
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe" className='ms-2'>Remember me</label>
                            </div>
                            <span onClick={handleForgotPassword} className="span">Forgot password?</span>
                        </div>

                        <button className="button-submit" type="submit">Sign In</button>

                        <p className="p">
                            Don't have an account?{' '}
                            <Link to='/register'><span className="span">Sign Up</span></Link>
                        </p>
                    </form>

                </>}
            </div>

        </>

    );
};

export default Login;
