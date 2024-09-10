import React from 'react';
import { Link } from 'react-router-dom';
import Signature from '../../../images/signature.png'; // Assuming this is the path to your signature image
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav>
            <div className="nav-content">
                <Link to="/" className="brand">
                    <img
                        src={Signature}
                        alt="Milan Pattni Signature"
                        className="signature"
                    />
                </Link>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/experiences">Experiences</Link>
                    </li>
                    <li>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
