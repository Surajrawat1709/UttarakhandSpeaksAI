import React, { useState, KeyboardEvent } from 'react';

interface UserInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const send = () => {
    const trimmed = message.trim();
    if (trimmed) {
      onSendMessage(trimmed);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="p-4 border-t border-white/10">
      <div className="flex gap-3 items-center max-w-4xl mx-auto">
        <input
          id="chat-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's on your mind?"
          disabled={disabled}
          className="input-field flex-1"
        />
        <button
          id="chat-send-btn"
          onClick={send}
          disabled={disabled || !message.trim()}
          className="btn-primary px-5 py-3 flex items-center gap-2 flex-shrink-0"
          aria-label="Send message"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  );
};

export default UserInput;
