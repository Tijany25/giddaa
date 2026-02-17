'use client';

import { MessageSquareQuote } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const TAX_FACTS = [
  "You don't need to pay tax if you earn more than ₦50 Million Naira",
  "The first ₦800,000 of your annual income is tax-free in Nigeria.",
  "Pension contributions are tax-deductible under Nigerian tax law.",
  "Small businesses with turnover below ₦25M enjoy a reduced CIT rate of 0%.",
  "NHF contributions can reduce your taxable income.",
  "Life insurance premiums qualify as allowable deductions.",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen]           = useState(false);
  const [isHovered, setIsHovered]     = useState(false);
  const [factIndex, setFactIndex]     = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const factTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    factTimerRef.current = setInterval(() => {
      setFactIndex((i) => (i + 1) % TAX_FACTS.length);
    }, 5000);
    return () => { if (factTimerRef.current) clearInterval(factTimerRef.current); };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovered(true);
    hoverTimerRef.current = setTimeout(() => setPopupVisible(true), 180);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovered(false);
    hoverTimerRef.current = setTimeout(() => setPopupVisible(false), 400);
  };

  const handlePopupMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setPopupVisible(true);
  };

  const handlePopupMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => setPopupVisible(false), 400);
  };

  const showPopup = (popupVisible || isHovered) && !isOpen;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-4">

      {showPopup && (
        <div
          className="flex flex-col gap-3 items-end origin-bottom-right transition-all duration-300"
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-start gap-4 w-[340px] max-w-[340px]">
            <div className="absolute bottom-4 -right-2 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45 transform origin-bottom-left" />

            <div className="flex-shrink-0 w-11 h-11 bg-[#2C59C3] rounded-xl flex items-center justify-center shadow-md">
              <MessageSquareQuote size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#0B2239] mb-1">Did You Know?</p>
              <p
                key={factIndex}
                className="text-sm text-gray-600 leading-relaxed animate-fade-in"
              >
                {TAX_FACTS[factIndex]}
              </p>
            </div>
          </div>

          {/* Ask Tunder card */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl border-2 border-[#2C59C3]/30 p-4 flex items-start gap-4 w-[340px] max-w-[340px] cursor-pointer hover:border-[#2C59C3] transition-all group"
            onClick={() => { setIsOpen(true); setPopupVisible(false); }}
          >
            <div className="absolute bottom-5 -right-2 w-4 h-4 bg-white border-r border-b border-[#2C59C3]/30 rotate-45 transform origin-bottom-left group-hover:border-[#2C59C3]" />

            <div className="flex-shrink-0 w-11 h-11 bg-[#2C59C3] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <MessageSquareQuote size={20} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#0B2239] mb-1">I am Tunder</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ask me anything about taxes in Nigeria.
              </p>
            </div>
            <div className="ml-auto flex-shrink-0 self-center">
              <svg className="w-4 h-4 text-[#2C59C3] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setPopupVisible(false);
        }}
        aria-label="Open Tunder chat"
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen
            ? 'bg-[#0B2239] rotate-0 scale-100'
            : 'bg-[#2C59C3] hover:scale-110 hover:shadow-2xl'
        }`}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl bg-[#2C59C3] animate-ping opacity-20" />
        )}

        <div className={`transition-all duration-300 ${isOpen ? 'rotate-90 scale-90' : 'rotate-0'}`}>
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <MessageSquareQuote size={26} className="text-white" />
          )}
        </div>

        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
        )}
      </button>

      <div
        className={`absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto w-[380px] h-[520px]'
            : 'opacity-0 scale-95 pointer-events-none w-[380px] h-[520px]'
        }`}
      >
        <div className="bg-gradient-to-r from-[#0B2239] to-[#1a3a5c] px-5 py-4 flex items-center gap-3">
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out both;
        }
      `}</style>
    </div>
  );
}