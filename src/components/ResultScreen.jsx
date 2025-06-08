import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Environment variables
const API_HOST = import.meta.env.VITE_API_HOST;
const IMAGE_HOST = import.meta.env.VITE_IMAGE_HOST;

const ResultContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('${IMAGE_HOST}/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 2rem;
  animation: fadeIn 1s ease-in;

  @media (max-width: 768px) {
    background-attachment: scroll;
    padding: 1rem;
  }
`;

const ResultCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 25px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  max-width: 800px;
  width: 100%;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  animation: fadeIn 1.5s ease-in;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin: 0.5rem;
  }

  @media (max-width: 320px) {
    padding: 1rem;
    margin: 0.25rem;
  }
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  font-style: italic;
  line-height: 1.6;
  
  &:before {
    content: '"';
    font-size: 1.5rem;
    color: #999;
  }
  
  &:after {
    content: '"';
    font-size: 1.5rem;
    color: #999;
  }
`;

const CardName = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: fadeIn 2s ease-in;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const CardImageContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  animation: fadeIn 2.5s ease-in;
`;

const CardImage = styled.img`
  max-width: 300px;
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 250px;
  }
`;

const CardDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 3rem;
  text-align: left;
  animation: fadeIn 3s ease-in;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }
`;

const BackButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: fadeIn 3.5s ease-in;

  &:hover {
    background: linear-gradient(45deg, #764ba2, #667eea);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cardImage, setCardImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const { cardData, question } = location.state || {};

  useEffect(() => {
    if (!cardData) {
      navigate('/');
      return;
    }

    const loadCardImage = async () => {
      try {
        // Для реального API:
        // const imageUrl = import.meta.env.VITE_IMAGE_HOST + `/card-image/${cardData.card_name.display_name}`;
        // Для демонстрации используем изображение карты Таро из Unsplash
        const imageUrl = `https://images.unsplash.com/photo-1551431009-a802eeec77b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`;
        
        // Симулируем задержку загрузки
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setCardImage(imageUrl);
      } catch (error) {
        console.error('Error loading card image:', error);
        // Используем изображение по умолчанию
        setCardImage(DEFAULT_CARD_IMAGE);
      } finally {
        setIsLoadingImage(false);
      }
    };

    loadCardImage();
  }, [cardData, navigate]);

  const handleBackToStart = () => {
    navigate('/');
  };

  if (!cardData) {
    return null;
  }

  if (isLoadingImage) {
    return (
      <ResultContainer>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Карты раскрывают свои тайны...</LoadingText>
        </LoadingContainer>
      </ResultContainer>
    );
  }

  return (
    <ResultContainer>
      <ResultCard>
        {question && (
          <QuestionText>
            {question}
          </QuestionText>
        )}
        
        <CardName>
          {cardData.card_name.display_name}
        </CardName>
        
        <CardImageContainer>
          <CardImage 
            src={cardImage} 
            alt={cardData.card_name.display_name}
            onError={(e) => {
              e.target.src = DEFAULT_CARD_IMAGE;
            }}
          />
        </CardImageContainer>
        
        <CardDescription>
          {cardData.card_name.description}
        </CardDescription>
        
        <BackButton onClick={handleBackToStart}>
          Задать новый вопрос
        </BackButton>
      </ResultCard>
    </ResultContainer>
  );
};

export default ResultScreen; 