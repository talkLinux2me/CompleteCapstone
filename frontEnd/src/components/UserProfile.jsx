import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
    let { id } = useParams(); 
    const [userInfo, setUserInfo] = useState();

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/user/${id}`);
            setUserInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [id]);

    // Prepare formatted values before returning
    const availabilityList = userInfo?.availability?.map((item, index) => (
        <span key={index}>{item}{index < userInfo.availability.length - 1 ? ', ' : ''}</span>
    )) || null;

    const expertiseList = userInfo?.expertise?.map((item, index) => (
        <span key={index}>{item}{index < userInfo.expertise.length - 1 ? ', ' : ''}</span>
    )) || null;

    const skillsList = userInfo?.skills?.map((item, index) => (
        <span key={index}>{item}{index < userInfo.skills.length - 1 ? ', ' : ''}</span>
    )) || null;

    const interestsList = userInfo?.interests?.map((item, index) => (
        <span key={index}>{item}{index < userInfo.interests.length - 1 ? ', ' : ''}</span>
    )) || null;

    return (
        <div>
            {userInfo ? (
                <div className="user-card">
                    <img 
                        src={userInfo.profilePic || 'default-profile-pic.jpg'} 
                        alt={userInfo.name} 
                        className="profile-pic" 
                    />
                    <h3>{userInfo.name}</h3>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Location:</strong> {userInfo.location}</p>
                    <p><strong>Years of Experience:</strong> {userInfo.yearsOfExperience}</p>
                    <p><strong>Availability:</strong> {availabilityList || 'N/A'}</p>
                    
                    <p><strong>Skills:</strong> {skillsList || 'N/A'}</p>
                    <p><strong>Certifications:</strong> {userInfo.certifications}</p>
                    
                    <p><strong>Personal Statement:</strong> {userInfo.personalStatement}</p>
                </div>
            ) : (
                <h1>I do not exist</h1>
            )}
        </div>
    );
}

export default UserProfile;
