import { Hero } from "../components/sections/hero";
import { Navbar } from "../components/NavBar";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/services";
import { WorkOut } from "@/components/sections/workout";
import { Plans } from "@/components/sections/plans";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services /> <WorkOut />
        <Plans />
      </main>
    </div>
  );
}
