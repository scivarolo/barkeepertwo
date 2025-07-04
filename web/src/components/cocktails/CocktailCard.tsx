import { Cocktail } from "@/types/Models";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { Martini } from "lucide-react";

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Link
      to="/cocktails/$cocktailId"
      params={{ cocktailId: cocktail.Id.toString() }}>
      <Card className="group transition-all">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop&crop=center" />
            <AvatarFallback>
              <Martini size="16" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-display text-primary group-hover:text-primary-600 text-2xl font-bold transition-all">
              {cocktail.Name}
            </h3>
            <p className="text-foreground/70 font-sans tracking-wide italic">
              {cocktail.Notes}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p>{cocktail.Instructions}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
