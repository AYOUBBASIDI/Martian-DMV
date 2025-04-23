
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type CaptchaItem = {
  id: number;
  isAnomaly: boolean;
  imageSrc: string;
  selected: boolean;
};

export const AlienCaptcha = () => {
  const [captchaItems, setCaptchaItems] = useState<CaptchaItem[]>([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showingError, setShowingError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Generate captcha grid
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const newItems: CaptchaItem[] = [];
    
    // Generate a random number of anomalies (2-4)
    const anomalyCount = Math.floor(Math.random() * 3) + 2;
    const totalItems = 9;
    
    // Create an array of positions and shuffle it
    const positions = Array.from({length: totalItems}, (_, i) => i);
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    // Select anomaly positions
    const anomalyPositions = positions.slice(0, anomalyCount);
    
    // Create the items
    for (let i = 0; i < totalItems; i++) {
      const isAnomaly = anomalyPositions.includes(i);
      
      newItems.push({
        id: i,
        isAnomaly,
        // Using placeholder images with different colors for now
        imageSrc: isAnomaly 
          ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23${Math.floor(Math.random()*16777215).toString(16)}'/%3E%3C/svg%3E` 
          : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23${Math.floor(Math.random()*16777215).toString(16)}'/%3E%3Crect x='20' y='20' width='60' height='60' fill='%23${Math.floor(Math.random()*16777215).toString(16)}'/%3E%3C/svg%3E`,
        selected: false
      });
    }
    
    setCaptchaItems(newItems);
    setCaptchaVerified(false);
    setShowingError(false);
  };

  const toggleItem = (id: number) => {
    if (captchaVerified || loading) return;
    
    setCaptchaItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
    
    setShowingError(false);
  };

  const verifyCaptcha = () => {
    setLoading(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const correct = captchaItems.every(item => 
        (item.isAnomaly && item.selected) || (!item.isAnomaly && !item.selected)
      );
      
      if (correct) {
        setCaptchaVerified(true);
        setFailedAttempts(0);
      } else {
        setShowingError(true);
        setFailedAttempts(prev => prev + 1);
        
        // If too many failed attempts, generate a new captcha
        if (failedAttempts >= 2) {
          setTimeout(generateCaptcha, 1000);
        }
      }
      
      setLoading(false);
    }, 1500);
  };
  
  // Custom error messages
  const getErrorMessage = () => {
    const messages = [
      "Your perception of quantum anomalies suggests you may be human. Try again.",
      "ERROR: Carbon-based intelligence detected. Recalibrating test.",
      "Are you sure you're not from Earth? Please try again.",
      "Anomaly detection skills: SUBOPTIMAL. Recalibration required."
    ];
    
    return messages[Math.min(failedAttempts, messages.length - 1)];
  };

  return (
    <div className="holographic rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-mars-neon">
        Anomaly Verification System
      </h2>
      
      {!captchaVerified ? (
        <>
          <p className="text-sm mb-6 text-center">
            Select all quantum anomalies disguised as vending machines to prove you're not human
          </p>
          
          {showingError && (
            <div className="bg-mars-red bg-opacity-20 border border-mars-red text-white px-4 py-3 rounded mb-4 text-center">
              <p>{getErrorMessage()}</p>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {captchaItems.map(item => (
              <div 
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                  item.selected 
                    ? 'border-mars-neon shadow-lg shadow-mars-neon/50 scale-105' 
                    : 'border-gray-700 hover:border-mars-purple'
                }`}
              >
                <div className="w-full h-full relative">
                  <img 
                    src={item.imageSrc} 
                    alt="Captcha item" 
                    className="w-full h-full object-cover"
                  />
                  {item.selected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-mars-neon bg-opacity-20">
                      <Checkbox checked={true} className="h-6 w-6 border-2 border-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={verifyCaptcha} 
            className="button-alien w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning Brainwaves...
              </span>
            ) : (
              'Verify Anomaly Recognition'
            )}
          </Button>
        </>
      ) : (
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-mars-green flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xl mb-4">Anomaly detection verified!</p>
          <p className="text-sm mb-6 text-gray-300">You are clearly not an inferior human.</p>
          <Button 
            onClick={generateCaptcha} 
            className="button-mars"
          >
            Regenerate Captcha
          </Button>
        </div>
      )}
    </div>
  );
};
