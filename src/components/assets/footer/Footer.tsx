import React from 'react';
import { IoLogoLinkedin, IoMdMail, IoMdOpen } from 'react-icons/io'; // Import icons
import './Footer.css'; // Assuming you have a Footer.css file for styles

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <p>
                        Email:{' '}
                        <a href="mailto:mpattni@uwaterloo.ca">
                            <IoMdMail /> mpattni@uwaterloo.ca
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://www.linkedin.com/in/pattni"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IoLogoLinkedin /> LinkedIn
                        </a>
                    </p>
                </div>

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

                <div className="footer-section">
                    <p>
                        Feedback?{' '}
                        <a href="mailto:mpattni@uwaterloo.ca">Reach out!</a>
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    Made with ☕️ and 🏓 breaks.
                </p>
                <p>&copy; 2024 Milan Pattni</p>
            </div>
        </footer>
    );
};

export default Footer;
