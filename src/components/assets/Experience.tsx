import React from 'react';
import { FaClock, FaLocationPin } from 'react-icons/fa6';

// Define the ExperienceType interface at the top of the file
interface ExperienceType {
    company: string;
    logo: string;
    position: string;
    time: string;
    location: string;
    description: string[];
    skills: string[];
    class: string;
}

type ExperienceProps = {
    experience: ExperienceType;
};

export const Experience: React.FC<ExperienceProps> = ({ experience }) => (
    <div className="experience-content">
        <div className="experience-box">
            <div className="experience-header">
                <img
                    src={experience.logo}
                    alt={`${experience.company} Logo`}
                    className="experience-logo"
                />
                <h2 className="company-header">{experience.company}</h2>
            </div>
            <h3 className={`experience-position ${experience.class}`}>
                {experience.position}
            </h3>

            {/* Time and Location with Icons */}
            <div className="experience-details">
                <p className="experience-time">
                    <FaClock className="company-icon" />
                    {experience.time}
                </p>
                <p className="experience-location">
                    <FaLocationPin className="company-icon" />
                    {experience.location}
                </p>
            </div>

            {/* Description Section */}
            <ul className="experience-description">
                {experience.description.map((item: string, index: number) => (
                    <li key={index} className="description-item">
                        {item}
                    </li>
                ))}
            </ul>

            {/* Skills Section */}
            <h4 className="bubble-header">Skills</h4>
            <div className="bubble-container">
                {experience.skills.map((skill: string, index: number) => (
                    <span key={index} className="bubble">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    </div>
);
