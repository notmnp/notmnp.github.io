import React, { useState } from "react";
import { IoLogoLinkedin, IoIosDocument, IoIosArrowDown } from "react-icons/io";
import "./Home.css"; // Import the CSS file

import CourseClutch from "../../images/courseclutch.png";
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
    position: "Full Stack Developer Intern",
    time: "September 2024 - December 2024",
    location: "Toronto, Ontario",
    description: [
      "Developed a scalable wiki using JavaScript and HTML, integrating PostgreSQL to support concurrent queries for 40,000+ employees and developers, optimizing knowledge management and real-time information access",
      "Deployed a company-wide commenting system by interlinking SQL-stored data with a PHP model and AJAX-triggered PHP controller, enabling dynamic rendering through JavaScript and Twig, increasing UI responsiveness by 250%",
      "Optimized the backend architecture of control system tools by modularizing 6+ controllers and models with Symfony and PHP, reducing form processing delays by 95%, while maintaining system reliability and data sanitization",
    ],
    skills: ["PHP", "JavaScript", "PostgreSQL", "HTML", "Twig", "CSS"],
    class: "pratt",
  },
  {
    company: "TD Bank",
    logo: TD,
    position: "Software Engineer Intern",
    time: "January 2024 - April 2024",
    location: "Toronto, Ontario",
    description: [
      "Spearheaded the development of a React and TypeScript-based application, streamlining account access for 10,000+ staff members, improving operational efficiency by saving an average of 2 hours per week in user navigation time",
      "Prototyped a Webpack caching system for a suite of microapps and integrated them with Apache Maven, reducing loading errors by 50% and ensuring up-to-date content delivery, enhancing overall performance and reliability",
      "Facilitated Agile development among 15+ team members by leveraging Jira and Confluence for project tracking and documentation, implementing structured Git workflows to improve collaboration and simplify code integration",
    ],
    skills: ["Java", "TypeScript", "React", "HTML", "CSS", "Git"],
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
        <p>I Study Mechatronics Engineering at the University of Waterloo.</p>
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
            href="https://www.courseclutch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn cc-btn"
          >
            <img
              src={CourseClutch}
              alt="Course Clutch Logo"
              className="cc-image"
            />
            Course Clutch
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
          <h3 className="bubble-header">Courses</h3>
          <div className="bubble-container">
            <span className="bubble">Data Structures and Algorithms</span>
            <span className="bubble">Digital Computation</span>
            <span className="bubble">Calculus II</span>
            <span className="bubble">Linear Algebra</span>
            <span className="bubble">Statics</span>
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
            <Experience experience={selectedExperience} />
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
