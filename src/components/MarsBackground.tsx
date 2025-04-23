
import { useEffect, useRef } from 'react';

export const MarsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create terrain chunks
    const createTerrainChunk = () => {
      if (!containerRef.current) return;
      
      const chunk = document.createElement('div');
      chunk.className = 'terrain-chunk';
      
      // Random size between 50px and 200px
      const size = Math.random() * 150 + 50;
      chunk.style.width = `${size}px`;
      chunk.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      chunk.style.left = `${posX}px`;
      chunk.style.top = `${posY}px`;
      
      // Random animation delay
      chunk.style.animationDelay = `${Math.random() * 10}s`;
      
      containerRef.current.appendChild(chunk);
      
      // Remove the chunk after animation
      setTimeout(() => {
        if (containerRef.current && containerRef.current.contains(chunk)) {
          containerRef.current.removeChild(chunk);
        }
      }, 20000);
    };
    
    // Create an asteroid
    const createAsteroid = () => {
      if (!containerRef.current) return;
      
      const asteroid = document.createElement('div');
      asteroid.className = 'asteroid';
      
      // Random size
      const size = Math.random() * 100 + 30;
      asteroid.style.width = `${size}px`;
      asteroid.style.height = `${size}px`;
      
      // Random start position (always from right side)
      const posY = Math.random() * window.innerHeight;
      asteroid.style.top = `${posY}px`;
      asteroid.style.right = '-100px';
      
      // Random animation duration
      const duration = Math.random() * 10 + 10;
      asteroid.style.animationDuration = `${duration}s`;
      
      containerRef.current.appendChild(asteroid);
      
      // Remove the asteroid after animation
      setTimeout(() => {
        if (containerRef.current && containerRef.current.contains(asteroid)) {
          containerRef.current.removeChild(asteroid);
        }
      }, duration * 1000);
    };
    
    // Initial creation
    for (let i = 0; i < 10; i++) {
      setTimeout(createTerrainChunk, i * 300);
    }
    
    // Set intervals for continuous creation
    const terrainInterval = setInterval(createTerrainChunk, 3000);
    const asteroidInterval = setInterval(createAsteroid, 5000);
    
    return () => {
      clearInterval(terrainInterval);
      clearInterval(asteroidInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-mars-darkRed to-mars-dark" />
      
      {/* Stars */}
      <div className="stars absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `flicker ${Math.random() * 3 + 2}s linear infinite`
            }}
          />
        ))}
      </div>
      
      {/* Animated grid overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(transparent 95%, rgba(155, 135, 245, 0.2) 50%), linear-gradient(90deg, transparent 95%, rgba(155, 135, 245, 0.2) 50%)',
          backgroundSize: '30px 30px',
          opacity: 0.3
        }}
      />
    </div>
  );
};
