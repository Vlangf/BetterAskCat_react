import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Environment variables
const IMAGE_HOST = import.meta.env.VITE_IMAGE_HOST

const WelcomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url('${IMAGE_HOST}/image/cover/8!.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  animation: fadeIn 1s ease-in;
  padding: 1rem;

  /* Исправление для iOS */
  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-weight: 300;
  letter-spacing: 2px;
  animation: fadeIn 1.5s ease-in;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 320px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #f0f0f0;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  max-width: 600px;
  line-height: 1.6;
  animation: fadeIn 2s ease-in;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
`;

const AskButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: fadeIn 2.5s ease-in;

  &:hover {
    background: linear-gradient(45deg, #ee5a24, #ff6b6b);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.6);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem 2rem;
  }
`;

const MysticOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(102, 126, 234, 0.1) 100%);
  pointer-events: none;
`;

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleAskQuestion = () => {
    navigate('/question');
  };

  return (
    <WelcomeContainer>
      <MysticOverlay />
      <Title>Таро Гадание</Title>
      <Subtitle>
        Откройте тайны будущего с помощью древних карт Таро. 
        Задайте свой вопрос и получите мудрый совет от вселенной.
      </Subtitle>
      <AskButton onClick={handleAskQuestion}>
        Задать вопрос
      </AskButton>
    </WelcomeContainer>
  );
};

export default WelcomeScreen; 