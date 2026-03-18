import { Hero } from "../components/sections/hero";
import { Navbar } from "../components/NavBar";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/services";
import { WorkOut } from "@/components/sections/workout";
import { Plans } from "@/components/sections/plans";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WorkOut />
        <Plans />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
