import React, { useEffect, useState } from 'react';
import { HashLink } from "react-router-hash-link";
import { IoLogoLinkedin, IoIosDocument, IoMdMail } from 'react-icons/io'; // Import icons
import { SiGithub } from 'react-icons/si'; // GitHub icon
import { FaCircle } from "react-icons/fa";
import { GiSchoolBag } from "react-icons/gi";
import { TbGoGame } from "react-icons/tb";
import './Footer.css'; // Assuming you have a Footer.css file for styles

// Scroll to section function
const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const Footer: React.FC = () => {

    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    useEffect(() => {
        const fetchLastCommitDate = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/notmnp/notmnp.github.io/commits/gh-pages');
                const data = await response.json();
                
                if (data && data.commit && data.commit.committer) {
                    const date = new Date(data.commit.committer.date);
                    const formattedDate = date.toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit'
                    });
    
                    const formattedTime = date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
    
                    setLastUpdated(`${formattedDate} at ${formattedTime}`);
                }
            } catch (error) {
                setLastUpdated("Way Back When");
            }
        };
    
        fetchLastCommitDate();
    }, []);

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Section 1: Scroll Links */}
                <div className="footer-section">
                    <p>
                        <HashLink smooth to="/#summary" scroll={scrollWithOffset}>
                            Summary
                        </HashLink>
                    </p>
                    <p>
                        <HashLink smooth to="/#experiences" scroll={scrollWithOffset}>
                            Experience
                        </HashLink>
                    </p>
                    <p>
                        <HashLink smooth to="/#projects" scroll={scrollWithOffset}>
                            Projects
                        </HashLink>
                    </p>
                    <p>
                        <HashLink smooth to="/#contact" scroll={scrollWithOffset}>
                            Contact
                        </HashLink>
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
                        <a
                            href="https://drive.google.com/file/d/1PbCPMxl7v5ztaInkgy_vCxyGc2hIEsrI/view?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IoIosDocument /> Resume
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
                            <GiSchoolBag /> Course Clutch
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://notmnp.github.io/#play"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <TbGoGame /> Minimax Connect 4
                        </a>
                    </p>
                </div>
            </div>

            {/* Section 4: Feedback */}
            <div className="footer-bottom">
                <p>Made with ☕️ and 🏓 breaks.</p>
                <p>
                    Last Updated: {lastUpdated ? lastUpdated : "Fetching..."}
                    <span
                    className="status-indicator"
                    onClick={() => window.open("https://github.com/notmnp/notmnp.github.io", "_blank", "noopener,noreferrer")}
                    style={{ cursor: "pointer" }} 
                    >
                        <FaCircle />
                    </span>
                </p>                
                <p>&copy; {new Date().getFullYear()} Milan Pattni</p>
            </div>
        </footer>
    );
};

export default Footer;
