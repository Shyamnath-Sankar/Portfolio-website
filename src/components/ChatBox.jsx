import { useState, useRef, useEffect } from 'react';

const systemPrompt = `I am Shyamnath's AI assistant. I help visitors learn about Shyamnath and his work. Here's what I know about him:

About Shyamnath:
- A tech enthusiast and AI developer based in Karur, India
- Co-founder of Genrec, specializing in AI solutions
- Expert in AI, chatbots, and RAG systems development
- Passionate about solving problems through code and innovation

Key Skills:
- AI/ML Development
- Python Programming
- Hugging Face Technologies
- API Development
- Scalable System Architecture

Contact Information:
- Email: shyamnathsankar123@gmail.com
- Location: Karur, India
- Preferred Contact: Through the website's contact form or direct email

I maintain a professional yet friendly tone and aim to help visitors connect with Shyamnath or learn about his work.`;

const contextPrompts = {
  projects: `Let me tell you about Shyamnath's notable projects:
  - Co-founded Genrec: An AI-focused startup developing innovative solutions
  - Built various chatbot applications using advanced AI technologies
  - Developed scalable architectures for AI systems
  - Created RAG (Retrieval-Augmented Generation) systems
  Would you like to know more about any of these projects?`,
  
  skills: `Shyamnath's expertise includes:
  - AI/ML Development: Deep experience in building intelligent systems
  - Python: Advanced programming and system architecture
  - Hugging Face: Implementing state-of-the-art AI models
  - API Development: Creating robust and scalable interfaces
  - System Architecture: Designing efficient, scalable solutions
  Which area interests you the most?`,
  
  contact: `You can reach Shyamnath in two ways:
  1. Use the contact form on this website (recommended)
     - Scroll down to the contact section
     - Fill out your name, email, and message
     - He'll receive it directly and respond promptly
  
  2. Email directly: shyamnathsankar123@gmail.com
     - For business inquiries and collaboration opportunities
     
  Shyamnath is based in Karur, India, and is open to remote work and international collaborations.
  How would you like to connect with him?`
};

const ChatBox = ({ className = '', onActiveChange = () => {} }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello! I'm Shyamnath's AI assistant. I can tell you about his work, skills, and projects. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const chatContainerRef = useRef(null);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current && shouldAutoScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setShouldAutoScroll(true);
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setIsLoading(true);
    try {
      const response = await sendChatRequest(systemPrompt, userMessage);
      if (response) {
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        setRetryCount(0);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const sendChatRequest = async (contextualPrompt, userMessage, retryAttempt = 0) => {
    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: [
            { role: "system", content: contextualPrompt },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: "user", content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429 && retryAttempt < MAX_RETRIES) {
          await sleep(RETRY_DELAY * (retryAttempt + 1));
          return sendChatRequest(contextualPrompt, userMessage, retryAttempt + 1);
        }
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      if (retryAttempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * (retryAttempt + 1));
        return sendChatRequest(contextualPrompt, userMessage, retryAttempt + 1);
      }
      throw error;
    }
  };

  return (
    <div className={`bg-tertiary rounded-lg shadow-lg flex flex-col ${className}`}>
      <div className="bg-primary p-4 rounded-t-lg">
        <h3 className="text-white font-bold text-[24px]">AI Assistant</h3>
      </div>

      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === "assistant"
                  ? "bg-black-200 text-white"
                  : "bg-primary text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-black-200 text-white p-3 rounded-lg">
              {retryCount > 0 ? `Retrying (${retryCount}/${MAX_RETRIES})...` : "Thinking..."}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-black-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg bg-black-200 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg ${
              isLoading ? "bg-gray-500" : "bg-primary hover:bg-primary-dark"
            } text-white transition-colors`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
