import { useState } from 'react';
import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import Projects from './sections/Projects.jsx';
import ChatBox from './components/ChatBox.jsx';
import WorkExperience from './sections/Experience.jsx';

const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Hero />
      <About />
      <ChatBox />
      <Projects />
      <WorkExperience />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
