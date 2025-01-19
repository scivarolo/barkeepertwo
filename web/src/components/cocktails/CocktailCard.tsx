import { Cocktail } from "@/types/Models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "@tanstack/react-router";

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Link
      to="/cocktails/$cocktailId"
      params={{ cocktailId: cocktail.Id.toString() }}>
      <Card className="group transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle className="transition-all group-hover:text-primary">
            {cocktail.Name}
          </CardTitle>
          <CardDescription>{cocktail.Notes}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{cocktail.Instructions}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
