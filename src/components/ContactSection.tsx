import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            <span className="text-muted-foreground">#</span>contact
          </h2>
          <div className="w-32 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-md">
              I'm always interested in hearing about new opportunities, 
              collaborations, or just having a chat about data science and AI.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-mono">hello@example.com</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-mono">San Francisco, CA</span>
              </div>
            </div>

            <Button variant="default" size="lg" className="group">
              Send a Message
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Contact form */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="bg-card border border-border rounded-lg p-8 card-shadow">
              <h3 className="text-xl font-mono font-semibold mb-6 text-foreground">
                &lt;Message /&gt;
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-mono text-muted-foreground mb-2 block">
                    _name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-mono text-muted-foreground mb-2 block">
                    _email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-mono text-muted-foreground mb-2 block">
                    _message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Submit
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
