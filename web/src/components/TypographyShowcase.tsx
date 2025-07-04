import { Sun, Moon, Martini, Star, Clock, Users } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function TypographyShowcase() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="min-h-screen p-6 transition-colors duration-200">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-cocktail-hero text-foreground tracking-cocktail font-display mb-2">
              The Barkeeper
            </h1>
            <p className="text-muted-foreground font-sans text-lg tracking-wide">
              Modern Typography for Contemporary Cocktail Experiences
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

        {/* Typography Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cocktail-title font-display">
              Typography System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Font Families */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-foreground font-sans text-lg font-semibold">
                  Sans-Serif (Inter)
                </h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-sans text-sm">
                    Perfect for UI elements, descriptions
                  </p>
                  <p className="font-sans text-base">
                    Modern and clean readability
                  </p>
                  <p className="font-sans text-lg font-medium">
                    Medium weight for emphasis
                  </p>
                  <p className="font-sans text-xl font-bold">
                    Bold headings and labels
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-foreground font-display text-lg font-semibold">
                  Display (Space Grotesk)
                </h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-display text-sm">
                    Modern geometric headings
                  </p>
                  <p className="font-display text-base">
                    Contemporary cocktail names
                  </p>
                  <p className="font-display text-lg font-medium">
                    Bold section headers
                  </p>
                  <p className="font-display text-xl font-bold">
                    Hero typography with character
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-foreground font-mono text-lg font-semibold">
                  Mono (JetBrains Mono)
                </h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-mono text-sm">
                    2 oz whiskey
                  </p>
                  <p className="font-mono text-base">1 sugar cube</p>
                  <p className="text-measurement font-mono font-medium">
                    3 dashes bitters
                  </p>
                  <p className="font-mono font-bold">Recipe precision</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Typography Scale */}
            <div className="space-y-6">
              <h3 className="text-cocktail-subtitle font-display">
                Typography Scale
              </h3>

              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-muted-foreground w-24 font-mono text-xs">
                    Hero
                  </span>
                  <h1 className="text-cocktail-hero tracking-cocktail font-display">
                    Manhattan
                  </h1>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-muted-foreground w-24 font-mono text-xs">
                    Title
                  </span>
                  <h2 className="text-cocktail-title font-display">
                    Classic Cocktails
                  </h2>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-muted-foreground w-24 font-mono text-xs">
                    Subtitle
                  </span>
                  <h3 className="text-cocktail-subtitle font-display">
                    Whiskey Collection
                  </h3>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-muted-foreground w-24 font-mono text-xs">
                    Ingredient
                  </span>
                  <p className="text-recipe-ingredient font-sans">
                    2 oz Rye Whiskey
                  </p>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-muted-foreground w-24 font-mono text-xs">
                    Instruction
                  </span>
                  <p className="text-recipe-instruction font-sans">
                    Stir with ice and strain into a chilled coupe glass
                  </p>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-muted-foreground w-24 font-mono text-xs">
                    Measurement
                  </span>
                  <span className="text-measurement text-primary font-mono">
                    2.5 oz
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-World Examples */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Cocktail Recipe Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-sans text-xl font-semibold">
                Recipe Card Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Card className="bg-muted/50 shadow-subtle-md">
                <CardContent>
                  <div className="space-y-4">
                    {/* Cocktail Header */}
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop&crop=center" />
                        <AvatarFallback>
                          <Martini className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-foreground tracking-cocktail font-display text-2xl font-bold">
                          Old Fashioned
                        </h4>
                        <p className="text-muted-foreground font-sans tracking-wide italic">
                          The quintessential American whiskey cocktail
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="fill-primary text-primary h-4 w-4" />
                            <span className="font-sans text-sm font-medium">
                              4.8
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="text-muted-foreground h-4 w-4" />
                            <span className="text-measurement font-mono">
                              3 min
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="text-muted-foreground h-4 w-4" />
                            <span className="text-measurement font-mono">
                              1 serving
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Ingredients */}
                    <div className="space-y-3">
                      <h5 className="font-sans text-lg font-semibold">
                        Ingredients
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-recipe-ingredient font-sans">
                            Rye or Bourbon Whiskey
                          </span>
                          <span className="text-measurement text-primary font-mono">
                            2 oz
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-recipe-ingredient font-sans">
                            Sugar cube
                          </span>
                          <span className="text-measurement text-primary font-mono">
                            1
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-recipe-ingredient font-sans">
                            Angostura bitters
                          </span>
                          <span className="text-measurement text-secondary font-mono">
                            3 dashes
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Instructions */}
                    <div className="space-y-3">
                      <h5 className="font-sans text-lg font-semibold">
                        Instructions
                      </h5>
                      <ol className="text-recipe-instruction space-y-2 font-sans">
                        <li>
                          1. Place sugar cube in glass and saturate with bitters
                        </li>
                        <li>2. Add a splash of water and muddle</li>
                        <li>3. Fill glass with ice and add whiskey</li>
                        <li>4. Stir well and garnish with orange peel</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Typography Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl font-semibold">
                Typography Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-primary font-display text-lg font-semibold">
                    For Cocktail Names
                  </h4>
                  <p className="text-muted-foreground font-sans text-sm">
                    Use{" "}
                    <code className="bg-muted rounded px-1 font-mono">
                      font-display
                    </code>{" "}
                    with generous letter spacing for modern elegance
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <code className="font-mono text-sm">
                      font-display text-cocktail-hero tracking-cocktail
                    </code>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-secondary font-sans text-lg font-semibold">
                    For Body Text
                  </h4>
                  <p className="text-muted-foreground font-sans text-sm">
                    Clean Inter for instructions and descriptions
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <code className="font-mono text-sm">
                      font-sans text-recipe-instruction
                    </code>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-primary font-mono text-lg font-semibold">
                    Letter Spacing
                  </h4>
                  <div className="space-y-1">
                    <p className="tracking-cocktail font-display">
                      Modern cocktail names
                    </p>
                    <p className="tracking-elegant font-sans">
                      Premium section headers
                    </p>
                    <p className="font-sans tracking-normal">
                      Regular body text (no extra spacing)
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-display text-lg font-semibold">
                  Available Typography Classes
                </h4>
                <div className="grid gap-2 font-mono text-sm">
                  <div>
                    <code>.text-cocktail-hero</code> - 4.5rem, bold
                  </div>
                  <div>
                    <code>.text-cocktail-title</code> - 2.75rem, bold
                  </div>
                  <div>
                    <code>.text-cocktail-subtitle</code> - 1.75rem, semibold
                  </div>
                  <div>
                    <code>.text-recipe-ingredient</code> - 0.875rem, semibold
                  </div>
                  <div>
                    <code>.text-recipe-instruction</code> - 1rem, normal
                  </div>
                  <div>
                    <code>.text-measurement</code> - 0.8rem, bold
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-muted-foreground text-center">
          <p className="tracking-elegant font-display text-lg italic">
            🥃 Crafted Typography for the Modern Bartender
          </p>
        </div>
      </div>
    </div>
  );
}
