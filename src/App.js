import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import SavedTrends from "./Pages/SavedTrends";




function App() {

  // SM.client('getAccessToken'): Promise
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/savedtrends" element={<SavedTrends />} />
      </Routes>
    </Router>
  );
}

export default App;
