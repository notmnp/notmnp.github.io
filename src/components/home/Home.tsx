import React, { useEffect, useState } from 'react';
import { IoLogoLinkedin, IoIosDocument, IoIosArrowDown } from 'react-icons/io';
import './Home.css'; // Import the CSS file
import {
    SiReact,
    SiTypescript,
    SiJavascript,
    SiPython,
    SiHtml5,
    SiCss3,
    SiGit,
    SiGithub,
    SiFastapi,
    SiPostgresql,
    SiMysql,
    SiPhp,
    SiDocker,
    SiCplusplus,
    SiIntellijidea,
    SiSelenium,
    SiConfluence,
    SiJira,
    SiPostman,
    SiSymfony,
} from 'react-icons/si';
import { FaAws, FaJava, FaCcStripe } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import CourseClutch from '../../images/courseclutch.png';
import RTX from '../../images/rtx.png';
import TD from '../../images/td.png';
import Waterloo from '../../images/waterloo.png';
import WatAI from '../../images/watai.png';

const decodeText = (elementId: string, finalText: string, delay: number) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.innerHTML = '';

    const possibleChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const textArray = finalText
        .split('')
        .map((char) => (char === ' ' ? '\u00A0' : char));

    textArray.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = '';
        element.appendChild(span);

        let iterations = 0;
        const maxIterations = Math.random() * 10 + 5;

        const randomizeLetter = setInterval(() => {
            if (iterations >= maxIterations) {
                clearInterval(randomizeLetter);
                span.textContent = char;
                return;
            }

            span.textContent = possibleChars.charAt(
                Math.floor(Math.random() * possibleChars.length)
            );
            iterations++;
        }, delay * 1000);
    });
};

const Home: React.FC = () => {
    const languagesArray = [
        <SiPython />,
        <FaJava />,
        <SiCplusplus />,
        <SiHtml5 />,
        <SiCss3 />,
        <SiJavascript />,
        <SiTypescript />,
        <SiPhp />,
        <SiPostgresql />,
        <SiMysql />,
        <SiReact />,
        <SiFastapi />,
        <SiSymfony />,
    ];

    const toolsArray = [
        <SiGit />,
        <SiGithub />,
        <VscVscode />,
        <SiIntellijidea />,
        <SiPostman />,
        <FaAws />,
        <SiJira />,
        <SiConfluence />,
        <SiDocker />,
        <SiSelenium />,
        <FaCcStripe />,
    ];

    useEffect(() => {
        // Function to handle the intersection and add 'visible' class
        const handleIntersection = (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver
        ) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Add 'visible' class
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        };

        // Create the observer with the intersection handler
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.2, // Trigger when 20% of the item is visible
        });

        // Select all grid items
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((item) => observer.observe(item)); // Start observing each item

        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        decodeText('name', 'Milan Pattni', 0.1);

        // Reveal the experience section when scrolled into view
        const handleScroll = () => {
            const experienceSection = document.getElementById('experiences');
            if (experienceSection && window.scrollY > window.innerHeight / 2) {
                experienceSection.classList.add('visible');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="container">
            <div className="gradient"></div>
            <div className="home-container">
                <p style={{ marginBottom: '5px' }}>👋 Hey! I'm</p>
                <h1
                    id="name"
                    className="decode"
                    onClick={() => decodeText('name', 'Milan Pattni', 0.05)}
                    style={{ cursor: 'pointer' }} // Adds pointer cursor on hover
                >
                    Milan Pattni
                </h1>
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

                <div className="scroll-indicator">
                    <IoIosArrowDown
                        onClick={() => {
                            const experienceSection =
                                document.getElementById('experiences');
                            if (experienceSection) {
                                // Calculate the top of the element relative to the page
                                const sectionTop =
                                    experienceSection.getBoundingClientRect()
                                        .top + window.pageYOffset;

                                // Calculate the offset (20% of the screen's height)
                                const offset = window.innerHeight * 0.15;

                                // Scroll to the element with the offset
                                window.scrollTo({
                                    top: sectionTop + offset, // Adjust by the offset
                                    behavior: 'smooth', // Smooth scrolling
                                });

                                experienceSection.classList.add('visible');
                            }
                        }}
                    />
                </div>
            </div>
            <div className="grid-container">
                {/* Available for Internship Box */}
                <div className="small-box grid-item internship-box">
                    <h2 className="grid-header">Seeking Internships</h2>
                    <div className="internship-content">
                        <span className="internship-date">Summer 2025</span>
                    </div>
                </div>

                {/* Current Term Box */}
                <div className="small-box grid-item current-term-box">
                    <h2 className="grid-header">Current Term</h2>
                    <div className="current-term-content">
                        <span className="current-term-number">2A</span>
                    </div>
                </div>

                {/* Education Section */}
                <div className="education-section grid-item education-box">
                    <h2 className="grid-header" style={{marginBottom:'0px'}}>Mechatronics Engineering</h2>
                    <p className="ai-highlight">
                        Artificial Intelligence Option
                    </p>

                    <div className="university">
                        <img
                            src={Waterloo}
                            alt="University of Waterloo"
                            className="university-logo"
                        />
                        <span className="university-name">
                            University of Waterloo
                        </span>
                    </div>
                    <p className="education-dates">
                        September 2023 - April 2028
                    </p>

                    {/* Courses Section */}
                    <h3 className="bubble-header">Courses</h3>
                    <div className="bubble-container">
                        <span className="bubble">
                            Data Structures and Algorithms
                        </span>
                        <span className="bubble">Digital Computation</span>
                        <span className="bubble">Calculus II</span>
                        <span className="bubble">Linear Algebra</span>
                        <span className="bubble">Statics</span>
                        <span className="bubble">Circuits</span>
                    </div>
                </div>

                {/* Carousel Box */}
                <div className="carousel-box grid-item stacks-box">
                    <h2 className="grid-header">Stacks</h2>
                    <div className="icons">
                        <div className="icons-slide">
                            {[...languagesArray, ...languagesArray].map(
                                (icon, index) => (
                                    <div key={index} className="icon">
                                        {icon}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icons-slide tools">
                            {[...toolsArray, ...toolsArray].map(
                                (icon, index) => (
                                    <div key={index} className="icon">
                                        {icon}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Experience Section */}
            <div id="experiences">
                <h1 className="experience-title">Experience</h1>{' '}
                {/* Using the same class for consistency */}
                <div className="grid-container" style={{ marginTop: '3vh' }}>
                    {/* Pratt & Whitney Experience Card */}
                    <div className="grid-item experience-box">
                        <div className="experience-header">
                            <img
                                src={RTX}
                                alt="Pratt & Whitney Logo"
                                className="experience-logo"
                            />
                            <h2 className="grid-header">Pratt & Whitney</h2>
                        </div>
                        <h3 className="experience-position">
                            Software Developer Intern
                        </h3>
                        <p className="experience-time">
                            September 2024 - December 2024
                        </p>

                        {/* Skills Section */}
                        <h4 className="bubble-header">Skills</h4>
                        <div className="bubble-container">
                            <span className="bubble">PHP</span>
                            <span className="bubble">JavaScript</span>
                            <span className="bubble">SQL</span>
                        </div>
                    </div>

                    {/* TD Bank Experience Card */}
                    <div className="grid-item experience-box">
                        <div className="experience-header">
                            <img
                                src={TD}
                                alt="TD Bank Logo"
                                className="experience-logo"
                            />
                            <h2 className="grid-header">TD Bank</h2>
                        </div>
                        <h3 className="experience-position">
                            Software Engineering Intern
                        </h3>
                        <p className="experience-time">
                            January 2024 - April 2024
                        </p>

                        {/* Skills Section */}
                        <h4 className="bubble-header">Skills</h4>
                        <div className="bubble-container">
                            <span className="bubble">Java</span>
                            <span className="bubble">TypeScript</span>
                            <span className="bubble">React</span>
                            <span className="bubble">HTML</span>
                            <span className="bubble">CSS</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Projects Section */}
            <div id="projects">
                <h1 className="experience-title">
                    Projects / Extracurriculars
                </h1>
                <div className="grid-container" style={{ marginTop: '3vh' }}>
                    {/* Course Clutch Project */}
                    <div className="grid-item experience-box">
                        <div className="experience-header">
                            <img
                                src={CourseClutch}
                                alt="Course Clutch Logo"
                                className="experience-logo"
                            />
                            <h2 className="grid-header">Course Clutch</h2>
                        </div>
                        <h3 className="experience-position">
                            Co-Founder & Developer
                        </h3>
                        <p className="experience-time">
                            February 2024 - Present
                        </p>

                        {/* Skills Section */}
                        <h4 className="bubble-header">Skills</h4>
                        <div className="bubble-container">
                            <span className="bubble">Python</span>
                            <span className="bubble">SQL</span>
                            <span className="bubble">FastAPI</span>
                            <span className="bubble">React</span>
                            <span className="bubble">AWS</span>
                        </div>
                    </div>

                    {/* WAT.ai Project */}
                    <div className="grid-item experience-box">
                        <div className="experience-header">
                            <img
                                src={WatAI}
                                alt="WAT.ai Logo"
                                className="experience-logo"
                            />
                            <h2 className="grid-header">WAT.ai</h2>
                        </div>
                        <h3 className="experience-position">Core Developer</h3>
                        <p className="experience-time">
                            September 2024 - Present
                        </p>

                        {/* Skills Section */}
                        <h4 className="bubble-header">Skills</h4>
                        <div className="bubble-container">
                            <span className="bubble">Machine Learning</span>
                            <span className="bubble">Python</span>
                            <span className="bubble">TensorFlow</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="contact">
                <h2 className="contact-title">Contact</h2>
                <div className="contact-container">
                    <p>
                        I'm interested in Summer 2025 internship opportunities.
                        Feel free to connect with me on{' '}
                        <a
                            href="https://www.linkedin.com/in/pattni"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>{' '}
                        or via email at{' '}
                        <a href="mailto:mpattni@uwaterloo.ca">
                            mpattni@uwaterloo.ca
                        </a>
                        .
                    </p>
                </div>
            </div>{' '}
        </div>
    );
};

export default Home;
