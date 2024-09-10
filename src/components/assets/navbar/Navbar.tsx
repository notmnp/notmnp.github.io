import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons
import Signature from '../../../images/signature.png'; // Assuming this is the path to your signature image
import './Navbar.css';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Dark overlay that appears when the menu is open */}
            <div
                className={menuOpen ? 'menu-overlay active' : 'menu-overlay'}
                onClick={toggleMenu}
            ></div>

            <nav>
                <div className="nav-content">
                    <Link to="/" className="brand">
                        <img
                            src={Signature}
                            alt="Milan Pattni Signature"
                            className="signature"
                        />
                    </Link>
                    {/* Hamburger icon - toggle between open and close */}
                    <div className="hamburger" onClick={toggleMenu}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                    <ul className={menuOpen ? 'active' : ''}>
                        <li>
                            <Link to="/" onClick={toggleMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/experiences" onClick={toggleMenu}>
                                Experiences
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" onClick={toggleMenu}>
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={toggleMenu}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
