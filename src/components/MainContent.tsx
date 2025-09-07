import Projects from './Projects';
import Contact from './Contact';

const MainContent = () => {
  return (
    <div className="space-y-8">
      {/* Projects Section */}
      <Projects />

      {/* Featured Websites */}
      <section className="fade-in-up">
        <h2 className="text-xl font-semibold mb-6 text-primary">Featured Websites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              project: "zoomin IT Services",
              description: "IT services that support IT needs",
              project_link: "https://zoominservices.tech/"
            },
            {
              project: "univers",
              description: "Ecommerce Website",
              project_link: "https://univers.ph/"
            },
            {
              project: "nature spring",
              description: "Informative website",
              project_link: "https://naturespring.com.ph/"
            }
          ].map((website, index) => (
            <div
              key={index}
              className="github-card hover:scale-[1.02] transition-all duration-300 fade-in-up"
            >
              <div className="flex flex-col gap-3 h-full">
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-2 text-primary">{website.project}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {website.description}
                  </p>
                </div>
                <a
                  href={website.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-primary-foreground text-sm font-medium py-2 px-4 rounded-md hover:bg-primary/90 transition-colors text-center"
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="fade-in-up">
        <h2 className="text-xl font-semibold mb-6 text-primary">Professional Timeline</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border -z-10"></div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold relative z-10">
                2024
              </div>
              <div className="flex-1 github-card">
                <h4 className="text-sm font-semibold mb-2 text-left">Backend Developer - Praxxys Solutions, Inc.</h4>
                <p className="text-muted-foreground text-xs text-left">
                  Leading full-stack web application development for e-commerce, CRM, and business systems.
                  Specialized in Laravel, Vue.js, and system integrations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold border-2 border-border relative z-10">
                2023
              </div>
              <div className="flex-1 github-card">
                <h4 className="text-sm font-semibold mb-2 text-left">Computer Programmer - Mindoro State University</h4>
                <p className="text-muted-foreground text-xs text-left">
                  Developed real-time weather monitoring platform with IoT integration.
                  Built analytics dashboards and implemented Arduino-based data collection systems.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold border-2 border-border relative z-10">
                2022
              </div>
              <div className="flex-1 github-card">
                <h4 className="text-sm font-semibold mb-2 text-left">Graduated - Bachelor of Information Technology</h4>
                <p className="text-muted-foreground text-xs text-left">
                  Completed degree at Mindoro State University with focus on web development and software engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <Contact /> */}
    </div>
  );
};

export default MainContent;