import React, { useState, useEffect } from "react";
import { Loader2, Mail, Calendar, MessageSquare, Heart, Sparkles, Star, AlertCircle, Users } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type GuestEntry = {
  timestamp: string;
  name: string;
  email: string;
  guests: string;
  message: string;
};

const GuestBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState<GuestEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalGuests, setTotalGuests] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation timing
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      fetchGuests();
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const fetchGuests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby6ov1J0fxQKvY_3ZuR0Q_Ir50MGpEXddEwfCDQcQby97C79icb3zI3q5vDzJAImcLBeg/exec",
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch guest list");
      }

      const data = await response.json();

      if (!data || !data.GoogleSheetData) {
        setGuests([]);
        setTotalGuests(0);
        return;
      }

      const rows: string[][] = data.GoogleSheetData;
      if (!Array.isArray(rows) || rows.length <= 1) {
        setGuests([]);
        setTotalGuests(0);
        return;
      }

      const header = rows[0];
      const entries = rows.slice(1);

      const guestEntries: GuestEntry[] = entries.map((row) => {
        const rowObj: Record<string, string> = {};
        header.forEach((col, i) => {
          rowObj[col] = row[i] || "";
        });
        return {
          timestamp: rowObj["Timestamp"] || new Date().toISOString(),
          name: rowObj["Full Name"] || "Guest",
          email: rowObj["Email"] || "",
          guests: rowObj["Number Of Guests"] || "1",
          message: rowObj["Message"] || "",
        };
      });

      setGuests(guestEntries.reverse()); // Show newest first
      setTotalGuests(guestEntries.reduce((sum, entry) => sum + parseInt(entry.guests || "0"), 0));
    } catch (error: any) {
      console.error("Failed to load guests:", error);
      setError(error?.message || "Failed to load guest list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleRsvpUpdate = () => {
      if (isOpen) {
         setTimeout(fetchGuests, 2000); // Small delay to allow Google Sheets to populate
      }
    };
    window.addEventListener("rsvpUpdated", handleRsvpUpdate);
    return () => window.removeEventListener("rsvpUpdated", handleRsvpUpdate);
  }, [isOpen]);

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?";
  };

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "";
    }
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-full max-w-2xl h-[80vh] flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 transform transition-all duration-500 overflow-hidden ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'}`} style={{ backgroundColor: '#F5F7EC' }}>
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 border-b text-center relative" style={{ borderColor: 'rgba(229, 231, 235, 0.8)', background: 'linear-gradient(to bottom, #F5F7EC, rgba(245, 247, 236, 0.95))' }}>
          {/* Guest Count - Top Left - Special Design */}
          {!isLoading && !error && guests.length > 0 && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-10">
              <div className="relative group/count">
                <div className="absolute inset-0 blur-md rounded-full opacity-60 group-hover/count:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(118, 136, 112, 0.2)' }}></div>
                <div className="relative backdrop-blur-sm border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm group-hover/count:shadow-md transition-all duration-300 group-hover/count:scale-105" style={{ background: 'linear-gradient(to bottom right, rgba(118, 136, 112, 0.15), rgba(118, 136, 112, 0.1), rgba(118, 136, 112, 0.2))', borderColor: 'rgba(118, 136, 112, 0.3)' }}>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" style={{ color: '#768870' }} />
                    <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight" style={{ color: '#768870' }}>
                      {totalGuests}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 rounded-full p-1.5 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 group/close"
            style={{ color: 'rgba(156, 163, 175, 1)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#768870';
              e.currentTarget.style.backgroundColor = 'rgba(118, 136, 112, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(156, 163, 175, 1)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid #768870';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
            aria-label="Close guest book"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover/close:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 group/header" style={{ color: '#768870' }}>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-500 group-hover/header:scale-110 group-hover/header:rotate-12" />
            <span className="font-serif uppercase tracking-widest text-[10px] sm:text-xs transition-colors duration-300">Guest Registry</span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-500 group-hover/header:scale-110 group-hover/header:-rotate-12" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-all duration-300" style={{ color: '#768870' }}>Book of Guests</h2>
          <p className="font-body mt-1 sm:mt-2 text-xs sm:text-sm md:text-base transition-colors duration-300" style={{ color: 'rgba(107, 114, 128, 1)' }}>See who's celebrating with us</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 custom-scrollbar">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 sm:gap-5 animate-fade-in-up" style={{ color: '#768870' }}>
                   <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin drop-shadow-sm" />
                   <span className="font-serif tracking-widest text-xs sm:text-sm animate-pulse">Loading guests...</span>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 sm:gap-5 text-red-400 animate-fade-in-up">
                    <div className="relative">
                        <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" />
                        <div className="absolute inset-0 bg-red-400/20 blur-xl animate-pulse"></div>
                    </div>
                    <span className="font-serif tracking-widest text-xs sm:text-sm text-center px-4 max-w-sm">{error}</span>
                </div>
            ) : guests.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 sm:gap-5 text-gray-400 animate-fade-in-up">
                    <div className="relative">
                        <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-200 drop-shadow-sm animate-pulse" />
                        <div className="absolute inset-0 bg-gray-200/20 blur-xl"></div>
                    </div>
                    <span className="font-body text-sm sm:text-base md:text-xl italic transition-colors duration-300 hover:text-gray-600">Be the first to RSVP!</span>
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4 animate-fade-in-up">
                    <div className="grid gap-2.5 sm:gap-3">
                        {guests.map((guest, idx) => (
                            <div 
                                key={idx} 
                                className="group/card relative bg-white/80 backdrop-blur-sm p-2.5 sm:p-3 rounded-lg border border-gray-200/60 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-0.5 overflow-hidden"
                                style={{ animationDelay: `${idx * 0.03}s` }}
                            >
                                {/* Premium accent line */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom, rgba(118, 136, 112, 0.6), rgba(118, 136, 112, 0.4), transparent)' }}></div>
                                
                                <div className="flex items-start gap-2.5 sm:gap-3">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0 relative">
                                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full font-serif font-semibold flex items-center justify-center text-xs sm:text-sm border-2 border-white shadow-sm ring-1 transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-md" style={{ background: 'linear-gradient(to bottom right, rgba(118, 136, 112, 0.2), rgba(118, 136, 112, 0.3), rgba(118, 136, 112, 0.2))', color: '#768870', ringColor: 'rgba(229, 231, 235, 0.5)' }}>
                                            {getInitials(guest.name)}
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-grow min-w-0 flex-1">
                                        {/* Name and Guest Count Row */}
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h4 className="font-serif text-sm sm:text-base font-semibold truncate transition-colors duration-300" style={{ color: '#768870' }}>
                                                {guest.name}
                                            </h4>
                                            <span className="flex-shrink-0 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all duration-300 group-hover/card:scale-105" style={{ backgroundColor: 'rgba(118, 136, 112, 0.1)', color: '#768870', borderColor: 'rgba(118, 136, 112, 0.2)' }}>
                                                {guest.guests}
                                            </span>
                                        </div>
                                        
                                        {/* Date and Guest Number */}
                                        <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                                            <Calendar className="w-3 h-3 text-gray-400/70 flex-shrink-0" />
                                            <span className="text-[10px] sm:text-[11px] text-gray-500 font-serif uppercase tracking-wider">
                                                {formatDate(guest.timestamp)}
                                            </span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-[10px] sm:text-[11px] text-gray-400 font-serif">
                                                #{guests.length - idx}
                                            </span>
                                        </div>
                                        
                                        {/* Message */}
                                        {guest.message && (
                                            <div className="mt-2 pt-2 border-t" style={{ borderColor: 'rgba(229, 231, 235, 0.8)' }}>
                                                <div className="flex items-start gap-2">
                                                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" style={{ color: 'rgba(118, 136, 112, 0.6)' }} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs sm:text-sm font-body leading-relaxed whitespace-pre-wrap break-words" style={{ color: 'rgba(55, 65, 81, 1)' }}>
                                                            {guest.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GuestBookModal;