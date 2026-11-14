
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="relative z-20 bg-white/80">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Nana Creative"
            width={145}
            height={110}
            priority
            className="h-15 w-auto object-contain rounded-lg"/>
            <span className="ml-2 text-lg font-bold text-brand-dark">
              Nana Creative
            </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-brand-primary ${
                index === 0
                  ? "border-b-2 border-brand-primary pb-2 text-brand-primary"
                  : "text-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Let's Talk ↗
        </Link>

      </nav>
    </header>
  );
}
