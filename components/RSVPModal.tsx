import React, { useState, useEffect, useRef } from 'react';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle animation timing for unmounting
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const guests = "1"; // Default to 1 guest, not modifiable
    const message = formData.get("message") as string;

    // Google Forms integration
    const googleFormData = new FormData();
    googleFormData.append("entry.405401269", name);
    googleFormData.append("entry.1755234596", email);
    googleFormData.append("entry.1335956832", guests);
    googleFormData.append("entry.893740636", message);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdWvFGLmzqPBu1YjoH95D7e4_AVPXsZQhAYJ80HhRjFiI541g/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      );

      formRef.current?.reset();
      // Dispatch event for GuestBook to update
      window.dispatchEvent(new Event("rsvpUpdated"));

      setIsSubmitting(false);
      setStep('success');
    } catch (error) {
      setIsSubmitting(false);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation finishes
    setTimeout(() => {
      setStep('form');
      setError(null);
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-md rounded-lg shadow-2xl p-4 sm:p-6 md:p-10 border border-white/50 transform transition-all duration-500 ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`} style={{ backgroundColor: '#F5F7EC' }}>
        {/* Decorative corner texture */}
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-bl rounded-tr-lg pointer-events-none" style={{ background: 'linear-gradient(to bottom left, rgba(118, 136, 112, 0.1), transparent)' }}></div>

        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 transition-colors z-10"
          style={{ color: 'rgba(156, 163, 175, 1)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#768870'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(156, 163, 175, 1)'}
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {step === 'form' ? (
          <div className="animate-fade-in-up" style={{ animationDuration: '0.5s' }}>
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2" style={{ color: '#768870' }}>You're Invited!</h2>
              <p className="font-body italic text-sm sm:text-base md:text-lg" style={{ color: 'rgba(75, 85, 99, 1)' }}>Hello you are invited to our wedding!</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
              <div className="group">
                <label className="block font-serif text-[10px] sm:text-xs uppercase tracking-widest mb-0.5 sm:mb-1 transition-colors" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  <span className="group-focus-within:text-[#768870]">Full Name *</span>
                </label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full bg-stone-50/50 border-b py-1.5 sm:py-2 px-1 font-body text-sm sm:text-base md:text-xl placeholder:text-gray-300 focus:outline-none focus:bg-white transition-all"
                  style={{ borderColor: 'rgba(209, 213, 219, 1)' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#768870'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 1)'}
                />
              </div>

              <div className="group">
                <label className="block font-serif text-[10px] sm:text-xs uppercase tracking-widest mb-0.5 sm:mb-1 transition-colors" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  <span className="group-focus-within:text-[#768870]">Email Address *</span>
                </label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="Enter your email address"
                  className="w-full bg-stone-50/50 border-b py-1.5 sm:py-2 px-1 font-body text-sm sm:text-base md:text-xl placeholder:text-gray-300 focus:outline-none focus:bg-white transition-all"
                  style={{ borderColor: 'rgba(209, 213, 219, 1)' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#768870'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 1)'}
                />
              </div>

              <div className="group">
                <label className="block font-serif text-[10px] sm:text-xs uppercase tracking-widest mb-0.5 sm:mb-1 transition-colors" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  <span className="group-focus-within:text-[#768870]">Message (Optional)</span>
                </label>
                <textarea 
                  name="message"
                  placeholder="Share Your Excitement"
                  rows={2}
                  className="w-full bg-stone-50/50 border-b py-1.5 sm:py-2 px-1 font-body text-sm sm:text-base md:text-xl placeholder:text-gray-300 focus:outline-none focus:bg-white transition-all resize-none"
                  style={{ borderColor: 'rgba(209, 213, 219, 1)' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#768870'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 1)'}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 p-2 sm:p-3 rounded-sm border border-red-100">
                  <AlertCircle size={14} className="sm:w-4 sm:h-4" />
                  <span className="font-body text-xs sm:text-sm">{error}</span>
                </div>
              )}

              <div className="pt-2 sm:pt-3 md:pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full font-serif uppercase tracking-[0.2em] text-xs sm:text-sm py-2.5 sm:py-3 md:py-4 rounded-sm hover:shadow-xl transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2"
                  style={{ backgroundColor: '#768870', color: '#F5F7EC' }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = 'rgba(118, 136, 112, 0.9)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = '#768870';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                      Submit RSVP
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 md:py-10 animate-fade-in-up flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 border" style={{ backgroundColor: 'rgba(118, 136, 112, 0.1)', color: '#768870', borderColor: 'rgba(118, 136, 112, 0.2)' }}>
               <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 md:mb-6" style={{ color: '#768870' }}>RSVP Sent!</h3>
            <div className="font-body text-sm sm:text-base md:text-xl space-y-1.5 sm:space-y-2 max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(75, 85, 99, 1)' }}>
              <p>
                Your attendance will be reported and be reflected to our guestbook.
              </p>
              <p className="pt-1 sm:pt-2">
                We are excited to see you.<br/>Thanks for confirming.
              </p>
            </div>
            <button 
              onClick={handleClose}
              className="mt-6 sm:mt-8 md:mt-10 font-serif uppercase tracking-widest text-[10px] sm:text-xs border-b border-transparent transition-all"
              style={{ color: '#768870' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#768870'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default RSVPModal;