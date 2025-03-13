import React, { useState } from "react";
import { IoLogoLinkedin, IoIosDocument, IoLogoGithub, IoIosArrowDown } from "react-icons/io";
import "./Home.css"; // Import the CSS file

import RTX from "../../images/rtx.png";
import TD from "../../images/td.png";
import Waterloo from "../../images/waterloo.png";
import ENTY from "../../images/eightyninety.png"

import { useDecodeText } from "../assets/hooks/useDecodeText";
import { useIntersectionObserver } from "../assets/hooks/useIntersectionObserver";
import { Experience } from "../assets/Experience";
import { Carousel } from "../assets/Carousel";
import { Projects } from "../assets/Projects";
import Contact from "../assets/Contact";
import Sidebar from "../assets/Sidebar";

type ExperienceType = {
  company: string;
  logo: string;
  position: string;
  time: string;
  location: string;
  description: string;
  skills: string[];
  class: string;
};

const experiences: ExperienceType[] = [
  {
    company: "8090 Solutions",
    logo: ENTY,
    position: "AI Software Engineering Intern",
    time: "May 2025 - August 2025",
    location: "Toronto, Ontario",
    description: "Incoming Summer 2025. Building AI systems and integrating LLMs to enhance enterprise solutions.",
    skills: ["To", "Be", "Determined!"],
    class: "enty",
  },
  {
    company: "Pratt & Whitney",
    logo: RTX,
    position: "Software Engineering Intern",
    time: "September 2024 - December 2024",
    location: "Toronto, Ontario",
    description: "Developed full-stack internal tools, optimized SQL queries, and improved backend efficiency.",
    skills: ["PHP", "JavaScript", "PostgreSQL", "AJAX", "Symfony", "Twig", "HTML/CSS"],
    class: "pratt",
  },
  {
    company: "TD Bank",
    logo: TD,
    position: "Software Engineering Intern",
    time: "January 2024 - April 2024",
    location: "Toronto, Ontario",
    description: "Designed TypeScript microapps, built REST APIs, and streamlined asset loading.",
    skills: ["TypeScript", "React", "Java", "REST API", "HTML/CSS", "Jira", "Confluence"],
    class: "td",
  },
];

const Home: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState(experiences[0]); // Default to the first experience

  useIntersectionObserver();
  useDecodeText("name", "Milan Pattni", 100);

  const handleExperienceSelect = (experience: ExperienceType) => {
    setSelectedExperience(experience); // Update selected experience in Home
  };

  return (
    <div className="container">
      <div className="gradient"></div>
      <div className="home-container">
        <p style={{ marginBottom: "5px" }}>👋 Hey! I'm</p>
        <h1 id="name"></h1>
        <p>Currently coding, cramming, and caffeinating at the University of Waterloo.</p>
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
            href="https://github.com/notmnp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn gh-btn"
          >
            <IoLogoGithub /> GitHub
          </a>
        </div>

        <div className="scroll-indicator">
          <IoIosArrowDown
            onClick={() => {
              const experienceSection = document.getElementById("summary");
              if (experienceSection) {
                const sectionTop =
                  experienceSection.getBoundingClientRect().top +
                  window.scrollY -
                  100;

                // Adjust the scroll behavior to scroll exactly to the section top
                window.scrollTo({
                  top: sectionTop, // Directly scroll to the top of the section
                  behavior: "smooth", // Smooth scrolling effect
                });
              }
            }}
          />
        </div>
      </div>
      <div className="grid-container" id="summary">
        {/* Available for Internship Box */}
        <div className="grid-item internship-box">
          <h2 className="grid-header">Seeking Internships</h2>
          <div className="internship-content">
            <span className="internship-date">Winter 2026</span>
          </div>
        </div>

        {/* Current Term Box */}
        <div className="grid-item current-term-box">
          <h2 className="grid-header">Current Term</h2>
          <div className="current-term-content">
            <span className="current-term-number">2A</span>
          </div>
        </div>

        {/* Education Section */}
        <div className="education-section grid-item education-box">
          <h2 className="grid-header" style={{ marginBottom: "0px" }}>
            Mechatronics Engineering
          </h2>
          <p className="ai-highlight">Artificial Intelligence Option</p>

          <div className="university">
            <img
              src={Waterloo}
              alt="University of Waterloo"
              className="university-logo"
            />
            <span className="university-name">University of Waterloo</span>
          </div>
          <p className="education-dates">September 2023 - April 2028</p>

          {/* Courses Section */}
          <h3 className="bubble-header" style={{ marginTop:'3vh' }}>Courses</h3>
          <div className="bubble-container">
            <span className="bubble">Data Structures & Algorithms</span>
            <span className="bubble">Digital Computation</span>
            <span className="bubble">Digital Logic</span>
            <span className="bubble">AI & Society</span>
            <span className="bubble">Calculus II</span>
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
            <div className="experience-box-content">
              <Experience experience={selectedExperience} />
            </div>
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
