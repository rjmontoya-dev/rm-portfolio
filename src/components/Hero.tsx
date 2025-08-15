import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center fade-in-up">
        {/* Profile Image */}
        <div className="mb-8 floating-animation">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary glow-effect">
            <img 
              src={profilePhoto} 
              alt="Roger Montoya Jr."
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="fade-in-up animation-delay-200">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Roger A. Montoya Jr.
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary mb-6">
            Web Developer
          </h2>
        </div>

        {/* Bio */}
        <div className="fade-in-up animation-delay-400">
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Passionate web developer with over 2 years of experience building and maintaining 
            web applications for e-commerce, CRM, and business systems. Specializing in backend 
            development with modern frameworks and delivering solutions that meet project goals.
          </p>
        </div>

        {/* Contact Info */}
        <div className="fade-in-up animation-delay-600">
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Oriental Mindoro, Philippines</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+63 956 478 3553</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>rjmontoya.025@gmail.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/rjmontoya-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="github-button-primary h-12 px-6"
            >
              <Github size={20} className="mr-2" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/roger-montoya-jr-44150b2a9"
              target="_blank"
              rel="noopener noreferrer"
              className="github-button-secondary h-12 px-6"
            >
              <Linkedin size={20} className="mr-2" />
              LinkedIn
            </a>
            <a
              href="mailto:rjmontoya.025@gmail.com"
              className="github-button-secondary h-12 px-6"
            >
              <Mail size={20} className="mr-2" />
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;