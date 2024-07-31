import { useState, useEffect } from 'react';
import Form from '../../Components/Form/Form';
import './Home.css';
import axios from 'axios';
import Levels from '../../Components/Levels/Levels';

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState("login");

    const BASE_URL = "http://bore.pub:10484";

    const checkSession = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/session`, { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    if (loading) return <div>Loading...</div>;

    const handleRegisterSuccess = () => {
        setFormState(formState === "login" ? "register" : "login");
        checkSession();
    };

    return (
        <div className="Home">
            <div className="bi0sLogo"><img src="/images/bi0s.png" alt="" /></div>
            {user ? (
                <div>
                    Hello, {user.teamName}!
                    <Levels />
                </div>
            ) : (
                <div>
                    <div className="buttons">
                        <button
                            className={`submit ${formState === "login" ? "active" : ""}`}
                            type="button"
                            onClick={() => setFormState("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`submit ${formState === "register" ? "active" : ""}`}
                            type="button"
                            onClick={() => setFormState("register")}
                        >
                            Register
                        </button>
                    </div>
                    <Form 
                        type={formState} 
                        onRegisterSuccess={handleRegisterSuccess}
                    />
                </div>
            )}
        </div>
    );
}

export default Home;
