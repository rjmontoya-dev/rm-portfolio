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
    <section className="fade-in-up">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Projects</h2>
        <p className="text-sm text-muted-foreground text-left">
          Key projects showcasing my experience in full-stack development and system integration
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="github-card hover:scale-[1.01] transition-all duration-300 fade-in-up"
          >
            <div className="flex flex-col gap-3">
              {/* Project Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-base font-semibold text-left">{project.title}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-secondary ${getTypeColor(project.type)}`}>
                    {project.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{project.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{project.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-xs mb-3 leading-relaxed text-left">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-3">
                  <h4 className="font-semibold text-primary text-xs mb-2 text-left">Key Highlights:</h4>
                  <ul className="grid gap-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-left">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-semibold text-primary text-xs mb-2 text-left">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-accent rounded text-xs font-medium border border-border"
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
    </section>
  );
};

export default Projects;