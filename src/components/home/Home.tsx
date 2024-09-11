import React, { useEffect, useState } from 'react';
import { IoLogoLinkedin, IoIosDocument, IoIosArrowDown } from 'react-icons/io';
import './Home.css'; // Import the CSS file
import CourseClutch from '../../images/courseclutch.png';
import RTX from '../../images/rtx.png';
import TD from '../../images/td.png';
import Waterloo from '../../images/waterloo.png';

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

const experiences = [
    {
        id: 1,
        title: 'Pratt & Whitney',
        role: 'Software Developer Intern',
        time: 'September 2024 - December 2024',
        description: [
            '• Expected to build new content for software build management tools for aircraft engine control systems, to elevate system functionality and optimize development efficiency.',
            '• Tasked with optimizing the performance of existing Oracle management tools to increase processing speed and ensure a smoother user experience for the engineering team.',
            '• Responsible for creating new frameworks and refining existing ones to improve the graphical user interface (GUI) of control system tools, to facilitate more intuitive development, navigation and usability.',
        ],
        skills: ['PHP', 'Javascript'],
        className: 'pratt-whitney', // Add class name for styling
    },
    {
        id: 2,
        title: 'TD Bank',
        role: 'Software Engineering Intern',
        time: 'January 2024 - April 2024',
        description: [
            '• Designed and developed a React and TypeScript-based application, streamlining data access for 10,000+ corporate users, which enhanced operational efficiency and improved user experience.',
            '• Implemented a cache-buster for a suite of microapps through Apache Maven, reducing loading errors by 25%, ensuring up-to-date content delivery and increasing application reliability.',
            '• Managed GIT repositories, reducing merge conflicts by 40%, and collaborated with 15+ team members using Jira for Agile development to improve overall team efficiency and workflow.',
        ],
        skills: ['Java', 'Typescript', 'React', 'HTML', 'CSS'],
        className: 'td-bank', // Add class name for styling
    },
    {
        id: 3,
        title: 'Course Clutch',
        role: 'Co-Founder',
        time: 'February 2024 - Present',
        description: [
            '• Developed a responsive and user-friendly frontend using React, TypeScript, and CSS to provide real-time notifications to 40,000+ University of Waterloo students upon availability of course seats, improving enrollment success.',
            '• Leveraged FastAPI on the backend to automate and refresh enrollment statistics from the University of Waterloo’s API every 10 minutes, and utilized Supabase with PostgreSQL to store and manage order information, ensuring accurate course information delivery and efficient data management.',
            '• Deployed Docker containers with AWS Lambda and S3 for backend hosting, and integrated Stripe’s API for secure payment processing, reducing operational expenses by 90% and enhancing system scalability and transaction security',
        ],
        skills: ['Python', 'SQL', 'AWS', 'Stripe', 'React'],
        className: 'course-clutch', // Add class name for styling
    },
    {
        id: 4,
        title: 'University of Waterloo',
        role: 'Mechatronics Engineering',
        time: 'September 2023 - April 2028',
        description: [
            '• Planning to take the Artificial Intelligence Option to deepen my understanding of machine learning and AI applications.',
            '• Building a strong foundation through courses like Data Structures and Algorithms, Digital Computation, Calculus II, Linear Algebra, Statics, and Circuits.',
            '• Developing practical skills in problem-solving, programming, and system design, preparing for future work in software and hardware integration.',
        ],
        skills: ['C++', 'Python'],
        className: 'waterloo', // Add class name for styling
    },
];

const Home: React.FC = () => {
    const [selectedExperience, setSelectedExperience] = useState(
        experiences[0]
    );

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
            <div className="home-container">
                <div className="neon-strip-wrapper">
                    <div className="neon-strip neon-strip-1"></div>
                    <div className="neon-strip neon-strip-2"></div>
                    <div className="neon-strip neon-strip-3"></div>
                    <div className="neon-strip neon-strip-4"></div>
                </div>

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

                {/* Scroll Indicator */}
                <div
                    className="scroll-indicator"
                    onClick={() => {
                        const experienceSection =
                            document.getElementById('experiences');
                        if (experienceSection) {
                            // Calculate the top of the element relative to the page
                            const sectionTop =
                                experienceSection.getBoundingClientRect().top +
                                window.pageYOffset;

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
                >
                    <IoIosArrowDown />
                </div>
            </div>

            <div id="experiences" className="container">
                <h1 className="experiences-title">Experience</h1>
                <div className="experiences-content">
                    <div className="experience-nav">
                        <ul>
                            {experiences.map((exp) => (
                                <li
                                    key={exp.id}
                                    className={`${exp.className} ${
                                        selectedExperience.id === exp.id
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => setSelectedExperience(exp)}
                                >
                                    {/* Include the appropriate logo inline with the text */}
                                    {exp.className === 'pratt-whitney' && (
                                        <img
                                            src={RTX}
                                            alt="Pratt & Whitney Logo"
                                            style={{
                                                height: '24px',
                                                width: 'auto',
                                                marginRight: '10px',
                                            }}
                                        />
                                    )}
                                    {exp.className === 'td-bank' && (
                                        <img
                                            src={TD}
                                            alt="TD Bank Logo"
                                            style={{
                                                height: '30px',
                                                width: 'auto',
                                                margin: '-10px',
                                                marginLeft: '-3px',
                                            }}
                                        />
                                    )}
                                    {exp.className === 'course-clutch' && (
                                        <img
                                            src={CourseClutch}
                                            alt="Course Clutch Logo"
                                            style={{
                                                height: '27px',
                                                width: 'auto',
                                                margin: '-10px',
                                                marginLeft: '-1px',
                                            }}
                                        />
                                    )}
                                    {exp.className === 'waterloo' && (
                                        <img
                                            src={Waterloo}
                                            alt="University of Waterloo Logo"
                                            style={{
                                                height: '24px',
                                                width: 'auto',
                                                margin: '-10px',
                                                marginTop: '-7px',
                                                marginLeft: '1.5px',
                                            }}
                                        />
                                    )}
                                    {exp.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Experience Card with dynamic color */}
                    <div
                        className={`experience-card ${selectedExperience.className}`}
                    >
                        <h3>
                            {selectedExperience.role} |{' '}
                            <span className={selectedExperience.className}>
                                {selectedExperience.title}
                            </span>
                        </h3>
                        <p className="experience-time">
                            {selectedExperience.time}
                        </p>{' '}
                        {selectedExperience.description.map((desc, index) => (
                            <p key={index}>{desc}</p>
                        ))}
                        {/* Add Skills Heading */}
                        <h4 className="skills-heading">Skills</h4>
                        {/* Render Skills */}
                        <div
                            className={`skills-container ${selectedExperience.className}-skills`}
                        >
                            {selectedExperience.skills.map((skill, index) => (
                                <span key={index} className="skill-card">
                                    {skill}
                                </span>
                            ))}
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
            </div>
        </div>
    );
};

export default Home;
