import React from 'react';
import { IoLogoLinkedin, IoMdMail, IoMdOpen } from 'react-icons/io'; // Import icons
import { SiGithub } from 'react-icons/si'; // GitHub icon
import './Footer.css'; // Assuming you have a Footer.css file for styles

// Scroll to section function
const scrollToSectionWithOffset = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
        const sectionTop =
            section.getBoundingClientRect().top + window.pageYOffset;
        const offset = 100; // Adjust the offset value if necessary
        window.scrollTo({
            top: sectionTop - offset, // Apply the offset
            behavior: 'smooth',
        });
    }
};

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Section 1: Scroll Links */}
                <div className="footer-section">
                    <p>
                        <a
                            href="#summary"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSectionWithOffset('summary');
                            }}
                        >
                            Summary
                        </a>
                    </p>
                    <p>
                        <a
                            href="#experiences"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSectionWithOffset('experiences');
                            }}
                        >
                            Experience
                        </a>
                    </p>
                    <p>
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSectionWithOffset('projects');
                            }}
                        >
                            Projects
                        </a>
                    </p>
                    <p>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSectionWithOffset('contact');
                            }}
                        >
                            Contact
                        </a>
                    </p>
                </div>

                {/* Section 2: Email and GitHub */}
                <div className="footer-section">
                    <p>
                        <a
                            href="https://www.linkedin.com/in/pattni"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IoLogoLinkedin /> LinkedIn
                        </a>
                    </p>
                    <p>
                        <a href="mailto:mpattni@uwaterloo.ca">
                            <IoMdMail /> Email
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://github.com/notmnp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <SiGithub /> GitHub
                        </a>
                    </p>
                </div>

                {/* Section 3: Course Clutch */}
                <div className="footer-section">
                    <p>
                        <a
                            href="https://www.courseclutch.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IoMdOpen /> Course Clutch
                        </a>
                    </p>
                </div>
            </div>

            {/* Section 4: Feedback */}
            <div className="footer-bottom">
                <p>
                    Feedback?{' '}
                    <a href="mailto:mpattni@uwaterloo.ca">Reach out!</a>
                </p>
                <p>Made with ☕️ and 🏓 breaks.</p>
                <p>&copy; 2024 Milan Pattni</p>
            </div>
        </footer>
    );
};

export default Footer;
