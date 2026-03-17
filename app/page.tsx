import { Hero } from "../components/sections/hero";
import { Navbar } from "../components/NavBar";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />{" "}
      </main>
    </div>
  );
}
