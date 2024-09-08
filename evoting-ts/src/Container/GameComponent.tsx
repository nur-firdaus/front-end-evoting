import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Card, Typography, message } from 'antd';

const { Title, Text } = Typography;

interface GameState {
  id: string;
  result: string;
  originalWord: string;
  remaining_words :BigInteger;
  scramble_word:string;
  total_words:BigInteger;
  guessed_words:string[];
}

interface GuessInput {
  id:string;
  word: string;
}

const GameComponent: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [guess, setGuess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const startGame = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/game/new');
      setGameState(response.data);
      message.success('Game started! Make your guess.');
    } catch (error) {
      console.error('Error starting game:', error);
      message.error('Failed to start the game. Please try again.');
    }
    setLoading(false);
  };

  console.info(gameState);
  const submitGuess = async () => {
    if (!gameState) {
      message.warning('Please start the game first.');
      return;
    }
    console.info(guess)
    try {
      const response = await axios.get('http://localhost:8080/api/game/guess/'+gameState.id+'/'+guess+'');
      setGameState(response.data);
      message.success(response.data.result);
    } catch (error) {
      console.error('Error submitting guess:', error);
      message.error('Failed to submit guess. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: 'center' }}>Guessing Game</Title>
        {!gameState ? (
          <Button type="primary" block onClick={startGame} loading={loading}>
            Start Game
          </Button>
        ) : (
          <div>
            <Text>{gameState.result}</Text>
            <Input
              placeholder="Enter your guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              style={{ margin: '20px 0' }}
            />
            <Button type="primary" block onClick={submitGuess}>
              Submit Guess
            </Button>
            <div style={{ marginTop: '20px' }}>
              <Text strong>Original Word: </Text><Text>{gameState.originalWord}</Text><br />
              <Text strong>Scrambled Word: </Text><Text>{gameState.scramble_word}</Text><br />
              <Text strong>Remaining Words: </Text><Text>{gameState.remaining_words.toString()}</Text><br />
              <Text strong>Total Words: </Text><Text>{gameState.total_words.toString()}</Text><br />
              <Text strong>Guessed Words: </Text><Text>{gameState.guessed_words.join(', ')}</Text>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GameComponent;
