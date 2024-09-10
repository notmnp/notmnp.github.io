import React from 'react';
import { IoLogoLinkedin, IoIosDocument } from 'react-icons/io';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import './Home.css'; // Import the CSS file
import CourseClutch from '../../images/courseclutch.png'; // Import the logo

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="intro">
                <p style={{ marginBottom: '5px' }}>👋 Hey! I'm</p>
                <h1>Milan Pattni</h1>
                <p>
                    a Mechatronics Engineering student at the University of
                    Waterloo.
                </p>
            </div>
            {/* Capture mouse movement for all children */}
            <div
                style={{
                    maxWidth: '1200px' /* Ensure it aligns with the intro */,
                    width: '100%',
                    margin: '0 auto',
                    marginTop: '20px',
                    display: 'flex',
                    gap: '25px',
                    boxSizing: 'border-box' /* Consistent padding */,
                }}
            >
                <GlowCapture size={150}>
                    <div className="button-container">
                        {/* LinkedIn Button with mouse-tracking glow effect */}
                        <Glow color="hsl(204, 86%, 53%)">
                            <a
                                href="https://www.linkedin.com/in/pattni"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn glowable-text"
                            >
                                <IoLogoLinkedin /> LinkedIn
                            </a>
                        </Glow>

                        {/* Resume Button with mouse-tracking glow effect */}
                        <Glow color="hsl(271, 40%, 50%)">
                            <a
                                href="https://drive.google.com/file/d/1PbCPMxl7v5ztaInkgy_vCxyGc2hIEsrI/view?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn glowable-text"
                            >
                                <IoIosDocument /> Resume
                            </a>
                        </Glow>

                        {/* Course Clutch Button with custom logo and glow */}
                        <Glow color="hsl(338.69, 70%, 48.04%)">
                            <a
                                href="https://www.courseclutch.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn glowable-text"
                            >
                                <img
                                    src={CourseClutch}
                                    alt="Course Clutch Logo"
                                    className="cc-image"
                                />
                                Course Clutch
                            </a>
                        </Glow>
                    </div>
                </GlowCapture>
            </div>
        </div>
    );
};

export default Home;
