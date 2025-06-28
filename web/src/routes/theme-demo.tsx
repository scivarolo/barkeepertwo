import { createFileRoute } from "@tanstack/react-router";
import { ThemeShowcase } from "@/components/ThemeShowcase";
import { TypographyShowcase } from "@/components/TypographyShowcase";
import { Tabs, Tab } from "@heroui/react";

export const Route = createFileRoute("/theme-demo")({
  component: ThemeDemo,
});

function ThemeDemo() {
  return (
    <div className="p-6">
      <Tabs
        aria-label="Theme demos"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}>
        <Tab key="colors" title="Colors & Components">
          <ThemeShowcase />
        </Tab>
        <Tab key="typography" title="Typography">
          <TypographyShowcase />
        </Tab>
      </Tabs>
    </div>
  );
}
