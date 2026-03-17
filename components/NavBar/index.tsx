import Link from "next/link";
import { Button } from "../ui/button";
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="w-20 h-20 flex item-center justify-center">
            <Link href="/" className="flex items-center gap-2 text-primary">

                <img src="/logo.jpg" alt="Logo" className="w-14 h-14 rounded-full" />
            </Link>

        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-20">
          <Link href="#home" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</Link>
          <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="#workouts" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Work Outs</Link>
          <Link href="#plans" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Plans</Link>
          <Link href="#team" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Team</Link>
          
        </div>

        {/* CTA */}
        <div className="flex items-center">
          <Button className="rounded-full px-8 font-semibold">
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
