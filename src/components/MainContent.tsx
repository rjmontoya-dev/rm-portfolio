import Projects from './Projects';
import Contact from './Contact';

const MainContent = () => {
  return (
    <div className="space-y-12">
      {/* Projects Section */}
      <Projects />

      {/* Professional Timeline */}
      <section className="fade-in-up">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Professional Timeline</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                2024
              </div>
              <div className="flex-1 github-card">
                <h4 className="text-base font-semibold mb-2">Backend Developer - Praxxys Solutions, Inc.</h4>
                <p className="text-muted-foreground text-sm">
                  Leading full-stack web application development for e-commerce, CRM, and business systems.
                  Specialized in Laravel, Vue.js, and system integrations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold border-2 border-border">
                2023
              </div>
              <div className="flex-1 github-card">
                <h4 className="text-base font-semibold mb-2">Computer Programmer - Mindoro State University</h4>
                <p className="text-muted-foreground text-sm">
                  Developed real-time weather monitoring platform with IoT integration.
                  Built analytics dashboards and implemented Arduino-based data collection systems.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold border-2 border-border">
                2022
              </div>
              <div className="flex-1 github-card">
                <h4 className="text-base font-semibold mb-2">Graduated - Bachelor of Information Technology</h4>
                <p className="text-muted-foreground text-sm">
                  Completed degree at Mindoro State University with focus on web development and software engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default MainContent;