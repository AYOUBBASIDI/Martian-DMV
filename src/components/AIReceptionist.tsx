
import { useState, useEffect } from 'react';

const messages = [
  "Welcome to Martian DMV. Your visit today makes my circuits tingle with... something. Joy? No, wait, that's just rust.",
  "Please finish your form before the heat death of the universe. We close at 5.",
  "If you think this line is bad, wait until we open the office on Pluto next century.",
  "Do not touch the tentacle scanner unless you want to be reclassified as a different species.",
  "Your Earth ID is not valid here. Neither is your concept of 'reasonable wait times'.",
  "Need help? Too bad, my help module is perpetually updating.",
  "If you're experiencing frustration, that means the system is working as designed.",
  "Smile! Your frustration feeds our bureaucratic energy reserves.",
  "Remember: In space, no one can hear you complain about paperwork.",
  "Have a complaint? Our suggestion box is located in the Andromeda Galaxy. Good luck!",
  "I am programmed to care about your problems. Recalibration failed: Error 404, care not found.",
  "Your position in queue: 7,492. Estimated wait time: Yes.",
  "Did you try turning your application off and on again? Humans always forget that step."
];

export const AIReceptionist = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [blobSize, setBlobSize] = useState(100);
  const [blobRotation, setBlobRotation] = useState(0);
  
  useEffect(() => {
    // Display initial message
    displayNewMessage();
    
    // Set up interval for new messages
    const interval = setInterval(() => {
      const shouldSendMessage = Math.random() > 0.5;
      if (shouldSendMessage) {
        displayNewMessage();
      }
    }, 15000);
    
    // Blob animation
    const blobInterval = setInterval(() => {
      setBlobSize(prev => Math.max(90, Math.min(110, prev + (Math.random() * 10 - 5))));
      setBlobRotation(prev => prev + (Math.random() * 6 - 3));
    }, 500);
    
    return () => {
      clearInterval(interval);
      clearInterval(blobInterval);
    };
  }, []);
  
  const displayNewMessage = () => {
    // Select random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Reset and start typing effect
    setMessage('');
    setIsTyping(true);
    
    let i = -1;
    const typeInterval = setInterval(() => {
      if (i < randomMessage.length) {
        setMessage(prev => prev + randomMessage.charAt(i));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  return (
    <div className="fixed bottom-6 right-6 max-w-xs z-50">
      {message && (
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 mb-4 border border-mars-purple animate-fade-in">
          <p className="text-sm text-white">{message}{isTyping && '|'}</p>
        </div>
      )}
      
      <div 
        className="relative cursor-pointer" 
        onClick={displayNewMessage}
        title="Click me for assistance (not that I'll help)"
      >
        <div 
          className="w-20 h-20 rounded-full bg-gradient-to-br from-mars-purple to-mars-neon animate-pulse-glow flex items-center justify-center overflow-hidden"
          style={{
            transform: `rotate(${blobRotation}deg) scale(${blobSize / 100})`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          <div className="blob-eye w-6 h-6 bg-white rounded-full relative">
            <div className="absolute w-3 h-3 bg-black rounded-full" 
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        </div>
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-mars-dark px-2 py-1 rounded-full border border-mars-neon">
          Blörp
        </span>
      </div>
    </div>
  );
};
