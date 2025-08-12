import { Code, Database, Zap, Users } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Experienced in both frontend and backend technologies with Laravel, Vue.js, and modern web frameworks."
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Skilled in MySQL, SQLite, and Firebase with focus on optimization and efficient query design."
    },
    {
      icon: Zap,
      title: "System Integration",
      description: "Expert in API development and third-party integrations including Xero, SAP, and various business systems."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Strong experience working in agile environments and delivering solutions that meet project goals."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A dedicated developer passionate about creating efficient, scalable solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Professional Summary */}
          <div className="fade-in-up">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Professional Summary</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Web developer with over 2 years of experience building and maintaining web 
                applications for e-commerce, CRM, and business systems. I specialize in 
                backend development using Laravel (PHP) and modern frontend frameworks 
                like Vue.js and Nuxt.js.
              </p>
              <p>
                Throughout my career, I've been involved in developing complex systems 
                including multi-mode case management platforms, real-time weather monitoring 
                systems, and centralized maintenance management solutions.
              </p>
              <p>
                I'm passionate about system integrations, improving user experience, and 
                delivering practical solutions that meet business objectives. I stay 
                current with modern development practices and enjoy tackling challenging 
                technical problems.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className={`github-card hover:scale-105 transition-transform duration-300 fade-in-up animation-delay-${(index + 1) * 200}`}
              >
                <div className="text-primary mb-4">
                  <highlight.icon size={32} />
                </div>
                <h4 className="text-lg font-semibold mb-2">{highlight.title}</h4>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="github-card fade-in-up">
            <h3 className="text-xl font-semibold mb-4 text-primary">Education</h3>
            <div className="space-y-2">
              <h4 className="font-medium">Bachelor of Information Technology</h4>
              <p className="text-muted-foreground">Mindoro State University</p>
              <p className="text-sm text-muted-foreground">2018 - 2022</p>
            </div>
          </div>

          <div className="github-card fade-in-up animation-delay-200">
            <h3 className="text-xl font-semibold mb-4 text-primary">Certifications</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">TESDA NC III, Java Programming</h4>
                <p className="text-sm text-muted-foreground">March 2023</p>
              </div>
              <div>
                <h4 className="font-medium">Civil Service Eligibility (HGE)</h4>
                <p className="text-sm text-muted-foreground">Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;