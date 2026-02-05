import { MapPin, ChevronDown } from "lucide-react";

interface LocationBarProps {
  location: string;
  onChangeLocation?: () => void;
}

export function LocationBar({ location, onChangeLocation }: LocationBarProps) {
  return (
    <button
      onClick={onChangeLocation}
      className="flex items-center gap-4 px-6 py-5 bg-white/50 backdrop-blur-md rounded-2xl w-full hover:bg-white/80 transition-all duration-300 shadow-md border-2 border-primary/10 group min-h-[72px]"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
        <MapPin className="w-7 h-7 text-primary group-hover:text-white transition-colors" strokeWidth={2.5} />
      </div>
      <span className="text-senior-base font-black text-foreground flex-1 text-left">
        {location}
      </span>
      <ChevronDown className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
    </button>
  );
}
