import { Hero } from "../Sections/hero";
import { Navbar } from "../components/NavBar";
import { About } from "@/Sections/About";
import { Services } from "@/Sections/services";
import { WorkOut } from "@/Sections/workout";
import { Plans } from "@/Sections/plans";
import { Team } from "@/Sections/team";
import { Contact } from "@/Sections/contact";
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
