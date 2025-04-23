
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export const AlienForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    planet: '',
    mass: 50,
    atmospherePreference: 'oxygen',
    leaksPlasma: false,
    appendages: 2,
    validated: false,
    error: '',
    formSubmitted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
      error: ''
    });
  };

  const handleSliderChange = (value: number[]) => {
    setFormState({
      ...formState,
      mass: value[0],
      error: ''
    });
  };

  const handleRadioChange = (value: string) => {
    setFormState({
      ...formState,
      atmospherePreference: value,
      error: ''
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormState({
      ...formState,
      leaksPlasma: checked,
      error: ''
    });
  };

  const validateForm = () => {
    if (!formState.name) {
      setFormState({
        ...formState,
        error: "Name is required, even if it's unpronounceable by humans."
      });
      return false;
    }

    if (!formState.planet) {
      setFormState({
        ...formState,
        error: "That's not a valid star system, sweetie."
      });
      return false;
    }

    if (formState.mass < 20) {
      setFormState({
        ...formState,
        error: "You're too light for interstellar travel. Did you forget to count your tentacles?"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setFormState({
        ...formState,
        validated: true,
        error: '',
      });

      // Add a delay to simulate processing
      setTimeout(() => {
        setFormState({
          ...formState,
          formSubmitted: true
        });
      }, 2000);
    }
  };

  const randomizePlanet = () => {
    const planets = [
      'Zorgon-5', 
      'Alpha Centauri B', 
      'Trappist-1e', 
      'Kepler-186f', 
      'Proxima Centauri b',
      'WASP-121b',
      'Gliese 581d',
      'HD 189733b',
      'PSR B1257+12 C'
    ];
    
    const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    
    setFormState({
      ...formState,
      planet: randomPlanet,
    });
  };
  
  const resetForm = () => {
    setFormState({
      name: '',
      planet: '',
      mass: 50,
      atmospherePreference: 'oxygen',
      leaksPlasma: false,
      appendages: 2,
      validated: false,
      error: '',
      formSubmitted: false
    });
  };

  if (formState.formSubmitted) {
    return (
      <div className="holographic rounded-lg p-6 w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4 text-mars-neon">Form Processed</h2>
        <div className="mb-6 text-center">
          <p className="text-lg mb-4">Your application has been placed in queue position: <span className="text-mars-green font-bold text-2xl">42,386,291</span></p>
          <p className="text-sm mb-6">Estimated processing time: 7.3 Earth years</p>
          <div className="w-full h-2 bg-gray-700 rounded-full mb-6">
            <div className="h-full bg-mars-purple rounded-full animate-pulse-glow" style={{width: '2%'}}></div>
          </div>
          <Button onClick={resetForm} className="button-mars">Start Over</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="holographic rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-mars-neon">
        Intergalactic License Form
      </h2>
      {formState.error && (
        <div className="bg-mars-red bg-opacity-20 border border-mars-red text-white px-4 py-3 rounded mb-4">
          <p>{formState.error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
            Entity Designation (Name)
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your designation"
            className="input-mars text-gray-800"
            value={formState.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="planet" className="block text-sm font-medium text-gray-200 mb-1">
            Origin Star System
          </Label>
          <div className="flex space-x-2">
            <Input
              type="text"
              id="planet"
              name="planet"
              placeholder="e.g. Zorgon-5"
              className="input-mars flex-1 text-gray-800"
              value={formState.planet}
              onChange={handleInputChange}
            />
            <Button 
              type="button" 
              className="button-alien" 
              onClick={randomizePlanet}
              title="I can't remember my home planet"
            >
              Randomize
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-200 mb-1">
            Estimated Mass After Hyperjump: {formState.mass} Zorblaxes
          </Label>
          <Slider
            defaultValue={[formState.mass]}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Light (20)</span>
            <span>Average (50)</span>
            <span>Heavy (100)</span>
          </div>
        </div>
        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-200 mb-2">
            Atmosphere Preference
          </Label>
          <RadioGroup defaultValue={formState.atmospherePreference} onValueChange={handleRadioChange}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="oxygen" id="oxygen" />
              <Label htmlFor="oxygen">Oxygen-based (boring)</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="methane" id="methane" />
              <Label htmlFor="methane">Methane-rich (spicy)</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="sulfuric" id="sulfuric" />
              <Label htmlFor="sulfuric">Sulfuric (tangy)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="void" id="void" />
              <Label htmlFor="void">Cosmic Void (I don't breathe)</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="leaksPlasma" 
              checked={formState.leaksPlasma} 
              onCheckedChange={handleCheckboxChange} 
            />
            <label
              htmlFor="leaksPlasma"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I occasionally leak plasma under pressure
            </label>
          </div>
          {formState.leaksPlasma && (
            <p className="text-xs text-mars-orange mt-2">
              Note: Plasma containment bags are required in all government facilities
            </p>
          )}
        </div>
        <Button type="submit" className="button-mars w-full mt-4">
          {formState.validated ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Submit for Review'
          )}
        </Button>
      </form>
    </div>
  );
};
