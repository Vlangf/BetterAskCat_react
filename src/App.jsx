import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import GlobalStyles from './styles/GlobalStyles';
import { TelegramProvider, useTelegram } from './contexts/TelegramContext';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${props => props.themeParams?.bg_color || 'var(--tg-theme-bg-color, #ffffff)'};
  color: ${props => props.themeParams?.text_color || 'var(--tg-theme-text-color, #000000)'};
`;

// Wrapper component to access Telegram context
const AppContent = () => {
  const { themeParams, isTelegramApp } = useTelegram();

  useEffect(() => {
    // Apply Telegram theme colors to CSS variables
    if (isTelegramApp) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams?.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-text-color', themeParams?.text_color || '#000000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams?.hint_color || '#999999');
      document.documentElement.style.setProperty('--tg-theme-link-color', themeParams?.link_color || '#2678b6');
      document.documentElement.style.setProperty('--tg-theme-button-color', themeParams?.button_color || '#2678b6');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams?.button_text_color || '#ffffff');
    }
  }, [themeParams, isTelegramApp]);

  return (
    <AppContainer themeParams={themeParams}>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/question" element={<QuestionScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </AppContainer>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <TelegramProvider>
        <AppContent />
      </TelegramProvider>
    </Router>
  );
}

export default App;
