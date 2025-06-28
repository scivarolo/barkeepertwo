import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Switch,
  Chip,
  Avatar,
  Progress,
  Input,
  Spacer,
} from "@heroui/react";
import { Sun, Moon, Wine, Coffee, Martini, Star } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeShowcase() {
  const { setTheme, theme } = useTheme();

  return (
    <div className={`min-h-screen p-6 transition-colors duration-200`}>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-cocktail-hero text-foreground tracking-cocktail mb-2 font-serif">
              🍸 Barkeeper Theme
            </h1>
            <p className="text-recipe-instruction text-foreground/70 tracking-elegant font-sans">
              Sophisticated cocktail app design with modern aesthetics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Sun className="h-4 w-4" />
            <Switch
              isSelected={theme === "dark"}
              onValueChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              color="primary"
              size="lg"
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <div className="flex flex-col">
              <h2 className="text-cocktail-title font-serif">Color Palette</h2>
              <p className="text-recipe-instruction text-foreground/70 font-sans">
                Complete color system with all shades and their corresponding
                CSS classes
              </p>
            </div>
          </CardHeader>
          <CardBody className="space-y-8">
            {/* Primary Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-serif">
                Primary (Amber/Gold)
              </h3>
              <p className="text-recipe-instruction text-foreground/70 mb-4 font-sans">
                Rich amber like aged whiskey - perfect for main actions and
                branding
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                <div className="space-y-1">
                  <div className="bg-primary-50 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">50</span>
                  </div>
                  <code className="block font-mono text-xs">bg-primary-50</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FFFBEB
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-100 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">100</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-primary-100
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FEF3C7
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-200 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">200</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-primary-200
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FDE68A
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-300 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">300</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-primary-300
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FCD34D
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-400 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">400</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-primary-400
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FBBF24
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-500 ring-primary flex h-16 items-end rounded-lg p-2 ring-2">
                    <span className="font-mono text-xs font-bold text-white">
                      500
                    </span>
                  </div>
                  <code className="block font-mono text-xs font-bold">
                    bg-primary
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #D97706
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-600 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">600</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-primary-600
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #B45309
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-700 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">700</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-primary-700
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #92400E
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-800 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">800</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-primary-800
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #78350F
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-primary-900 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">900</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-primary-900
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #5F1C0B
                  </code>
                </div>
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-serif">
                Secondary (Emerald)
              </h3>
              <p className="text-recipe-instruction text-foreground/70 mb-4 font-sans">
                Deep emerald like absinthe/mint - perfect for accent actions and
                highlights
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                <div className="space-y-1">
                  <div className="bg-secondary-50 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">50</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-50
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #ECFDF5
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-100 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">100</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-100
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #D1FAE5
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-200 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">200</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-200
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #A7F3D0
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-300 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">300</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-300
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #6EE7B7
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-400 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">400</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-400
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #34D399
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-500 ring-secondary flex h-16 items-end rounded-lg p-2 ring-2">
                    <span className="font-mono text-xs font-bold text-white">
                      500
                    </span>
                  </div>
                  <code className="block font-mono text-xs font-bold">
                    bg-secondary
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #059669
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-600 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">600</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-600
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #047857
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-700 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">700</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-700
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #065F46
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-800 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">800</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-800
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #064E3B
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-secondary-900 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">900</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-secondary-900
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #022C22
                  </code>
                </div>
              </div>
            </div>

            {/* Success Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-serif">
                Success (Lime)
              </h3>
              <p className="text-recipe-instruction text-foreground/70 mb-4 font-sans">
                Fresh lime green - for positive actions and confirmations
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                <div className="space-y-1">
                  <div className="bg-success-50 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">50</span>
                  </div>
                  <code className="block font-mono text-xs">bg-success-50</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #F0FDF4
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-100 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">100</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-success-100
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #DCFCE7
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-200 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">200</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-success-200
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #BBF7D0
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-300 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">300</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-success-300
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #86EFAC
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-400 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">400</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-success-400
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #4ADE80
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-500 ring-success flex h-16 items-end rounded-lg p-2 ring-2">
                    <span className="font-mono text-xs font-bold text-white">
                      500
                    </span>
                  </div>
                  <code className="block font-mono text-xs font-bold">
                    bg-success
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #22C55E
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-600 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">600</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-success-600
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #16A34A
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-700 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">700</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-success-700
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #15803D
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-800 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">800</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-success-800
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #166534
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-success-900 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">900</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-success-900
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #14532D
                  </code>
                </div>
              </div>
            </div>

            {/* Warning Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-serif">
                Warning (Aperol)
              </h3>
              <p className="text-recipe-instruction text-foreground/70 mb-4 font-sans">
                Sophisticated orange like Aperol - for warnings and moderate
                attention
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                <div className="space-y-1">
                  <div className="bg-warning-50 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">50</span>
                  </div>
                  <code className="block font-mono text-xs">bg-warning-50</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FFF7ED
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-100 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">100</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-warning-100
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FFEDD5
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-200 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">200</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-warning-200
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FED7AA
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-300 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">300</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-warning-300
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FDBA74
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-400 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">400</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-warning-400
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FB923C
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-500 ring-warning flex h-16 items-end rounded-lg p-2 ring-2">
                    <span className="font-mono text-xs font-bold text-white">
                      500
                    </span>
                  </div>
                  <code className="block font-mono text-xs font-bold">
                    bg-warning
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #F97316
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-600 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">600</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-warning-600
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #EA580C
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-700 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">700</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-warning-700
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #C2410C
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-800 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">800</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-warning-800
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #9A3412
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-warning-900 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">900</span>
                  </div>
                  <code className="block font-mono text-xs">
                    bg-warning-900
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #7C2D12
                  </code>
                </div>
              </div>
            </div>

            {/* Danger Colors */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-serif">
                Danger (Wine)
              </h3>
              <p className="text-recipe-instruction text-foreground/70 mb-4 font-sans">
                Deep crimson like red wine - for errors and destructive actions
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10">
                <div className="space-y-1">
                  <div className="bg-danger-50 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">50</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-50</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FEF2F2
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-100 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">100</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-100</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FEE2E2
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-200 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">200</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-200</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FECACA
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-300 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs">300</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-300</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #FCA5A5
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-400 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">400</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-400</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #F87171
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-500 ring-danger flex h-16 items-end rounded-lg p-2 ring-2">
                    <span className="font-mono text-xs font-bold text-white">
                      500
                    </span>
                  </div>
                  <code className="block font-mono text-xs font-bold">
                    bg-danger
                  </code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #DC2626
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-600 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">600</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-600</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #B91C1C
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-700 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">700</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-700</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #991B1B
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-800 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">800</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-800</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #7F1D1D
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="bg-danger-900 flex h-16 items-end rounded-lg p-2">
                    <span className="font-mono text-xs text-white">900</span>
                  </div>
                  <code className="block font-mono text-xs">bg-danger-900</code>
                  <code className="text-foreground/50 block font-mono text-xs">
                    #450A0A
                  </code>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div className="space-y-4">
              <h3 className="text-cocktail-subtitle font-serif">
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
                      <code>bg-primary-50</code> - Lightest amber tint
                    </div>
                    <div>
                      <code>bg-primary-900</code> - Darkest amber shade
                    </div>
                    <div>
                      <code>bg-secondary</code> - Main emerald color
                    </div>
                    <div>
                      <code>bg-success</code> - Success lime color
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
                      <code>text-success</code> - Success text color
                    </div>
                    <div>
                      <code>text-warning</code> - Warning text color
                    </div>
                    <div>
                      <code>text-danger</code> - Danger text color
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* UI Components Demo */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Buttons & Chips */}
          <Card>
            <CardHeader>
              <h3 className="text-cocktail-subtitle font-serif">
                Buttons & Actions
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  color="primary"
                  variant="solid"
                  className="font-sans font-medium">
                  Order Cocktail
                </Button>
                <Button
                  color="secondary"
                  variant="solid"
                  className="font-sans font-medium">
                  Add to Favorites
                </Button>
                <Button
                  color="primary"
                  variant="bordered"
                  className="font-sans font-medium">
                  View Recipe
                </Button>
                <Button
                  color="default"
                  variant="ghost"
                  className="font-sans font-medium">
                  Cancel
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Chip
                  color="primary"
                  variant="solid"
                  startContent={<Wine className="h-3 w-3" />}
                  className="font-sans font-medium">
                  Whiskey
                </Chip>
                <Chip
                  color="secondary"
                  variant="solid"
                  startContent={<Coffee className="h-3 w-3" />}
                  className="font-sans font-medium">
                  Espresso
                </Chip>
                <Chip
                  color="success"
                  variant="flat"
                  startContent={<Martini className="h-3 w-3" />}
                  className="font-sans font-medium">
                  Gin
                </Chip>
                <Chip
                  color="warning"
                  variant="flat"
                  className="font-sans font-medium">
                  Sweet
                </Chip>
              </div>
            </CardBody>
          </Card>

          {/* Cards & Content */}
          <Card>
            <CardHeader>
              <h3 className="text-cocktail-subtitle font-serif">
                Cocktail Card Example
              </h3>
            </CardHeader>
            <CardBody>
              <Card className="w-full">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar
                      size="lg"
                      src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop&crop=center"
                      fallback={<Martini className="h-6 w-6" />}
                    />
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h4 className="text-cocktail-subtitle tracking-cocktail font-serif">
                          Old Fashioned
                        </h4>
                        <div className="flex items-center gap-1">
                          <Star className="fill-warning text-warning h-4 w-4" />
                          <span className="text-measurement font-mono">
                            4.8
                          </span>
                        </div>
                      </div>
                      <p className="text-foreground/70 text-recipe-instruction mb-3 font-sans">
                        A classic whiskey cocktail with sugar, bitters, and a
                        twist of citrus.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-recipe-ingredient font-sans">
                            Difficulty
                          </span>
                          <span className="text-foreground/70 text-recipe-ingredient font-sans">
                            Easy
                          </span>
                        </div>
                        <Progress
                          value={30}
                          color="success"
                          size="sm"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </div>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <h3 className="text-cocktail-subtitle font-serif">Form Elements</h3>
          </CardHeader>
          <CardBody className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Input
                label="Search cocktails"
                placeholder="Type a cocktail name..."
                variant="bordered"
                color="primary"
                classNames={{
                  label: "font-sans text-recipe-ingredient",
                  input: "font-sans text-recipe-instruction",
                }}
              />
              <Input
                label="Ingredients"
                placeholder="e.g., whiskey, sugar, bitters"
                variant="flat"
                color="secondary"
                classNames={{
                  label: "font-sans text-recipe-ingredient",
                  input: "font-sans text-recipe-instruction",
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-recipe-ingredient font-sans font-medium">
                  Alcohol content
                </span>
                <span className="text-foreground/70 text-measurement font-mono">
                  40%
                </span>
              </div>
              <Progress
                value={40}
                color="primary"
                size="md"
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <span className="text-recipe-ingredient font-sans font-medium">
                  Sweetness level
                </span>
                <span className="text-foreground/70 text-measurement font-mono">
                  60%
                </span>
              </div>
              <Progress
                value={60}
                color="warning"
                size="md"
                className="w-full"
              />
            </div>
          </CardBody>
        </Card>

        <Spacer y={4} />

        {/* Footer */}
        <div className="text-foreground/50 text-center">
          <p className="tracking-elegant font-serif">
            🥃 Crafted with sophistication • Modern cocktail experience
          </p>
        </div>
      </div>
    </div>
  );
}
