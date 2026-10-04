import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MessagePanel from '../components/MessagePanel';
import UserInput from '../components/UserInput';
import { Message, MessageType } from '../types';
import { llamaApi } from '../services/api';
import { useAppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { username, animeName, currentImage } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const createMessage = (content: string, type: MessageType): Message => ({
    id: uuidv4(),
    sender: type,
    content,
    dateTime: new Date(),
  });

  const handleSendMessage = async (text: string) => {
    const userMsg = createMessage(text, MessageType.USER);
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await llamaApi.queryPrompt(username || 'user', animeName, text);
      const aiMsg = createMessage(res.data.response, MessageType.ASSISTANT);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('queryPrompt error:', err);
      const errMsg = createMessage('Sorry, I couldn\'t process that. Please try again.', MessageType.ASSISTANT);
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar: character card */}
        <aside className="hidden lg:flex flex-col w-64 p-4 border-r border-white/10 bg-dark-900/40 backdrop-blur-sm flex-shrink-0">
          <div className="glass-card p-4 flex flex-col items-center gap-3 mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-500/40 shadow-lg shadow-accent-500/10 animate-float">
              <img
                src={currentImage}
                alt="Character"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/Dress_c1/village_male_happy.png';
                }}
              />
            </div>
            <p className="text-white font-semibold text-sm text-center">{animeName || 'AI Character'}</p>
            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
              ● Online
            </span>
          </div>

          <div className="space-y-2">
            <button
              id="sidebar-generate-img-btn"
              onClick={() => navigate('/generateImg')}
              className="btn-secondary w-full text-sm py-2"
            >
              Generate Image
            </button>
            <button
              id="sidebar-home-btn"
              onClick={() => navigate('/selectCharacter')}
              className="btn-ghost w-full text-sm py-2"
            >
              Change Character
            </button>
          </div>
        </aside>

        {/* Main chat area */}
        <main className="flex flex-col flex-1 overflow-hidden">
          <MessagePanel
            messages={messages}
            loading={loading}
            characterImage={currentImage}
          />
          <UserInput onSendMessage={handleSendMessage} disabled={loading} />
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
