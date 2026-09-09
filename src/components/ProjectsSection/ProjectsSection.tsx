import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Cheema Milk Collection & Distribution",
      subtitle: "Team Lead & Backend/PWA Developer for complete dairy logistics with Node.js, Express, MongoDB & PWA.",
      link: "https://cheemamilkcollection.com",
      displayUrl: "cheemamilkcollection.com",
      image: "/Cheema.png",
      tags: ["Node.js", "Express.js", "MongoDB", "PWA", "Team Lead"],
    },
    {
      id: 2,
      title: "Pro-Pakistan HMS",
      subtitle: "End-to-end Hospital Management System with custom domain setup, hosting & production deployment.",
      link: "https://codedcloudshms.com",
      displayUrl: "codedcloudshms.com",
      image: "/pro hms.png",
      tags: ["Node.js", "Express.js", "MongoDB", "RBAC", "Production"],
    },
    {
      id: 3,
      title: "Human Resource Management (HRM)",
      subtitle: "Enterprise HRM with RBAC, attendance, payroll, leave, task tracking & secure JWT authentication.",
      link: "https://engrmwaqas.online",
      displayUrl: "engrmwaqas.online/hrm",
      image: "/hrm.png",
      tags: ["Node.js", "Express.js", "MongoDB", "JWT Auth", "Cloudinary"],
    },
    {
      id: 4,
      title: "Pro-Pakistan Web Platform",
      subtitle: "Full-featured Progressive Web App with independent hosting, deployment & custom domain config.",
      link: "https://pakistanrecoveryoasis.com",
      displayUrl: "pakistanrecoveryoasis.com",
      image: "/pro website.png",
      tags: ["PWA", "Node.js", "Express.js", "MongoDB", "Custom Domain"],
    },
  ];

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center md:text-left">
          Selected <span className="text-gradient-primary">Works</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-lg">
          Production grade systems Progressive Web Apps and scalable backend platforms I've engineered and deployed.
        </p>
      </motion.div>

      {/* Balanced 2-Column Grid for Perfect 16:9 Widescreen Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-card/70 backdrop-blur-xl shadow-xl flex flex-col justify-between h-full hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Top Browser / Window Frame Bar */}
            <div className="px-5 py-3.5 bg-muted/40 border-b border-border/50 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-muted-foreground/80 hidden sm:inline-block">
                  https://{project.displayUrl}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>

            {/* Image Viewport - 100% Full Display with Zero Cropping & Zero Extra Space */}
            <div className="w-full overflow-hidden bg-muted/10 border-b border-border/40">
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

            {/* Bottom Content Area */}
            <div className="p-6 md:p-7 flex flex-col flex-1 justify-between gap-4 bg-card/95">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {project.subtitle}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-muted/60 text-foreground/80 border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
