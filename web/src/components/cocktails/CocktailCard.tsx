import { Cocktail } from "@/types/Models";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Link } from "@tanstack/react-router";

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Link
      to="/cocktails/$cocktailId"
      params={{ cocktailId: cocktail.Id.toString() }}>
      <Card className="group shadow-none transition-all hover:shadow-md">
        <CardHeader className="flex flex-col items-start">
          <h3 className="text-xl transition-all group-hover:text-primary">
            {cocktail.Name}
          </h3>
          <h6>{cocktail.Notes}</h6>
        </CardHeader>
        <CardBody>
          <p>{cocktail.Instructions}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
