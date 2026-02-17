import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import FAQs from "@/components/ui/FAQs";
import GetStarted from "@/components/ui/GetStarted";
import HeroSection from "@/components/ui/HeroSection";
import HowItWorks from "@/components/ui/HowItWorks";
import StatsSection from "@/components/ui/StatSection";
import TaxCommunity from "@/components/ui/TaxCommunity";
import WhoWeServe from "@/components/ui/WhoWeServe";
import WhyTrustUs from "@/components/ui/WhyTrustUs";

export default function Home() {
  return (
   <>
   <HeroSection />
   <StatsSection />
   <HowItWorks />
   <WhoWeServe />
   <WhyTrustUs />
   <TaxCommunity />
   <FAQs />
   
   </>
  );
}
