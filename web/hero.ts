import { heroui } from "@heroui/react";

export default heroui({
  addCommonColors: true,
  themes: {
    light: {
      colors: {
        // Background colors - Clean, sophisticated whites and off-whites
        background: "#FEFEFE", // Pure white with slight warmth

        // Foreground/text colors - Rich, readable grays
        foreground: "#1A1A1A", // Near-black for primary text

        // Primary brand color - Sophisticated amber/gold (like aged whiskey)
        primary: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#D97706", // Main primary color - rich amber
          600: "#B45309",
          700: "#92400E",
          800: "#78350F",
          900: "#5F1C0B",
          DEFAULT: "#D97706",
          foreground: "#FFFFFF",
        },

        // Secondary color - Deep emerald (like absinthe/mint)
        secondary: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#059669", // Main secondary color - elegant emerald
          600: "#047857",
          700: "#065F46",
          800: "#064E3B",
          900: "#022C22",
          DEFAULT: "#059669",
          foreground: "#FFFFFF",
        },

        // Success - Fresh lime green
        success: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          DEFAULT: "#22C55E",
          foreground: "#FFFFFF",
        },

        // Warning - Sophisticated orange (like Aperol)
        warning: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          DEFAULT: "#F97316",
          foreground: "#FFFFFF",
        },

        // Danger - Deep crimson (like red wine)
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#DC2626",
          600: "#B91C1C",
          700: "#991B1B",
          800: "#7F1D1D",
          900: "#450A0A",
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },

        // Content colors for different UI states
        content1: "#FFFFFF",
        content2: "#F9FAFB",
        content3: "#F3F4F6",
        content4: "#E5E7EB",

        // Focus color
        focus: "#D97706",

        // Default color for neutral elements
        default: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          DEFAULT: "#F3F4F6",
          foreground: "#374151",
        },

        // Divider colors
        divider: "#E5E7EB",

        // Overlay colors
        overlay: "rgba(0, 0, 0, 0.5)",
      },
    },

    dark: {
      colors: {
        // Background colors - Rich, sophisticated darks
        background: "#0A0A0A", // Deep black with slight warmth

        // Foreground/text colors - Clean whites and grays
        foreground: "#FAFAFA", // Near-white for primary text

        // Primary brand color - Warmer gold for dark mode
        primary: {
          50: "#451A03",
          100: "#5F1C0B",
          200: "#78350F",
          300: "#92400E",
          400: "#B45309",
          500: "#F59E0B", // Brighter gold for dark mode
          600: "#FBBF24",
          700: "#FCD34D",
          800: "#FDE68A",
          900: "#FEF3C7",
          DEFAULT: "#F59E0B",
          foreground: "#0A0A0A",
        },

        // Secondary color - Brighter emerald for dark mode
        secondary: {
          50: "#022C22",
          100: "#064E3B",
          200: "#065F46",
          300: "#047857",
          400: "#059669",
          500: "#10B981", // Brighter emerald for dark mode
          600: "#34D399",
          700: "#6EE7B7",
          800: "#A7F3D0",
          900: "#D1FAE5",
          DEFAULT: "#10B981",
          foreground: "#0A0A0A",
        },

        // Success - Vibrant lime
        success: {
          50: "#14532D",
          100: "#166534",
          200: "#15803D",
          300: "#16A34A",
          400: "#22C55E",
          500: "#4ADE80",
          600: "#86EFAC",
          700: "#BBF7D0",
          800: "#DCFCE7",
          900: "#F0FDF4",
          DEFAULT: "#4ADE80",
          foreground: "#0A0A0A",
        },

        // Warning - Vibrant orange
        warning: {
          50: "#7C2D12",
          100: "#9A3412",
          200: "#C2410C",
          300: "#EA580C",
          400: "#F97316",
          500: "#FB923C",
          600: "#FDBA74",
          700: "#FED7AA",
          800: "#FFEDD5",
          900: "#FFF7ED",
          DEFAULT: "#FB923C",
          foreground: "#0A0A0A",
        },

        // Danger - Bright red
        danger: {
          50: "#450A0A",
          100: "#7F1D1D",
          200: "#991B1B",
          300: "#B91C1C",
          400: "#DC2626",
          500: "#F87171",
          600: "#FCA5A5",
          700: "#FECACA",
          800: "#FEE2E2",
          900: "#FEF2F2",
          DEFAULT: "#F87171",
          foreground: "#0A0A0A",
        },

        // Content colors for different UI states
        content1: "#1A1A1A",
        content2: "#262626",
        content3: "#2A2A2A",
        content4: "#2E2E2E",

        // Focus color
        focus: "#F59E0B",

        // Default color for neutral elements
        default: {
          50: "#0A0A0A",
          100: "#171717",
          200: "#262626",
          300: "#404040",
          400: "#525252",
          500: "#737373",
          600: "#A3A3A3",
          700: "#D4D4D4",
          800: "#E5E5E5",
          900: "#F5F5F5",
          DEFAULT: "#262626",
          foreground: "#D4D4D4",
        },

        // Divider colors
        divider: "#404040",

        // Overlay colors
        overlay: "rgba(0, 0, 0, 0.8)",
      },
    },
  },
});
