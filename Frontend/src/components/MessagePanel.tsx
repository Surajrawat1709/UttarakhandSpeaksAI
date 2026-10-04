import React, { useEffect, useRef } from 'react';
import { Message, MessageType } from '../types';

interface MessagePanelProps {
  messages: Message[];
  loading: boolean;
  characterImage: string;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ messages, loading, characterImage }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto chat-scroll px-4 py-6 space-y-4">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full py-16 animate-fade-in">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-500/40 shadow-lg shadow-accent-500/20 mb-4 animate-float">
            <img
              src={characterImage}
              alt="Character"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/Dress_c1/village_male_happy.png';
              }}
            />
          </div>
          <p className="text-white/40 text-sm">Start a conversation…</p>
        </div>
      )}

      {messages.map((msg) => {
        const isUser = msg.sender === MessageType.USER;
        return (
          <div
            key={msg.id}
            className={`flex items-end gap-2 animate-slide-up ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!isUser && (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-accent-500/40 flex-shrink-0 shadow-md">
                <img
                  src={characterImage}
                  alt="AI"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/Dress_c1/village_male_happy.png';
                  }}
                />
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                isUser
                  ? 'bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-br-sm'
                  : 'glass-card text-white/90 rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>

            {isUser && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md">
                U
              </div>
            )}
          </div>
        );
      })}

      {loading && (
        <div className="flex items-end gap-2 animate-fade-in">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-accent-500/40 flex-shrink-0">
            <img src={characterImage} alt="AI" className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/Dress_c1/village_male_happy.png'; }} />
          </div>
          <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessagePanel;
