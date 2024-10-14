import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../slice/userSlice';
import { toast } from 'react-toastify';
import "./profile.css";
import { User } from '../../types/userTypes';
import { ProfileUpdateService } from '../../services/apiServices';

const Profile = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // State to manage form visibility and details
    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState<User>({
        name: '',
        email: '',
        mobilenumber: '',
        address: '',
        pincode: '',
        district: '',
        state: '',
    });

    // Set initial values when user data changes
    useEffect(() => {
        if (user) {
            setUserDetails({
                name: user.name || '',
                email: user.email || '',
                mobilenumber: user.mobilenumber || '',
                address: user.address || '',
                pincode: user.pincode || '',
                district: user.district || '',
                state: user.state || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userDetails);
        const res = await ProfileUpdateService(userDetails);
        if(res){
            dispatch(updateUser(userDetails));
        }
    
        setIsEditing(false); 
    };

    return (
        <>
        <h1> Hi {user.name}!!</h1>
     
        <div className="profile-container">
            
            <h3>Profile</h3>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobilenumber">Mobile Number:</label>
                        <input
                            type="tel"
                            id="mobilenumber"
                            name="mobilenumber"
                            value={userDetails.mobilenumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <textarea
                            id="address"
                            name="address"
                            value={userDetails.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pincode">Pin Code:</label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            value={userDetails.pincode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="district">District:</label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={userDetails.district}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={userDetails.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Save Changes</button>
                </form>
            ) : (
                <div className="profile-details">
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Mobile Number:</strong> {userDetails.mobilenumber}</p>
                    <p><strong>Address:</strong> {userDetails.address}</p>
                    <p><strong>Pin Code:</strong> {userDetails.pincode}</p>
                    <p><strong>District:</strong> {userDetails.district}</p>
                    <p><strong>State:</strong> {userDetails.state}</p>
                    <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                </div>
            )}
        </div>
        </>
    );
};

export default Profile;