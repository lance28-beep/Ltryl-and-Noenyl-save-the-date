import React, { useEffect, useState } from 'react';

interface LoadingListProps {
  onComplete: () => void;
}

export const LoadingList: React.FC<LoadingListProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timeline = [
      { delay: 1000, action: () => setStage(1) }, // Reveal Monogram
      { delay: 3000, action: () => setStage(2) }, // Reveal Text
      { delay: 5000, action: () => setStage(3) }, // Reveal Date
      { delay: 10000, action: () => setIsExiting(true) }, // Start Exit
      { delay: 12000, action: onComplete } // Complete (12 seconds total)
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out overflow-visible ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#F5F7EC' }}
    >

      {/* Corner Decorations */}
      {/* Bottom-left Corner */}
      <div className="absolute bottom-0 left-0 z-[60] pointer-events-none overflow-visible">
        <img 
          src="/image/left-bottom-corner.png" 
          alt="Decoration" 
          className="w-32 h-auto md:w-48 lg:w-64"
        />
      </div>
      {/* Top-left Corner */}
      <div className="absolute top-0 left-0 z-[60] pointer-events-none overflow-visible">
        <img 
          src="/image/left-bottom-corner.png" 
          alt="Decoration" 
          className="w-32 h-auto md:w-48 lg:w-64"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '0 0' }}
        />
      </div>
      {/* Top-right Corner */}
      <div className="absolute top-0 right-0 z-[60] pointer-events-none overflow-visible">
        <img 
          src="/image/left-bottom-corner.png" 
          alt="Decoration" 
          className="w-32 h-auto md:w-48 lg:w-64"
          style={{ transform: 'scaleX(-1) scaleY(-1)', transformOrigin: 'top right' }}
        />
      </div>
      {/* Bottom-right Corner */}
      <div className="absolute bottom-0 right-0 z-[60] pointer-events-none overflow-visible">
        <img 
          src="/image/left-bottom-corner.png" 
          alt="Decoration" 
          className="w-32 h-auto md:w-48 lg:w-64"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'bottom right' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center space-y-6">
        
        {/* Monogram Crest - Reveal First */}
        <div className={`transition-all duration-1000 ease-out transform ${stage >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'}`}>
           {/* 
              NOTE: Ensure monogram image is in your public folder. 
              mix-blend-multiply makes the white background of the image transparent against the paper bg.
           */}
          <div className="relative">
            <img 
              src="/image/newmonogram.png" 
              alt="Ltryl & Bryle Monogram" 
              className="w-48 h-auto md:w-72"
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(46%) sepia(5%) saturate(1200%) hue-rotate(60deg) brightness(95%) contrast(90%)',
                mixBlendMode: 'multiply',
                opacity: 0.9
              }}
            />
          </div>
        </div>

        {/* Text Details - Reveal Second */}
        <div className={`transition-all duration-1000 delay-200 ease-out transform ${stage >= 2 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'}`}>
          <p className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase mb-3" style={{ color: '#768870' }}>
            We are delighted to invite you to
          </p>
          <p className="font-serif text-xs md:text-sm tracking-[0.3em] uppercase mb-2" style={{ color: '#768870' }}>
            The Wedding Celebration Of
          </p>
          <h1 className="font-great-vibes text-6xl md:text-8xl leading-none drop-shadow-sm" style={{ color: '#768870' }}>
            <span>Ltryl</span>
            <span className="text-4xl md:text-6xl mx-2">&</span>
            <span>Bryle</span>
          </h1>
        </div>

        {/* Date - Reveal Third */}
        <div className={`flex flex-col items-center gap-3 transition-all duration-1000 delay-500 ease-out transform ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
           <div className="w-12 h-[1px] my-2" style={{ backgroundColor: '#768870', opacity: 0.4 }}></div>
           <p className="font-serif text-xl md:text-2xl italic tracking-widest" style={{ color: '#768870' }}>
             2026
           </p>
        </div>

      </div>
    </div>
  );
};

export default LoadingList;