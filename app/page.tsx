import { IntroProvider } from "@/components/Intro";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Work } from "@/components/Work";
import { Approach } from "@/components/Approach";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <IntroProvider>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
    </IntroProvider>
  );
}
