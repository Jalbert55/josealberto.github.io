import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Sidebar.css';
import DecryptedText from '../components/DecryptedText';

const sections = ["home", "projects", "contact"];

const Sidebar: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>("home");

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = "home"; // Por defecto
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                        currentSection = section;
                        break;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="sidebar">
            <ul>
                {sections.map((section) => (
                    <li key={section}>
                        <Link 
                            to={section} 
                            smooth={true} 
                            duration={500} 
                            className={`menu-links ${activeSection === section ? "active" : ""}`}
                        >
                            <DecryptedText encryptedClassName="encrypted" text={section.charAt(0).toUpperCase() + section.slice(1)} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;