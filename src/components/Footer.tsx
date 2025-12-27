import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 sm:py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
            <span className="text-muted-foreground">&lt;</span>
            <span className="text-foreground">DataScientist</span>
            <span className="text-muted-foreground">/&gt;</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
            <a href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
            <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground font-mono">
            © 2024 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
