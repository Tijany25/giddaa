"use client";

import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import { type FC } from "react";


interface CommunityQuestion {
  category: string | string[];
  title: string;
  description: string;
  askedBy: string;
  timeAgo: string;
  answers: number;
}

const questions: CommunityQuestion[] = [
  {
    category: "Value Added Tax (VAT)",
    title: "Is VAT a tax on consumption?",
    description:
      "I want to find out if VAT is a tax on consumption? Pls someone explain and also help with explaining what a consumption tax is.",
    askedBy: "Ngutor Ikpaahindi",
    timeAgo: "2 hours ago",
    answers: 1,
  },
  {
    category: "Value Added Tax (VAT)",
    title: "Is VAT a consumption Tax?",
    description: "I am wondering if VAT is a consumption tax, and how VAT is treated.",
    askedBy: "Ngutor Ikpaahindi",
    timeAgo: "2 hours ago",
    answers: 2,
  },
  {
    category: "Tax Deductibles",
    title: "What Constitutes a Basic Food Item?",
    description:
      "I am wondering what kinds of food items constitute basic food items that are not taxed? Can you give an example?",
    askedBy: "Tunde Kazim",
    timeAgo: "2 hours ago",
    answers: 1,
  },
  {
    category: "Tax Deductibles",
    title: "Is there VAT on food items?",
    description: "Is Value added tax attached to food items with the new law?",
    askedBy: "Tunde Kazim",
    timeAgo: "2 hours ago",
    answers: 1,
  },
  {
    category: "Small & Medium Businesses",
    title: "Do small Businesses Pay Company Income Tax?",
    description:
      "I have seen in some online videos that small businesses don't pay tax. Is this true?",
    askedBy: "Tunde Kazim",
    timeAgo: "2 months ago",
    answers: 1,
  },
  {
    category: "General",
    title: "How to Retrieve Your Tax Identification Number (TIN) Using Your NIN in Nigeria",
    description: "I am trying to see how I can get my tax ID. How can I do that?",
    askedBy: "Tunde Kazim",
    timeAgo: "2 months ago",
    answers: 1,
  },
  {
    category: "General",
    title: "What is presumptive tax?",
    description: "I heard Taiwo Oyedele talking about presumptive tax. What is that?",
    askedBy: "Tunde Kazim",
    timeAgo: "2 months ago",
    answers: 1,
  },
  {
    category: ["Tax Deductibles", "Personal Income Tax (PIT)"],
    title: "Is National Housing Fund (NHF) tax deductible?",
    description:
      "Is National housing fund tax deductible? I pay this every month and want to find out if it is and how it will affect my taxes.",
    askedBy: "Tunde Kazim",
    timeAgo: "2 months ago",
    answers: 1,
  },
  {
    category: ["Pay as You Earn (PAYE)", "Large Businesses & Enterprises", "Small & Medium Businesses", "Business Names"],
    title: "What is Paye?",
    description:
      "I am wondering what PAYE means and if every registered business is meant to pay it. Can someone help me explain?",
    askedBy: "Tunde Kazim",
    timeAgo: "2 months ago",
    answers: 1,
  },
];

// Duplicate array for seamless infinite loop
const doubledQuestions = [...questions, ...questions];

const CommunityCard: FC<CommunityQuestion> = ({
  category,
  title,
  description,
  askedBy,
  timeAgo,
  answers,
}) => {
  const categories = Array.isArray(category) ? category : [category];

  return (
    <article
      className={`
        group/card
        flex h-full justify-between gap-3
        rounded-3xl bg-white px-5 py-6 shadow-sm
        transition-all duration-300 hover:shadow-md hover:-translate-y-1
        w-full max-w-[400px] min-w-[365px]
        hover:[animation-play-state:paused]
      `}
    >
        <div className="text-[#6A7282] text-sm flex flex-col gap-2">
            <ThumbsUp className="h-5 w-5 text-gray-400" />
           <span> 12</span>

        </div>

        <div>
            <h3 className="line-clamp-2 min-h-[64px] text-xl font-semibold leading-tight text-gray-900">
        {title}
      </h3>

      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      <div className="text-xs text-gray-600 space-y-5 mt-4">
        <div className="flex gap-5">
          <span>
            Asked by <strong className="text-gray-800">{askedBy}</strong>
          </span>
          <span>{timeAgo}</span>
        </div>

        <div
          className="
            flex shrink-0 items-center gap-2 rounded-lg border border-gray-200
            bg-gray-50 px-3 py-1.5 text-sm font-medium text-[#0A0A0A] w-fit
          "
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
          </svg>
          {answers} {answers === 1 ? "Answer" : "Answers"}
        </div>
      </div>
        </div>

      
    </article>
  );
};

export default function TaxCommunity() {
  return (
    <section className="w-full bg-[#FFEED0] py-20 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-5 sm:px-6 md:px-8 lg:px-5 space-y-10 md:space-y-12">
        <header className="space-y-4 md:space-y-6">
          <div className="inline-flex h-9 md:h-11 items-center justify-center rounded-full bg-gradient-to-b from-[#001F3F] to-[#003366] px-5 md:px-6 text-sm font-semibold text-white shadow-sm">
            Tax Community
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] leading-tight">
            A Vibrant Community You Can Count On.
          </h2>

          <p className="text-base md:text-xl text-[#4B4B4B] leading-relaxed">
            Find answers to your tax questions. Learn from real world scenarios and contribute to tax knowledge.
          </p>
        </header>

      <div className="group relative overflow-hidden">
          <div
            className={`
              flex animate-marquee gap-6 md:gap-8 lg:gap-10
              py-6 md:py-8
              group-hover:[animation-play-state:paused]
            `}
            style={{
              animationDuration: "10s", 
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            {doubledQuestions.map((q, idx) => (
              <div
                key={`${q.title}-${idx}`}
                aria-hidden={idx >= questions.length ? "true" : undefined}
              >
                <CommunityCard {...q} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center pt-6 lg:pt-8">
          <Image
            src="/tax-community.svg"
            alt="Tax Community Cloud Illustration"
            width={858}
            height={450}
            className="
              relative h-auto w-[90%] max-w-[90%] md:w-auto md:max-w-none
              object-contain
            "
            priority={false}
            quality={85}
            sizes="(max-width: 768px) 90vw, 858px"
          />
        </div>
      </div>
    </section>
  );
}