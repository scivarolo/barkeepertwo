import CocktailCard from "@/components/cocktails/CocktailCard";
import PageHeader from "@/components/page/PageHeader";
import LoadingIndicator from "@/components/utility/LoadingIndicator";
import NoItems from "@/components/utility/NoItems";
import { useRecentCocktails } from "@/data/Cocktail";
import { PagingOptions, SortDirection } from "@/types/Utility";
import { Button } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/cocktails/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentRequest, setCurrentRequest] = useState<PagingOptions>({
    Page: 0,
    PageSize: 10,
    SortDirection: SortDirection.Descending,
  });
  const cocktails = useRecentCocktails(currentRequest);

  return (
    <div>
      <PageHeader
        title="Cocktails"
        subtitle="Recently created cocktails"
        toolbar={<Button>Test</Button>}
      />
      <div>
        <LoadingIndicator
          isLoading={cocktails.isLoading}
          text="Loading recent cocktails...">
          {(cocktails.data?.Items?.length ?? 0 > 0) ? (
            cocktails.data?.Items.map((cocktail) => (
              <CocktailCard cocktail={cocktail} />
            ))
          ) : (
            <NoItems
              title="Bar's Closed"
              description="No recent cocktails were found."
            />
          )}
          {}
        </LoadingIndicator>
      </div>
    </div>
  );
}
