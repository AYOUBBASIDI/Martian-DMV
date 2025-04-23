
import { useState } from 'react';
import { PhotoBooth } from '@/components/PhotoBooth';
import { AlienForm } from '@/components/AlienForm';
import { AlienCaptcha } from '@/components/AlienCaptcha';
import { AIReceptionist } from '@/components/AIReceptionist';
import { MiniGame } from '@/components/MiniGame';
import { MarsBackground } from '@/components/MarsBackground';
import { Button } from '@/components/ui/button';

type Section = 'intro' | 'photo' | 'form' | 'captcha' | 'game';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('intro');
  const [numberSeed] = useState(Math.floor(Math.random() * 10000));

  const renderSection = () => {
    switch (activeSection) {
      case 'intro':
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="glitch-text text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Martian DMV
            </div>
            <h2 className="text-xl md:text-2xl mb-8 text-mars-purple">
              Intergalactic License Renewal Simulator
            </h2>
            <p className="mb-8 text-gray-300">
              Welcome to the Martian Department of Migration Verification (DMV). 
              Your license renewal request #{numberSeed}-X9 has been pending for 7.3 Earth years.
              Please follow the protocol to expedite your application.
            </p>

            <div className="holographic p-4 mb-8 mx-auto max-w-md">
              <p className="text-sm text-mars-blue mb-4 animate-pulse">SYSTEM NOTICE:</p>
              <p className="text-xs mb-2">⚠️ WARNING: Recent reports indicate increased bureaucracy levels of 287%.</p>
              <p className="text-xs">⚠️ All entities requiring expedited processing must participate in all verification steps or face IMMEDIATE deportation to the Terrestrial Origin Processing Center (Earth).</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => setActiveSection('photo')} 
                className="button-mars"
              >
                Begin Processing
              </Button>
              <Button 
                onClick={() => setActiveSection('game')} 
                className="button-alien"
              >
                Skip the Line
              </Button>
            </div>
          </div>
        );
      case 'photo':
        return (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-center text-mars-neon">
              Step 1: Identification
            </h2>
            <p className="text-center text-gray-300 mb-8">Please provide a valid facial scan for your ID</p>
            <PhotoBooth />
            <div className="flex justify-center mt-6 gap-4">
              <Button 
                onClick={() => setActiveSection('form')} 
                className="button-mars"
              >
                Continue to Forms
              </Button>
            </div>
          </>
        );
      case 'form':
        return (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-center text-mars-neon">
              Step 2: Information Submission
            </h2>
            <p className="text-center text-gray-300 mb-8">Please provide your personal details</p>
            <AlienForm />
            <div className="flex justify-center mt-6 gap-4">
              <Button 
                onClick={() => setActiveSection('photo')} 
                className="button-alien"
              >
                Back to Photo
              </Button>
              <Button 
                onClick={() => setActiveSection('captcha')} 
                className="button-mars"
              >
                Continue to Verification
              </Button>
            </div>
          </>
        );
      case 'captcha':
        return (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-center text-mars-neon">
              Step 3: Entity Verification
            </h2>
            <p className="text-center text-gray-300 mb-8">Prove you're not from Earth</p>
            <AlienCaptcha />
            <div className="flex justify-center mt-6 gap-4">
              <Button 
                onClick={() => setActiveSection('form')} 
                className="button-alien"
              >
                Back to Form
              </Button>
              <Button 
                onClick={() => setActiveSection('game')} 
                className="button-mars"
              >
                Continue to Queue
              </Button>
            </div>
          </>
        );
      case 'game':
        return (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-center text-mars-neon">
              Step 4: Queue Management
            </h2>
            <p className="text-center text-gray-300 mb-8">Challenge others to improve your position</p>
            <MiniGame />
            <div className="flex justify-center mt-6 gap-4">
              <Button 
                onClick={() => setActiveSection('captcha')} 
                className="button-alien"
              >
                Back to Verification
              </Button>
              <Button 
                onClick={() => setActiveSection('intro')} 
                className="button-mars"
              >
                Return to Main Desk
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <MarsBackground />
      <div className="min-h-screen py-12 px-4 relative z-10">
        {/* Header/Navigation */}
        <header className="mb-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-lg font-bold text-mars-red alien-text" data-text="M-DMV">
                  M-DMV
                </div>
                <div className="h-4 w-4 rounded-full bg-mars-green animate-pulse ml-2"></div>
              </div>
              <nav>
                <ul className="flex space-x-4 text-sm">
                  {['photo', 'form', 'captcha', 'game'].map((section) => (
                    <li key={section}>
                      <button 
                        onClick={() => setActiveSection(section as Section)}
                        className={`px-3 py-1 rounded-full text-xs uppercase transition-all ${
                          activeSection === section 
                            ? 'bg-mars-purple text-white' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {section}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-5xl mx-auto">
          {renderSection()}
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-xs text-gray-500">
          <p>Martian DMV &copy; 4023 | Standard Galactic Year 2077 | Sector 9, Mars Colony</p>
          <p className="mt-2">This is a work of satirical fiction. Any resemblance to actual bureaucratic nightmares is purely coincidental and hilarious.</p>
        </footer>

        {/* Marquee text at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-mars-dark bg-opacity-80 overflow-hidden">
          <div className="whitespace-nowrap inline-block animate-marquee text-xs py-1 text-mars-orange">
            ⚠️ NOTICE: Teleportation devices must be checked at security. Time dilation penalties apply for late arrivals. Humans need additional form 27B-6. The DMV Director is currently on holiday in the Andromeda galaxy and will return in 2.7 million years. Temporal exemptions not valid on Tuesdays. Please do not feed the quantum anomalies. Translator devices must be certified for diplomatic language. Penalties for incorrect forms include possible redistribution of limbs. Have a bureaucratically efficient day! ⚠️
            &nbsp;&nbsp;&nbsp;&nbsp;
            ⚠️ NOTICE: Teleportation devices must be checked at security. Time dilation penalties apply for late arrivals. Humans need additional form 27B-6. The DMV Director is currently on holiday in the Andromeda galaxy and will return in 2.7 million years. Temporal exemptions not valid on Tuesdays. Please do not feed the quantum anomalies. Translator devices must be certified for diplomatic language. Penalties for incorrect forms include possible redistribution of limbs. Have a bureaucratically efficient day! ⚠️
          </div>
        </div>
      </div>
      
      {/* AI Receptionist */}
      <AIReceptionist />
    </>
  );
};

export default Index;
