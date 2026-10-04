import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';
import { llamaApi } from '../services/api';
import { VIEWS, TYPES, MOODS, FALLBACK_IMAGES } from '../constants';

type ViewType = typeof VIEWS[number];
type PersonType = typeof TYPES[number];
type MoodType = typeof MOODS[number];

const checkImageExists = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

const SelectVisualsPage: React.FC = () => {
  const navigate = useNavigate();
  const { username, animeName, currentImage, setCurrentImage } = useAppContext();

  const [selectedView, setSelectedView] = useState<ViewType>('Home');
  const [selectedType, setSelectedType] = useState<PersonType>('Male');
  const [selectedMood, setSelectedMood] = useState<MoodType>('Happy');
  const [scenario, setScenario] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const url = `/assets/Dress_c1/${selectedView.toLowerCase()}_${selectedType.toLowerCase()}_${selectedMood.toLowerCase()}.png`;
    const exists = await checkImageExists(url);
    const finalUrl = exists
      ? url
      : FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
    setCurrentImage(finalUrl);
    setLoading(false);
  };

  const handleChat = async () => {
    try {
      await llamaApi.createChat(username || 'user', animeName, scenario);
    } catch (err) {
      console.error('createChat error:', err);
    }
    navigate('/chatpage');
  };

  const RadioGroup = ({
    label,
    options,
    value,
    onChange,
    groupId,
  }: {
    label: string;
    options: readonly string[];
    value: string;
    onChange: (v: any) => void;
    groupId: string;
  }) => (
    <div className="space-y-2">
      <p className="text-white/70 text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            id={`${groupId}-${opt.toLowerCase()}`}
            onClick={() => { onChange(opt); generateImage(); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
              value === opt
                ? 'bg-accent-500/30 border-accent-500/60 text-accent-300'
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="page-container px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold gradient-text mb-2">Customize Chat</h1>
            <p className="text-white/50 text-sm">Tailor the scene and appearance for your AI character.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
            {/* Left: Preview */}
            <div className="glass-card p-6 flex flex-col items-center gap-6">
              <h2 className="text-white font-semibold self-start">Character Preview</h2>

              <div className="w-full h-72 rounded-xl overflow-hidden bg-gradient-to-br from-primary-900/40 to-accent-900/30 relative">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 spinner-glow" />
                  </div>
                ) : (
                  <img
                    src={currentImage}
                    alt="Character"
                    className="w-full h-full object-contain transition-opacity duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/Dress_c1/village_male_happy.png';
                    }}
                  />
                )}
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="scenario-input" className="label">Set the scenario / prompt</label>
                <input
                  id="scenario-input"
                  type="text"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="e.g. Asking for directions from the locals."
                  maxLength={200}
                  className="input-field text-sm"
                />
                <p className="text-right text-xs text-white/30">{scenario.length}/200</p>
              </div>

              <button id="lets-chat-btn" onClick={handleChat} className="btn-primary w-full">
                Let's Chat →
              </button>
            </div>

            {/* Right: Options */}
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-white font-semibold">Scene Options</h2>

              <RadioGroup
                label="Choose the scene"
                options={VIEWS}
                value={selectedView}
                onChange={setSelectedView}
                groupId="view"
              />
              <RadioGroup
                label="Type of person"
                options={TYPES}
                value={selectedType}
                onChange={setSelectedType}
                groupId="type"
              />
              <RadioGroup
                label="Mood of the person"
                options={MOODS}
                value={selectedMood}
                onChange={setSelectedMood}
                groupId="mood"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectVisualsPage;
