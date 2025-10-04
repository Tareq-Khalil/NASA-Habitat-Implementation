import { useState, useEffect } from 'react';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    isRunning: false,
    score: 0,
    habitatLayout: [],
  });

  const startGame = () => {
    setGameState(prevState => ({
      ...prevState,
      isRunning: true,
      score: 0,
      habitatLayout: [],
    }));
  };

  const endGame = () => {
    setGameState(prevState => ({
      ...prevState,
      isRunning: false,
    }));
  };

  const updateScore = (points) => {
    setGameState(prevState => ({
      ...prevState,
      score: prevState.score + points,
    }));
  };

  const updateHabitatLayout = (newLayout) => {
    setGameState(prevState => ({
      ...prevState,
      habitatLayout: newLayout,
    }));
  };

  useEffect(() => {
    // Logic to handle game state changes can be added here
  }, [gameState]);

  return {
    gameState,
    startGame,
    endGame,
    updateScore,
    updateHabitatLayout,
  };
};

export default useGameState;