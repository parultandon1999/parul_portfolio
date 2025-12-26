import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ProjectsProvider } from "./context/ProjectsContext";
import { SkillsProvider } from "./context/SkillsContext";
import { AboutProvider } from "./context/AboutContext";
import { ContentProvider } from "./context/ContentContext";
import { SettingsProvider } from "./context/SettingsContext";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDemo from "./pages/ProjectDemo";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminProjects from "./pages/AdminProjects";
import AdminSkills from "./pages/AdminSkills";
import AdminAbout from "./pages/AdminAbout";
import AdminContent from "./pages/AdminContent";
import { ScrollProgressIndicator } from "./components/ScrollProgressIndicator";
import { GoToTopButton } from "./components/GoToTopButton";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProjectsProvider>
        <SkillsProvider>
          <AboutProvider>
            <ContentProvider>
              <SettingsProvider>
                <ScrollProgressIndicator />
                <GoToTopButton />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:projectId" element={<ProjectDemo />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/projects" element={<AdminProjects />} />
                  <Route path="/admin/skills" element={<AdminSkills />} />
                  <Route path="/admin/about" element={<AdminAbout />} />
                  <Route path="/admin/content" element={<AdminContent />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SettingsProvider>
            </ContentProvider>
          </AboutProvider>
        </SkillsProvider>
      </ProjectsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
