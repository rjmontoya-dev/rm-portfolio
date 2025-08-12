import { ExternalLink, Github, Calendar, MapPin } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Multi-Mode Case Management Platform",
      company: "Praxxys Solutions, Inc.",
      period: "Mar 2024 - June 2025",
      description: "Built a comprehensive case management platform for sensitive abuse cases with offline support for field teams. Created dashboards and reports with real-time data visualization.",
      techStack: ["Laravel", "Vue.js", "MySQL", "PWA", "NFC Scanning"],
      highlights: [
        "Offline-first architecture for field teams",
        "Real-time dashboards and reporting",
        "NFC scanning for asset tracking",
        "Sensitive data handling with security protocols"
      ],
      type: "Backend Development"
    },
    {
      title: "Centralized Maintenance & Facilities Management System",
      company: "Praxxys Solutions, Inc.",
      period: "Mar 2024 - June 2025",
      description: "Developed a unified operations platform integrating SAP ERP with PWA support for mobile teams. Connected multiple business systems including Xero, Manatal, and Sprout APIs.",
      techStack: ["Laravel", "SAP ERP", "PWA", "Xero API", "Manatal API"],
      highlights: [
        "SAP ERP integration for enterprise operations",
        "Multi-system API integrations",
        "Progressive Web App capabilities",
        "Reduced data duplication by 40%"
      ],
      type: "System Integration"
    },
    {
      title: "Real-Time Weather Monitoring Platform",
      company: "Mindoro State University",
      period: "Nov 2022 - Dec 2023",
      description: "Led development of a weather monitoring system using Laravel 7, Vue 2, and Firebase. Integrated Arduino-based weather stations to deliver live environmental data across remote locations.",
      techStack: ["Laravel 7", "Vue.js 2", "Firebase", "Arduino", "IoT"],
      highlights: [
        "Real-time data collection from IoT devices",
        "Analytics dashboards for environmental data",
        "Remote monitoring capabilities",
        "Cross-platform mobile compatibility"
      ],
      type: "IoT Development"
    },
    {
      title: "Content Management System",
      company: "Praxxys Solutions, Inc.",
      period: "Mar 2024 - June 2025",
      description: "Created a content management system for a consumer brand enabling non-technical staff to easily manage website content and increase digital engagement.",
      techStack: ["Laravel", "Vue.js", "MySQL", "CMS"],
      highlights: [
        "User-friendly interface for non-technical users",
        "Dynamic content management",
        "SEO optimization features",
        "Increased digital engagement metrics"
      ],
      type: "Web Development"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Backend Development': return 'text-github-green';
      case 'System Integration': return 'text-github-blue';
      case 'IoT Development': return 'text-github-purple';
      case 'Web Development': return 'text-github-orange';
      default: return 'text-primary';
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Key projects showcasing my experience in full-stack development and system integration
          </p>
        </div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`github-card hover:scale-[1.02] transition-all duration-300 fade-in-up animation-delay-${(index + 1) * 200}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Project Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-xl lg:text-2xl font-semibold">{project.title}</h3>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full bg-secondary ${getTypeColor(project.type)}`}>
                      {project.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{project.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{project.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">Key Highlights:</h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-accent rounded-full text-sm font-medium border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-12 fade-in-up">
          <p className="text-muted-foreground mb-6">
            Want to see more of my work? Check out my GitHub profile for additional projects and contributions.
          </p>
          <a
            href="https://github.com/rjmontoya-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="github-button-primary h-12 px-8"
          >
            <Github size={20} className="mr-2" />
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;