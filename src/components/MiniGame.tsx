
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

type Choice = 'laser' | 'asteroid' | 'forcefield';
type GameStatus = 'waiting' | 'playing' | 'result';

interface Opponent {
  name: string;
  image: string;
  difficulty: number; // 0-10, affects how likely they are to pick the winning move
}

export const MiniGame = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [queuePosition, setQueuePosition] = useState(42);
  const [opponent, setOpponent] = useState<Opponent>({
    name: 'Zorg-9000',
    image: '/placeholder.svg',
    difficulty: 5
  });
  const [skippedPositions, setSkippedPositions] = useState(0);
  
  const opponents: Opponent[] = [
    { 
      name: 'Zorg-9000', 
      image: '/placeholder.svg',
      difficulty: 5 
    },
    { 
      name: 'Blipblorp', 
      image: '/placeholder.svg',
      difficulty: 3
    },
    { 
      name: 'Kraxon the Destroyer', 
      image: '/placeholder.svg',
      difficulty: 8
    },
    { 
      name: 'Xeno Tourist', 
      image: '/placeholder.svg',
      difficulty: 1
    }
  ];

  useEffect(() => {
    // Select a random opponent
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    setOpponent(randomOpponent);
  }, []);

  const startGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGameStatus('playing');
  };

  const makeChoice = (choice: Choice) => {
    if (gameStatus !== 'playing') return;
    
    setPlayerChoice(choice);
    
    // Computer makes a choice based on difficulty
    const choices: Choice[] = ['laser', 'asteroid', 'forcefield'];
    const randomFactor = Math.random();
    
    // Higher difficulty means computer is more likely to pick the choice that beats the player
    const shouldCounterPlayer = randomFactor < opponent.difficulty / 10;
    
    let computerChoice: Choice;
    
    if (shouldCounterPlayer) {
      // Pick the move that beats player
      if (choice === 'laser') computerChoice = 'forcefield';
      else if (choice === 'asteroid') computerChoice = 'laser';
      else computerChoice = 'asteroid';
    } else {
      // Random move
      computerChoice = choices[Math.floor(Math.random() * choices.length)];
    }
    
    setComputerChoice(computerChoice);
    
    // Determine result
    let roundResult: 'win' | 'lose' | 'draw';
    if (
      (choice === 'laser' && computerChoice === 'asteroid') ||
      (choice === 'asteroid' && computerChoice === 'forcefield') ||
      (choice === 'forcefield' && computerChoice === 'laser')
    ) {
      roundResult = 'win';
      setSkippedPositions(prev => prev + 5);
      setQueuePosition(prev => Math.max(1, prev - 5));
    } else if (choice === computerChoice) {
      roundResult = 'draw';
    } else {
      roundResult = 'lose';
      setQueuePosition(prev => prev + 3);
    }
    
    setResult(roundResult);
    setGameStatus('result');
    
    // Select a new opponent for next round
    const availableOpponents = opponents.filter(o => o.name !== opponent.name);
    const nextOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
    
    setTimeout(() => {
      setOpponent(nextOpponent);
    }, 2000);
  };
  
  const getChoiceIcon = (choice: Choice | null) => {
    if (!choice) return '❓';
    
    switch (choice) {
      case 'laser': return '🔫';
      case 'asteroid': return '🪨';
      case 'forcefield': return '🛡️';
    }
  };
  
  const getResultMessage = () => {
    if (result === 'win') {
      return `You win! You moved ahead 5 places in line.`;
    } else if (result === 'draw') {
      return 'Draw! Your position remains the same.';
    } else {
      return 'You lose! 3 aliens cut in front of you.';
    }
  };
  
  const getSkipMessage = () => {
    if (skippedPositions > 0) {
      return `You've skipped ${skippedPositions} positions so far!`;
    }
    return null;
  };

  return (
    <div className="holographic rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-mars-neon">
        Queue Combat System
      </h2>
      
      <div className="mb-4 text-center">
        <p className="text-sm mb-2">Current position: <span className="text-mars-green font-bold">{queuePosition}</span></p>
        {getSkipMessage() && (
          <p className="text-xs text-mars-orange">{getSkipMessage()}</p>
        )}
      </div>
      
      {gameStatus === 'waiting' ? (
        <div className="text-center">
          <p className="mb-4">Challenge other visitors to skip the line!</p>
          <div className="flex items-center justify-center mb-6 relative">
            <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-mars-purple">
              <img src={opponent.image} alt={opponent.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 w-full">
              <span className="bg-mars-dark px-3 py-1 rounded-full text-xs border border-mars-purple">
                {opponent.name}
              </span>
            </div>
          </div>
          <Button onClick={startGame} className="button-mars">
            Challenge to Duel!
          </Button>
        </div>
      ) : gameStatus === 'playing' ? (
        <div className="text-center">
          <p className="mb-6">Choose your weapon to challenge {opponent.name}!</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => makeChoice('laser')} 
              className="aspect-square text-4xl bg-black bg-opacity-30 rounded-lg border-2 border-mars-purple hover:bg-opacity-50 hover:scale-105 transition-all"
            >
              🔫
              <p className="text-xs mt-1">Laser</p>
            </button>
            <button 
              onClick={() => makeChoice('asteroid')} 
              className="aspect-square text-4xl bg-black bg-opacity-30 rounded-lg border-2 border-mars-purple hover:bg-opacity-50 hover:scale-105 transition-all"
            >
              🪨
              <p className="text-xs mt-1">Asteroid</p>
            </button>
            <button 
              onClick={() => makeChoice('forcefield')} 
              className="aspect-square text-4xl bg-black bg-opacity-30 rounded-lg border-2 border-mars-purple hover:bg-opacity-50 hover:scale-105 transition-all"
            >
              🛡️
              <p className="text-xs mt-1">Forcefield</p>
            </button>
          </div>
          
          <p className="text-xs mb-2">Rules:</p>
          <div className="flex justify-center space-x-3 text-xs text-gray-300">
            <span>Laser beats Asteroid</span>
            <span>•</span>
            <span>Asteroid beats Forcefield</span>
            <span>•</span>
            <span>Forcefield beats Laser</span>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex justify-center items-center space-x-10 mb-4">
            <div>
              <p className="text-sm mb-1">You chose:</p>
              <div className="text-4xl">{getChoiceIcon(playerChoice)}</div>
            </div>
            <div className="text-xl">VS</div>
            <div>
              <p className="text-sm mb-1">They chose:</p>
              <div className="text-4xl">{getChoiceIcon(computerChoice)}</div>
            </div>
          </div>
          
          <div className={`p-3 mb-6 rounded ${
            result === 'win' 
              ? 'bg-mars-green bg-opacity-20 text-mars-green' 
              : result === 'lose' 
                ? 'bg-mars-red bg-opacity-20 text-mars-red' 
                : 'bg-gray-500 bg-opacity-20 text-gray-300'
          }`}>
            <p>{getResultMessage()}</p>
          </div>
          
          <Button onClick={startGame} className="button-alien">
            Challenge Again
          </Button>
        </div>
      )}
    </div>
  );
};
