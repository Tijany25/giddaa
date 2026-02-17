'use client';

import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const pathname = usePathname();

  const isTaxCalculatorActive = pathname === '/tax-calculator' || pathname.startsWith('/tax-calculator/');

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/Logo.svg"
              alt="TaxOn Logo"
              width={150}
              height={50}
              className="h-12"
            />
          </Link>

          <div className="hidden lg:flex lg:justify-between space-x-12">
            <div className="flex gap-5">
              <div className="relative">
                <button
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  className="flex items-center gap-1 text-[14px] text-[#0A0A0A] hover:text-[#2C59C3] transition-colors font-medium"
                >
                  Tax Resources
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isResourcesOpen && (
                  <div
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2C59C3] transition-colors">
                      Tax Guides
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2C59C3] transition-colors">
                      Articles
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2C59C3] transition-colors">
                      Videos
                    </a>
                  </div>
                )}
              </div>

              <Link
                href="/tax-calculator"
                className={`text-[14px] font-medium transition-colors ${
                  isTaxCalculatorActive
                    ? 'text-[#2C59C3] font-semibold border-b-2 border-[#2C59C3]'
                    : 'text-[#0A0A0A] hover:text-[#2C59C3]'
                }`}
              >
                Tax Calculator
              </Link>
            </div>

            <div className="flex gap-5">
              <a href="#" className="text-gray-700 hover:text-[#2C59C3] transition-colors font-medium">
                Pricing
              </a>
              <a href="#" className="text-gray-700 hover:text-[#2C59C3] transition-colors font-medium">
                Success Stories
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#"
              className="text-[#4B4B4B] mr-4 hover:text-[#2C59C3] font-semibold transition-colors underline decoration-1 underline-offset-4"
            >
              Login
            </a>

            <button className="flex items-center gap-2 bg-[#2C59C3] text-white text-[12px] px-5 py-3 rounded-[12px] hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Speak with an Expert
            </button>

            <button className="border-2 border-[#2C59C3] text-[#2C59C3] text-[12px] px-8 py-3 rounded-[12px] hover:bg-blue-50 transition-all font-bold">
              Seek Tax Support
            </button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#2C59C3] transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="py-4 space-y-4">
              <div>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="flex items-center justify-between w-full text-gray-700 font-medium py-2"
                >
                  Tax Resources
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isResourcesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <a href="#" className="block text-gray-600 hover:text-[#2C59C3] py-1">
                      Tax Guides
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-[#2C59C3] py-1">
                      Articles
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-[#2C59C3] py-1">
                      Videos
                    </a>
                  </div>
                )}
              </div>

              <Link
                href="/tax-calculator"
                className={`block py-2 font-semibold transition-colors ${
                  isTaxCalculatorActive ? 'text-[#2C59C3]' : 'text-gray-700 hover:text-[#2C59C3]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tax Calculator
              </Link>

              <a href="#" className="block text-gray-700 hover:text-[#2C59C3] font-medium py-2">
                Pricing
              </a>
              <a href="#" className="block text-gray-700 hover:text-[#2C59C3] font-medium py-2">
                Success Stories
              </a>

              <div className="pt-4 space-y-3 border-t border-gray-200">
                <a
                  href="#"
                  className="block text-center text-gray-700 hover:text-[#2C59C3] font-semibold py-2"
                >
                  Login
                </a>

                <button className="w-full flex items-center justify-center gap-2 bg-[#2C59C3] text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Speak with an Expert
                </button>

                <button className="w-full border-2 border-[#2C59C3] text-[#2C59C3] px-5 py-3 rounded-lg hover:bg-blue-50 transition-all font-semibold">
                  Seek Tax Support
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}