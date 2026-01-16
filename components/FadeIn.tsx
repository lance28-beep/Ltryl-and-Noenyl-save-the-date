import React, { useEffect, useState } from 'react';

interface FadeInProps {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ show, delay = 0, children, className = '' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show, delay]);

  return (
    <div 
      className={`transition-opacity duration-1000 ease-out ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
};


