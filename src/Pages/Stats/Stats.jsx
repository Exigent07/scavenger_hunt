import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Stats.css';
import Countdown from 'react-countdown';

const Stats = () => {
    const [solvedLevels, setSolvedLevels] = useState([]);
    const [rules, setRules] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const eventEndTime = new Date('2024-08-02T12:00:00Z').getTime();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://bore.pub:10484/api/stats', { withCredentials: true });
                setSolvedLevels(response.data.solvedLevels);
                setRules(response.data.rules);
            } catch (err) {
                setError('Failed to fetch stats');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [navigate]);

    const totalLevels = 5;
    const completedLevels = solvedLevels.length;
    console.log(solvedLevels);
    const progressPercentage = (completedLevels / totalLevels) * 100;

    if (loading) return <div>Loading stats...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="Stats">
            <div className="bi0sLogo"><img src="/images/bi0s.png" alt="" /></div>
            <h1>Progress</h1>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
                    {progressPercentage}%
                </div>
            </div>
            <h2>Event Countdown</h2>
            <Countdown date={eventEndTime} />
            <h2>Rules</h2>
            <div className="rules">
                {rules.split('\n').map((rule, index) => (
                    <p key={index}>{rule}</p>
                ))}
            </div>
        </div>
    );
};

export default Stats;
