import React, { useState, useEffect } from 'react';
import { siteConfig } from '../content/site';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date(siteConfig.wedding.dateISO).getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-4 md:gap-6">
        <p className="font-serif text-sm md:text-base tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(118, 136, 112, 0.6)' }}>
          Counting Down To Our Big Day
        </p>
        
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
          {timeUnits.map((unit, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2" style={{ color: '#768870' }}>
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="font-serif text-xs sm:text-sm md:text-base uppercase tracking-widest" style={{ color: 'rgba(118, 136, 112, 0.7)' }}>
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countdown;

