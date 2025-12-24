import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface TherapyCardProps {
  title: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

const TherapyCard = ({ title, icon: Icon, href, delay = 0 }: TherapyCardProps) => {
  return (
    <Link
      to={href}
      className="group block"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-2">
        {/* Icon Container */}
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={1.5} />
        </div>
        
        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl text-center text-card-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        {/* Hover Gradient Border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-sm" />
        </div>
      </div>
    </Link>
  );
};

export default TherapyCard;
