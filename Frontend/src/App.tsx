import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import LoginPage from './pages/LoginPage';
import SelectCharacterPage from './pages/SelectCharacterPage';
import SelectVisualsPage from './pages/SelectVisualsPage';
import ChatPage from './pages/ChatPage';
import GenerateImagePage from './pages/GenerateImagePage';
import PaymentPage from './pages/PaymentPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/selectCharacter" replace />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main app flow */}
        <Route path="/selectCharacter" element={<SelectCharacterPage />} />
        <Route path="/home" element={<SelectCharacterPage />} />
        <Route path="/selectVisuals" element={<SelectVisualsPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/generateImg" element={<GenerateImagePage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/selectCharacter" replace />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
