import TopNav from "@/components/TopNav";
import SocialLinksContainer from "@/components/SocialLinksContainer";
import Footer from "@/components/Footer";
import { Mail, MapPin, Send, Clock, Briefcase, AlertCircle } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    setSubmitted(true);
    setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] && value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <main className="min-h-screen bg-background relative">
      <TopNav />

      <div className="w-full pl-6 pr-16 md:px-16 lg:px-24 xl:px-32 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16 md:mb-24 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
            Get In Touch
          </span>
          <h1 className="font-sans text-5xl md:text-6xl lg:text-8xl font-black text-hero leading-none tracking-tight mb-6">
            Let's talk
            <span className="text-accent-blue">.</span>
          </h1>
          <p className="font-sans text-lg text-body max-w-lg">
            Have a data challenge or machine learning project in mind? I'd love to hear about it.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 max-w-6xl">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-accent-blue mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-1">
                  Email
                </h3>
                <a
                  href="mailto:hello@kaan.data"
                  className="font-sans text-base text-foreground hover:text-accent-blue transition-colors duration-300"
                >
                  hello@kaan.data
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-accent-blue mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-1">
                  Location
                </h3>
                <p className="font-sans text-base text-foreground">
                  Paris, France
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-accent-blue mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-1">
                  Response Time
                </h3>
                <p className="font-sans text-base text-foreground">
                  Within 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Briefcase className="w-5 h-5 text-accent-blue mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-1">
                  Availability
                </h3>
                <p className="font-sans text-base text-foreground">
                  Open for projects
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="font-sans text-sm text-body leading-relaxed">
                I'm currently open to freelance data science projects and full-time ML/AI opportunities. 
                Whether you need predictive models, data pipelines, or AI solutions, 
                let's transform your data into insights together.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {submitted ? (
              <div className="py-12 text-center border border-border">
                <p className="font-sans text-xl text-foreground mb-2">Thanks for your message!</p>
                <p className="font-sans text-sm text-muted-foreground mb-6">I'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full bg-transparent border-b-2 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-300 ${
                        errors.name ? "border-destructive" : "border-border focus:border-accent-blue"
                      }`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1.5 mt-2 text-destructive text-xs font-sans">
                        <AlertCircle size={12} /> Please fill this field
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full bg-transparent border-b-2 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-300 ${
                        errors.email ? "border-destructive" : "border-border focus:border-accent-blue"
                      }`}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1.5 mt-2 text-destructive text-xs font-sans">
                        <AlertCircle size={12} /> Please fill this field
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                      Company <span className="text-muted-foreground/50">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="w-full bg-transparent border-b-2 border-border py-3 font-sans text-foreground placeholder:text-muted-foreground focus:border-accent-blue focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                      Phone <span className="text-muted-foreground/50">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 890"
                      className="w-full bg-transparent border-b-2 border-border py-3 font-sans text-foreground placeholder:text-muted-foreground focus:border-accent-blue focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={`w-full bg-transparent border-b-2 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-300 ${
                      errors.subject ? "border-destructive" : "border-border focus:border-accent-blue"
                    }`}
                  />
                  {errors.subject && (
                    <p className="flex items-center gap-1.5 mt-2 text-destructive text-xs font-sans">
                      <AlertCircle size={12} /> Please fill this field
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, budget..."
                    className={`w-full bg-transparent border-b-2 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-300 resize-none ${
                      errors.message ? "border-destructive" : "border-border focus:border-accent-blue"
                    }`}
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1.5 mt-2 text-destructive text-xs font-sans">
                      <AlertCircle size={12} /> Please fill this field
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-blue transition-colors duration-300"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <SocialLinksContainer />
      <Footer />
    </main>
  );
};

export default Contact;
