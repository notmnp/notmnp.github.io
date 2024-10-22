import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons
import Signature from "../../../images/signature.png"; // Assuming this is the path to your signature image
import Hamburger from "hamburger-react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State for scroll tracking

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSectionWithOffset = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY - 100; // Adjusting for navbar height offset
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  // Scroll to the contact section
  const scrollToContact = () => {
    scrollToSectionWithOffset("contact");
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling to top
    });
  };

  // Handle scrolling to change navbar opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle resizing the window to enable/disable mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setMenuOpen(false); // Close the menu if resizing to a large screen
      }
    };

    handleResize(); // Set the initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Dark overlay that appears when the menu is open */}
      {isMobile && menuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}

      {/* Apply "scrolled" and "menu-open" classes to <nav> */}
      <nav
        className={`${scrolled ? "scrolled" : ""} ${
          menuOpen ? "menu-open" : ""
        }`}
      >
        <div className="nav-content">
          {/* Scroll to top when clicking the signature */}
          <Link to="/" className="brand" onClick={scrollToTop}>
            <img
              src={Signature}
              alt="Milan Pattni Signature"
              className="signature"
            />
          </Link>
          {/* Hamburger icon - toggle between open and close */}
          {isMobile && (
            <Hamburger
              size={30}
              color="white"
              rounded
              toggled={menuOpen}
              toggle={toggleMenu}
            />
          )}

          <ul className={menuOpen ? "active" : ""}>
            <li>
              <a
                href="#summary"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  toggleMenu(); // Close the menu
                  scrollToSectionWithOffset("summary"); // Scroll to the summary section
                }}
              >
                Summary
              </a>
            </li>
            <li>
              <a
                href="#experiences"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                  scrollToSectionWithOffset("experiences"); // Scroll to the experiences section
                }}
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                  scrollToSectionWithOffset("projects"); // Scroll to the projects section
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                  scrollToContact(); // Scroll to the contact section
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
