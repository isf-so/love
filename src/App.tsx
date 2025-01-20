import React, { useState } from 'react';
import { Heart } from 'lucide-react';

function FloatingHeart({ delay, position }: { delay: number; position: string }) {
  return (
    <div 
      className="absolute text-pink-400/30"
      style={{
        ...position,
        animation: `float 3s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <Heart size={32} fill="currentColor" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showError, setShowError] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setShowError(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowError(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const hearts = [
    { delay: 0, position: { top: '10%', left: '10%' } },
    { delay: 0.5, position: { top: '20%', right: '20%' } },
    { delay: 1, position: { bottom: '15%', left: '15%' } },
    { delay: 1.5, position: { bottom: '25%', right: '25%' } },
    { delay: 2, position: { top: '40%', left: '80%' } },
    { delay: 2.5, position: { bottom: '40%', right: '80%' } },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-pink-200 flex items-center justify-center overflow-hidden relative p-4">
      {/* Floating Hearts */}
      {hearts.map((heart, index) => (
        <FloatingHeart 
          key={index} 
          delay={heart.delay} 
          position={heart.position} 
        />
      ))}
      
      <div className="relative bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-4 border-pink-400 shadow-[0_0_30px_rgba(219,39,119,0.3)] w-full max-w-md">
        <div className="absolute -top-4 -left-4 text-pink-500 animate-[pulse_2s_ease-in-out_infinite]">
          <Heart size={32} fill="currentColor" />
        </div>
        <div className="absolute -bottom-4 -right-4 text-pink-500 animate-[pulse_2s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
          <Heart size={32} fill="currentColor" />
        </div>
        
        <button
          onClick={handleClick}
          disabled={loading}
          style={{ fontFamily: "'Press Start 2P', cursive" }}
          className={`
            w-full py-4 px-6 rounded-xl text-white font-medium 
            transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm
            ${loading 
              ? 'bg-pink-300 cursor-not-allowed' 
              : 'bg-pink-500 hover:bg-pink-400 hover:shadow-[0_0_20px_rgba(219,39,119,0.5)] animate-[glitch_0.3s_infinite]'
            }
            relative overflow-hidden group
          `}
        >
          <span className="relative z-10">Efface nos souvenirs d'amour</span>
        </button>

        {loading && (
          <div className="mt-6 bg-pink-100 rounded-full h-4 border border-pink-300 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-400 to-purple-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {showError && (
          <div 
            style={{ fontFamily: "'Press Start 2P', cursive" }}
            className="mt-6 p-4 bg-red-50 border-2 border-red-300 text-red-400 rounded-xl text-center text-xs sm:text-sm animate-[glitch_0.3s_infinite]"
          >
            ERREUR !
          </div>
        )}
      </div>
    </div>
  );
}

export default App;