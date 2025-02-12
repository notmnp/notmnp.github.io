import React, { useState } from "react";
import { IoLogoLinkedin, IoIosDocument, IoLogoGithub, IoIosArrowDown } from "react-icons/io";
import "./Home.css"; // Import the CSS file

import RTX from "../../images/rtx.png";
import TD from "../../images/td.png";
import Waterloo from "../../images/waterloo.png";

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
  description: string[];
  skills: string[];
  class: string;
};

const experiences: ExperienceType[] = [
  {
    company: "Pratt & Whitney",
    logo: RTX,
    position: "Software Engineering Intern",
    time: "September 2024 - December 2024",
    location: "Toronto, Ontario",
    description: [
      "Developed a scalable internal application using JavaScript and PostgreSQL that serves 40,000+ users",
      "Engineered a reusable, dynamic commenting framework using PHP and AJAX that integrates frontend input with an SQL database, increasing UI responsiveness by 250% across the application",
      "Optimized form processing with Symfony’s sanitization and controller-model logic, reducing input delays by 95%",
      "Modularized 10+ backend and frontend components to streamline developer integration and accelerate deployment",
      "Co-led a live demonstration of the pre-release application to 20+ senior executives, securing future project funding",
    ],
    skills: ["PHP", "JavaScript", "PostgreSQL", "AJAX", "Symfony", "Twig", "HTML/CSS"],
    class: "pratt",
  },
  {
    company: "TD Bank",
    logo: TD,
    position: "Software Engineering Intern",
    time: "January 2024 - April 2024",
    location: "Toronto, Ontario",
    description: [
      "Designed a TypeScript application that simplifies account navigation and UX for 10,000+ staff, saving 2 hours/week",
      "Built 3+ REST API endpoints for a microservices platform to optimize data retrieval",
      "Implemented a Webpack caching solution that asynchronously updates assets, reducing loading errors by 50%",
      "Tested core Java modules with an extensive JUnit suite to identify 15+ bugs and improve code maintainability",
      "Collaborated with a 12+ member Agile team through daily stand-ups, sprint planning, and Jira/Confluence workflows",
    ],
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
        <h1 id="name" className="decode">
          Milan Pattni
        </h1>
        <p>Currently debugging code, engineering, and my sleep schedule at Waterloo.</p>
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
        <div className="small-box grid-item internship-box">
          <h2 className="grid-header">Seeking Internships</h2>
          <div className="internship-content">
            <span className="internship-date">Summer 2025</span>
          </div>
        </div>

        {/* Current Term Box */}
        <div className="small-box grid-item current-term-box">
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
