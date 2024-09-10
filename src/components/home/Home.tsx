import React, { useEffect } from 'react';
import { IoLogoLinkedin, IoIosDocument } from 'react-icons/io';
import './Home.css'; // Import the CSS file
import CourseClutch from '../../images/courseclutch.png';

const decodeText = (elementId: string, finalText: string, delay: number) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.innerHTML = '';

    const possibleChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Split text into characters, replacing spaces with a non-breaking space
    const textArray = finalText
        .split('')
        .map((char) => (char === ' ' ? '\u00A0' : char));

    textArray.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = ''; // Start with an empty span
        element.appendChild(span);

        let iterations = 0;
        const maxIterations = Math.random() * 5 + 5; // Random iterations per letter

        const randomizeLetter = setInterval(() => {
            if (iterations >= maxIterations) {
                clearInterval(randomizeLetter);
                span.textContent = char; // Use non-breaking space where necessary
                return;
            }

            // Show random character
            span.textContent = possibleChars.charAt(
                Math.floor(Math.random() * possibleChars.length)
            );
            iterations++;
        }, delay * 1000);
    });
};

const Home: React.FC = () => {
    useEffect(() => {
        // Decode the name and description on page load
        decodeText('name', 'Milan Pattni', 0.05); // Decoding effect with a 0.05s delay
    }, []);

    return (
        <div className="container">
            <div className="home-container">
                <p style={{ marginBottom: '5px' }}>👋 Hey! I'm</p>
                <h1 id="name" className="decode"></h1> {/* Decoded name */}
                <p>
                    I Study Mechatronics Engineering at the University of
                    Waterloo.
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
                    <a
                        href="https://www.courseclutch.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn cc-btn"
                    >
                        <img
                            src={CourseClutch}
                            alt="Course Clutch Logo"
                            className="cc-image"
                        />
                        Course Clutch
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
