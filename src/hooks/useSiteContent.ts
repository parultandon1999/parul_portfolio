import { useState, useEffect, useCallback } from "react";
import { getSiteContent, saveSiteContent, SiteContent } from "@/data/siteContent";

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(getSiteContent);

  useEffect(() => {
    const handleStorageChange = () => {
      setContent(getSiteContent());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("siteContentUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("siteContentUpdated", handleStorageChange);
    };
  }, []);

  const updateContent = useCallback((newContent: SiteContent) => {
    saveSiteContent(newContent);
    setContent(newContent);
    window.dispatchEvent(new Event("siteContentUpdated"));
  }, []);

  return { content, updateContent };
};
