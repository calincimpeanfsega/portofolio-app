// src/App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddEditWork from './pages/AddEditWork';
import Portfolio from './pages/Portfolio';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/add" element={<AddEditWork />} />
        <Route path="/edit/:id" element={<AddEditWork />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
