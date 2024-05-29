import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Details from "./components/Details"; 

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
