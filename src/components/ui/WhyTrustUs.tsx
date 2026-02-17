"use client";

import Image from "next/image";
import { type FC } from "react";

interface TrustCardProps {
  label: string;
  labelColor: string;
  title: string;
  italicSubtitle: string;
  description: string;
  stat: string;
  bgColor: string;
  image: string;
  imageAlt: string;
}

const trustPoints: TrustCardProps[] = [
    {
    label: "Save as Much as Possible",
    labelColor: "text-[#001F3F]",
    title: "Legally Maximize Your Returns",
    italicSubtitle: "Our goal isn't just to file your taxes — it's to keep more money in your pocket.",
    description:
      "We claim every legal relief and deduction you qualify for, from pensions, rent, and more — so you keep more of your money, legally.",
    stat: "Over ₦100M Saved",
    bgColor: "bg-[#32ADE6]",
    image: "/returns.jpg",
    imageAlt: "Legally Maximize Your Returns",
  },
  {
    label: "Trust & Experience",
    labelColor: "text-[#6B4003]",
    title: "Experience You Can Count On",
    italicSubtitle: "We speak the language of FIRS — and translate it into results for you.",
    description:
      "We've helped individuals, freelancers, and businesses navigate Nigeria's complex tax system. You get local insight and proven results — not guesswork.",
    stat: "200+ Returns Filed",
    bgColor: "bg-[#FF9500]",
    image: "/experience.jpg",
    imageAlt: "Experience You Can Count On",
  },
  {
    label: "Razor Sharp Accuracy",
    labelColor: "text-[#00330D]",
    title: "Accuracy That Protects You",
    italicSubtitle: "Because one wrong entry can cost you — we make sure it never does.",
    description:
      "One mistake in your filing can lead to penalties or overpayment. Our technology and expert checks make sure every figure is correct, every deadline is met.",
    stat: "0% Tax Errors",
    bgColor: "bg-[#34C759]",
    image: "/accuracy.jpg",
    imageAlt: "Accuracy That Protects You",
  },
  
  {
    label: "Tax Experts Who Care",
    labelColor: "text-[#001F3F]",
    title: "Real Support From Real People",
    italicSubtitle: "Because good tax support should sound like a conversation, not a lecture.",
    description:
      "Our team of Nigerian tax experts is here to help by chat or phone — simple answers, no jargon.",
    stat: "Thoughtful Experts",
    bgColor: "bg-[#00C7BE]",
    image: "/support.jpg",
    imageAlt: "Real Support From Real People",
  },
  {
    label: "Transparency First",
    labelColor: "text-[#001F3F]",
    title: "Transparent From Start to Finish",
    italicSubtitle: "Trust starts with transparency — and we build it into every filing.",
    description:
      "You always know what's filed, what data is used, and what you're paying for. No hidden charges, no inflated numbers.",
    stat: "Over ₦100M Saved",
    bgColor: "bg-[#AF52DE]",
    image: "/transparent.jpg",
    imageAlt: "Transparent From Start to Finish",
  },
];

const TrustCard: FC<TrustCardProps> = ({
  label,
  labelColor,
  title,
  italicSubtitle,
  description,
  stat,
  bgColor,
  image,
  imageAlt,
}) => {
  return (
   <article
      className={`
        group flex flex-col-reverse md:flex-row
        w-[340px] sm:w-[380px] md:w-[min(960px,85vw)]
        shrink-0 h-auto md:h-[480px] lg:h-[520px]
        rounded-3xl md:rounded-3xl overflow-hidden
        transition-all duration-300 hover:-translate-y-1
        shadow-md hover:shadow-xl
      `}
    >
      <div
        className={`
          flex-1 flex flex-col justify-center gap-5
          rounded-b-3xl md:rounded-br-none md:rounded-l-3xl
          p-6 md:p-10 lg:p-12 text-white
          ${bgColor}
        `}
      >
        <span className={`hidden md:inline w-fit text-xl ${labelColor}`}>
          {label}
        </span>

        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
          {title}
        </h3>

        <p className="text-base md:text-lg lg:text-xl italic text-gray-100/90">
          {italicSubtitle}
        </p>

        <p className=" leading-relaxed opacity-90">
          {description}
        </p>

        <span className="mt-3 text-[#00134380] md:mt-6 text-4xl md:text-5xl font-bold">
          {stat}
        </span>
      </div>

      <div className="relative h-64 sm:h-72 md:h-full md:w-[45%] min-w-[300px] overflow-hidden rounded-t-3xl md:rounded-t-none md:rounded-r-3xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
          quality={80}
        />
      </div>
    </article>
  );
};

export default function WhyTrustUs() {
  return (
    <section className="w-full bg-white py-12 md:py-20 lg:py-24">
      <div className="mx-auto px-5 sm:px-8 md:px-10 lg:px-24 space-y-8 md:space-y-12">
        <header className="space-y-4 md:space-y-6">
          <div className="inline-flex h-9 md:h-11 items-center justify-center rounded-full bg-gradient-to-b from-[#001F3F] to-[#003366] px-5 md:px-6 text-sm font-semibold text-white">
            Why Trust Us?
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] leading-tight">
            Work With Nigeria&apos;s Top Tax Experts
          </h2>

          <p className="text-base md:text-xl text-[#4B4B4B] leading-relaxed">
            Before the 2025 tax act, we filed 200 returns for 30 companies. We&apos;ve added great software to help more businesses and individuals stay compliant and maximize their tax returns.
          </p>
        </header>

        <div className="relative">
          <div
            className="
              scrollbar-hide flex gap-6 md:gap-20
              overflow-x-auto pb-6 md:px-8 lg:px-16 snap-x snap-mandatory
            "
          >
            {trustPoints.map((point) => (
              <div key={point.title} className="snap-start">
                <TrustCard {...point} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}