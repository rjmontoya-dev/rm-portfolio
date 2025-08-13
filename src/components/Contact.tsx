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