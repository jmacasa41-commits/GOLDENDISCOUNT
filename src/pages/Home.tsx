import { 
  UtensilsCrossed, 
  ShoppingCart, 
  Plane, 
  Theater, 
  Pill, 
  ShoppingBag 
} from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { LocationBar } from "@/components/LocationBar";
import { BottomNav } from "@/components/BottomNav";

const categories = [
  { 
    title: "Restaurants", 
    icon: UtensilsCrossed, 
    to: "/category/restaurants",
    color: "hsl(0, 70%, 55%)" 
  },
  { 
    title: "Groceries", 
    icon: ShoppingCart, 
    to: "/category/groceries",
    color: "hsl(142, 50%, 45%)" 
  },
  { 
    title: "Travel", 
    icon: Plane, 
    to: "/category/travel",
    color: "hsl(210, 70%, 50%)" 
  },
  { 
    title: "Entertainment", 
    icon: Theater, 
    to: "/category/entertainment",
    color: "hsl(280, 60%, 50%)" 
  },
  { 
    title: "Healthcare", 
    icon: Pill, 
    to: "/category/healthcare",
    color: "hsl(340, 65%, 55%)" 
  },
  { 
    title: "Shopping", 
    icon: ShoppingBag, 
    to: "/category/shopping",
    color: "hsl(42, 65%, 50%)" 
  },
];

export default function Home() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground px-6 py-8 rounded-b-3xl">
        <h1 className="text-senior-2xl font-bold mb-2">
          {getGreeting()}! 👋
        </h1>
        <p className="text-senior-base opacity-90">
          Find discounts made for you
        </p>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Location Bar */}
        <LocationBar 
          location="San Francisco, CA" 
          onChangeLocation={() => console.log("Change location")}
        />

        {/* Categories Section */}
        <section>
          <h2 className="text-senior-xl font-bold text-foreground mb-4 px-2">
            Browse Discounts
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                icon={category.icon}
                to={category.to}
                color={category.color}
              />
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-5">
          <h3 className="text-senior-lg font-semibold text-foreground mb-2">
            💡 Quick Tip
          </h3>
          <p className="text-senior-base text-muted-foreground">
            Tap the heart icon on any discount to save it for later. Your saved discounts work offline too!
          </p>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
