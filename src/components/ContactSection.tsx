import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
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

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            <span className="text-muted-foreground">#</span>contact
          </h2>
          <div className="w-24 sm:w-32 md:w-48 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <p className="text-muted-foreground font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
              I'm always interested in hearing about new opportunities, 
              collaborations, or just having a chat about data science and AI.
            </p>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-muted-foreground">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-secondary border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-foreground" />
                </div>
                <span className="font-mono text-xs sm:text-sm md:text-base break-all">hello@example.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-muted-foreground">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-secondary border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-foreground" />
                </div>
                <span className="font-mono text-xs sm:text-sm md:text-base">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 md:p-8 card-shadow">
              <h3 className="text-base sm:text-lg md:text-xl font-mono font-semibold mb-4 sm:mb-6 text-foreground">
                &lt;Message /&gt;
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-mono text-muted-foreground mb-1.5 sm:mb-2 block">
                    _name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-secondary border border-border rounded-md px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 font-sans text-xs sm:text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <label className="text-xs sm:text-sm font-mono text-muted-foreground block">
                      _email
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full bg-secondary border rounded-md px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 font-sans text-xs sm:text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                      emailError ? 'border-red-500 focus:border-red-600' : 'border-border focus:border-foreground'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-mono text-muted-foreground mb-1.5 sm:mb-2 block">
                    _message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-md px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 font-sans text-xs sm:text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-2 sm:p-3 bg-green-500/10 border border-green-500/30 rounded text-green-600 text-xs sm:text-sm">
                    ✓ Message sent successfully!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-2 sm:p-3 bg-red-500/10 border border-red-500/30 rounded text-red-600 text-xs sm:text-sm">
                    ✗ Error sending message. Please try again.
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg" 
                  disabled={isSubmitting || (remainingAttempts !== null && remainingAttempts <= 0) || !!emailError}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
