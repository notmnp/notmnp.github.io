import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/assets/navbar/Navbar';
import Footer from './components/assets/footer/Footer';
import Pointer from './components/assets/pointer/Pointer';

function App() {
    return (
        <Router>
            <Pointer />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
