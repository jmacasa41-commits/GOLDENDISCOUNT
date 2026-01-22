import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
}

export function PageHeader({ title, showBack = true }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center gap-4 px-4 py-5 bg-card border-b-2 border-border sticky top-0 z-40">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="touch-target flex items-center justify-center rounded-xl hover:bg-muted transition-colors -ml-2"
          aria-label="Go back"
        >
          <ArrowLeft className="w-8 h-8 text-foreground" />
        </button>
      )}
      <h1 className="text-senior-2xl font-bold text-foreground">{title}</h1>
    </header>
  );
}
