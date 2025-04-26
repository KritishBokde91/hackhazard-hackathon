import ChallageCategory from "@/components/home/challage-category";
import { CTA } from "@/components/home/cta";
import { FAQ } from "@/components/home/faq";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/how-it-works";
import Intro from "@/components/home/intro";
import { Newsletter } from "@/components/home/newsletter";
import { Testimonials } from "@/components/home/testimonials";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Intro />
      <Features />
      <ChallageCategory />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <FAQ />
      <Newsletter />
    </>
  );
}
