// components/WhoWeServe.tsx
"use client";

import Image from "next/image";
import { type FC } from "react";

interface AudienceCardProps {
  title: string;
  italicSubtitle: string;
  description: string;
  bgColor: string;
  imageSrc: string;
  imageAlt: string;
}

const audiences: AudienceCardProps[] = [
  {
    title: "Small Business Owners",
    italicSubtitle:
      "We help you stay compliant, save money, and do the most important thing — focus on your business.",
    description:
      "Running a small business is already tough — tax shouldn’t make it harder. The new law requires most registered businesses to file annual returns, even if they made no profit. We help you understand what’s required, file quickly, and get your Tax Clearance Certificate (TCC) without stress.",
    bgColor: "bg-[#FF9500]",
    imageSrc: "/small-biz.jpg",
    imageAlt: "Small Business Owners",
  },
  {
    title: "Salary Earners (Public and Private)",
    italicSubtitle:
      "We help you make sense of your payslip — and make sure your hard-earned money works for you.",
    description:
      "Many employees unknowingly have PAYE shortfalls, wrong tax IDs, or unfiled annual declarations. We help you check your status, fix any gaps, recover overpaid taxes, and keep everything clean so you avoid penalties or queries later.",
    bgColor: "bg-[#34C759]",
    imageSrc: "/salary-earner.jpg",
    imageAlt: "Salary Earners (Public and Private)",
  },
  {
    title: "Large Businesses",
    italicSubtitle:
      "We keep your business ahead of FIRS changes — not chasing them.",
    description:
      "From monthly PAYE filings and accurate tax remittance to TCC processing and audit defence, large companies rely on us to stay compliant. We handle complex tax structures, multiple branches, staff audits, and automation to make your tax operations predictable and penalty-free.",
    bgColor: "bg-[#001F3F]",
    imageSrc: "/large-biz.jpg",
    imageAlt: "Large Businesses",
  },
  {
    title: "Remote Workers and Freelancers",
    italicSubtitle:
      "You shouldn’t need to be a tax expert to earn from anywhere — we’ll handle that part.",
    description:
      "Remote workers often ignore taxes until they run into issues with banks, visas, or background checks. We help you understand what applies to your income, file correctly across multiple jurisdictions where needed, maximise deductions, and avoid compliance headaches.",
    bgColor: "bg-[#00C7BE]",
    imageSrc: "/remote-worker.jpg",
    imageAlt: "Remote Workers and Freelancers",
  },
  {
    title: "Property Owners and Landlords",
    italicSubtitle:
      "You worked hard to own it — we’ll make sure you keep more of what you earn from it.",
    description:
      "We help property owners calculate the right tax on rental income, manage deductions, file annual returns, and secure TCC for property sales, refinancing, or government transactions. Stay compliant and avoid penalties that compound over time.",
    bgColor: "bg-[#5856D6]",
    imageSrc: "/property.jpg",
    imageAlt: "Property Owners and Landlords",
  },
];

const AudienceCard: FC<AudienceCardProps> = ({
  title,
  italicSubtitle,
  description,
  bgColor,
  imageSrc,
  imageAlt,
}) => {
  return (
    <article
      className={`
        w-full rounded-3xl lg:rounded-[5rem]
        px-5 pt-6 md:pt-10 lg:pt-12 lg:px-12
        shadow-xl flex flex-col-reverse gap-6 lg:flex-row lg:items-center
        min-h-[480px] lg:min-h-[560px] text-white
        ${bgColor}
      `}
    >
      <div className="flex-1 space-y-5 md:space-y-6 pb-6 lg:pb-0">
        <h3 className="text-3xl font-bold leading-tight">
          {title}
        </h3>

        <p className="text-lg md:text-xl italic text-[#F4F4F4]">
          {italicSubtitle}
        </p>

        <p className="text-xl hidden md:block leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="button"
            className="
              inline-flex items-center justify-center gap-2
              h-12 px-6 text-sm font-bold rounded-xl
              bg-white text-[#2C59C3] hover:opacity-95 transition
              focus-visible:ring-4 focus-visible:ring-primary/30
              w-full sm:w-auto min-w-[180px]
            "
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            Speak with an Expert
          </button>

          <button
            type="button"
            className="
              inline-flex items-center justify-center gap-2
              h-12 px-6 text-sm font-bold rounded-xl
              border-2 border-white bg-transparent text-white
              hover:bg-white/10 transition
              focus-visible:ring-4 focus-visible:ring-white/30
              w-full sm:w-auto min-w-[180px]
            "
          >
            Seek Tax Support
          </button>
        </div>
      </div>

      <div className="flex-1">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={770}
          height={460}
          priority={false}
          loading="lazy"
          quality={85}
          className="h-full w-full rounded-4xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        />
      </div>
    </article>
  );
};

export default function WhoWeServe() {
  return (
    <section className="w-full bg-[#FFEED0] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 md:px-10 lg:px-5 space-y-10 md:space-y-16">
        <header className="space-y-4 md:space-y-6">
          <div className="inline-flex text-sm h-10 md:h-11 items-center justify-center rounded-full bg-white px-6 font-semibold text-[#000000]">
            Who We Serve
          </div>

          <h2 className="text-4xl font-bold leading-tight text-[#001F3F]">
            We are Experts for Every Tax Situation
          </h2>

          <p className="text-lg md:text-xl text-[#4B4B4B]">
            No matter your tax needs, file with confidence and get the most out
            of your return.
          </p>
        </header>

        <div className="relative space-y-6">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              className="sticky sm:top-[8vh] md:top-[10vh] lg:top-[12vh] z-10 transition-all duration-300"
              style={{ top: `${12 + (index + 1) * 2}vh` }}
            >
              <AudienceCard {...audience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}