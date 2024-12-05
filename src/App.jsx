import { useState, useEffect } from 'react';
import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import Projects from './sections/Projects.jsx';
import ChatBox from './components/ChatBox.jsx';
import WorkExperience from './sections/Experience.jsx';

const App = () => {
  useEffect(() => {
    // Force scroll to top on initial load
    if (!window.location.hash) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="max-w-7xl mx-auto relative pt-16">
        <div id="top"></div>
        <section id="home" className="min-h-screen">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="experience">
          <WorkExperience />
        </section>
        <section id="chat" className="mb-8">
          <ChatBox />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default App;
