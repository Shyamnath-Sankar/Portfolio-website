import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text">My Selected Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer">
              <p>Check Live Site</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>

            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

const projectsData = [
  {
    name: "AI Chatbots",
    description: "Custom-built chatbots designed for social and professional purposes, including a girlfriend chatbot and business-centric bots. These leverage conversational AI to deliver engaging, responsive interactions, enhance user experiences, and streamline tasks. Tailored for personalized needs, they integrate seamlessly into various platforms, supporting community building and business outreach.",
    tags: [
      { name: "conversational-ai", color: "blue-text-gradient" },
      { name: "nlp", color: "green-text-gradient" },
      { name: "chatbot", color: "pink-text-gradient" },
    ],
    image: "https://raw.githubusercontent.com/adrianhajdin/project_3D_developer_portfolio/main/src/assets/carrent.png",
  },
  {
    name: "RAG System (PDF-Based)",
    description: "A Retrieval-Augmented Generation system designed to extract information from PDFs. Built using the Ollama model, it enables advanced document processing, indexing, and response generation. This tool provides quick, precise insights, ideal for research, business, or technical use, showcasing AI's efficiency in information retrieval and contextual understanding.",
    tags: [
      { name: "rag", color: "blue-text-gradient" },
      { name: "ollama", color: "green-text-gradient" },
      { name: "pdf-processing", color: "pink-text-gradient" },
    ],
    image: "https://raw.githubusercontent.com/adrianhajdin/project_3D_developer_portfolio/main/src/assets/jobit.png",
  },
  {
    name: "Hugging Face Deployment",
    description: "Deploying a 7B-parameter model via Hugging Face for scalable apps or websites. Designed to handle 5–10 concurrent users, it integrates cutting-edge AI capabilities for chatbots, RAG systems, or custom AI solutions. Focused on robust performance, it bridges advanced AI models with practical, real-world applications.",
    tags: [
      { name: "huggingface", color: "blue-text-gradient" },
      { name: "llm", color: "green-text-gradient" },
      { name: "deployment", color: "pink-text-gradient" },
    ],
    image: "https://raw.githubusercontent.com/adrianhajdin/project_3D_developer_portfolio/main/src/assets/tripguide.png",
  },
  {
    name: "SearxNG Setup",
    description: "Installation and configuration of SearxNG on Windows without Docker or WSL, ensuring privacy-focused search capabilities. This setup supports personalized and secure searches, demonstrating expertise in system customization and deployment. It empowers users with efficient, open-source search engine alternatives tailored to specific needs.",
    tags: [
      { name: "searxng", color: "blue-text-gradient" },
      { name: "privacy", color: "green-text-gradient" },
      { name: "search-engine", color: "pink-text-gradient" },
    ],
    image: "https://raw.githubusercontent.com/adrianhajdin/project_3D_developer_portfolio/main/src/assets/tripguide.png",
  },
  {
    name: "Business and Collaboration Initiatives",
    description: "Focused on inspiring talent to join your startup Genrec, you've developed strategies to foster teamwork and build an AI-focused community. By emphasizing long-term vision and innovation, you effectively engage collaborators and promote your mission of delivering transformative AI solutions to address modern challenges.",
    tags: [
      { name: "startup", color: "blue-text-gradient" },
      { name: "ai-community", color: "green-text-gradient" },
      { name: "innovation", color: "pink-text-gradient" },
    ],
    image: "https://raw.githubusercontent.com/adrianhajdin/project_3D_developer_portfolio/main/src/assets/tripguide.png",
  },
];

export default Projects;
