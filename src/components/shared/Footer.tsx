import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Music,
} from "lucide-react";

const socialIcons = [
  { name: "facebook", Icon: Facebook, href: "#" },
  { name: "twitter",   Icon: Twitter,   href: "#" },
  { name: "instagram", Icon: Instagram, href: "#" },
  { name: "linkedin",  Icon: Linkedin,  href: "#" },
  { name: "tiktok",    Icon: Music,     href: "#" }, 
];

const footerLinks = [
  {
    title: "File Your Personal Taxes",
    links: [
      "Diaspora & International Taxes",
      "Self Employed and Business Owners",
      "Freelancers & Remote Workers",
      "Salary Earners",
    ],
  },
  {
    title: "File Your Company Taxes",
    links: ["Small & Mid Sized Businesses", "Large Business"],
  },
  {
    title: "Tax Guides",
    links: [
      "How to file my personal taxes",
      "How to file my business taxes",
      "How to file diaspora taxes",
      "How to file taxes for my staff",
    ],
    extra: {
      label: "View all Guides",
      href: "#",
    },
  },
  {
    title: "Resources",
    links: [
      "Self Tax Assessment",
      "Tax Calculator",
      "Tax Chatbot",
      "Tax Community",
      "Blog",
    ],
  },
  {
    title: "Quick Links",
    links: ["About Us", "How It Works", "Privacy Policy", "Terms of Service"],
  },
];


export default function Footer() {
  return (
    <footer className="bg-[#012B56] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid gap-12">
          
          <div className=" space-y-4">
            <Image
              src="/Logo.svg"
              alt="Tax Oga"
              width={140}
              height={40}
            />

            <p className="text-sm text-gray-300">
              Where everyday individuals and businesses get premium tax support.
            </p>
          </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
             {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-sm">
                {section.title}
              </h4>

              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="hover:text-white transition"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>

              {section.extra && (
                <Link
                  href={section.extra.href}
                  className="text-sm underline text-gray-300 hover:text-white"
                >
                  {section.extra.label}
                </Link>
              )}
            </div>
          ))}
         </div>
        </div>

        <div className="mt-12 space-y-4">
          <h4 className="font-bold">Connect With Us</h4>

          <p className="text-sm text-[#FFFFFF] flex gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
             WhatsApp: +234 800 123 4567
          </p>

         <div className="flex gap-4 mt-3">
            {socialIcons.map(({ name, Icon, href }) => (
                <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit us on ${name}`}
                className="
                    flex h-9 w-9 items-center justify-center rounded-full
                    bg-white/10 text-white/90
                    transition-all duration-200
                    hover:bg-white/20 hover:text-white hover:scale-105
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                    active:scale-95
                "
                >
                <Icon className="h-5 w-5" strokeWidth={2} />
                </a>
            ))}
            </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-6 text-center text-sm text-[#D1D5DC]">
          © 2025 TaxEase NG. All rights reserved. Built for compliance with Nigeria Tax Act 2025.
        </div>
      </div>
    </footer>
  );
}
