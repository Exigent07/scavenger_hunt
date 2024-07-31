import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Levels.css';
import Input from '../Input/Input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

function Levels() {
    const [currentLevel, setCurrentLevel] = useState(null);
    const [levelData, setLevelData] = useState({});
    const [flagInput, setFlagInput] = useState('');
    const [hint, setHint] = useState('');
    const [levels, setLevels] = useState([]);

    const BASE_URL = "https://scavenger-backend.onrender.com";
    const POLL_INTERVAL = 1000;

    useEffect(() => {
        const fetchLevelData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/levels`);
                setLevels(response.data);
            } catch (error) {
                console.error('Error fetching level data:', error);
            }
        };

        fetchLevelData();

        const intervalId = setInterval(() => {
            fetchLevelData();
        }, POLL_INTERVAL);

        return () => clearInterval(intervalId);
    }, []);

    const handleLevelClick = async (level) => {
        if (level.solved || level.level !== getNextLevel()) return;

        setCurrentLevel(level.level);
        setHint('');

        try {
            const response = await axios.get(`${BASE_URL}/api/levels/${level.level}`);
            setLevelData(prevData => ({
                ...prevData,
                [level.level]: response.data
            }));
        } catch (error) {
            console.error('Error fetching level details:', error);
        }
    };

    const handleSubmitFlag = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/levels/${currentLevel}/submit`, { flag: flagInput });

            if (response.data.correct) {
                toast.success('Correct flag! Level solved.');
                setHint(response.data.nextLevelHint);
                setLevels(levels.map(level => 
                    level.level === currentLevel ? { ...level, solved: true } : level
                ));
                setFlagInput('');
                setCurrentLevel(null);
            } else {
                toast.error('Incorrect flag, please try again.');
            }
        } catch (error) {
            console.error('Error submitting flag:', error);
        }
    };

    const handleBackClick = () => {
        setCurrentLevel(null);
        setFlagInput('');
        setHint('');
    };

    const getNextLevel = () => {
        const maxSolvedLevel = Math.max(...levels.filter(level => level.solved).map(level => level.level), 0);
        return maxSolvedLevel + 1;
    };

    return (
        <div className="Levels">
            {currentLevel ? (
                <div className="levelDetails">
                    <button onClick={handleBackClick} className="backButton">Back</button>
                    <img src={levelData[currentLevel]?.image} alt={`Level ${currentLevel}`} />
                    <h2>{levelData[currentLevel]?.heading}</h2>
                    <p>{levelData[currentLevel]?.description}</p>
                    {levels.find(level => level.level === currentLevel)?.solved ? (
                        <button className="solvedButton" disabled>Level Solved</button>
                    ) : (
                        <>
                            <Input
                                type="flag"
                                placeholder="scavenger{ ... }"
                                value={flagInput}
                                onChange={(e) => setFlagInput(e.target.value)}
                            />
                            <button className="submit" onClick={handleSubmitFlag}>Submit</button>
                        </>
                    )}
                    {hint && <p className="hint">{hint}</p>}
                </div>
            ) : (
                <div className="buttons">
                    {levels.map((level) => (
                        <button
                            key={level.level}
                            onClick={() => handleLevelClick(level)}
                            disabled={level.level !== getNextLevel() && !level.solved}
                            className={
                                level.level === currentLevel ? 'currentLevelButton' :
                                level.solved ? 'solvedButton' :
                                level.level !== getNextLevel() ? 'inaccessibleButton' : ''
                            }
                        >
                            Level {level.level}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Levels;
