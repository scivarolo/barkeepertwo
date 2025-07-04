import { createFileRoute } from "@tanstack/react-router";
import { ThemeShowcase } from "@/components/ThemeShowcase";
import { TypographyShowcase } from "@/components/TypographyShowcase";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/theme-demo")({
  component: ThemeDemo,
});

function ThemeDemo() {
  return (
    <div className="p-6">
      <Tabs defaultValue="colors" className="mx-auto">
        <TabsList className="mx-auto">
          <TabsTrigger value="colors" className="text-lg">
            Colors & Components
          </TabsTrigger>
          <TabsTrigger value="typography" className="text-lg">
            Typography
          </TabsTrigger>
        </TabsList>
        <TabsContent value="colors">
          <ThemeShowcase />
        </TabsContent>
        <TabsContent value="typography">
          <TypographyShowcase />
        </TabsContent>
      </Tabs>
    </div>
  );
}
