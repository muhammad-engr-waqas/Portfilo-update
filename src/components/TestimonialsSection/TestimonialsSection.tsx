import { motion } from "framer-motion";
import { User } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Tariq Cheema",
      role: "Director, Cheema Dairy Network",
      content: "Waqas built our milk collection and distribution platform from scratch. His backend architecture and PWA make tracking dairy operations seamless and error-free across all distribution points.",
      icon: User,
      color: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30",
    },
    {
      name: "Dr. Imran Hussain",
      role: "Operations Head, Pro-Pakistan HMS",
      content: "Waqas single-handedly handled the hospital management system's backend, security, and live deployment. The role-based permissions and system stability have exceeded our expectations.",
      icon: User,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      name: "Kamran Siddiqui",
      role: "Managing Director, Whole Cure Tech",
      content: "An exceptional backend developer and team lead. Waqas implemented our complex HRM with RBAC, attendance, and payroll flawlessly, always ensuring API security and clean maintainable code.",
      icon: User,
      color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
    }
  ];

  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Client <span className="text-gradient-primary">Testimonials</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Feedback from talented leaders I've had the pleasure of partnering with throughout my career.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, i) => {
          const Icon = test.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-panel p-8 rounded-3xl border border-foreground/10 flex flex-col relative overflow-hidden group hover:border-primary/30 transition-colors duration-500"
            >
              {/* Subtle glow orb */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
              
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-8 text-primary/10 select-none">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 11l-2 2v-3H4V4h6v7zm10 0l-2 2v-3h-4V4h6v7z" />
                </svg>
              </div>

              <p className="text-muted-foreground leading-relaxed flex-grow relative z-10 italic mb-8">
                "{test.content}"
              </p>

              <div className="flex items-center gap-4 relative z-10 mt-auto">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${test.color} border flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-sm">{test.name}</h4>
                  <p className="text-primary text-xs font-medium">{test.role}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TestimonialsSection;
