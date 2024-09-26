import React, { useState } from 'react';
import { IoLogoLinkedin, IoIosDocument, IoIosArrowDown } from 'react-icons/io';
import './Home.css'; // Import the CSS file

import CourseClutch from '../../images/courseclutch.png';
import RTX from '../../images/rtx.png';
import TD from '../../images/td.png';
import Waterloo from '../../images/waterloo.png';

import { useDecodeText } from '../assets/hooks/useDecodeText';
import { useIntersectionObserver } from '../assets/hooks/useIntersectionObserver';
import { Experience } from '../assets/Experience';
import { Carousel } from '../assets/Carousel';
import { Projects } from '../assets/Projects';
import Contact from '../assets/Contact';
import Sidebar from '../assets/Sidebar';

type ExperienceType = {
    company: string;
    logo: string;
    position: string;
    time: string;
    location: string;
    description: string[];
    skills: string[];
    class: string;
};

const experiences: ExperienceType[] = [
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
    const [selectedExperience, setSelectedExperience] = useState(
        experiences[0]
    ); // Default to the first experience

    useIntersectionObserver();
    useDecodeText('name', 'Milan Pattni', 0.1);

    const handleExperienceSelect = (experience: ExperienceType) => {
        setSelectedExperience(experience); // Update selected experience in Home
    };

    return (
        <div className="container">
            <div className="gradient"></div>
            <div className="home-container">
                <p style={{ marginBottom: '5px' }}>👋 Hi! I'm</p>
                <h1 id="name" className="decode">
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
                    <Carousel />
                </div>
            </div>
            {/* Experience Section */}
            <div className="experience-section" id="experiences">
                <h1 className="experience-title">Work Experience</h1>
                <div className="experience-container">
                    {/* Use Sidebar Component */}
                    <Sidebar
                        experiences={experiences}
                        onSelectExperience={handleExperienceSelect}
                    />
                    {/* Experience Content */}
                    <div className="experience-box-transition active">
                        <Experience experience={selectedExperience} />
                    </div>
                </div>
            </div>
            {/* Projects Section */}
            <Projects />
            <Contact />
        </div>
    );
};

export default Home;
