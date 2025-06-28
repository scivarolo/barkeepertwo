import { Cocktail } from "@/types/Models";
import { Avatar, Card, CardBody, CardHeader } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { Martini } from "lucide-react";

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Link
      to="/cocktails/$cocktailId"
      params={{ cocktailId: cocktail.Id.toString() }}>
      <Card className="group p-3 transition-all">
        <CardHeader className="flex items-start gap-4">
          <Avatar
            size="lg"
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop&crop=center"
            fallback={<Martini className="h-6 w-6" />}
          />
          <div>
            <h3 className="font-display text-primary group-hover:text-primary-600 text-2xl font-bold transition-all">
              {cocktail.Name}
            </h3>
            <p className="text-foreground/70 font-sans tracking-wide italic">
              {cocktail.Notes}
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p>{cocktail.Instructions}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
