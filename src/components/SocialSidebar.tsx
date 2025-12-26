import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const SocialSidebar = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
    { icon: FileText, href: '#', label: 'Resume' },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
      <div className="w-px h-16 bg-border mx-auto" />
      {socialLinks.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 animate-fade-in opacity-0"
          style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'forwards' }}
          aria-label={link.label}
        >
          <link.icon className="w-5 h-5" />
        </a>
      ))}
      <div className="w-px h-16 bg-border mx-auto" />
    </div>
  );
};

export default SocialSidebar;
