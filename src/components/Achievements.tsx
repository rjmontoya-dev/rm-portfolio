import { Award, TrendingUp, Users, Zap, Calendar, Target } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      icon: Target,
      title: "System Integration Expert",
      description: "Successfully integrated multiple third-party APIs (Xero, SAP, Manatal, Sprout) reducing data duplication by 40%",
      year: "2024",
      category: "Technical Achievement"
    },
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Improved application performance and user experience through database optimization and efficient query design",
      year: "2024",
      category: "Performance"
    },
    {
      icon: Users,
      title: "Multi-Platform Development",
      description: "Built comprehensive case management platform with offline support for field teams using PWA technology",
      year: "2024",
      category: "Innovation"
    },
    {
      icon: Zap,
      title: "Real-Time Systems",
      description: "Developed IoT-integrated weather monitoring platform with live data from Arduino-based stations",
      year: "2023",
      category: "IoT Development"
    },
    {
      icon: Award,
      title: "TESDA NC III Certification",
      description: "Certified in Java Programming demonstrating proficiency in enterprise application development",
      year: "2023",
      category: "Certification"
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Led development team in creating centralized maintenance and facilities management system",
      year: "2024",
      category: "Leadership"
    }
  ];

  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies Mastered", value: "15+" },
    { label: "APIs Integrated", value: "8+" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical Achievement': return 'bg-github-green/20 text-github-green border-github-green/30';
      case 'Performance': return 'bg-github-blue/20 text-github-blue border-github-blue/30';
      case 'Innovation': return 'bg-github-purple/20 text-github-purple border-github-purple/30';
      case 'IoT Development': return 'bg-github-orange/20 text-github-orange border-github-orange/30';
      case 'Certification': return 'bg-primary/20 text-primary border-primary/30';
      case 'Leadership': return 'bg-accent text-accent-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Generate contribution-like activity data
  const generateActivityData = () => {
    const weeks = 52;
    const data = [];
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < 7; day++) {
        const intensity = Math.floor(Math.random() * 4);
        data.push(intensity);
      }
    }
    return data;
  };

  const activityData = generateActivityData();

  const getActivityColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-muted';
      case 1: return 'bg-primary/30';
      case 2: return 'bg-primary/60';
      case 3: return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Achievements & Activity</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Key milestones and contributions throughout my development journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`github-card text-center hover:scale-105 transition-transform duration-300 fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>


        {/* Professional Timeline */}
        <div className="mt-16 fade-in-up">
          <h3 className="text-2xl font-semibold mb-8 text-center text-primary">Professional Timeline</h3>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  2024
                </div>
                <div className="flex-1 github-card">
                  <h4 className="text-lg font-semibold mb-2">Backend Developer - Praxxys Solutions, Inc.</h4>
                  <p className="text-muted-foreground text-sm">
                    Leading full-stack web application development for e-commerce, CRM, and business systems.
                    Specialized in Laravel, Vue.js, and system integrations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold border-2 border-border">
                  2023
                </div>
                <div className="flex-1 github-card">
                  <h4 className="text-lg font-semibold mb-2">Computer Programmer - Mindoro State University</h4>
                  <p className="text-muted-foreground text-sm">
                    Developed real-time weather monitoring platform with IoT integration.
                    Built analytics dashboards and implemented Arduino-based data collection systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold border-2 border-border">
                  2022
                </div>
                <div className="flex-1 github-card">
                  <h4 className="text-lg font-semibold mb-2">Graduated - Bachelor of Information Technology</h4>
                  <p className="text-muted-foreground text-sm">
                    Completed degree at Mindoro State University with focus on web development and software engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;