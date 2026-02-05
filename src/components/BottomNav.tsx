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
    <nav className="fixed bottom-0 left-0 right-0 glass-nav z-50 rounded-t-[2.5rem] px-4 pb-4 pt-2">
      <div className="flex items-center justify-around max-w-md mx-auto relative h-20">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to ||
            (item.to === "/home" && location.pathname.startsWith("/category"));

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 relative touch-target ${isActive
                ? "text-primary"
                : "text-slate-700 hover:text-primary"
                }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-sm animate-pulse" />
              )}
              <item.icon
                className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                strokeWidth={isActive ? 3 : 2}
              />
              <span className="text-sm uppercase font-black tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
