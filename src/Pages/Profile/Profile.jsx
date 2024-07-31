import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://bore.pub:51500/api/profile', { withCredentials: true });
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://bore.pub:51500/api/logout', {}, { withCredentials: true });
            toast.success("Logged out Successfully!");
            navigate('/');
        } catch (err) {
            console.error('Failed to logout');
        }
    };

    if (loading) return <div>Loading profile...</div>;

    return (
        <div className="Profile">
            {profile ? (
                <div>
                    <div className="bi0sLogo"><img src="/images/bi0s.png" alt="" /></div>
                    <h1>Profile</h1>
                    <div className="info">
                        <div className="icon">
                            <img src="/images/team.svg" alt="Team" />
                        </div>
                        <strong>Team Name:</strong> {profile.teamName}</div>
                    <div className="info">
                        <div className="icon">
                            <img src="/images/person.svg" alt="Person" />
                        </div>
                        <strong>Member 1:</strong> {profile.memberName1}</div>
                    <div className="info">
                        <div className="icon">
                            <img src="/images/person.svg" alt="Person" />
                        </div>
                        <strong>Member 2:</strong> {profile.memberName2}</div>
                    <div className="info">
                        <div className="icon">
                            <img src="/images/person.svg" alt="Person" />
                        </div>
                        <strong>Member 3:</strong> {profile.memberName3}</div>
                    <div className="info">
                        <div className="icon">
                            <img src="/images/email.svg" alt="Email" />
                        </div>
                        <strong>Email:</strong> {profile.email}</div>
                    <button className="submit" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>No profile information available</div>
            )}
        </div>
    );
};

export default Profile;
