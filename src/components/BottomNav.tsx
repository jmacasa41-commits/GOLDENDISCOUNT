import { Home, Heart, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", to: "/home" },
  { icon: Heart, label: "Saved", to: "/saved" },
  { icon: MapPin, label: "Nearby", to: "/nearby" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-lg z-50">
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to ||
            (item.to === "/home" && location.pathname.startsWith("/category"));

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-colors touch-target ${isActive
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              <item.icon className="w-8 h-8" strokeWidth={2} />
              <span className="text-base font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
