import React from 'react';
import { FadeIn } from './FadeIn';
import Countdown from './Countdown';
import { Users } from 'lucide-react';

interface SpecialMessageProps {
  visible: boolean;
  onClose: () => void;
  onRSVP: () => void;
  guestCount: number | null;
  onViewGuestBook: () => void;
}

const SpecialMessage: React.FC<SpecialMessageProps> = ({ visible, onClose, onRSVP, guestCount, onViewGuestBook }) => {
  return (
    <div 
      className={`fixed inset-0 z-30 overflow-y-auto min-h-screen transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ 
        backgroundImage: "url('/image/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Texture & Decor Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-60" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />
      
      <div className="min-h-screen w-full flex items-center justify-center p-3 py-8 md:p-8 relative">
        
        {/* Main Card */}
        <div className="w-full max-w-4xl shadow-[0_20px_50px_rgba(45,45,45,0.15)] relative overflow-hidden my-2 md:my-4" style={{ backgroundColor: '#F5F7EC' }}>
          
          {/* Card Texture Overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />
          
          {/* Double Border Frame - Responsive Insets */}
          <div className="absolute inset-3 md:inset-6 border pointer-events-none" style={{ borderColor: 'rgba(118, 136, 112, 0.2)' }} />
          <div className="absolute inset-4 md:inset-7 border-2 pointer-events-none" style={{ borderColor: 'rgba(118, 136, 112, 0.4)' }} />
          
          {/* Top Left Corner Decoration */}
          <div 
            className="absolute top-0 left-0 z-10 opacity-80 transition-all duration-500 hover:opacity-100 pointer-events-none"
          >
            <img 
              src="/image/left-bottom-corner.png" 
              alt="Top left corner decoration" 
              className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain drop-shadow-md transition-all duration-500 hover:drop-shadow-lg scale-y-[-1]"
            />
          </div>

          {/* Top Right Corner Decoration */}
          <div 
            className="absolute top-0 right-0 z-10 opacity-80 transition-all duration-500 hover:opacity-100 pointer-events-none"
          >
            <img 
              src="/image/left-bottom-corner.png" 
              alt="Top right corner decoration" 
              className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain drop-shadow-md transition-all duration-500 hover:drop-shadow-lg scale-x-[-1] scale-y-[-1]"
            />
          </div>

          {/* Bottom Left Corner Decoration */}
          <div 
            className="absolute bottom-0 left-0 z-10 opacity-80 transition-all duration-500 hover:opacity-100 pointer-events-none"
          >
            <img 
              src="/image/left-bottom-corner.png" 
              alt="Bottom left corner decoration" 
              className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain drop-shadow-md transition-all duration-500 hover:drop-shadow-lg"
            />
          </div>

          {/* Bottom Right Corner Decoration */}
          <div 
            className="absolute bottom-0 right-0 z-10 opacity-80 transition-all duration-500 hover:opacity-100 pointer-events-none"
          >
            <img 
              src="/image/left-bottom-corner.png" 
              alt="Bottom right corner decoration" 
              className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain drop-shadow-md transition-all duration-500 hover:drop-shadow-lg scale-x-[-1]"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 transition-colors duration-300"
            style={{ color: 'rgba(118, 136, 112, 0.6)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#768870'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(118, 136, 112, 0.6)'}
            aria-label="Close"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content Wrapper - Responsive Padding */}
          <div className="relative z-20 flex flex-col items-center text-center px-5 py-12 md:px-16 md:py-20 lg:py-24 space-y-8 md:space-y-12">
            
            {/* Header with Monogram */}
            <FadeIn show={visible} delay={200} className="w-full flex flex-col items-center">
              {/* Monogram Image */}
              <div className="mb-6 md:mb-8">
                <img 
                  src="/image/monogram.png" 
                  alt="Monogram Crest" 
                  className="w-40 md:w-64 h-auto drop-shadow-md transition-all duration-700 ease-out"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(46%) sepia(5%) saturate(1200%) hue-rotate(60deg) brightness(95%) contrast(90%)',
                    mixBlendMode: 'multiply',
                    opacity: 0.9
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                 <p className="font-serif text-sm md:text-lg tracking-[0.25em] md:tracking-[0.4em] uppercase" style={{ color: 'rgba(118, 136, 112, 0.6)' }}>
                   We are tying the Knot
                 </p>
                 
                 {/* Stylized Date */}
                 <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-4">
                   <span className="h-[1px] w-8 md:w-12" style={{ backgroundColor: 'rgba(118, 136, 112, 0.3)' }}></span>
                   <div className="flex flex-col items-center leading-none font-serif" style={{ color: '#768870' }}>
                      <span className="text-sm md:text-lg tracking-[0.2em] md:tracking-[0.3em] uppercase mb-1" style={{ color: '#768870' }}>May</span>
                      <span className="text-4xl md:text-6xl" style={{ color: '#768870' }}>18</span>
                      <span className="text-sm md:text-lg tracking-[0.2em] md:tracking-[0.3em] uppercase mt-1" style={{ color: '#768870' }}>2026</span>
                   </div>
                   <span className="h-[1px] w-8 md:w-12" style={{ backgroundColor: 'rgba(118, 136, 112, 0.3)' }}></span>
                 </div>
              </div>
            </FadeIn>

            {/* Body Text - Refined Typography for Mobile */}
            <div className="space-y-8 md:space-y-10 font-body text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto px-1 md:px-0" style={{ color: '#768870' }}>
              
              <FadeIn show={visible} delay={400}>
                <p className="font-body text-xl md:text-3xl italic font-normal px-2 md:px-4 relative z-10" style={{ color: '#768870' }}>
                  Before the details, before the announcements, there is something we wanted to share with you first-hand. This moment has been living in our hearts, and keeping it quiet felt impossible. When we think about the day we say "I do," we can't imagine it without the people who have loved, supported, and prayed for us along the way.
                </p>
              </FadeIn>

              <FadeIn show={visible} delay={600}>
                <div className="relative py-2">
                   <span className="absolute top-0 left-0 text-4xl md:text-6xl font-serif -translate-x-2 -translate-y-2 md:-translate-x-4 md:-translate-y-4" style={{ color: 'rgba(118, 136, 112, 0.1)' }}>"</span>
                   <p className="font-body text-xl md:text-3xl italic font-normal px-2 md:px-4 relative z-10" style={{ color: '#768870' }}>
                     Your presence carries a meaning that goes beyond attendance—it is part of the joy, the blessing, and the beginning of our forever. Having you with us on our special day would mean the world to us.
                   </p>
                   <span className="absolute bottom-0 right-0 text-4xl md:text-6xl font-serif translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" style={{ color: 'rgba(118, 136, 112, 0.1)' }}>"</span>
                </div>
              </FadeIn>

              {/* Question Box - Enhanced Mobile Padding */}
              <FadeIn show={visible} delay={800}>
                <div className="relative p-6 md:p-8 border border-double mx-0 rounded-sm" style={{ borderColor: 'rgba(118, 136, 112, 0.2)', backgroundColor: 'rgba(118, 136, 112, 0.03)' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 md:px-4" style={{ backgroundColor: '#F5F7EC' }}>
                    <span className="font-serif text-[0.6rem] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold" style={{ color: '#768870' }}>The Question</span>
                  </div>
                  <p className="font-body text-xl md:text-3xl leading-relaxed" style={{ color: '#768870' }}>
                    If your heart says <span className="italic font-bold" style={{ color: '#768870' }}>YES</span>, it would mean everything to us to have you by our side as part of our big day.
                  </p>
                </div>
              </FadeIn>

              <FadeIn show={visible} delay={1000}>
                <div className="flex items-center justify-center gap-3 mt-6 md:mt-10">
                  <span className="h-px w-10" style={{ backgroundColor: 'rgba(118, 136, 112, 0.3)' }} />
                  <p className="font-serif text-sm md:text-base tracking-[0.3em] uppercase px-4 py-2 border shadow-sm" style={{ color: 'rgba(118, 136, 112, 0.8)', backgroundColor: '#F5F7EC', borderColor: 'rgba(118, 136, 112, 0.2)' }}>
                    Formal invitation to follow
                  </p>
                  <span className="h-px w-10" style={{ backgroundColor: 'rgba(118, 136, 112, 0.3)' }} />
                </div>
              </FadeIn>

            </div>

            {/* Signature Section - Enhanced */}
            <FadeIn show={visible} delay={1200} className="w-full pt-6 md:pt-10 mt-2 md:mt-4" style={{ borderTopColor: 'rgba(118, 136, 112, 0.1)' }}>
               <div className="flex flex-col items-center border-t" style={{ borderTopColor: 'rgba(118, 136, 112, 0.1)' }}>
                 <div className="flex flex-col items-center gap-1 md:gap-2">
                    <p className="font-body italic text-lg md:text-xl" style={{ color: '#768870' }}>With all our love</p>
                    {/* Using Great Vibes Font for Signatures */}
                    <div className="font-great-vibes text-5xl md:text-6xl mt-1 md:mt-2 flex items-center gap-2 md:gap-3" style={{ color: '#768870' }}>
                      <span>Ltryl</span>
                      <span className="text-3xl md:text-4xl">&</span>
                      <span>Noenyl</span>
                    </div>
                 </div>
               </div>
            </FadeIn>

            {/* Countdown Timer */}
            <FadeIn show={visible} delay={1400} className="w-full pt-6 md:pt-10 mt-2 md:mt-4" style={{ borderTopColor: 'rgba(118, 136, 112, 0.1)' }}>
               <div className="border-t" style={{ borderTopColor: 'rgba(118, 136, 112, 0.1)' }}>
                 <Countdown />
               </div>
            </FadeIn>

            {/* RSVP Section */}
            <FadeIn show={visible} delay={1600} className="w-full pt-6 md:pt-10 mt-2 md:mt-4" style={{ borderTopColor: 'rgba(118, 136, 112, 0.1)' }}>
               <div className="border-t" style={{ borderTopColor: 'rgba(118, 136, 112, 0.1)' }}>
              <div className="flex flex-col items-center gap-4 md:gap-6">
                <button 
                  onClick={onRSVP}
                  className="relative font-serif uppercase tracking-[0.2em] lg:tracking-[0.25em] text-sm sm:text-base md:text-lg lg:text-xl py-3 sm:py-3.5 md:py-4 lg:py-5 xl:py-6 px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 rounded-sm transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1 lg:hover:-translate-y-2 active:translate-y-0 active:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden group/btn"
                  style={{ backgroundColor: '#768870', color: '#F5F7EC' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(118, 136, 112, 0.9)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(118, 136, 112, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#768870';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(118, 136, 112, 0.1)';
                  }}
                  aria-label="RSVP for the wedding"
                >
                  <span className="relative z-10 flex items-center gap-2 lg:gap-3">
                    <span>RSVP</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover/btn:translate-x-1 lg:group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></span>
                </button>

                {/* Guest Counter */}
                {guestCount !== null && (
                  <button
                    onClick={onViewGuestBook}
                    className="flex items-center gap-2 lg:gap-3 text-sm sm:text-base lg:text-lg xl:text-xl group/counter rounded px-3 py-2 lg:px-4 lg:py-3 transition-all duration-300 cursor-pointer"
                    style={{ color: 'rgba(118, 136, 112, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#768870';
                      e.currentTarget.style.backgroundColor = 'rgba(118, 136, 112, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(118, 136, 112, 0.7)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    aria-label={`View ${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'} Confirmed`}
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-colors duration-300" style={{ color: '#768870' }} />
                    <span className="font-serif tracking-widest lg:tracking-[0.15em] pb-0.5 lg:pb-1">
                      {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} Confirmed
                    </span>
                  </button>
                )}
              </div>
               </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialMessage;

