// This file contains the game logic for the space habitat game, including functions to manage habitat design and exploration.

export const initializeGame = () => {
  // Initialize game state and settings
  return {
    habitats: [],
    currentHabitat: null,
    score: 0,
  };
};

export const addHabitat = (gameState, habitat) => {
  // Add a new habitat to the game state
  return {
    ...gameState,
    habitats: [...gameState.habitats, habitat],
  };
};

export const selectHabitat = (gameState, habitatId) => {
  // Select a habitat for exploration
  const selectedHabitat = gameState.habitats.find(habitat => habitat.id === habitatId);
  return {
    ...gameState,
    currentHabitat: selectedHabitat,
  };
};

export const updateScore = (gameState, points) => {
  // Update the player's score
  return {
    ...gameState,
    score: gameState.score + points,
  };
};

export const resetGame = () => {
  // Reset the game to its initial state
  return initializeGame();
};