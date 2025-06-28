# 🍸 Barkeeper Theme Guide

## Overview

Your sophisticated cocktail app theme combines the elegance of fine cocktails with modern app aesthetics inspired by Uber and Spotify. The theme features a rich amber primary color (like aged whiskey) and a deep emerald secondary color (like absinthe), creating a classy yet contemporary feel.

## Color Palette

### Light Mode

- **Primary (Amber)**: `#D97706` - Rich amber resembling aged whiskey
- **Secondary (Emerald)**: `#059669` - Deep emerald like absinthe/mint
- **Background**: `#FEFEFE` - Pure white with slight warmth
- **Foreground**: `#1A1A1A` - Near-black for crisp readability

### Dark Mode

- **Primary (Gold)**: `#F59E0B` - Brighter gold for dark mode visibility
- **Secondary (Emerald)**: `#10B981` - Brighter emerald for dark mode
- **Background**: `#0A0A0A` - Deep black with slight warmth
- **Foreground**: `#FAFAFA` - Near-white for excellent contrast

## Usage Examples

### Basic Components

```tsx
import { Button, Card, Chip } from "@heroui/react";

// Primary action button
<Button color="primary" variant="solid">
  Order Cocktail
</Button>

// Secondary action
<Button color="secondary" variant="bordered">
  Add to Favorites
</Button>

// Status chips
<Chip color="success">Available</Chip>
<Chip color="warning">Limited Stock</Chip>
<Chip color="danger">Out of Stock</Chip>
```

### Theme Toggle Implementation

```tsx
import { Switch } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  return (
    <div className="flex items-center gap-3">
      <Sun className="h-4 w-4" />
      <Switch isSelected={isDark} onValueChange={toggleTheme} color="primary" />
      <Moon className="h-4 w-4" />
    </div>
  );
}
```

### Card Layouts

```tsx
import { Card, CardBody, CardHeader, Avatar } from "@heroui/react";

// Cocktail recipe card
<Card className="w-full">
  <CardBody className="p-6">
    <div className="flex items-start gap-4">
      <Avatar
        size="lg"
        src="/cocktail-image.jpg"
        fallback={<Martini className="h-6 w-6" />}
      />
      <div className="flex-1">
        <h4 className="text-foreground text-lg font-semibold">Old Fashioned</h4>
        <p className="text-foreground/70">
          Classic whiskey cocktail with sugar and bitters
        </p>
      </div>
    </div>
  </CardBody>
</Card>;
```

### Form Elements

```tsx
import { Input, Progress } from "@heroui/react";

// Search input with primary color
<Input
  label="Search cocktails"
  placeholder="Type a cocktail name..."
  variant="bordered"
  color="primary"
/>

// Progress indicators
<Progress
  value={40}
  color="primary"
  label="Alcohol content"
/>

<Progress
  value={60}
  color="warning"
  label="Sweetness level"
/>
```

## Design Philosophy

### Color Associations

- **Primary (Amber/Gold)**: Represents premium spirits, sophistication, and warmth
- **Secondary (Emerald)**: Evokes fresh herbs, mint, and botanical elements
- **Success (Lime)**: Fresh ingredients and positive actions
- **Warning (Orange)**: Aperitifs and moderate attention
- **Danger (Crimson)**: Wine-inspired red for warnings and errors

### Typography & Spacing

The theme uses Instrument Sans for a modern, clean look that's highly readable across all screen sizes. Spacing follows modern app conventions with generous whitespace for breathing room.

### Modern App Elements

- Clean, minimal interfaces inspired by Uber and Spotify
- Sophisticated color gradients and subtle shadows
- Smooth transitions and hover states
- Mobile-first responsive design
- Dark mode optimized for low-light usage

## Best Practices

1. **Use semantic colors**: Always use the appropriate color for the context (success for positive actions, danger for destructive actions)

2. **Maintain contrast**: The theme is designed with WCAG accessibility in mind - stick to the provided color combinations

3. **Consistent spacing**: Use HeroUI's built-in spacing utilities for consistent layouts

4. **Theme switching**: Always test components in both light and dark modes

5. **Brand consistency**: The amber/emerald combination creates a unique identity - use it consistently throughout the app

## File Structure

- `hero.ts` - Main theme configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `main.tsx` - HeroUIProvider setup
- `ThemeShowcase.tsx` - Demo component showing all theme elements

This theme creates a sophisticated, modern cocktail app experience that feels both classy and contemporary!
