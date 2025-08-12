import { Code, Database, Globe, Settings } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: Code,
      skills: [
        "Laravel (v7-12)",
        "PHP",
        "JavaScript",
        "TypeScript",
        "Vue.js (v3)",
        "Nuxt.js",
        "Inertia.js",
        "Tailwind CSS"
      ]
    },
    {
      title: "Databases & APIs",
      icon: Database,
      skills: [
        "MySQL",
        "SQLite",
        "Firebase Realtime DB",
        "RESTful APIs",
        "Database Design",
        "Query Optimization"
      ]
    },
    {
      title: "Tools & Platforms",
      icon: Settings,
      skills: [
        "Git",
        "Vite",
        "Postman",
        "PWA Development",
        "Artisan CLI",
        "Docker"
      ]
    },
    {
      title: "Integrations",
      icon: Globe,
      skills: [
        "Xero API",
        "SAP ERP",
        "Manatal API",
        "Sprout API",
        "Meilisearch",
        "Typesense"
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
    <div className="github-card">
      <h3 className="text-base font-semibold mb-4 text-primary">Technical Skills</h3>
      <div className="space-y-4">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-primary">
                <category.icon size={16} />
              </div>
              <h4 className="text-sm font-medium">{category.title}</h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-accent rounded text-xs font-medium border border-border hover:bg-secondary/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;