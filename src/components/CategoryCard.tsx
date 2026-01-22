import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  to: string;
  color?: string;
}

export function CategoryCard({ title, icon: Icon, to, color }: CategoryCardProps) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center gap-3 p-6 bg-card border-2 border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary transition-all duration-200 touch-target min-h-[140px] active:scale-[0.98]"
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: color || 'hsl(var(--primary))' }}
      >
        <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-senior-lg font-semibold text-foreground text-center">
        {title}
      </span>
    </Link>
  );
}
