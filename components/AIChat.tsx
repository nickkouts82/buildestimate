
import React, { useState } from 'react';
import { chatWithAssistant } from '../services/geminiService';
import { MOCK_PROS } from '../data';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Hi! I'm your Home Pathway assistant. How can I help you find a property professional today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await chatWithAssistant(userMsg, MOCK_PROS);
    setMessages(prev => [...prev, { role: 'assistant', text: response || "I'm not sure how to answer that." }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 h-96 bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col mb-4 overflow-hidden">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <span className="material-icons text-sm">auto_awesome</span>
              AI Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="material-icons text-sm">close</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                  m.role === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-gray-100 dark:bg-gray-800 text-text-main-light dark:text-text-main-dark rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none text-xs flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 text-xs border-none bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-1 focus:ring-primary dark:text-white"
            />
            <button onClick={handleSend} className="bg-primary text-white p-2 rounded-lg material-icons text-sm">send</button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <span className="material-icons">{isOpen ? 'close' : 'auto_awesome'}</span>
      </button>
    </div>
  );
};

export default AIChat;
