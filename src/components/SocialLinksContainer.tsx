import SocialLink from "./SocialLink";
import { useSiteContent } from "@/hooks/useSiteContent";

const SocialLinksContainer = () => {
  const { content } = useSiteContent();
  const visibleLinks = content.sidebarSocialLinks.filter(link => link.visible);

  return (
    <div 
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 md:gap-16 z-40"
    >
      {visibleLinks.map((link, index) => (
        <div 
          key={link.label} 
          className="opacity-0 animate-slide-in-right" 
          style={{ animationDelay: `${0.9 + index * 0.2}s` }}
        >
          <SocialLink label={link.label} href={link.href} />
        </div>
      ))}
    </div>
  );
};

export default SocialLinksContainer;
