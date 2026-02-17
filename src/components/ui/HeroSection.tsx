'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#001F3F] h-[1500px] md:h-[730px]">

      <div
        className="absolute inset-0 z-0  bg-cover"
        style={{
            backgroundImage: "url('/bg-pattern.svg')",
        }}
        />

      <div className="relative  overflow-hidden z-10 max-w-7xl mx-auto px-6 lg:px-1 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          
          <div className="text-white space-y-8">
            
            <h1 className="text-4xl text-5xl font-bold leading-tight">
              Avoid{' '}
              <span className="text-[#4FC7FF]">Tax Wahala!</span>{' '}
              Stay Compliant While Paying the Lowest Possible Taxes.
            </h1>

            <p className="text-xl text-[#CCCCCC] max-w-xl leading-relaxed">
              No matter your tax needs, our tax experts will help you file with
              confidence and get the most value when you file your taxes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              
              <button className="flex items-center justify-center gap-3 bg-[#2C59C3] hover:bg-[#1d4ed8] text-white px-7 py-4 rounded-xl font-bold text-sm transition">
                
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>

                Speak with an Expert
              </button>

              <button className="bg-white text-[#2C59C3] px-7 py-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition">
                Assess Your Tax Needs
              </button>
            </div>
          </div>

          <div className="relative">
            
            <div className="relative rounded-[40px]">
              <div className="relative w-full h-[500px] lg:h-[450px]">
                <Image
                  src="/Craftsman.svg"
                  alt="Happy craftsman"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute top-0 md:top-8  left-[-2] backdrop-blur-xl bg-white/20 border border-white/30 rounded-4xl px-5 py-10 w-[220px]">
                <p className="text-white text-sm mb-1 opacity-90">
                  Tunde’s Estimated Refund
                </p>

                <h3 className="text-2xl text-center font-bold text-white mb-3">
                  ₦450,000
                </h3>

                <div className="bg-white text-[#000000] rounded-lg py-2 flex items-center justify-center gap-2 text-sm font-semibold">
                  Filed
                  <span className="">✔</span>
                </div>
              </div>

              <div className="absolute text-center bottom-30 md:bottom-6 right-8 md:right-16 bg-[#FFEED0] rounded-3xl px-6 py-5 shadow-xl">
                <p className="text-2xl font-bold text-[#000000]">
                  ₦5,000
                </p>
                <p className="text-sm text-[#979797]">
                  Taxes Due Today
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="absolute bottom-6 right-35 z-20">
      <button className="flex items-center gap-4 px-5 py-3 pr-6 rounded-full 
        bg-gradient-to-b from-[#001F3F] to-[#003366]
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        hover:scale-105 transition-all duration-300"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
          <Image
            src="/avatar.svg"
            alt="chatbot avatar"
            fill
            className="object-cover"
          />
        </div>

        <span className="text-white font-bold text-sm whitespace-nowrap">
          Chat with Tunde
        </span>
      </button>
    </div>
    </section>
  );
}
