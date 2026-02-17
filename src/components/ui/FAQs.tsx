"use client";

import { FC, useState } from "react";
import { ChevronDown } from "lucide-react"; 

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQ[] = [
  {
    question: "Do you collect filing fees?",
    answer: "Yes. TaxOga charges filing fees depending on the type of tax and the level of support required. All fees are communicated upfront before any filing begins. No surprises."
  },
  {
    question: "Do we file VAT?",
    answer: "Yes. TaxOga charges filing fees depending on the type of tax and the level of support required. All fees are communicated upfront before any filing begins. No surprises."
  },
  {
    question: "What taxes do you file?",
    answer: "Yes. TaxOga charges filing fees depending on the type of tax and the level of support required. All fees are communicated upfront before any filing begins. No surprises."
  },
  {
    question: "Who can use TaxOga?",
    answer: "Yes. TaxOga charges filing fees depending on the type of tax and the level of support required. All fees are communicated upfront before any filing begins. No surprises."
  },
  {
    question: "Do I need to understand tax laws to use TaxOga?",
    answer: "Yes. TaxOga charges filing fees depending on the type of tax and the level of support required. All fees are communicated upfront before any filing begins. No surprises."
  },
  {
    question: "Will I get proof that my taxes were filed?",
    answer: "Yes. After filing, you’ll receive proof of submission and tax certificates where applicable, so you have clear records for compliance, audits, or business needs."
  },
  {
    question: "Can I speak to a tax expert before filing?",
    answer: "Yes. TaxOga offers consultations with tax experts to help you understand your obligations, answer questions, and ensure you’re comfortable before we file on your behalf."
  },
];

const FAQItem: FC<{ faq: FAQ; isOpen: boolean; onToggle: () => void }> = ({
  faq,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`
        border border-[#0000001A] rounded-xl overflow-hidden
        transition-shadow duration-200 bg-white
      `}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="flex w-full items-center justify-between px-6 py-7 cursor-pointer "
        aria-expanded={isOpen}
        aria-controls={`faq-content-${faq.question}`}
      >
        <h3 className="text-[#0A0A0A] font-semibold">
          {faq.question}
        </h3>

        <ChevronDown
          className={`h-6 w-6 text-[#717182] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        id={`faq-content-${faq.question}`}
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[500px]" : "max-h-0"} 
        `}
      >
        <div className="px-6 pb-7 pt-1 text-[#4B4B4B] text-sm leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white pt-20">
      <div className="mx-auto max-w-screen-xl px-5 sm:px-6 md:px-8 lg:px-5 space-y-10 md:space-y-12">
        <header className="space-y-4 md:space-y-6 max-w-3xl">
          <div className="inline-flex h-9 md:h-11 items-center justify-center rounded-full bg-gradient-to-b from-[#001F3F] to-[#003366] px-5 md:px-6 text-sm font-semibold text-white shadow-sm">
            FAQs
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] leading-tight">
            Your Questions, Answered.
          </h2>

          <p className="text-base md:text-xl text-[#4B4B4B] leading-relaxed">
            Find answers to the most common questions people ask.
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}