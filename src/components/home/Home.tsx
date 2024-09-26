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
import { FaLocationPin, FaClock } from 'react-icons/fa6';
import CourseClutch from '../../images/courseclutch.png';
import CC from '../../images/cc.png';
import RTX from '../../images/rtx.png';
import TD from '../../images/td.png';
import Waterloo from '../../images/waterloo.png';
import WatAI from '../../images/watai.png';
import AI from '../../images/ai.png';

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

type Experience = {
    company: string;
    logo: string;
    position: string;
    time: string;
    location: string;
    description: string[];
    skills: string[];
    class: string;
};

const experiences: Experience[] = [
    {
        company: 'Pratt & Whitney',
        logo: RTX,
        position: 'Software Developer Intern',
        time: 'September 2024 - December 2024',
        location: 'Toronto, Ontario',
        description: [
            'Expected to build new content for software build management tools for aircraft engine control systems, to elevate system functionality and optimize development efficiency.',
            'Tasked with optimizing the performance of existing Oracle management tools to increase processing speed and ensure a smoother user experience for the engineering team.',
            'Responsible for creating new frameworks and refining existing ones to improve the graphical user interface (GUI) of control system tools, to facilitate more intuitive development, navigation and usability.',
        ],
        skills: ['PHP', 'JavaScript', 'SQL'],
        class: 'pratt',
    },
    {
        company: 'TD Bank',
        logo: TD,
        position: 'Software Engineering Intern',
        time: 'January 2024 - April 2024',
        location: 'Toronto, Ontario',
        description: [
            'Designed and developed a React and TypeScript-based application, streamlining data access for 10,000+ corporate users, which enhanced operational efficiency and improved user experience.',
            'Implemented a cache-buster for a suite of microapps through Apache Maven, reducing loading errors by 25%, ensuring up-to-date content delivery and increasing application reliability.',
            'Managed GIT repositories, reducing merge conflicts by 40%, and collaborated with 15+ team members using Jira for Agile development to improve overall team efficiency and workflow.',
        ],
        skills: ['Java', 'TypeScript', 'React', 'HTML', 'CSS'],
        class: 'td',
    },
    // Add more experiences as needed
];

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

    const [selectedExperience, setSelectedExperience] = useState<Experience>(
        experiences[0]
    );

    const handleSelect = (experience: Experience) => {
        // Temporary opacity transition for experience change
        const contentElement = document.querySelector('.experience-content');
        if (contentElement) {
            contentElement.classList.remove('active'); // Hide current content
            setTimeout(() => {
                setSelectedExperience(experience);
                contentElement.classList.add('active'); // Show new content
            }, 300); // Wait for animation to finish before updating
        }
    };

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
            threshold: 0.05, // Trigger when 20% of the item is visible
        });

        // Select all elements to be observed: grid items, sidebar, experience, and project cards
        const elementsToObserve = document.querySelectorAll(
            '.grid-item, .experience-sidebar-wrapper, .experience-box, .projects-card, #contact, .experience-title, .projects-title'
        );
        elementsToObserve.forEach((item) => observer.observe(item)); // Start observing each item

        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        decodeText('name', 'Milan Pattni', 0.1);

        // Reveal the experience section when scrolled into view
        const handleScroll = () => {
            const experienceSection = document.getElementById('experiences');
            if (experienceSection && window.scrollY > window.innerHeight / 22) {
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
                <p style={{ marginBottom: '5px' }}>👋 Hi! I'm</p>
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
                                document.getElementById('summary');
                            if (experienceSection) {
                                const sectionTop =
                                    experienceSection.getBoundingClientRect()
                                        .top +
                                    window.scrollY -
                                    100;

                                // Adjust the scroll behavior to scroll exactly to the section top
                                window.scrollTo({
                                    top: sectionTop, // Directly scroll to the top of the section
                                    behavior: 'smooth', // Smooth scrolling effect
                                });
                            }
                        }}
                    />
                </div>
            </div>
            <div className="grid-container" id="summary">
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
                    <h2 className="grid-header" style={{ marginBottom: '0px' }}>
                        Mechatronics Engineering
                    </h2>
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
            <div className="experience-section" id="experiences">
                <h1 className="experience-title">Work Experience</h1>
                <div className="experience-container">
                    {/* Sidebar with company logos */}
                    <div className="experience-sidebar-wrapper">
                        <ul className="toc-list experience-sidebar">
                            {experiences.map((exp, index) => (
                                <li
                                    key={index}
                                    className={`toc-item ${exp.class} ${
                                        selectedExperience.company ===
                                        exp.company
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => handleSelect(exp)}
                                >
                                    <img
                                        src={exp.logo}
                                        alt={`${exp.company} Logo`}
                                        className="toc-logo"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Experience Content */}
                    <div
                        className={`experience-content active ${selectedExperience.class}`}
                    >
                        <div className="experience-box">
                            <div className="experience-header">
                                <img
                                    src={selectedExperience.logo}
                                    alt={`${selectedExperience.company} Logo`}
                                    className="experience-logo"
                                />
                                <h2 className="company-header">
                                    {selectedExperience.company}
                                </h2>
                            </div>
                            <h3 className="experience-position">
                                {selectedExperience.position}
                            </h3>

                            {/* Time and Location with Icons */}
                            <div className="experience-details">
                                <p className="experience-time">
                                    <FaClock className="company-icon" />
                                    {selectedExperience.time}
                                </p>
                                <p className="experience-location">
                                    <FaLocationPin className="company-icon" />
                                    {selectedExperience.location}
                                </p>
                            </div>

                            {/* Description Section */}
                            <ul className="experience-description">
                                {selectedExperience.description.map(
                                    (item, index) => (
                                        <li
                                            key={index}
                                            className="description-item"
                                        >
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>

                            {/* Skills Section */}
                            <h4 className="bubble-header">Skills</h4>
                            <div className="bubble-container">
                                {selectedExperience.skills.map(
                                    (skill, index) => (
                                        <span key={index} className="bubble">
                                            {skill}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Projects Section */}
            <div className="projects-section" id="projects">
                <h1 className="projects-title">Projects / Extracurriculars</h1>
                <div className="projects-grid-container">
                    {/* Course Clutch Project */}
                    <div className="projects-card">
                        <img
                            src={CC} // Screenshot of Course Clutch website
                            alt="Course Clutch Screenshot"
                            className="projects-image"
                        />
                        <div className="projects-content">
                            <div className="projects-header">
                                <img
                                    src={CourseClutch} // Logo of Course Clutch
                                    alt="Course Clutch Logo"
                                    className="projects-logo"
                                    style={{ width: '28px' }}
                                />
                                <h2 className="projects-name">Course Clutch</h2>
                            </div>
                            <h3 className="projects-position">
                                Co-Founder & Developer
                            </h3>
                            <p className="projects-time">
                                February 2024 - Present
                            </p>
                            <h4 className="bubble-header">Skills</h4>
                            <div className="bubble-container">
                                <span className="bubble">Python</span>
                                <span className="bubble">SQL</span>
                                <span className="bubble">FastAPI</span>
                                <span className="bubble">React</span>
                                <span className="bubble">AWS</span>
                            </div>
                        </div>
                    </div>

                    {/* WAT.ai Project */}
                    <div className="projects-card">
                        <img
                            src={AI} // Screenshot of WAT.ai website
                            alt="WAT.ai Screenshot"
                            className="projects-image"
                        />
                        <div className="projects-content">
                            <div className="projects-header">
                                <img
                                    src={WatAI} // Logo of WAT.ai
                                    alt="WAT.ai Logo"
                                    className="projects-logo"
                                />
                                <h2 className="projects-name">WAT.ai</h2>
                            </div>
                            <h3 className="projects-position">
                                Core Developer
                            </h3>
                            <p className="projects-time">
                                September 2024 - Present
                            </p>
                            <h4 className="bubble-header">Skills</h4>
                            <div className="bubble-container">
                                <span className="bubble">Machine Learning</span>
                                <span className="bubble">Python</span>
                                <span className="bubble">TensorFlow</span>
                            </div>
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
