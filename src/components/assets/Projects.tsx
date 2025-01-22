import React from "react";
import CC from "../../images/cc.png";
import CourseClutch from "../../images/courseclutch.png";
import AI from "../../images/ai.png";
import WatAI from "../../images/watai.png";

type Project = {
  name: string;
  role: string;
  time: string;
  logo: string;
  image: string;
  skills: string[];
  className: string;
  link: string;
};

const projects: Project[] = [
  {
    name: "Course Clutch",
    role: "Co-Founder & Architect",
    time: "February 2024 - September 2024",
    logo: CourseClutch,
    image: CC,
    skills: ["Python", "SQL", "FastAPI", "React", "AWS"],
    className: "cc",
    link: "https://www.courseclutch.com/",
  },
  {
    name: "WAT.ai",
    role: "Machine Learning Engineer",
    time: "October 2024 - April 2025",
    logo: WatAI,
    image: AI,
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Jira"],
    className: "watai",
    link: "https://watai.ca/#/",
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
              <img
                src={project.image}
                alt={`${project.name} Screenshot`}
                className="projects-image"
              />
            </a>
            <div className="projects-content">
              <div className="projects-header">
                <img
                  src={project.logo}
                  alt={`${project.name} Logo`}
                  className="projects-logo"
                />
                <h2 className="projects-name">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                </h2>
              </div>
              <h3 className={`projects-position ${project.className}`}>
                {project.role}
              </h3>
              <p className="projects-time">{project.time}</p>
              <h4 className="bubble-header">Skills</h4>
              <div className="bubble-container">
                {project.skills.map((skill, index) => (
                  <span key={index} className="bubble">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
