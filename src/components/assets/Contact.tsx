import React from 'react';
import { IoLogoLinkedin, IoMdMail } from 'react-icons/io'; // Icons for LinkedIn and Email

const Contact: React.FC = () => {
    return (
        <div id="contact">
            <h2 className="contact-title">Get in Touch</h2>
            <div className="contact-container">
                <p>
                    I'm interested in Winter 2026 internship opportunities. Feel
                    free to reach out if you'd like to connect!
                </p>
                <div
                    className="button-container"
                    style={{ marginTop:'5vh', marginBottom:'2vh',justifyContent: 'center' }}
                >
                    <a
                        href="https://www.linkedin.com/in/pattni"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn linkedin-btn contact-btn"
                    >
                        <IoLogoLinkedin /> LinkedIn
                    </a>

                    <a
                        href="mailto:mpattni@uwaterloo.ca"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn resume-btn contact-btn"
                    >
                        <IoMdMail /> Email
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
