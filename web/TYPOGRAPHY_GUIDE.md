# 🖋️ Barkeeper Typography Guide

## Overview

The Barkeeper typography system combines elegance with modern functionality, using three carefully selected typefaces that reflect the sophistication of fine cocktails while maintaining excellent readability across all devices.

## Font Stack

### 🎩 **Playfair Display (Serif)**

**Purpose**: Cocktail names, elegant headings, premium branding
**Character**: Sophisticated, luxurious, attention-grabbing
**Usage**: Hero titles, cocktail names, section headers

```css
font-family: "Playfair Display", Georgia, "Times New Roman", serif;
```

**When to use:**

- Cocktail names and recipe titles
- Hero headings and main page titles
- Premium feature callouts
- Brand elements requiring elegance

**Examples:**

```tsx
<h1 className="font-serif text-cocktail-hero tracking-cocktail">Manhattan</h1>
<h2 className="font-serif text-cocktail-title">Classic Cocktails</h2>
<h3 className="font-serif text-cocktail-subtitle italic">Premium Collection</h3>
```

### 🎯 **Inter (Sans-Serif)**

**Purpose**: UI elements, body text, descriptions, navigation
**Character**: Clean, modern, highly readable
**Usage**: Interface text, descriptions, buttons, forms

```css
font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
```

**When to use:**

- All UI components and navigation
- Recipe descriptions and instructions
- Button labels and form inputs
- Body text and paragraphs

**Examples:**

```tsx
<p className="font-sans text-recipe-instruction">Stir with ice and strain into chilled glass</p>
<button className="font-sans font-medium">Add to Favorites</button>
<span className="font-sans text-recipe-ingredient">Rye Whiskey</span>
```

### ⚡ **JetBrains Mono (Monospace)**

**Purpose**: Measurements, quantities, technical data, code
**Character**: Precise, consistent spacing, technical
**Usage**: Recipe measurements, timing, quantities

```css
font-family: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;
```

**When to use:**

- All measurements and quantities
- Time indicators
- Technical specifications
- Code snippets or data

**Examples:**

```tsx
<span className="font-mono text-measurement text-primary">2 oz</span>
<span className="font-mono text-measurement">3 dashes</span>
<time className="font-mono text-sm">5 min</time>
```

## Typography Scale

### Custom Font Sizes

```css
/* Hero cocktail names */
text-cocktail-hero: 3.5rem (56px), line-height: 1.1, font-weight: 700

/* Section titles */
text-cocktail-title: 2.25rem (36px), line-height: 1.2, font-weight: 600

/* Subsection headers */
text-cocktail-subtitle: 1.5rem (24px), line-height: 1.3, font-weight: 500

/* Recipe ingredients */
text-recipe-ingredient: 0.95rem (15.2px), line-height: 1.4, font-weight: 500

/* Recipe instructions */
text-recipe-instruction: 1rem (16px), line-height: 1.6, font-weight: 400

/* Measurements */
text-measurement: 0.875rem (14px), line-height: 1.4, font-weight: 600
```

### Letter Spacing

```css
/* For elegant cocktail names */
tracking-cocktail: 0.02em

/* For premium section headers */
tracking-elegant: 0.05em

/* Default spacing */
tracking-normal: 0em
```

## Usage Patterns

### Recipe Card Typography

```tsx
function CocktailRecipe() {
  return (
    <Card>
      {/* Cocktail name - always serif, large, elegant */}
      <h1 className="text-cocktail-hero tracking-cocktail text-foreground font-serif">
        Old Fashioned
      </h1>

      {/* Description - clean sans-serif */}
      <p className="text-foreground/70 font-sans tracking-wide italic">
        The quintessential American whiskey cocktail
      </p>

      {/* Ingredients section */}
      <h3 className="font-sans text-lg font-semibold">Ingredients</h3>

      {/* Individual ingredients */}
      <div className="flex justify-between">
        <span className="text-recipe-ingredient font-sans">Rye Whiskey</span>
        <span className="text-measurement text-primary font-mono">2 oz</span>
      </div>

      {/* Instructions */}
      <h3 className="font-sans text-lg font-semibold">Instructions</h3>
      <p className="text-recipe-instruction font-sans">
        <span className="text-primary font-mono text-sm font-bold">1.</span>
        Muddle sugar cube with bitters in an old-fashioned glass
      </p>
    </Card>
  );
}
```

### Navigation Typography

```tsx
function Navigation() {
  return (
    <nav>
      {/* Logo/brand - elegant serif */}
      <h1 className="tracking-cocktail font-serif text-2xl font-bold">
        The Barkeeper
      </h1>

      {/* Menu items - clean sans-serif */}
      <a className="hover:text-primary font-sans font-medium">Cocktails</a>
      <a className="hover:text-primary font-sans font-medium">Ingredients</a>
    </nav>
  );
}
```

### Form Typography

```tsx
function SearchForm() {
  return (
    <form>
      {/* Form labels - clean sans-serif */}
      <label className="text-foreground font-sans font-medium">
        Search Cocktails
      </label>

      {/* Input text - readable sans-serif */}
      <input
        className="text-recipe-instruction font-sans"
        placeholder="Type a cocktail name..."
      />

      {/* Helper text - smaller sans-serif */}
      <p className="text-foreground/70 font-sans text-sm">
        Try searching for "Manhattan" or "Old Fashioned"
      </p>
    </form>
  );
}
```

## Design Principles

### 1. **Hierarchy Through Contrast**

- **Serif** for attention-grabbing elements (cocktail names)
- **Sans-serif** for content and UI (everything else)
- **Monospace** for precision (measurements only)

### 2. **Emotional Typography**

- **Serif**: Evokes luxury, tradition, craftsmanship
- **Sans-serif**: Conveys modernity, clarity, usability
- **Monospace**: Suggests precision, reliability, expertise

### 3. **Practical Guidelines**

- Never use serif for body text or long passages
- Always use monospace for measurements and quantities
- Use letter spacing sparingly - only for special emphasis
- Maintain consistent line heights for readability
- Test all typography in both light and dark modes

### 4. **Accessibility**

- Minimum 16px font size for body text
- High contrast ratios in both themes
- Clear visual hierarchy
- Consistent spacing and alignment

## Color Combinations

### Typography + Theme Colors

```tsx
// Primary colored measurements
<span className="font-mono text-measurement text-primary">2 oz</span>

// Secondary colored garnish notes
<span className="font-mono text-measurement text-secondary">garnish</span>

// Elegant cocktail names with proper contrast
<h1 className="font-serif text-cocktail-hero text-foreground tracking-cocktail">
  Manhattan
</h1>

// Subtle instructional text
<p className="font-sans text-recipe-instruction text-foreground/80">
  Stir gently with ice until well chilled
</p>
```

## Performance Considerations

### Font Loading Strategy

```css
/* Fonts are loaded via Google Fonts with display=swap for performance */
@import url("...&display=swap");
```

### Font Display

- Uses `font-display: swap` for better loading performance
- Fallback fonts ensure readability during font load
- System fonts used as fallbacks for each category

This typography system creates a sophisticated, readable, and distinctly branded experience that elevates your cocktail app above standard applications while maintaining excellent usability and performance.
