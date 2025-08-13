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
    <div className="github-card">
      <h3 className="text-base font-semibold mb-4 text-primary">Achievements & Activity</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="text-center p-2 bg-accent rounded border border-border"
          >
            <div className="text-lg font-bold text-primary">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Achievements;