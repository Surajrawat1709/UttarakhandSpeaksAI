import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CHARACTERS } from '../constants';
import { useAppContext } from '../context/AppContext';
import { llamaApi } from '../services/api';

const SelectCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAnimeName, setCurrentImage } = useAppContext();

  const handleChat = async (charName: string, charImage: string, charDesc: string) => {
    setAnimeName(charName);
    setCurrentImage(charImage);
    try {
      await llamaApi.createAnime(charName, charName, charDesc);
    } catch (err) {
      console.error('createAnime error:', err);
    }
    navigate('/chatpage');
  };

  const handleCustomize = async (charName: string, charDesc: string) => {
    setAnimeName(charName);
    try {
      await llamaApi.createAnime(charName, charName, charDesc);
    } catch (err) {
      console.error('createAnime error:', err);
    }
    navigate('/selectVisuals');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="page-container px-4 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-3">Choose Your Character</h1>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Select an Uttarakhand character to start an immersive AI conversation, or customize the chat experience.
            </p>
          </div>

          {/* Character grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHARACTERS.map((char, idx) => (
              <div
                key={idx}
                className="glass-card-hover overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Character image */}
                <div className="relative h-56 bg-gradient-to-br from-primary-900/50 to-accent-900/30 overflow-hidden">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/Dress_c1/village_male_happy.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white font-semibold text-base">{char.name}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-4">
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{char.Desc}</p>

                  <div className="flex gap-2">
                    <button
                      id={`customize-${idx}`}
                      onClick={() => handleCustomize(char.name, char.Desc)}
                      className="btn-secondary flex-1 text-sm py-2"
                    >
                      Customize
                    </button>
                    <button
                      id={`chat-${idx}`}
                      onClick={() => handleChat(char.name, char.image, char.Desc)}
                      className="btn-primary flex-1 text-sm py-2"
                    >
                      Let's Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectCharacterPage;
