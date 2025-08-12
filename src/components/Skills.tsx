import { Code, Database, Globe, Settings } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: Code,
      skills: [
        { name: "Laravel (v7-12)", level: 90 },
        { name: "PHP", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "TypeScript", level: 75 },
        { name: "Vue.js (v3)", level: 85 },
        { name: "Nuxt.js", level: 80 },
        { name: "Inertia.js", level: 85 },
        { name: "Tailwind CSS", level: 90 }
      ]
    },
    {
      title: "Databases & APIs",
      icon: Database,
      skills: [
        { name: "MySQL", level: 85 },
        { name: "SQLite", level: 80 },
        { name: "Firebase Realtime DB", level: 75 },
        { name: "RESTful APIs", level: 90 },
        { name: "Database Design", level: 85 },
        { name: "Query Optimization", level: 80 }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: Settings,
      skills: [
        { name: "Git", level: 85 },
        { name: "Vite", level: 80 },
        { name: "Postman", level: 85 },
        { name: "PWA Development", level: 75 },
        { name: "Artisan CLI", level: 90 },
        { name: "Docker", level: 70 }
      ]
    },
    {
      title: "Integrations",
      icon: Globe,
      skills: [
        { name: "Xero API", level: 80 },
        { name: "SAP ERP", level: 75 },
        { name: "Manatal API", level: 80 },
        { name: "Sprout API", level: 75 },
        { name: "Meilisearch", level: 70 },
        { name: "Typesense", level: 70 }
      ]
    }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 85) return 'from-github-green to-github-green/80';
    if (level >= 75) return 'from-github-blue to-github-blue/80';
    if (level >= 65) return 'from-github-purple to-github-purple/80';
    return 'from-github-orange to-github-orange/80';
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies and tools I use to build efficient, scalable web applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className={`github-card fade-in-up animation-delay-${(categoryIndex + 1) * 200}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-primary">
                  <category.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-accent rounded-full text-sm font-medium border border-border hover:bg-secondary/50 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 text-center fade-in-up">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Agile Development",
              "Version Control",
              "System Architecture",
              "Performance Optimization",
              "Security Best Practices",
              "Code Review",
              "Technical Documentation",
              "Problem Solving",
              "Team Collaboration",
              "Project Management"
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-accent rounded-full text-sm font-medium border border-border hover:bg-secondary/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;