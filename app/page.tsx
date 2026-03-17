import { Hero } from "../components/sections/hero";
import { Navbar } from "../components/NavBar";

export default function Home() {
  return <div>
    <Navbar />
    <main>
      <Hero />
    </main>
  </div>;
}
