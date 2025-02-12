import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import Signature from "../../../images/signature.png"; // Adjust the path as needed
import Hamburger from "hamburger-react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Scroll function with offset of -100px
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100; // Offset by -100px
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  // Scroll to top function (for clicking the signature)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Track scroll to add a "scrolled" class to the navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect mobile screen sizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setMenuOpen(false); // Close menu on larger screens
      }
    };
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Dark overlay when mobile menu is open */}
      {isMobile && menuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}

      {/* Navbar with conditional classes */}
      <nav className={`${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
        <div className="nav-content">
          <li>
            <HashLink smooth to="/#" scroll={scrollToTop}>
              <img src={Signature} alt="Milan Pattni Signature" className="signature" />
            </HashLink>
          </li>

          {/* Hamburger icon for mobile */}
          {isMobile && (
            <Hamburger
              size={30}
              color="white"
              rounded
              toggled={menuOpen}
              toggle={toggleMenu}
            />
          )}

          {/* Navigation links */}
          <ul className={menuOpen ? "active" : ""}>
            <li>
              <HashLink smooth to="/#summary" scroll={scrollWithOffset} onClick={toggleMenu}>
                Summary
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#experiences" scroll={scrollWithOffset} onClick={toggleMenu}>
                Experience
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#projects" scroll={scrollWithOffset} onClick={toggleMenu}>
                Projects
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#contact" scroll={scrollWithOffset} onClick={toggleMenu}>
                Contact
              </HashLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;