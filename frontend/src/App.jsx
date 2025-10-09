import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { HeroAnimation } from './components/animations/HeroAnimation';
import { Home } from './pages/Home';
// import { About } from './pages/About';
// import { Projects } from './pages/Projects';
// import { Skills } from './pages/Skills';
// import { Experience } from './pages/Experience';
// import { Services } from './pages/Services';
import './styles/main.css';

function App() {
  return (
    <div className="App">
      {/* Hero Animation for modern interaction */}
      <HeroAnimation />
      
      <Router>
        <div className="app-layout">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/about" element={<About />} /> */}
              {/* <Route path="/projects" element={<Projects />} /> */}
              {/* <Route path="/skills" element={<Skills />} /> */}
              {/* <Route path="/experience" element={<Experience />} /> */}
              {/* <Route path="/services" element={<Services />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;