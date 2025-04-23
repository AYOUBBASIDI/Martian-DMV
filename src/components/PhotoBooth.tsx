
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const alienFeatures = [
  'Eye Stalks',
  'Head Ridges',
  'Cosmic Acne',
  'Tentacle Hair',
  'Third Eye',
  'Glowing Skin',
  'Scaled Skin',
  'Antenna',
];

export const PhotoBooth = () => {
  const [streaming, setStreaming] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [mutations, setMutations] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      // Generate a placeholder instead
      setPhoto("/placeholder.svg");
      generateRandomMutations();
    }
  };
  
  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Apply alien filter effect here
        ctx.filter = 'hue-rotate(90deg) saturate(150%)';
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Add glitchy effect
        addGlitchEffect(ctx, canvas);
        
        const dataUrl = canvas.toDataURL('image/png');
        setPhoto(dataUrl);
        
        // Generate random mutations
        generateRandomMutations();
        
        // Stop the camera
        const stream = video.srcObject as MediaStream;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop());
        setStreaming(false);
      }
    } else if (!videoRef.current) {
      // Fallback for when camera can't be accessed
      setPhoto("/placeholder.svg");
      generateRandomMutations();
    }
  };
  
  const addGlitchEffect = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Add some random glitchy lines
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const width = Math.random() * 20 + 5;
      const height = Math.random() * 5 + 2;
      
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
      ctx.fillRect(x, y, width, height);
    }
    
    // Add some pixelation in random spots
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * (canvas.width - 50);
      const y = Math.random() * (canvas.height - 50);
      const size = Math.random() * 30 + 10;
      
      const imageData = ctx.getImageData(x, y, size, size);
      const pixelSize = Math.floor(Math.random() * 5) + 2;
      
      for (let py = 0; py < size; py += pixelSize) {
        for (let px = 0; px < size; px += pixelSize) {
          if (px + pixelSize < size && py + pixelSize < size) {
            const offset = (Math.floor(py) * size + Math.floor(px)) * 4;
            const r = imageData.data[offset];
            const g = imageData.data[offset + 1];
            const b = imageData.data[offset + 2];
            
            for (let j = 0; j < pixelSize; j++) {
              for (let i = 0; i < pixelSize; i++) {
                if (px + i < size && py + j < size) {
                  const pixelOffset = ((py + j) * size + (px + i)) * 4;
                  imageData.data[pixelOffset] = r;
                  imageData.data[pixelOffset + 1] = g;
                  imageData.data[pixelOffset + 2] = b;
                }
              }
            }
          }
        }
      }
      
      ctx.putImageData(imageData, x, y);
    }
  };
  
  const generateRandomMutations = () => {
    // Select 2-4 random mutations
    const shuffled = [...alienFeatures].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 3) + 2;
    setMutations(shuffled.slice(0, count));
  };
  
  const retakePicture = () => {
    setPhoto(null);
    startCamera();
  };
  
  useEffect(() => {
    return () => {
      // Cleanup: Stop camera when component unmounts
      if (videoRef.current && streaming) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop());
      }
    };
  }, [streaming]);

  return (
    <div className="holographic rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-mars-neon">
        Galactic ID Photo
      </h2>
      <p className="text-sm mb-6 text-center">
        Your facial scan will be distorted to reveal your true alien form
      </p>
      
      <div className="rounded-lg overflow-hidden border-2 border-mars-purple aspect-square mx-auto mb-6">
        {!streaming && !photo ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
            <p className="text-center text-white mb-4">
              Ready for your universal ID photo? <br /> We'll make sure you don't look too human!
            </p>
            <Button 
              onClick={startCamera} 
              className="button-alien"
            >
              Activate Scanner
            </Button>
          </div>
        ) : streaming ? (
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover" 
            autoPlay 
            playsInline 
            onCanPlay={() => {
              if (videoRef.current) {
                videoRef.current.play();
              }
            }}
          />
        ) : (
          <img 
            src={photo || ""} 
            alt="Your alien ID" 
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      {streaming ? (
        <Button 
          onClick={takeSnapshot} 
          className="button-mars w-full"
        >
          Capture Alien Identity
        </Button>
      ) : photo ? (
        <div>
          <div className="mb-4 p-4 bg-black bg-opacity-30 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-mars-neon">Alien Features Detected:</h3>
            <ul className="list-disc pl-6">
              {mutations.map((mutation, index) => (
                <li key={index} className="text-white">{mutation}</li>
              ))}
            </ul>
          </div>
          <Button 
            onClick={retakePicture} 
            className="button-alien w-full"
          >
            Retake Photo
          </Button>
        </div>
      ) : null}
    </div>
  );
};
