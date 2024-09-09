import React from 'react';
import { IoLogoLinkedin, IoIosDocument } from 'react-icons/io';
import './Home.css'; // Import the CSS file

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <p style={{ marginBottom: '5px' }}>👋 Hey! I'm</p>
            <h1>Milan Pattni</h1>
            <p>
                Mechatronics Engineering student at the University of Waterloo.
            </p>
            <div className="button-container">
                <a
                    href="https://www.linkedin.com/in/pattni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn linkedin-btn"
                >
                    <IoLogoLinkedin /> LinkedIn
                </a>
                <a
                    href="https://drive.google.com/file/d/1PbCPMxl7v5ztaInkgy_vCxyGc2hIEsrI/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn resume-btn"
                >
                    <IoIosDocument /> Resume
                </a>
            </div>
        </div>
    );
};

export default Home;
