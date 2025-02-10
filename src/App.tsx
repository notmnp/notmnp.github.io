import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/assets/navbar/Navbar';
import Footer from './components/assets/footer/Footer';
import Connect4 from './components/assets/connect4/Connect4';

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Connect4 />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
