import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Telegram theme variables with fallbacks */
    --tg-theme-bg-color: #ffffff;
    --tg-theme-text-color: #000000;
    --tg-theme-hint-color: #999999;
    --tg-theme-link-color: #2678b6;
    --tg-theme-button-color: #2678b6;
    --tg-theme-button-text-color: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    background-color: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
  }

  @media (hover: none) and (pointer: coarse) {
    button:hover {
      transform: none;
      box-shadow: none;
      opacity: 1;
    }
  }

  input, textarea {
    outline: none;
    border: none;
    -webkit-appearance: none;
    border-radius: 0;
    background-color: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
  }

  input::placeholder, textarea::placeholder {
    color: var(--tg-theme-hint-color);
  }

  a {
    color: var(--tg-theme-link-color);
    text-decoration: none;
  }

  @media (max-width: 480px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 320px) {
    body {
      font-size: 13px;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  /* Telegram-specific styles */
  .tg-app {
    /* Hide scrollbars in Telegram Web App */
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default GlobalStyles; 