import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Layers, Globe } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "June 2026 – Present",
      title: "Backend Developer & Team Lead (PWA Projects)",
      subtitle: "Coded Clouds, Lahore",
      description:
        "Served as Team Lead and Backend/PWA Developer for platforms including Cheema Milk Collection, Pro-Pakistan Website, and Pro-Pakistan HMS. Designed and developed backend architecture, RESTful APIs, and MongoDB schemas; independently managed full deployment lifecycle, hosting setup, and custom domain integration.",
      icon: <Globe className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "April 2026 – Present",
      title: "Backend Developer (Remote)",
      subtitle: "Whole Cure Tech",
      description:
        "Implemented role-based access control (RBAC) for multiple roles (CEO, HR, Manager, Employee). Built scalable RESTful APIs following MVC architecture, designed complex MongoDB schemas, and delivered HRM modules covering employee management, attendance, payroll, leave, and task tracking with JWT security.",
      icon: <Layers className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "Dec 2024 – June 2025",
      title: "Backend Developer",
      subtitle: "Convert Generation Technology, Faisalabad",
      description:
        "Developed scalable e-commerce backends for product, cart, and order management with payment gateway workflows. Implemented secure JWT-based authentication flows and built API structures supporting an AI-based data processing system with Cloudinary file integration.",
      icon: <Briefcase className="h-4 w-4 mr-2 text-primary" />,
    },
  ];

  return (
    <div id="career">
      <ScrollTimeline
        events={careerEvents}
        title="Career Journey"
        subtitle="An evolving path of leadership, innovation, and impact"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
