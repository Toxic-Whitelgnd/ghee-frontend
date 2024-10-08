import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import { Email, Password } from '../../utils/svgIcons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className='loginform'>
            <form className="form m-4" onSubmit={handleSubmit}>
                <div className="flex-column">
                    <label htmlFor="email">Email </label>
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

                <div className="flex-column">
                    <label htmlFor="password">Password </label>
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

                <div className="flex-row">
                    <div>
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe" className='ms-2'>Remember me</label>
                    </div>
                    <span className="span">Forgot password?</span>
                </div>

                <button className="button-submit" type="submit">Sign In</button>

                <p className="p">
                    Don't have an account? <Link to='/register'><span className="span">Sign Up</span></Link>
                </p>
                
            </form>
        </div>
    );
};

export default Login;
