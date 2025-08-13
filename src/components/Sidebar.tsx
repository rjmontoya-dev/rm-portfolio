import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';
import Skills from './Skills';
import Achievements from './Achievements';

const Sidebar = () => {
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
      href: "https://github.com/rjmontoya-dev",
      color: "hover:text-foreground"
    },
    {
      icon: Linkedin,
      label: "LinkedIn", 
      href: "https://linkedin.com/in/roger-montoya-jr-44150b2a9",
      color: "hover:text-github-blue"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="github-card text-center">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary glow-effect mb-4">
          <img 
            src={profilePhoto} 
            alt="Roger Montoya Jr."
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold mb-1">Roger A. Montoya Jr.</h1>
        <h2 className="text-base text-primary mb-4">Web Developer</h2>
      </div>

      {/* Contact Information */}
      <div className="github-card">
        <h3 className="text-base font-semibold mb-4 text-primary">Contact</h3>
        <div className="space-y-3">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="text-primary mt-0.5">
                <info.icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">{info.label}</div>
                {info.href ? (
                  <a 
                    href={info.href}
                    className="text-sm text-foreground hover:text-primary transition-colors break-all"
                  >
                    {info.value}
                  </a>
                ) : (
                  <div className="text-sm text-foreground">{info.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="github-card">
        <h3 className="text-base font-semibold mb-4 text-primary">Education & Certifications</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Bachelor of Information Technology</h4>
            <p className="text-xs text-muted-foreground">Mindoro State University</p>
            <p className="text-xs text-muted-foreground">2018 - 2022</p>
          </div>
          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-medium">TESDA NC III, Java Programming</h4>
              <p className="text-xs text-muted-foreground">March 2023</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Civil Service Eligibility (HGE)</h4>
              <p className="text-xs text-muted-foreground">Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <Skills />

      {/* Achievements Section */}
      <Achievements />

      {/* Social Links */}
      <div className="github-card">
        <h3 className="text-base font-semibold mb-4 text-primary">Social</h3>
        <div className="space-y-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 transition-colors ${social.color}`}
            >
              <social.icon size={16} />
              <span className="text-sm">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;