import React, { useState } from 'react';

type ExperienceType = {
    company: string;
    logo: string;
    class: string;
    position: string;
    time: string;
    location: string;
    description: string[];
    skills: string[];
};

interface SidebarProps {
    experiences: ExperienceType[];
    onSelectExperience: (experience: ExperienceType) => void; // Callback to pass selected experience to Home
}

const Sidebar: React.FC<SidebarProps> = ({
    experiences,
    onSelectExperience,
}) => {
    const [selectedExperience, setSelectedExperience] =
        useState<ExperienceType>(experiences[0]); // Default to the first experience

    const handleSelect = (experience: ExperienceType) => {
        const transitionElement = document.querySelector(
            '.experience-box-transition'
        );
        if (transitionElement) {
            transitionElement.classList.remove('active');
            setTimeout(() => {
                setSelectedExperience(experience); // Update selected experience in Sidebar
                onSelectExperience(experience); // Pass selected experience back to Home
                transitionElement.classList.add('active');
            }, 300);
        }
    };

    return (
        <div className="experience-sidebar-wrapper">
            <ul className="toc-list experience-sidebar">
                {experiences.map((exp, index) => (
                    <li
                        key={index}
                        className={`toc-item ${exp.class} ${
                            selectedExperience.company === exp.company
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
    );
};

export default Sidebar;
