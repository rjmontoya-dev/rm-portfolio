import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Roger Montoya Jr.</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-stack web developer passionate about creating efficient, scalable solutions 
              that drive business success. Based in the Philippines, working globally.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Skills', href: '#skills' },
                { label: 'Achievements', href: '#achievements' },
                { label: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Oriental Mindoro, Philippines</p>
              <p>
                <a 
                  href="mailto:rjmontoya.025@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  rjmontoya.025@gmail.com
                </a>
              </p>
              <p>
                <a 
                  href="tel:+639564783553"
                  className="hover:text-primary transition-colors"
                >
                  +63 956 478 3553
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <a
              href="https://github.com/rjmontoya-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/roger-montoya-jr-44150b2a9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-github-blue transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:rjmontoya.025@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email Contact"
            >
              <Mail size={20} />
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Roger Montoya Jr. Made with</span>
            <Heart size={16} className="text-github-green" />
            <span>using React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;