import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons
import Signature from '../../../images/signature.png'; // Assuming this is the path to your signature image
import './Navbar.css';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToSectionWithOffset = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            const sectionTop =
                section.getBoundingClientRect().top + window.pageYOffset;
            const offset = window.innerHeight * 0.2; // 10% of the screen height
            window.scrollTo({
                top: sectionTop + offset,
                behavior: 'smooth',
            });
        }
    };

    const scrollToContact = () => {
        const section = document.getElementById('contact');
        if (section) {
            const contop =
                section.getBoundingClientRect().top + window.pageYOffset;
            const contset = 100; // Set the offset to 50px higher than the top
            window.scrollTo({
                top: contop - contset, // Scroll to 50px above the section
                behavior: 'smooth',
            });
        }
    };

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
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {/* Dark overlay that appears when the menu is open */}
            {isMobile && (
                <div
                    className={
                        menuOpen ? 'menu-overlay active' : 'menu-overlay'
                    }
                    onClick={toggleMenu}
                ></div>
            )}

            <nav>
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
                        <div className="hamburger" onClick={toggleMenu}>
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </div>
                    )}
                    <ul className={menuOpen ? 'active' : ''}>
                        <li>
                            {/* Scroll to top when clicking the Home link */}
                            <Link
                                to="/"
                                onClick={() => {
                                    toggleMenu();
                                    scrollToTop();
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <a
                            href="#experiences"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                toggleMenu(); // Close the menu
                                scrollToSectionWithOffset('experiences'); // Scroll to section with offset
                            }}
                        >
                            Experience
                        </a>
                        <li>
                            <a
                                href="#contact" // Update the href to point to the contact section
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default anchor behavior
                                    toggleMenu(); // Close the menu
                                    scrollToContact(); // Scroll to the contact section without offset
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
