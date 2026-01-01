import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { content } = useSiteContent();

  return (
    <footer className="bg-foreground text-background py-24 md:py-32 lg:py-48">
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-20 md:mb-32">
          {/* Left Side - Big CTA */}
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl italic text-background/90 mb-6">
              {content.footer.ctaTitle}
            </h2>
            <p className="font-sans text-lg lg:text-xl text-background/60 max-w-md mb-8">
              {content.footer.ctaDescription}
            </p>
            <a
              href={`mailto:${content.footer.email}`}
              className="font-sans text-2xl md:text-3xl font-bold text-accent-blue hover:underline transition-all duration-300"
            >
              {content.footer.email}
            </a>
          </div>

          {/* Right Side - Links */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {/* Navigation */}
            <div>
              <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-background/40 mb-6">
                Navigation
              </h3>
              <nav className="flex flex-col gap-4">
                <Link to="/" className="font-sans text-background/80 hover:text-background transition-colors duration-300">
                  Home
                </Link>
                <Link to="/projects" className="font-sans text-background/80 hover:text-background transition-colors duration-300">
                  Projects
                </Link>
                <Link to="/contact" className="font-sans text-background/80 hover:text-background transition-colors duration-300">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-background/40 mb-6">
                Connect
              </h3>
              <nav className="flex flex-col gap-4">
                <a href={content.footer.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="font-sans text-background/80 hover:text-background transition-colors duration-300">
                  LinkedIn
                </a>
                <a href={content.footer.socialLinks.dribbble} target="_blank" rel="noopener noreferrer" className="font-sans text-background/80 hover:text-background transition-colors duration-300">
                  Dribbble
                </a>
                <a href={content.footer.socialLinks.github} target="_blank" rel="noopener noreferrer" className="font-sans text-background/80 hover:text-background transition-colors duration-300">
                  GitHub
                </a>
                <a href={content.footer.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="font-sans text-background/80 hover:text-background transition-colors duration-300">
                  Twitter
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-background/40">
            © {new Date().getFullYear()} {content.footer.copyright}
          </p>
          <p className="font-sans text-sm text-background/40">
            {content.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
