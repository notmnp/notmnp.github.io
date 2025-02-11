import React from "react";
import CourseClutch from "../../images/courseclutch.png";
import WatAI from "../../images/watai.png";
import Minimax from "../../images/minimax.png"
import DocGen from "../../images/dgen.png"
import { IoLogoLinkedin, IoIosLink, IoLogoGithub, IoIosArrowDown } from "react-icons/io";


type Project = {
  name: string;
  role: string;
  time: string;
  logo: string;
  description: string;
  className: string;
  link: string;
  github: string;
};

const projects: Project[] = [
  {
    name: "Course Clutch",
    role: "Published Project",
    time: "February 2024 - September 2024",
    logo: CourseClutch,
    description: "Course enrollment notifier for high-demand classes.",
    className: "cc",
    link: "https://www.courseclutch.com/",
    github: "",
  },
  {
    name: "WAT.ai",
    role: "Design Team Project",
    time: "October 2024 - April 2025",
    logo: WatAI,
    description: "Developing an ML model for transit delay predictions.",
    className: "watai",
    link: "https://watai.ca/#/",
    github: "https://github.com/WAT-ai/DelayNoMore",
  },
  {
    name: "Minimax Connect 4",
    role: "Personal Project",
    time: "Feburary 2025",
    logo: Minimax,
    description: "AI-powered Connect 4 bot that wins 95% of the time.",
    className: "minimax",
    link: "https://notmnp.github.io/#play",
    github: "https://github.com/notmnp/MinimaxConnect4",
  },
  {
    name: "CLAI",
    role: "Personal Project",
    time: "January 2025",
    logo: DocGen,
    description: "Document generator using LLMs for structured content creation.",
    className: "clai",
    link: "",
    github: "https://github.com/notmnp/CLAI",
  },
];

export const Projects: React.FC = () => {
  return (
    <div className="projects-section" id="projects">
      <h1 className="projects-title">Projects & Teams</h1>
      <div className="projects-grid-container">
        {projects.map((project, index) => (
          <div key={index} className="projects-card">
            <a href={project.link} target="_blank" rel="noopener noreferrer">

            </a>
            <div className="projects-content">
              <div className="projects-header">
                <img
                  src={project.logo}
                  alt={`${project.name} Logo`}
                  className="projects-logo"
                />
                <h2 className="projects-name">
                  {project.link ? (
                    <a
                      href={project.link}
                    >
                      {project.name}
                    </a>
                  ) : (
                    <span>{project.name}</span> 
                  )}
                </h2>
              </div>
              <h3 className={`projects-position ${project.className}`}>
                {project.role}
              </h3>
              <p>{project.description}</p>
              <p className="projects-time">{project.time}</p>
              <div className="projects-button-container">
                {project.link && (
                  <a
                    href={project.link}
                    className={`btn projects-button ${project.className}`}
                  >
                    <IoIosLink/> Website
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn projects-button ${project.className}`}
                  >
                    <IoLogoGithub /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
