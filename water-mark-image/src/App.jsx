import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Main/Home';
import EditingImage from './Components/Main/EditingImage';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editing" element={<EditingImage />} />
      </Routes>
    </Router>
  );
}


export default App
