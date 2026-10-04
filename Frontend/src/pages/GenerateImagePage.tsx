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

const GenerateImagePage: React.FC = () => {
  const navigate = useNavigate();
  const { username, animeName, setCurrentImage } = useAppContext();

  const [selectedView, setSelectedView] = useState<ViewType>('Home');
  const [selectedType, setSelectedType] = useState<PersonType>('Male');
  const [selectedMood, setSelectedMood] = useState<MoodType>('Happy');
  const [previewImage, setPreviewImage] = useState<string>('/assets/Dress_c1/village_male_happy.png');
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState('');

  const generateImage = async (view: ViewType, type: PersonType, mood: MoodType) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 5000));
    const url = `/assets/Dress_c1/${view.toLowerCase()}_${type.toLowerCase()}_${mood.toLowerCase()}.png`;
    const exists = await checkImageExists(url);
    const finalUrl = exists
      ? url
      : FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
    setPreviewImage(finalUrl);
    setCurrentImage(finalUrl);
    setLoading(false);
  };

  const handleOptionChange = (
    view: ViewType = selectedView,
    type: PersonType = selectedType,
    mood: MoodType = selectedMood
  ) => {
    generateImage(view, type, mood);
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
            id={`gen-${groupId}-${opt.toLowerCase()}`}
            onClick={() => { onChange(opt); }}
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
            <h1 className="text-3xl font-bold gradient-text mb-2">Generate Image</h1>
            <p className="text-white/50 text-sm">
              Choose scene, type and mood to generate a character image.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
            {/* Left: Preview */}
            <div className="glass-card p-6 flex flex-col items-center gap-6">
              <h2 className="text-white font-semibold self-start">Generated Preview</h2>

              <div className="w-full h-80 rounded-xl overflow-hidden bg-gradient-to-br from-primary-900/40 to-accent-900/30 relative">
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 spinner-glow" />
                    <p className="text-white/40 text-xs animate-pulse">Generating…</p>
                  </div>
                ) : (
                  <img
                    src={previewImage}
                    alt="Generated character"
                    className="w-full h-full object-contain transition-opacity duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/Dress_c1/village_male_happy.png';
                    }}
                  />
                )}
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="gen-scenario" className="label">Add a scenario (optional)</label>
                <input
                  id="gen-scenario"
                  type="text"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="e.g. Asking for directions from the locals."
                  className="input-field text-sm"
                />
              </div>

              <button id="gen-chat-btn" onClick={handleChat} className="btn-primary w-full">
                Let's Chat →
              </button>
            </div>

            {/* Right: Options */}
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-white font-semibold">Generation Options</h2>

              <RadioGroup
                label="Scene / Location"
                options={VIEWS}
                value={selectedView}
                onChange={(v) => { setSelectedView(v); handleOptionChange(v, selectedType, selectedMood); }}
                groupId="view"
              />
              <RadioGroup
                label="Type of person"
                options={TYPES}
                value={selectedType}
                onChange={(v) => { setSelectedType(v); handleOptionChange(selectedView, v, selectedMood); }}
                groupId="type"
              />
              <RadioGroup
                label="Mood"
                options={MOODS}
                value={selectedMood}
                onChange={(v) => { setSelectedMood(v); handleOptionChange(selectedView, selectedType, v); }}
                groupId="mood"
              />

              <button
                id="gen-generate-btn"
                onClick={() => generateImage(selectedView, selectedType, selectedMood)}
                disabled={loading}
                className="btn-secondary w-full"
              >
                {loading ? 'Generating…' : '⚡ Generate Image'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenerateImagePage;
