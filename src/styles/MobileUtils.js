// Утилиты для мобильной адаптации
export const breakpoints = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1200px'
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  mobileLarge: `@media (max-width: ${breakpoints.mobileLarge})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  desktopLarge: `@media (max-width: ${breakpoints.desktopLarge})`,
  
  // Специальные медиа-запросы
  touchDevice: '@media (hover: none) and (pointer: coarse)',
  retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  landscape: '@media (orientation: landscape)',
  portrait: '@media (orientation: portrait)'
};

// Функция для адаптивных размеров шрифтов
export const responsiveFontSize = (desktop, tablet, mobile) => `
  font-size: ${desktop};
  
  ${mediaQueries.tablet} {
    font-size: ${tablet};
  }
  
  ${mediaQueries.mobileLarge} {
    font-size: ${mobile};
  }
`;

// Функция для адаптивных отступов
export const responsivePadding = (desktop, tablet, mobile) => `
  padding: ${desktop};
  
  ${mediaQueries.tablet} {
    padding: ${tablet};
  }
  
  ${mediaQueries.mobileLarge} {
    padding: ${mobile};
  }
`;

// Миксин для touch-friendly кнопок
export const touchFriendlyButton = `
  min-height: 44px;
  min-width: 44px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  ${mediaQueries.touchDevice} {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`; 