import { useState } from "react";
import { Send, AlertCircle } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] && value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <p className="font-sans text-lg text-foreground">Thanks for your message!</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-transparent border-b py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-300 ${
              errors.name ? "border-destructive" : "border-border focus:border-foreground"
            }`}
          />
          {errors.name && (
            <p className="flex items-center gap-1.5 mt-2 text-destructive text-xs font-sans">
              <AlertCircle size={12} /> Please fill this field
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-transparent border-b py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-300 ${
              errors.email ? "border-destructive" : "border-border focus:border-foreground"
            }`}
          />
          {errors.email && (
            <p className="flex items-center gap-1.5 mt-2 text-destructive text-xs font-sans">
              <AlertCircle size={12} /> Please fill this field
            </p>
          )}
        </div>
      </div>
      <input
        type="tel"
        name="phone"
        placeholder="Phone (optional)"
        value={formData.phone}
        onChange={handleChange}
        className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
      />
      <div>
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className={`w-full bg-transparent border-b py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-300 resize-none ${
            errors.message ? "border-destructive" : "border-border focus:border-foreground"
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
        className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors duration-300 group"
      >
        Send
        <Send size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </form>
  );
};

export default ContactForm;