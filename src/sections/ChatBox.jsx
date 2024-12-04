import { useState, useRef } from 'react';
import { Mistral } from '@mistralai/mistralai';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => {
      // Keep only last 10 messages for performance
      const newMessages = [...prev.slice(-9), userMessage];
      setTimeout(scrollToBottom, 100);
      return newMessages;
    });
    setInputMessage('');
    setIsLoading(true);

    try {
      const client = new Mistral({ apiKey: import.meta.env.VITE_MISTRAL_API_KEY });
      const chatResponse = await client.chat.complete({
        model: 'mistral-tiny',
        messages: [...messages.slice(-4), userMessage], // Only use last 5 messages for context
      });

      const aiResponse = chatResponse.choices[0].message;
      setMessages(prev => {
        const newMessages = [...prev, aiResponse];
        setTimeout(scrollToBottom, 100);
        return newMessages;
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    }

    setIsLoading(false);
  };

  return (
    <section className="c-space my-20" id="chat">
      <h3 className="head-text">Chat with my AI</h3>

      <div className="mt-10 flex flex-col bg-black-200 rounded-2xl">
        <div 
          ref={chatContainerRef}
          className="flex-1 p-6 min-h-[300px] sm:min-h-[400px] max-h-[400px] sm:max-h-[500px] overflow-y-auto"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch' // For smooth scrolling on iOS
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left">
              <div className="inline-block p-3 rounded-lg bg-gray-700 text-white">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-black-100 text-white-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChatBox;
