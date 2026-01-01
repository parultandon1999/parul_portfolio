import { useState, useEffect } from "react";
import { projects as defaultProjects, Project } from "@/data/projects";

const PROJECTS_STORAGE_KEY = "projects_data";

export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return defaultProjects;
  
  const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((p: Project) => ({ 
        ...p, 
        images: p.images || [],
        mainImageIndex: p.mainImageIndex ?? 0
      }));
    } catch {
      return defaultProjects;
    }
  }
  return defaultProjects;
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(getProjects);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getProjects());
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("projectsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("projectsUpdated", handleUpdate);
    };
  }, []);

  return projects;
};
