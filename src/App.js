import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import NavBar from './components/NavBar/NavBar';
import AppRoutes from './routes/routes'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar>
          <AppRoutes />
        </NavBar>
      </Router>
    </div>
  );
}

export default App;
