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
      className="group relative bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col items-center gap-5 transition-all duration-300 hover:border-primary/50 hover:shadow-xl active:scale-95 min-h-[180px]"
    >
      <div
        className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
        style={{
          background: color || 'hsl(var(--primary))',
          boxShadow: `0 12px 35px -8px ${color || 'hsl(var(--primary))'}88`
        }}
      >
        <Icon className="w-12 h-12 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-senior-lg font-black text-slate-800 text-center leading-tight group-hover:text-primary transition-colors">
        {title}
      </span>

      {/* Decorative Accent */}
      <div className="absolute inset-x-8 bottom-0 h-1 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
