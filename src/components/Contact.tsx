import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rjmontoya.025@gmail.com",
      href: "mailto:rjmontoya.025@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+63 956 478 3553",
      href: "tel:+639564783553"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Oriental Mindoro, Philippines",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/rjmontoya-dev",
      href: "https://github.com/rjmontoya-dev",
      color: "hover:text-foreground"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/roger-montoya-jr",
      href: "https://linkedin.com/in/roger-montoya-jr-44150b2a9",
      color: "hover:text-github-blue"
    },
    {
      icon: MessageSquare,
      label: "Available for",
      value: "Freelance & Full-time opportunities",
      href: null,
      color: "text-github-green"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can work together to build something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="github-card fade-in-up">
              <h3 className="text-xl font-semibold mb-6 text-primary">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-primary mt-1">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">{info.label}</div>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-foreground">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="github-card mt-6 fade-in-up animation-delay-200">
              <h3 className="text-xl font-semibold mb-6 text-primary">Connect With Me</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-1 ${social.color}`}>
                      <social.icon size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">{social.label}</div>
                      {social.href ? (
                        <a 
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`transition-colors ${social.color || 'text-foreground hover:text-primary'}`}
                        >
                          {social.value}
                        </a>
                      ) : (
                        <div className={social.color || 'text-foreground'}>{social.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="github-card fade-in-up animation-delay-400">
              <h3 className="text-xl font-semibold mb-6 text-primary">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  className="github-button-primary h-12 px-8 w-full md:w-auto"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in-up">
          <div className="github-card">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Ready to Work Together?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and collaborate on innovative projects. 
              Whether you need a full-stack developer, system integration expert, or just want to discuss 
              an idea, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:rjmontoya.025@gmail.com"
                className="github-button-primary h-12 px-8"
              >
                <Mail size={20} className="mr-2" />
                Email Me Directly
              </a>
              <a
                href="https://linkedin.com/in/roger-montoya-jr-44150b2a9"
                target="_blank"
                rel="noopener noreferrer"
                className="github-button-secondary h-12 px-8"
              >
                <Linkedin size={20} className="mr-2" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;