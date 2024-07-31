import './Menu.css';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
    const profileRef = useRef(null);
    const homeRef = useRef(null);
    const statsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClick = (ref, path) => {
            if (ref) {
                gsap.to(ref, {
                    scale: 0.8,
                    duration: 0.2,
                    ease: "power1.out",
                    onComplete: () => {
                        gsap.to(ref, {
                            scale: 1,
                            duration: 0.2,
                            ease: "power1.in",
                            onComplete: () => {
                                navigate(path);
                            }
                        });
                    }
                });
            } else {
                console.warn("Element not found for GSAP animation");
            }
        };

        const profile = profileRef.current;
        const home = homeRef.current;
        const stats = statsRef.current;

        const profileClick = () => handleClick(profile, '/profile');
        const homeClick = () => handleClick(home, '/');
        const statsClick = () => handleClick(stats, '/stats');

        if (profile) profile.addEventListener("click", profileClick);
        if (home) home.addEventListener("click", homeClick);
        if (stats) stats.addEventListener("click", statsClick);

        return () => {
            if (profile) profile.removeEventListener("click", profileClick);
            if (home) home.removeEventListener("click", homeClick);
            if (stats) stats.removeEventListener("click", statsClick);
        };
    }, [navigate]);

    return (
        <div className="Menu">
            <div ref={profileRef} className="profileContainer">
                <img className="profile" src="/images/profile.svg" alt="Profile" />
            </div>
            <div ref={homeRef} className="homeContainer">
                <img className="home" src="/images/home.svg" alt="Home" />
            </div>
            <div ref={statsRef} className="statsContainer">
                <img className="stats" src="/images/stats.svg" alt="Stats" />
            </div>
        </div>
    );
}

export default Menu;
