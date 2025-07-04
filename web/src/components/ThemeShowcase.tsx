import { Sun, Moon, Martini, Star } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function ThemeShowcase() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="min-h-screen p-6 transition-colors duration-200">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-cocktail-hero text-foreground tracking-cocktail font-display mb-2">
              🍸 Barkeeper Theme
            </h1>
            <p className="text-recipe-instruction text-foreground/70 tracking-elegant font-sans">
              Sophisticated cocktail app design with modern aesthetics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Sun className="h-4 w-4" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cocktail-title font-display">
              Color Palette
            </CardTitle>
            <p className="text-recipe-instruction text-muted-foreground font-sans">
              Complete color system with all shades and their corresponding CSS
              classes
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Primary Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-display">
                Primary (Amber/Gold)
              </h3>
              <p className="text-recipe-instruction text-muted-foreground mb-4 font-sans">
                Rich amber like aged whiskey - perfect for main actions and
                branding
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                {[
                  { shade: "50", bg: "bg-primary/10", hex: "#FFFBEB" },
                  { shade: "100", bg: "bg-primary/20", hex: "#FEF3C7" },
                  { shade: "200", bg: "bg-primary/30", hex: "#FDE68A" },
                  { shade: "300", bg: "bg-primary/40", hex: "#FCD34D" },
                  { shade: "400", bg: "bg-primary/60", hex: "#FBBF24" },
                  {
                    shade: "500",
                    bg: "bg-primary",
                    hex: "#D97706",
                    isMain: true,
                  },
                  { shade: "600", bg: "bg-primary", hex: "#B45309" },
                  { shade: "700", bg: "bg-primary", hex: "#92400E" },
                  { shade: "800", bg: "bg-primary", hex: "#78350F" },
                  { shade: "900", bg: "bg-primary", hex: "#5F1C0B" },
                ].map((color) => (
                  <div key={color.shade} className="space-y-1">
                    <div
                      className={`${color.bg} flex h-16 items-end rounded-lg p-2 ${color.isMain ? "ring-primary ring-2" : ""}`}>
                      <span
                        className={`font-mono text-xs ${parseInt(color.shade) >= 400 ? "text-white" : "text-black"} ${color.isMain ? "font-bold" : ""}`}>
                        {color.shade}
                      </span>
                    </div>
                    <code
                      className={`block font-mono text-xs ${color.isMain ? "font-bold" : ""}`}>
                      {color.isMain
                        ? "bg-primary"
                        : `bg-primary-${color.shade}`}
                    </code>
                    <code className="text-muted-foreground block font-mono text-xs">
                      {color.hex}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Secondary Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-display">
                Secondary (Emerald)
              </h3>
              <p className="text-recipe-instruction text-muted-foreground mb-4 font-sans">
                Deep emerald like absinthe/mint - perfect for accent actions and
                highlights
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                {[
                  { shade: "50", bg: "bg-secondary/10", hex: "#ECFDF5" },
                  { shade: "100", bg: "bg-secondary/20", hex: "#D1FAE5" },
                  { shade: "200", bg: "bg-secondary/30", hex: "#A7F3D0" },
                  { shade: "300", bg: "bg-secondary/40", hex: "#6EE7B7" },
                  { shade: "400", bg: "bg-secondary/60", hex: "#34D399" },
                  {
                    shade: "500",
                    bg: "bg-secondary",
                    hex: "#059669",
                    isMain: true,
                  },
                  { shade: "600", bg: "bg-secondary", hex: "#047857" },
                  { shade: "700", bg: "bg-secondary", hex: "#065F46" },
                  { shade: "800", bg: "bg-secondary", hex: "#064E3B" },
                  { shade: "900", bg: "bg-secondary", hex: "#022C22" },
                ].map((color) => (
                  <div key={color.shade} className="space-y-1">
                    <div
                      className={`${color.bg} flex h-16 items-end rounded-lg p-2 ${color.isMain ? "ring-secondary ring-2" : ""}`}>
                      <span
                        className={`font-mono text-xs ${parseInt(color.shade) >= 400 ? "text-white" : "text-black"} ${color.isMain ? "font-bold" : ""}`}>
                        {color.shade}
                      </span>
                    </div>
                    <code
                      className={`block font-mono text-xs ${color.isMain ? "font-bold" : ""}`}>
                      {color.isMain
                        ? "bg-secondary"
                        : `bg-secondary-${color.shade}`}
                    </code>
                    <code className="text-muted-foreground block font-mono text-xs">
                      {color.hex}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Success Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-display">
                Success (Lime Green)
              </h3>
              <p className="text-recipe-instruction text-muted-foreground mb-4 font-sans">
                Fresh lime green - perfect for positive actions and success
                states
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                {[
                  { shade: "50", bg: "bg-green-50", hex: "#F0FDF4" },
                  { shade: "100", bg: "bg-green-100", hex: "#DCFCE7" },
                  { shade: "200", bg: "bg-green-200", hex: "#BBF7D0" },
                  { shade: "300", bg: "bg-green-300", hex: "#86EFAC" },
                  { shade: "400", bg: "bg-green-400", hex: "#4ADE80" },
                  {
                    shade: "500",
                    bg: "bg-green-500",
                    hex: "#22C55E",
                    isMain: true,
                  },
                  { shade: "600", bg: "bg-green-600", hex: "#16A34A" },
                  { shade: "700", bg: "bg-green-700", hex: "#15803D" },
                  { shade: "800", bg: "bg-green-800", hex: "#166534" },
                  { shade: "900", bg: "bg-green-900", hex: "#14532D" },
                ].map((color) => (
                  <div key={color.shade} className="space-y-1">
                    <div
                      className={`${color.bg} flex h-16 items-end rounded-lg p-2 ${color.isMain ? "ring-2 ring-green-500" : ""}`}>
                      <span
                        className={`font-mono text-xs ${parseInt(color.shade) >= 400 ? "text-white" : "text-black"} ${color.isMain ? "font-bold" : ""}`}>
                        {color.shade}
                      </span>
                    </div>
                    <code
                      className={`block font-mono text-xs ${color.isMain ? "font-bold" : ""}`}>
                      {color.isMain
                        ? "bg-green-500"
                        : `bg-green-${color.shade}`}
                    </code>
                    <code className="text-muted-foreground block font-mono text-xs">
                      {color.hex}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Warning Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-display">
                Warning (Orange)
              </h3>
              <p className="text-recipe-instruction text-muted-foreground mb-4 font-sans">
                Sophisticated orange like Aperol - perfect for warnings and
                attention
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                {[
                  { shade: "50", bg: "bg-orange-50", hex: "#FFF7ED" },
                  { shade: "100", bg: "bg-orange-100", hex: "#FFEDD5" },
                  { shade: "200", bg: "bg-orange-200", hex: "#FED7AA" },
                  { shade: "300", bg: "bg-orange-300", hex: "#FDBA74" },
                  { shade: "400", bg: "bg-orange-400", hex: "#FB923C" },
                  {
                    shade: "500",
                    bg: "bg-orange-500",
                    hex: "#F97316",
                    isMain: true,
                  },
                  { shade: "600", bg: "bg-orange-600", hex: "#EA580C" },
                  { shade: "700", bg: "bg-orange-700", hex: "#C2410C" },
                  { shade: "800", bg: "bg-orange-800", hex: "#9A3412" },
                  { shade: "900", bg: "bg-orange-900", hex: "#7C2D12" },
                ].map((color) => (
                  <div key={color.shade} className="space-y-1">
                    <div
                      className={`${color.bg} flex h-16 items-end rounded-lg p-2 ${color.isMain ? "ring-2 ring-orange-500" : ""}`}>
                      <span
                        className={`font-mono text-xs ${parseInt(color.shade) >= 400 ? "text-white" : "text-black"} ${color.isMain ? "font-bold" : ""}`}>
                        {color.shade}
                      </span>
                    </div>
                    <code
                      className={`block font-mono text-xs ${color.isMain ? "font-bold" : ""}`}>
                      {color.isMain
                        ? "bg-orange-500"
                        : `bg-orange-${color.shade}`}
                    </code>
                    <code className="text-muted-foreground block font-mono text-xs">
                      {color.hex}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Danger Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-display">
                Danger (Crimson)
              </h3>
              <p className="text-recipe-instruction text-muted-foreground mb-4 font-sans">
                Deep crimson like red wine - perfect for destructive actions and
                errors
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                {[
                  { shade: "50", bg: "bg-red-50", hex: "#FEF2F2" },
                  { shade: "100", bg: "bg-red-100", hex: "#FEE2E2" },
                  { shade: "200", bg: "bg-red-200", hex: "#FECACA" },
                  { shade: "300", bg: "bg-red-300", hex: "#FCA5A5" },
                  { shade: "400", bg: "bg-red-400", hex: "#F87171" },
                  {
                    shade: "500",
                    bg: "bg-red-500",
                    hex: "#DC2626",
                    isMain: true,
                  },
                  { shade: "600", bg: "bg-red-600", hex: "#B91C1C" },
                  { shade: "700", bg: "bg-red-700", hex: "#991B1B" },
                  { shade: "800", bg: "bg-red-800", hex: "#7F1D1D" },
                  { shade: "900", bg: "bg-red-900", hex: "#450A0A" },
                ].map((color) => (
                  <div key={color.shade} className="space-y-1">
                    <div
                      className={`${color.bg} flex h-16 items-end rounded-lg p-2 ${color.isMain ? "ring-2 ring-red-500" : ""}`}>
                      <span
                        className={`font-mono text-xs ${parseInt(color.shade) >= 400 ? "text-white" : "text-black"} ${color.isMain ? "font-bold" : ""}`}>
                        {color.shade}
                      </span>
                    </div>
                    <code
                      className={`block font-mono text-xs ${color.isMain ? "font-bold" : ""}`}>
                      {color.isMain ? "bg-red-500" : `bg-red-${color.shade}`}
                    </code>
                    <code className="text-muted-foreground block font-mono text-xs">
                      {color.hex}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Usage Examples */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-display">
                Usage Examples
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-recipe-ingredient font-sans font-semibold">
                    Background Classes
                  </h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div>
                      <code>bg-primary</code> - Main amber color
                    </div>
                    <div>
                      <code>bg-primary/10</code> - Light amber tint
                    </div>
                    <div>
                      <code>bg-secondary</code> - Main emerald color
                    </div>
                    <div>
                      <code>bg-green-500</code> - Success color
                    </div>
                    <div>
                      <code>bg-orange-500</code> - Warning color
                    </div>
                    <div>
                      <code>bg-red-500</code> - Danger color
                    </div>
                    <div>
                      <code>bg-destructive</code> - Alias for danger
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-recipe-ingredient font-sans font-semibold">
                    Text Classes
                  </h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div>
                      <code>text-primary</code> - Primary text color
                    </div>
                    <div>
                      <code>text-secondary</code> - Secondary text color
                    </div>
                    <div>
                      <code>text-green-500</code> - Success text
                    </div>
                    <div>
                      <code>text-orange-500</code> - Warning text
                    </div>
                    <div>
                      <code>text-red-500</code> - Danger text
                    </div>
                    <div>
                      <code>text-muted-foreground</code> - Muted text
                    </div>
                    <div>
                      <code>text-destructive</code> - Danger text alias
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UI Components Demo */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Buttons & Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cocktail-subtitle font-display">
                Buttons & Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button className="font-sans font-medium">
                  Order Cocktail
                </Button>
                <Button variant="secondary" className="font-sans font-medium">
                  Add to Favorites
                </Button>
                <Button variant="outline" className="font-sans font-medium">
                  View Recipe
                </Button>
                <Button variant="ghost" className="font-sans font-medium">
                  Cancel
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="font-sans font-medium">Whiskey</Badge>
                <Badge variant="secondary" className="font-sans font-medium">
                  Espresso
                </Badge>
                <Badge variant="outline" className="font-sans font-medium">
                  Gin
                </Badge>
                <Badge variant="destructive" className="font-sans font-medium">
                  Strong
                </Badge>
                <Badge className="bg-green-500 font-sans font-medium hover:bg-green-600">
                  Fresh
                </Badge>
                <Badge className="bg-orange-500 font-sans font-medium hover:bg-orange-600">
                  Caution
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Cocktail Card Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cocktail-subtitle font-display">
                Cocktail Card Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Card className="shadow-subtle-md">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop&crop=center" />
                      <AvatarFallback>
                        <Martini className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h4 className="text-cocktail-subtitle tracking-cocktail font-display">
                          Old Fashioned
                        </h4>
                        <div className="flex items-center gap-1">
                          <Star className="fill-primary text-primary h-4 w-4" />
                          <span className="text-measurement font-mono">
                            4.8
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-recipe-instruction mb-3 font-sans">
                        A classic whiskey cocktail with sugar, bitters, and a
                        twist of citrus.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-recipe-ingredient font-sans">
                            Difficulty
                          </span>
                          <span className="text-muted-foreground text-recipe-ingredient font-sans">
                            Easy
                          </span>
                        </div>
                        <Progress value={30} className="w-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cocktail-subtitle font-display">
              Form Elements
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="search"
                  className="text-recipe-ingredient font-sans">
                  Search cocktails
                </Label>
                <Input
                  id="search"
                  placeholder="Type a cocktail name..."
                  className="text-recipe-instruction font-sans"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="ingredients"
                  className="text-recipe-ingredient font-sans">
                  Ingredients
                </Label>
                <Input
                  id="ingredients"
                  placeholder="e.g., whiskey, sugar, bitters"
                  className="text-recipe-instruction font-sans"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-recipe-ingredient font-sans font-medium">
                    Alcohol content
                  </span>
                  <span className="text-muted-foreground text-measurement font-mono">
                    40%
                  </span>
                </div>
                <Progress value={40} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-recipe-ingredient font-sans font-medium">
                    Sweetness level
                  </span>
                  <span className="text-muted-foreground text-measurement font-mono">
                    60%
                  </span>
                </div>
                <Progress value={60} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-muted-foreground text-center">
          <p className="tracking-elegant font-display">
            🥃 Crafted with sophistication • Modern cocktail experience
          </p>
        </div>
      </div>
    </div>
  );
}
