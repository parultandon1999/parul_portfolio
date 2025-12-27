import { useState } from 'react';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { ArrowLeft, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollDownIndicator from '@/components/ScrollDownIndicator';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [isCheckingLimit, setIsCheckingLimit] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle email field changes
    if (name === 'email') {
      if (!value) {
        // Clear everything if email is empty
        setRemainingAttempts(null);
        setEmailError(null);
      } else if (!validateEmailFormat(value)) {
        // Show error for invalid format
        setEmailError('Invalid email format');
        setRemainingAttempts(null);
      } else {
        // Valid format, check rate limit
        setEmailError(null);
        checkRateLimit(value);
      }
    }
  };

  const checkRateLimit = async (email: string) => {
    setIsCheckingLimit(true);
    try {
      const response = await fetch(`/api/check-rate-limit?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        setRemainingAttempts(data.remaining);
      }
    } catch (error) {
      console.error('Error checking rate limit:', error);
    } finally {
      setIsCheckingLimit(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setRemainingAttempts(null);
      setEmailError(null);
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      // Check rate limit again after failed attempt
      if (formData.email && validateEmailFormat(formData.email)) {
        checkRateLimit(formData.email);
      }
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'hello@example.com',
      href: 'mailto:hello@example.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      href: 'https://github.com',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      label: 'Twitter',
      href: 'https://twitter.com',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      href: 'mailto:hello@example.com',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header */}
        <section className="min-h-screen flex items-center justify-center py-24">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              <span className="text-muted-foreground">#</span>contact
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
              Let's connect and discuss how we can work together. I'm always open to new opportunities and collaborations.
            </p>
          </div>
        </section>
        <ScrollDownIndicator />

        {/* Contact Info Cards */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl font-bold mb-12 text-foreground">
              <span className="text-muted-foreground">#</span>get-in-touch
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="border border-border rounded-lg p-8 hover:border-foreground/50 transition-colors group"
                >
                  <div className="text-foreground mb-4 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{info.label}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {info.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl font-bold mb-12 text-foreground">
              <span className="text-muted-foreground">#</span>send-message
            </h2>
            <div className="max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="email" className="block text-sm font-mono text-muted-foreground">
                      Email *
                    </label>
                    {emailError && (
                      <span className="text-xs text-red-600 font-mono">
                        {emailError}
                      </span>
                    )}
                    {!emailError && isCheckingLimit && (
                      <span className="text-xs text-muted-foreground">Checking...</span>
                    )}
                    {!emailError && remainingAttempts !== null && !isCheckingLimit && (
                      <span className={`text-xs font-mono ${remainingAttempts > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {remainingAttempts > 0 
                          ? `${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} left` 
                          : 'Limit reached'}
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-secondary border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none transition-colors ${
                      emailError ? 'border-red-500 focus:border-red-600' : 'border-border focus:border-foreground'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-mono text-muted-foreground mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="What is this about?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 text-sm">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 text-sm">
                    ✗ Error sending message. Please try again.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || (remainingAttempts !== null && remainingAttempts <= 0) || !!emailError}
                  className="w-full px-6 py-3 bg-foreground text-background rounded-lg font-mono hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl font-bold mb-12 text-foreground">
              <span className="text-muted-foreground">#</span>connect-socially
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 border border-border rounded-lg hover:border-foreground/50 hover:bg-secondary transition-all group"
                >
                  <div className="text-foreground group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Response Time</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              I typically respond to messages within 24-48 hours. For urgent matters, feel free to reach out via email or phone.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="border border-border rounded-lg p-6">
                <div className="text-2xl font-bold text-foreground mb-2">24-48h</div>
                <div className="text-muted-foreground text-sm">Email Response</div>
              </div>
              <div className="border border-border rounded-lg p-6">
                <div className="text-2xl font-bold text-foreground mb-2">1-2h</div>
                <div className="text-muted-foreground text-sm">Phone Response</div>
              </div>
              <div className="border border-border rounded-lg p-6">
                <div className="text-2xl font-bold text-foreground mb-2">Real-time</div>
                <div className="text-muted-foreground text-sm">Social Media</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
