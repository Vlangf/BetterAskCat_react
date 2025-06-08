import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTelegram } from '../contexts/TelegramContext';

const QuestionContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');
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

const QuestionForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
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

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 300;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const QuestionInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1.1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: rgba(255, 255, 255, 1);
  }

  &::placeholder {
    color: #999;
    font-style: italic;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1.2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #764ba2, #667eea);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackButton = styled.button`
  width: 100%;
  background: transparent;
  color: #666;
  font-size: 1rem;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #ccc;
    transform: translateY(-1px);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const QuestionScreen = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { 
    isTelegramApp, 
    showAlert, 
    showBackButton, 
    hideBackButton,
    setBackButton,
    themeParams 
  } = useTelegram();

  useEffect(() => {
    if (isTelegramApp) {
      // Show back button in Telegram
      showBackButton();
      // Set back button handler
      setBackButton(() => {
        navigate('/');
      });

      return () => {
        hideBackButton();
      };
    }
  }, [isTelegramApp, navigate, showBackButton, hideBackButton, setBackButton]);

  const handleSubmit = async () => {
    if (!question.trim()) {
      if (isTelegramApp) {
        showAlert('Пожалуйста, введите ваш вопрос');
      }
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(import.meta.env.VITE_API_HOST + '/api/tarot-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: question.trim(),
          // Add Telegram user info if available
          ...(isTelegramApp && { 
            telegram_user: window.Telegram.WebApp.initDataUnsafe?.user 
          })
        }),
      });

      if (response.ok) {
        const cardData = await response.json();
        navigate('/result', { 
          state: { 
            cardData,
            question: question.trim()
          } 
        });
      } else {
        // Handle error with Telegram alert if in Telegram
        if (isTelegramApp) {
          showAlert('Произошла ошибка при получении ответа. Попробуйте еще раз.');
        }
        
        // Use mock data as fallback
        const mockCardData = {
          card_name: {
            display_name: "Звезда",
            description: "Карта надежды, вдохновения и духовного руководства. Звезда символизирует обновление, исцеление и веру в будущее. Это время для мечтаний и следования своей интуиции."
          }
        };
        
        navigate('/result', { 
          state: { 
            cardData: mockCardData,
            question: question.trim()
          } 
        });
      }
    } catch (error) {
      console.error('Error fetching tarot reading:', error);
      
      if (isTelegramApp) {
        showAlert('Произошла ошибка при получении ответа. Попробуйте еще раз.');
      }
      
      // Use mock data as fallback
      const mockCardData = {
        card_name: {
          display_name: "Звезда",
          description: "Карта надежды, вдохновения и духовного руководства. Звезда символизирует обновление, исцеление и веру в будущее. Это время для мечтаний и следования своей интуиции."
        }
      };
      
      navigate('/result', { 
        state: { 
          cardData: mockCardData,
          question: question.trim()
        } 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <QuestionContainer className={isTelegramApp ? 'tg-app' : ''}>
      <QuestionForm style={{
        background: isTelegramApp ? 'var(--tg-theme-bg-color)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: isTelegramApp ? 'var(--tg-theme-hint-color)' : 'rgba(255, 255, 255, 0.2)'
      }}>
        <Title style={{
          color: isTelegramApp ? 'var(--tg-theme-text-color)' : '#333'
        }}>
          Задайте свой вопрос
        </Title>
        <Subtitle style={{
          color: isTelegramApp ? 'var(--tg-theme-hint-color)' : '#666'
        }}>
          Сосредоточьтесь на своем вопросе и позвольте картам Таро дать вам ответ
        </Subtitle>
        
        <QuestionInput
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Введите ваш вопрос здесь... Например: 'Что меня ждет в ближайшем будущем?' или 'Как мне поступить в сложной ситуации?'"
          disabled={isLoading}
          style={{
            borderColor: isTelegramApp ? 'var(--tg-theme-hint-color)' : '#e0e0e0',
            color: isTelegramApp ? 'var(--tg-theme-text-color)' : 'inherit',
            backgroundColor: isTelegramApp ? 'var(--tg-theme-bg-color)' : 'rgba(255, 255, 255, 0.9)'
          }}
        />
        
        <SubmitButton 
          onClick={handleSubmit}
          disabled={!question.trim() || isLoading}
          style={{
            background: isTelegramApp ? 'var(--tg-theme-button-color)' : 'linear-gradient(45deg, #667eea, #764ba2)',
            color: isTelegramApp ? 'var(--tg-theme-button-text-color)' : 'white'
          }}
        >
          {isLoading && <LoadingSpinner />}
          {isLoading ? 'Карты говорят...' : 'Получить ответ'}
        </SubmitButton>
        
        {!isTelegramApp && (
          <BackButton 
            onClick={handleBack} 
            disabled={isLoading}
            style={{
              borderColor: isTelegramApp ? 'var(--tg-theme-hint-color)' : '#e0e0e0',
              color: isTelegramApp ? 'var(--tg-theme-text-color)' : '#666'
            }}
          >
            Вернуться назад
          </BackButton>
        )}
      </QuestionForm>
    </QuestionContainer>
  );
};

export default QuestionScreen; 