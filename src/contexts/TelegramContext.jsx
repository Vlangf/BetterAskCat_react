import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const TelegramContext = createContext(null);

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load Telegram Web App script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    script.onload = () => {
      const tg = window.Telegram.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        setWebApp(tg);
        setIsReady(true);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const value = useMemo(() => ({
    webApp,
    isReady,
    isTelegramApp: !!webApp,
    user: webApp?.initDataUnsafe?.user,
    themeParams: webApp?.themeParams,
    platform: webApp?.platform,
    colorScheme: webApp?.colorScheme,
    // Telegram Web App methods
    showAlert: (message) => {
      try {
        if (webApp?.showAlert) {
          webApp.showAlert(message);
        } else {
          // Fallback to browser alert if Telegram alert is not available
          window.alert(message);
        }
      } catch (error) {
        // Fallback to browser alert if Telegram alert fails
        console.warn('Telegram alert failed, falling back to browser alert:', error);
        window.alert(message);
      }
    },
    showConfirm: (message) => webApp?.showConfirm(message),
    showPopup: (params) => webApp?.showPopup(params),
    close: () => webApp?.close(),
    expand: () => webApp?.expand(),
    setHeaderColor: (color) => webApp?.setHeaderColor(color),
    setBackgroundColor: (color) => webApp?.setBackgroundColor(color),
    enableClosingConfirmation: () => webApp?.enableClosingConfirmation(),
    disableClosingConfirmation: () => webApp?.disableClosingConfirmation(),
    setBackButton: (callback) => webApp?.BackButton.onClick(callback),
    showBackButton: () => webApp?.BackButton.show(),
    hideBackButton: () => webApp?.BackButton.hide(),
  }), [webApp, isReady]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

TelegramProvider.propTypes = {
  children: PropTypes.node.isRequired
}; 