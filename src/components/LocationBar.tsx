import { MapPin, ChevronDown } from "lucide-react";

interface LocationBarProps {
  location: string;
  onChangeLocation?: () => void;
}

export function LocationBar({ location, onChangeLocation }: LocationBarProps) {
  return (
    <button
      onClick={onChangeLocation}
      className="flex items-center gap-2 px-4 py-3 bg-muted rounded-xl w-full hover:bg-muted/80 transition-colors"
    >
      <MapPin className="w-6 h-6 text-primary" />
      <span className="text-senior-base font-medium text-foreground flex-1 text-left">
        {location}
      </span>
      <ChevronDown className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
